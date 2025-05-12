import Navigation from '@/components/Navigation'

export default function About() {
  return (
    <main>
      <Navigation />
      
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About Us</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              With over 15 years of experience in Jerusalem's real estate market, we've helped countless clients find their perfect home. Our deep understanding of the local market and commitment to excellence makes us your trusted partner in real estate.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">Expertise</dt>
                <dd className="mt-2 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Specialized knowledge in Jerusalem's unique real estate market, offering insights into the city's most desirable neighborhoods.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">Personal Service</dt>
                <dd className="mt-2 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Dedicated personal attention to each client, ensuring your specific needs and preferences are met.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">Trust & Reliability</dt>
                <dd className="mt-2 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Building lasting relationships through transparency, integrity, and consistent delivery of exceptional service.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </main>
  )
} 