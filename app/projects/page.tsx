'use client'

import Navigation from '@/components/Navigation'
import EditableContent from '@/components/EditableContent'
import EditableImage from '@/components/EditableImage'
import { useMongoContent } from '@/hooks/useMongoContent'

const initialProjects = {
  pageContent: {
    title: 'הפרויקטים שלנו',
    subtitle: 'גלו את הפרויקטים החדשים והמרגשים שלנו בירושלים',
  },
  projects: [
    {
      id: 1,
      title: 'מגדלי היוקרה ברחביה',
      description: 'פרויקט יוקרה חדש במיקום מרכזי ברחביה, כולל 20 דירות פאר',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      status: 'בבנייה',
      completion: '2025',
    },
    {
      id: 2,
      title: 'גני תלפיות',
      description: 'קומפלקס מגורים חדש בתלפיות, מתחם סגור עם גינות וחניה',
      image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      status: 'בתכנון',
      completion: '2026',
    },
  ]
}

export default function Projects() {
  const { content, setContent: updateContent, isLoading } = useMongoContent('projects', initialProjects)

  const handleProjectUpdate = (projectId: number, field: string, value: string) => {
    const updatedProjects = content.projects.map(project =>
      project.id === projectId ? { ...project, [field]: value } : project
    )
    updateContent({ ...content, projects: updatedProjects })
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
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {content.projects.map((project) => (
              <article key={project.id} className="flex flex-col items-start bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative w-full">
                  <EditableImage
                    src={project.image}
                    alt={project.title}
                    className="aspect-[16/9] w-full bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                    onSave={(value) => handleProjectUpdate(project.id, 'image', value)}
                  />
                </div>
                <div className="flex-1 w-full p-6">
                  <div className="mt-8 flex items-center gap-x-4 text-xs">
                    <EditableContent
                      content={project.status}
                      className="text-gray-500"
                      onSave={(value) => handleProjectUpdate(project.id, 'status', value)}
                    />
                    <EditableContent
                      content={`סיום משוער: ${project.completion}`}
                      className="text-gray-500"
                      onSave={(value) => handleProjectUpdate(project.id, 'completion', value.replace('סיום משוער: ', ''))}
                    />
                  </div>
                  <div className="group relative">
                    <EditableContent
                      content={project.title}
                      className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
                      onSave={(value) => handleProjectUpdate(project.id, 'title', value)}
                    />
                    <EditableContent
                      content={project.description}
                      type="paragraph"
                      className="mt-5 text-sm leading-6 text-gray-600"
                      onSave={(value) => handleProjectUpdate(project.id, 'description', value)}
                    />
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