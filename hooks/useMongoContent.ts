import { useState, useEffect } from 'react'

export function useMongoContent<T>(pageId: string, initialContent: T) {
  const [content, setContent] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchContent()
  }, [pageId])

  const fetchContent = async () => {
    try {
      const response = await fetch(`/api/content?pageId=${pageId}`)
      const data = await response.json()
      setContent(data?.content || initialContent)
    } catch (error) {
      console.error('Error fetching content:', error)
      setContent(initialContent)
    } finally {
      setIsLoading(false)
    }
  }

  const setContentAndUpdate = async (newContent: T) => {
    try {
      setContent(newContent)
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
      setContent(content || initialContent)
    }
  }

  return {
    content: content || initialContent,
    setContent: setContentAndUpdate,
    isLoading,
  }
} 