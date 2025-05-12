import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Content from '@/models/Content'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const pageId = searchParams.get('pageId')

  if (!pageId) {
    return NextResponse.json({ error: 'Page ID is required' }, { status: 400 })
  }

  try {
    await dbConnect()
    const content = await Content.findOne({ pageId })
    return NextResponse.json(content || { pageId, content: {} })
  } catch (error) {
    console.error('Database Error:', error)
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { pageId, content } = body

    if (!pageId || !content) {
      return NextResponse.json({ error: 'Page ID and content are required' }, { status: 400 })
    }

    await dbConnect()
    const result = await Content.findOneAndUpdate(
      { pageId },
      { content },
      { new: true, upsert: true }
    )

    return NextResponse.json(result)
  } catch (error) {
    console.error('Database Error:', error)
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
  }
} 