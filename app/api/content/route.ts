import { NextResponse } from 'next/server'
import dbConnect, { updateInitDbFile } from '@/lib/mongodb'
import Content from '@/models/Content'

export async function GET(request: Request) {
  try {
    await dbConnect()
    const { searchParams } = new URL(request.url)
    const pageId = searchParams.get('pageId')
    
    if (!pageId) {
      return NextResponse.json({ error: 'Page ID is required' }, { status: 400 })
    }

    const content = await Content.findOne({ pageId })
    return NextResponse.json(content || {})
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    await dbConnect()
    const { searchParams } = new URL(request.url)
    const pageId = searchParams.get('pageId')
    
    if (!pageId) {
      return NextResponse.json({ error: 'Page ID is required' }, { status: 400 })
    }

    const body = await request.json()
    const { content } = body

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    // עדכון במסד הנתונים
    const updatedContent = await Content.findOneAndUpdate(
      { pageId },
      { content },
      { upsert: true, new: true }
    )

    // עדכון קובץ האתחול
    await updateInitDbFile(pageId, content)

    return NextResponse.json(updatedContent)
  } catch (error) {
    console.error('Error updating content:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 