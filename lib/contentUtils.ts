interface ContentUpdate {
  pageId: string;
  content: any;
}

interface UpdateResult {
  pageId: string;
  success: boolean;
  content?: any;
  error?: string;
}

/**
 * מעדכן תוכן של דף בודד
 */
export async function updateContent(pageId: string, content: any): Promise<boolean> {
  try {
    const response = await fetch(`/api/content?pageId=${pageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })

    if (!response.ok) {
      throw new Error('Failed to update content')
    }

    return true
  } catch (error) {
    console.error('Error updating content:', error)
    return false
  }
}

/**
 * מעדכן מספר דפים בבת אחת
 */
export async function bulkUpdateContent(updates: ContentUpdate[]): Promise<UpdateResult[]> {
  try {
    const response = await fetch('/api/content/bulk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updates }),
    })

    if (!response.ok) {
      throw new Error('Failed to perform bulk update')
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error('Error in bulk update:', error)
    return updates.map(update => ({
      pageId: update.pageId,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }))
  }
}

/**
 * מייצא את כל התוכן למונגו
 */
export async function exportAllContent(): Promise<UpdateResult[]> {
  try {
    // קורא את כל הדפים מה-localStorage
    const updates: ContentUpdate[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('mongo_content_')) {
        const pageId = key.replace('mongo_content_', '')
        const item = localStorage.getItem(key)
        if (item) {
          try {
            const { data } = JSON.parse(item)
            updates.push({
              pageId,
              content: data
            })
          } catch (e) {
            console.error(`Error parsing content for ${pageId}:`, e)
          }
        }
      }
    }

    if (updates.length === 0) {
      return []
    }

    // מעדכן את כל התוכן במונגו
    return await bulkUpdateContent(updates)
  } catch (error) {
    console.error('Error exporting content:', error)
    return []
  }
} 