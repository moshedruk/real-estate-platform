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

// הגדרות חיבור משופרות ל-MongoDB
const connectionOptions = {
  bufferCommands: false,
  maxPoolSize: 10,
  minPoolSize: 5,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 5000,
  family: 4
}

function formatJavaScriptObject(obj: any): string {
  if (obj === null) return 'null';
  if (obj === undefined) return 'undefined';
  if (typeof obj === 'string') return `"${obj.replace(/"/g, '\\"')}"`;
  if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);
  if (Array.isArray(obj)) {
    return `[\n${obj.map(item => '    ' + formatJavaScriptObject(item)).join(',\n')}\n  ]`;
  }
  if (typeof obj === 'object') {
    const entries = Object.entries(obj);
    if (entries.length === 0) return '{}';
    return `{\n${entries
      .map(([key, value]) => `    ${key}: ${formatJavaScriptObject(value)}`)
      .join(',\n')}\n  }`;
  }
  return String(obj);
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
    
    // מחליף את האובייקט הישן בחדש עם פורמט מותאם
    const formattedContent = formatJavaScriptObject(initialData)
    const updatedContent = fileContent.replace(
      /const initialData = ({[\s\S]*?});/,
      `const initialData = ${formattedContent};`
    )
    
    // שומר את הקובץ
    await fs.writeFile(initDbPath, updatedContent, 'utf-8')
    console.log(`Updated initDb.ts with new content for ${pageId}`)
  } catch (error) {
    console.error('Error updating initDb.ts:', error)
  }
}

async function dbConnect() {
  try {
    if (cached.conn) {
      console.log('Using cached MongoDB connection')
      return cached.conn
    }

    if (!cached.promise) {
      console.log('Creating new MongoDB connection...')
      cached.promise = mongoose.connect(MONGODB_URI, connectionOptions)
        .then((mongoose) => {
          console.log('MongoDB connected successfully')
          return mongoose
        })
        .catch((error) => {
          console.error('MongoDB connection error:', error)
          cached.promise = null
          throw error
        })
    } else {
      console.log('Using existing connection promise')
    }

    cached.conn = await cached.promise
    return cached.conn
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    throw error
  }
}

// מאזין לאירועי חיבור
mongoose.connection.on('connected', () => {
  console.log('MongoDB connection established')
})

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connection disconnected')
})

process.on('SIGINT', async () => {
  await mongoose.connection.close()
  process.exit(0)
})

export default dbConnect 