import { useState, useEffect } from 'react'

// קאש גלובלי לתוכן עם תמיכה ב-localStorage
const CACHE_PREFIX = 'mongo_content_'
const CACHE_EXPIRY = 1000 * 60 * 60 // שעה אחת

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

function getFromCache<T>(pageId: string): T | null {
  try {
    const item = localStorage.getItem(CACHE_PREFIX + pageId)
    if (!item) return null
    
    const cached = JSON.parse(item) as CacheItem<T>
    if (Date.now() - cached.timestamp > CACHE_EXPIRY) {
      localStorage.removeItem(CACHE_PREFIX + pageId)
      return null
    }
    
    return cached.data
  } catch {
    return null
  }
}

function setInCache<T>(pageId: string, data: T) {
  try {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now()
    }
    localStorage.setItem(CACHE_PREFIX + pageId, JSON.stringify(item))
  } catch {
    // אם יש בעיה עם localStorage, פשוט נתעלם
  }
}

interface MongoContentState<T> {
  content: T | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export function useMongoContent<T>(pageId: string, initialContent: T) {
  const [state, setState] = useState<MongoContentState<T>>(() => ({
    content: getFromCache<T>(pageId),
    isLoading: !getFromCache<T>(pageId),
    error: null,
    lastUpdated: null
  }))

  useEffect(() => {
    if (!state.content) {
      fetchContent()
    }
  }, [pageId])

  const fetchContent = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))
      
      console.log(`Fetching content for pageId: ${pageId}`)
      const response = await fetch(`/api/content?pageId=${pageId}`, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.details || errorData.error || `HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log(`Content received for ${pageId}:`, data)
      
      const newContent = data?.content || initialContent
      setState(prev => ({
        ...prev,
        content: newContent,
        isLoading: false,
        error: null,
        lastUpdated: new Date()
      }))
      setInCache(pageId, newContent)
    } catch (error) {
      console.error('Error fetching content:', error)
      setState(prev => ({
        ...prev,
        content: initialContent,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        lastUpdated: null
      }))
      setInCache(pageId, initialContent)
    }
  }

  const setContentAndUpdate = async (newContent: T) => {
    try {
      setState(prev => ({
        ...prev,
        content: newContent,
        isLoading: true,
        error: null
      }))
      setInCache(pageId, newContent)

      console.log(`Updating content for pageId: ${pageId}`)
      const response = await fetch(`/api/content?pageId=${pageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newContent }),
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.details || errorData.error || `HTTP error! status: ${response.status}`)
      }

      setState(prev => ({
        ...prev,
        isLoading: false,
        error: null,
        lastUpdated: new Date()
      }))
    } catch (error) {
      console.error('Error updating content:', error)
      const previousContent = state.content || initialContent
      setState(prev => ({
        ...prev,
        content: previousContent,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }))
      setInCache(pageId, previousContent)
    }
  }

  return {
    content: state.content || initialContent,
    setContent: setContentAndUpdate,
    isLoading: state.isLoading,
    error: state.error,
    lastUpdated: state.lastUpdated,
    refetch: fetchContent
  }
} 