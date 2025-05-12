import { useState, useEffect } from 'react'

// קאש גלובלי לתוכן
const contentCache: { [key: string]: any } = {}

export function useMongoContent<T>(pageId: string, initialContent: T) {
  const [content, setContent] = useState<T | null>(contentCache[pageId] || null)
  const [isLoading, setIsLoading] = useState(!contentCache[pageId])

  useEffect(() => {
    if (!contentCache[pageId]) {
      fetchContent()
    }
  }, [pageId])

  const fetchContent = async () => {
    try {
      const response = await fetch(`/api/content?pageId=${pageId}`)
      const data = await response.json()
      const newContent = data?.content || initialContent
      setContent(newContent)
      contentCache[pageId] = newContent
    } catch (error) {
      console.error('Error fetching content:', error)
      setContent(initialContent)
      contentCache[pageId] = initialContent
    } finally {
      setIsLoading(false)
    }
  }

  const setContentAndUpdate = async (newContent: T) => {
    try {
      // עדכון מיידי של ה-UI וה-cache
      setContent(newContent)
      contentCache[pageId] = newContent

      const response = await fetch(`/api/content?pageId=${pageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newContent }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to update content')
      }
    } catch (error) {
      console.error('Error updating content:', error)
      // אם העדכון נכשל, נחזיר את התוכן הקודם
      const previousContent = content || initialContent
      setContent(previousContent)
      contentCache[pageId] = previousContent
    }
  }

  return {
    content: content || initialContent,
    setContent: setContentAndUpdate,
    isLoading,
  }
} 