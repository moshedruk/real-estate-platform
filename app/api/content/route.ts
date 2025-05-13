import { NextResponse } from 'next/server'
import dbConnect, { updateInitDbFile } from '@/lib/mongodb'
import Content from '@/models/Content'

// Cache for 1 hour
const CACHE_CONTROL = 'public, s-maxage=3600, stale-while-revalidate=600'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const pageId = searchParams.get('pageId')
    
    console.log('Fetching content for pageId:', pageId)
    
    if (!pageId) {
      console.error('No pageId provided')
      return NextResponse.json(
        { error: 'Page ID is required' }, 
        { 
          status: 400,
          headers: {
            'Cache-Control': 'no-store'
          }
        }
      )
    }

    console.log('Connecting to MongoDB...')
    await dbConnect()
    console.log('MongoDB connected successfully')

    console.log('Finding content in database...')
    const content = await Content.findOne({ pageId }).lean()
    console.log('Content found:', content ? 'yes' : 'no')
    
    const response = NextResponse.json(content || { content: null })
    response.headers.set('Cache-Control', CACHE_CONTROL)
    return response
  } catch (error) {
    console.error('Detailed error in GET /api/content:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      pageId: new URL(request.url).searchParams.get('pageId')
    })

    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store'
        }
      }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const pageId = searchParams.get('pageId')
    
    console.log('Updating content for pageId:', pageId)
    
    if (!pageId) {
      console.error('No pageId provided for update')
      return NextResponse.json(
        { error: 'Page ID is required' }, 
        { 
          status: 400,
          headers: {
            'Cache-Control': 'no-store'
          }
        }
      )
    }

    const body = await request.json()
    const { content } = body

    if (!content) {
      console.error('No content provided for update')
      return NextResponse.json(
        { error: 'Content is required' }, 
        { 
          status: 400,
          headers: {
            'Cache-Control': 'no-store'
          }
        }
      )
    }

    console.log('Connecting to MongoDB for update...')
    await dbConnect()
    console.log('MongoDB connected successfully')
    
    // עדכון במסד הנתונים
    console.log('Updating content in database...')
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
    console.log('Content updated successfully')

    // עדכון קובץ האתחול
    console.log('Updating initDb file...')
    await updateInitDbFile(pageId, content)
    console.log('InitDb file updated successfully')

    const response = NextResponse.json(updatedContent)
    response.headers.set('Cache-Control', 'no-store')
    return response
  } catch (error) {
    console.error('Detailed error in PUT /api/content:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      pageId: new URL(request.url).searchParams.get('pageId')
    })

    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store'
        }
      }
    )
  }
} 