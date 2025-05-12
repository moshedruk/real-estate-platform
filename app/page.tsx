'use client'

import Navigation from '@/components/Navigation'
import Link from 'next/link'
import EditableContent from '@/components/EditableContent'
import EditableImage from '@/components/EditableImage'
import { useMongoContent } from '@/hooks/useMongoContent'

interface Stat {
  title: string
  value: string
}

interface HomeContent {
  heroImage: string
  heroImageAlt: string
  heroTitle: string
  heroSubtitle: string
  trustTitle: string
  trustSubtitle: string
  trustDescription: string
  stats: Stat[]
}

const initialContent: HomeContent = {
  heroImage: "https://images.unsplash.com/photo-1582407947304-fd86f028f716",
  heroImageAlt: "Jerusalem cityscape",
  heroTitle: "Opening New Doors in Jerusalem",
  heroSubtitle: "Find your perfect home in Jerusalem with our expert guidance and extensive portfolio of premium properties.",
  trustTitle: "You're in Good Hands",
  trustSubtitle: "Trusted by clients worldwide for over 15 years",
  trustDescription: "We understand that the Israeli market can be complex, which is why we're here to provide you peace of mind every step of the way. With rich experience and deep understanding in the field, you can be sure you're in good hands.",
  stats: [
    { title: "Years of Experience", value: "15+" },
    { title: "Properties Sold", value: "500+" },
    { title: "Available Properties", value: "50+" }
  ]
}

export default function HomePage() {
  const { content, setContent: handleContentUpdate, isLoading } = useMongoContent<HomeContent>('home', initialContent)

  const handleStatUpdate = (index: number, key: string, value: string) => {
    const newStats = [...(content?.stats || [])]
    newStats[index] = { ...newStats[index], [key]: value }
    handleContentUpdate({ ...(content || initialContent), stats: newStats })
  }

  if (isLoading) {
    return (
      <main>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-xl text-gray-600">טוען...</div>
        </div>
      </main>
    )
  }

  // Ensure we have valid content by falling back to initial content if needed
  const displayContent = content || initialContent

  return (
    <main>
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <div className="bg-gray-900/70 absolute inset-0 z-10" />
          <EditableImage
            src={displayContent.heroImage}
            alt={displayContent.heroImageAlt}
            onSave={(value) => handleContentUpdate({ ...displayContent, heroImage: value })}
            className="h-[600px] w-full object-cover"
          />
        </div>
        
        <div className="relative z-20 px-6 py-32 sm:px-8 md:px-12 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-6">
                <EditableContent
                  content={displayContent.heroTitle}
                  className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
                  onSave={(value) => handleContentUpdate({ ...displayContent, heroTitle: value })}
                />
                <EditableContent
                  content={displayContent.heroSubtitle}
                  type="paragraph"
                  className="mt-6 text-lg leading-8 text-gray-300"
                  onSave={(value) => handleContentUpdate({ ...displayContent, heroSubtitle: value })}
                />
                <div className="mt-10 flex items-center gap-x-6">
                  <Link href="/projects" className="btn-primary">
                    View Projects
                  </Link>
                  <Link href="/contact" className="text-sm font-semibold leading-6 text-white">
                    Contact Us <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {displayContent.stats.map((stat, index) => (
              <div key={index} className="mx-auto flex max-w-xs flex-col gap-y-4 bg-white p-6 rounded-lg shadow-sm">
                <EditableContent
                  content={stat.title}
                  className="text-base leading-7 text-gray-600"
                  onSave={(value) => handleStatUpdate(index, 'title', value)}
                />
                <EditableContent
                  content={stat.value}
                  className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl"
                  onSave={(value) => handleStatUpdate(index, 'value', value)}
                />
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center p-8 bg-gray-50 rounded-xl">
            <EditableContent
              content={displayContent.trustTitle}
              onSave={(value) => handleContentUpdate({ ...displayContent, trustTitle: value })}
              className="text-base font-semibold leading-7 text-primary"
            />
            <EditableContent
              content={displayContent.trustSubtitle}
              onSave={(value) => handleContentUpdate({ ...displayContent, trustSubtitle: value })}
              className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            />
            <EditableContent
              content={displayContent.trustDescription}
              type="paragraph"
              onSave={(value) => handleContentUpdate({ ...displayContent, trustDescription: value })}
              className="mt-6 text-lg leading-8 text-gray-600"
            />
          </div>
        </div>
      </div>
    </main>
  )
} 