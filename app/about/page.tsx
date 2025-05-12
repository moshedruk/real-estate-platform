'use client'

import Navigation from '@/components/Navigation'
import EditableContent from '@/components/EditableContent'
import EditableImage from '@/components/EditableImage'
import { useMongoContent } from '@/hooks/useMongoContent'

const initialPageContent = {
  title: 'אודות לוי צבי - דרוק',
  subtitle: 'מובילים בשוק הנדל"ן בירושלים',
  mainImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
  history: 'חברת לוי צבי - דרוק נוסדה בשנת 1990 ומאז הפכה לאחת החברות המובילות בתחום הנדל"ן בירושלים. אנו מתמחים בפיתוח, שיווק וניהול של פרויקטי נדל"ן יוקרתיים.',
  mission: 'המשימה שלנו היא להביא את הסטנדרטים הגבוהים ביותר של איכות ושירות ללקוחותינו, תוך שמירה על ערכי המקצועיות, האמינות והיושרה.',
  values: [
    {
      id: 1,
      title: 'מקצועיות',
      description: 'צוות המומחים שלנו מביא ניסיון של עשרות שנים בשוק הנדל"ן',
    },
    {
      id: 2,
      title: 'אמינות',
      description: 'אנו מחויבים לשקיפות מלאה ולעמידה בכל התחייבויותינו',
    },
    {
      id: 3,
      title: 'חדשנות',
      description: 'תמיד בחזית הטכנולוגיה והעיצוב בתחום הנדל"ן',
    },
  ],
}

export default function About() {
  const { content: pageContent, setContent: setPageContent, isLoading } = useMongoContent('about', initialPageContent)

  const handleValueUpdate = (valueId: number, field: string, content: string) => {
    const updatedContent = {
      ...pageContent,
      values: pageContent.values.map(value =>
        value.id === valueId ? { ...value, [field]: content } : value
      ),
    }
    setPageContent(updatedContent)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <main>
      <Navigation />
      
      <div className="bg-white">
        {/* Hero section */}
        <div className="relative">
          <EditableImage
            src={pageContent.mainImage}
            alt="Office building"
            className="h-96 w-full object-cover"
            onSave={(value) => setPageContent({ ...pageContent, mainImage: value })}
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <EditableContent
                content={pageContent.title}
                className="text-4xl font-bold tracking-tight sm:text-5xl"
                onSave={(value) => setPageContent({ ...pageContent, title: value })}
              />
              <EditableContent
                content={pageContent.subtitle}
                className="mt-4 text-xl"
                onSave={(value) => setPageContent({ ...pageContent, subtitle: value })}
              />
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="bg-gray-50 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl bg-white p-8 rounded-xl shadow-sm">
            <EditableContent
              content={pageContent.history}
              type="paragraph"
              className="text-lg leading-8 text-gray-700"
              onSave={(value) => setPageContent({ ...pageContent, history: value })}
            />
            
            <EditableContent
              content={pageContent.mission}
              type="paragraph"
              className="mt-8 text-lg leading-8 text-gray-700"
              onSave={(value) => setPageContent({ ...pageContent, mission: value })}
            />

            {/* Values section */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">הערכים שלנו</h3>
              <div className="grid gap-8">
                {pageContent.values.map((value) => (
                  <div key={value.id} className="border rounded-lg p-6 bg-gray-50">
                    <EditableContent
                      content={value.title}
                      className="text-xl font-semibold text-gray-900"
                      onSave={(content) => handleValueUpdate(value.id, 'title', content)}
                    />
                    <EditableContent
                      content={value.description}
                      type="paragraph"
                      className="mt-2 text-gray-600"
                      onSave={(content) => handleValueUpdate(value.id, 'description', content)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 