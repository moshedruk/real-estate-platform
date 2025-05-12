import { useState, useEffect } from 'react'

export function useMongoContent<T>(pageId: string, initialData: T) {
  const [content, setContent] = useState<T>(initialData)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchContent()
  }, [pageId])

  const fetchContent = async () => {
    try {
      const response = await fetch(`/api/content?pageId=${pageId}`)
      const data = await response.json()
      if (data.content) {
        setContent(data.content)
      }
      setError(null)
    } catch (err) {
      console.error('Error fetching content:', err)
      setError('Failed to fetch content')
    } finally {
      setIsLoading(false)
    }
  }

  const updateContent = async (newContent: T) => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageId,
          content: newContent,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update content')
      }

      setContent(newContent)
      setError(null)
    } catch (err) {
      console.error('Error updating content:', err)
      setError('Failed to update content')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    content,
    setContent: updateContent,
    isLoading,
    error,
  }
} 