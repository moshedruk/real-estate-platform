import Navigation from '@/components/Navigation'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <main>
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <div className="bg-gray-900/70 absolute inset-0 z-10" />
          <img
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
            alt="Jerusalem cityscape"
            className="h-[600px] w-full object-cover"
          />
        </div>
        
        <div className="relative z-20 px-6 py-32 sm:px-8 md:px-12 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-6">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  Opening New Doors in Jerusalem
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                  Find your perfect home in Jerusalem with our expert guidance and extensive portfolio of premium properties.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href="/projects"
                    className="btn-primary"
                  >
                    View Projects
                  </Link>
                  <Link
                    href="/contact"
                    className="text-sm font-semibold leading-6 text-white"
                  >
                    Contact Us <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">Years of Experience</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">15+</dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">Properties Sold</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">500+</dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">Available Properties</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">50+</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">You're in Good Hands</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Trusted by clients worldwide for over 15 years
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We understand that the Israeli market can be complex, which is why we're here to provide you peace of mind every step of the way. With rich experience and deep understanding in the field, you can be sure you're in good hands.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
} 