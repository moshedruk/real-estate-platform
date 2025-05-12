import Navigation from '@/components/Navigation'

const projects = [
  {
    id: 1,
    name: 'The Crown • Mekor Chaim',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    description: 'Luxury apartments in the heart of Jerusalem',
    status: 'Under Construction',
  },
  {
    id: 2,
    name: 'Carmel Towers • Kiryat Moshe',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    description: 'Modern living with breathtaking views',
    status: 'Coming Soon',
  },
  {
    id: 3,
    name: 'Dafna Gardens • Maale Dafna',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    description: 'Exclusive garden apartments',
    status: 'Ready for Occupancy',
  },
]

export default function Projects() {
  return (
    <main>
      <Navigation />
      
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Projects</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Discover our exclusive collection of residential projects in Jerusalem's most sought-after neighborhoods.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project.id} className="flex flex-col items-start">
                <div className="relative w-full">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="max-w-xl">
                  <div className="mt-8 flex items-center gap-x-4 text-xs">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
                      {project.status}
                    </span>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a href={`/projects/${project.id}`}>
                        <span className="absolute inset-0" />
                        {project.name}
                      </a>
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-gray-600">{project.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
} 