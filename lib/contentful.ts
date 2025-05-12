import { createClient } from 'contentful'

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
})

export async function getProperties() {
  const response = await client.getEntries({
    content_type: 'property',
  })
  return response.items
}

export async function getProjects() {
  const response = await client.getEntries({
    content_type: 'project',
  })
  return response.items
}

export async function getHomePageContent() {
  const response = await client.getEntries({
    content_type: 'homePage',
  })
  return response.items[0]
}

export async function getAboutPageContent() {
  const response = await client.getEntries({
    content_type: 'aboutPage',
  })
  return response.items[0]
} 