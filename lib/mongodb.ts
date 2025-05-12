import mongoose from 'mongoose'
import fs from 'fs/promises'
import path from 'path'

interface CachedMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: CachedMongoose | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://dmd6708713:MZcYkDb3M1BLsYbP@cluster0.fll6nny.mongodb.net/real-estate'

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

let cached: CachedMongoose = (global.mongoose as CachedMongoose) || { conn: null, promise: null }

if (!global.mongoose) {
  global.mongoose = cached
}

export async function updateInitDbFile(pageId: string, content: any) {
  try {
    const initDbPath = path.join(process.cwd(), 'scripts', 'initDb.ts')
    const fileContent = await fs.readFile(initDbPath, 'utf-8')
    
    // מחלץ את האובייקט initialData מהקובץ
    const match = fileContent.match(/const initialData = ({[\s\S]*?});/)
    if (!match) throw new Error('Could not find initialData in initDb.ts')
    
    const initialDataStr = match[1]
    const initialData = eval(`(${initialDataStr})`)
    
    // מעדכן את התוכן הרלוונטי
    initialData[pageId] = content
    
    // מחליף את האובייקט הישן בחדש
    const updatedContent = fileContent.replace(
      /const initialData = ({[\s\S]*?});/,
      `const initialData = ${JSON.stringify(initialData, null, 2)};`
    )
    
    // שומר את הקובץ
    await fs.writeFile(initDbPath, updatedContent, 'utf-8')
    console.log(`Updated initDb.ts with new content for ${pageId}`)
  } catch (error) {
    console.error('Error updating initDb.ts:', error)
  }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts)
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect 