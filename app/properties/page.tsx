'use client'

import Navigation from '@/components/Navigation'
import Link from 'next/link'
import EditableContent from '@/components/EditableContent'
import EditableImage from '@/components/EditableImage'
import { useMongoContent } from '@/hooks/useMongoContent'

const initialProperties = {
  pageContent: {
    title: 'נכסים זמינים',
    subtitle: 'גלו את מבחר הנכסים היוקרתיים שלנו בשכונות המבוקשות ביותר בירושלים',
  },
  properties: [
    {
      id: 1,
      title: 'דירת יוקרה ברחוב ראול ולנברג',
      location: 'ראול ולנברג 3, ירושלים',
      price: '3,700,000',
      bedrooms: 1,
      bathrooms: 1,
      area: '52',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    },
    {
      id: 2,
      title: 'פנטהאוז ברחוב הנביאים',
      location: 'הנביאים 22, ירושלים',
      price: 'צור קשר למחיר',
      bedrooms: 4,
      bathrooms: 3,
      area: '500',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    },
    {
      id: 3,
      title: 'דירת גן בבקעה',
      location: 'דרך בית לחם, ירושלים',
      price: '4,200,000',
      bedrooms: 3,
      bathrooms: 2,
      area: '120',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    },
  ]
}

export default function Properties() {
  const { content, setContent: updateContent, isLoading } = useMongoContent('properties', initialProperties)

  const handlePropertyUpdate = (propertyId: number, field: string, value: string) => {
    const updatedProperties = content.properties.map(property =>
      property.id === propertyId ? { ...property, [field]: value } : property
    )
    updateContent({ ...content, properties: updatedProperties })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <main>
      <Navigation />
      
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center bg-white p-8 rounded-xl shadow-sm mb-16">
            <EditableContent
              content={content.pageContent.title}
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
              onSave={(value) => updateContent({
                ...content,
                pageContent: { ...content.pageContent, title: value }
              })}
            />
            <EditableContent
              content={content.pageContent.subtitle}
              type="paragraph"
              className="mt-2 text-lg leading-8 text-gray-600"
              onSave={(value) => updateContent({
                ...content,
                pageContent: { ...content.pageContent, subtitle: value }
              })}
            />
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {content.properties.map((property) => (
              <div key={property.id} className="flex flex-col overflow-hidden rounded-xl shadow-sm bg-white">
                <div className="flex-shrink-0">
                  <EditableImage
                    src={property.image}
                    alt={property.title}
                    className="h-48 w-full object-cover"
                    onSave={(value) => handlePropertyUpdate(property.id, 'image', value)}
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-x-4">
                      <EditableContent
                        content={`${property.area} מ"ר`}
                        className="text-xs text-gray-500"
                        onSave={(value) => handlePropertyUpdate(property.id, 'area', value.replace(' מ"ר', ''))}
                      />
                      <EditableContent
                        content={`${property.bedrooms} חדרים`}
                        className="text-xs text-gray-500"
                        onSave={(value) => handlePropertyUpdate(property.id, 'bedrooms', value.replace(' חדרים', ''))}
                      />
                      <EditableContent
                        content={`${property.bathrooms} חדרי רחצה`}
                        className="text-xs text-gray-500"
                        onSave={(value) => handlePropertyUpdate(property.id, 'bathrooms', value.replace(' חדרי רחצה', ''))}
                      />
                    </div>
                    <div className="mt-2 block">
                      <EditableContent
                        content={property.title}
                        className="text-xl font-semibold text-gray-900"
                        onSave={(value) => handlePropertyUpdate(property.id, 'title', value)}
                      />
                      <EditableContent
                        content={property.location}
                        className="mt-3 text-base text-gray-500"
                        onSave={(value) => handlePropertyUpdate(property.id, 'location', value)}
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center justify-between">
                      <EditableContent
                        content={property.price}
                        className="text-xl font-semibold text-primary"
                        onSave={(value) => handlePropertyUpdate(property.id, 'price', value)}
                      />
                      <Link
                        href={`/contact?property=${property.id}`}
                        className="text-sm font-medium text-primary hover:text-primary/80"
                      >
                        צור קשר →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
} 