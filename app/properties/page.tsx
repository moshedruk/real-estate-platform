import Navigation from '@/components/Navigation'
import Link from 'next/link'

const properties = [
  {
    id: 1,
    title: 'Luxury Apartment in Raoul Wallenberg',
    location: 'Raoul Wallenberg 3, Jerusalem',
    price: '3,700,000',
    bedrooms: 1,
    bathrooms: 1,
    area: '52',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
  },
  {
    id: 2,
    title: 'Penthouse in Neviim',
    location: 'Neviim 22, Jerusalem',
    price: 'Contact for Price',
    bedrooms: 4,
    bathrooms: 3,
    area: '500',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
  },
  {
    id: 3,
    title: 'Garden Apartment in Baka',
    location: 'Derech Beit Lechem, Jerusalem',
    price: '4,200,000',
    bedrooms: 3,
    bathrooms: 2,
    area: '120',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
  },
]

export default function Properties() {
  return (
    <main>
      <Navigation />
      
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Available Properties</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Discover our selection of premium properties in Jerusalem's most desirable neighborhoods.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {properties.map((property) => (
              <div key={property.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                <div className="flex-shrink-0">
                  <img className="h-48 w-full object-cover" src={property.image} alt={property.title} />
                </div>
                <div className="flex flex-1 flex-col justify-between bg-white p-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-x-4">
                      <div className="text-xs text-gray-500">
                        {property.area} m²
                      </div>
                      <div className="text-xs text-gray-500">
                        {property.bedrooms} beds
                      </div>
                      <div className="text-xs text-gray-500">
                        {property.bathrooms} baths
                      </div>
                    </div>
                    <Link href={`/properties/${property.id}`} className="mt-2 block">
                      <p className="text-xl font-semibold text-gray-900">{property.title}</p>
                      <p className="mt-3 text-base text-gray-500">{property.location}</p>
                    </Link>
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-semibold text-primary">
                        ${property.price}
                      </p>
                      <Link
                        href={`/contact?property=${property.id}`}
                        className="text-sm font-medium text-primary hover:text-primary/80"
                      >
                        Contact Agent →
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