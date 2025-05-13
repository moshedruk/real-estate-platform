import { NextResponse } from 'next/server'
import dbConnect, { updateInitDbFile } from '@/lib/mongodb'
import Content from '@/models/Content'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { updates } = body

    if (!Array.isArray(updates)) {
      return NextResponse.json(
        { error: 'Updates must be an array' },
        { 
          status: 400,
          headers: {
            'Cache-Control': 'no-store'
          }
        }
      )
    }

    await dbConnect()
    
    const results = []
    
    for (const update of updates) {
      const { pageId, content } = update
      
      if (!pageId || !content) {
        results.push({
          pageId,
          success: false,
          error: 'PageId and content are required'
        })
        continue
      }

      try {
        // עדכון במסד הנתונים
        const updatedContent = await Content.findOneAndUpdate(
          { pageId },
          { 
            content,
            lastModified: new Date()
          },
          { 
            upsert: true, 
            new: true,
            lean: true
          }
        )

        // עדכון קובץ האתחול
        await updateInitDbFile(pageId, content)

        results.push({
          pageId,
          success: true,
          content: updatedContent
        })
      } catch (error) {
        results.push({
          pageId,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    return NextResponse.json(
      { results },
      {
        headers: {
          'Cache-Control': 'no-store'
        }
      }
    )
  } catch (error) {
    console.error('Error in bulk update:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store'
        }
      }
    )
  }
} 