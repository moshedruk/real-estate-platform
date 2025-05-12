const dbConnect = require('../lib/mongodb').default
const Content = require('../models/Content').default

const initialData = {
  home: {
    heroImage: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    heroImageAlt: "ירושלים של זהב",
    heroTitle: "נכסי יוקרה בירושלים",
    heroSubtitle: "מצאו את הבית המושלם שלכם בירושלים עם הליווי המקצועי והמנוסה שלנו",
    trustTitle: "אתם בידיים טובות",
    trustSubtitle: "מובילים בשוק הנדל״ן כבר למעלה מ-15 שנה",
    trustDescription: "אנחנו מבינים שהשוק הישראלי יכול להיות מורכב, ולכן אנחנו כאן כדי להעניק לכם שקט נפשי בכל שלב בדרך. עם ניסיון עשיר והבנה עמוקה בתחום, אתם יכולים להיות בטוחים שאתם בידיים טובות.",
    stats: [
      { title: "שנות ניסיון", value: "15+" },
      { title: "נכסים שנמכרו", value: "500+" },
      { title: "נכסים זמינים", value: "50+" }
    ]
  },
  about: {
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
    ]
  },
  projects: {
    pageContent: {
      title: 'הפרויקטים שלנו',
      subtitle: 'גלו את הפרויקטים החדשים והמרגשים שלנו בירושלים',
    },
    projects: [
      {
        id: 1,
        title: 'מגדלי היוקרה ברחביה',
        description: 'פרויקט יוקרה חדש במיקום מרכזי ברחביה, הכולל 20 דירות פאר עם מפרט עשיר, נוף מרהיב לעיר העתיקה, חניה תת-קרקעית, לובי מפואר ושירותי שוער 24/7.',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        status: 'בבנייה',
        completion: '2025',
      },
      {
        id: 2,
        title: 'גני תלפיות',
        description: 'קומפלקס מגורים חדש בתלפיות, מתחם סגור עם גינות מטופחות, בריכת שחייה, חדר כושר, מועדון דיירים וחניה תת-קרקעית. הפרויקט כולל דירות 3-5 חדרים ופנטהאוזים.',
        image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        status: 'בתכנון',
        completion: '2026',
      },
      {
        id: 3,
        title: 'מתחם בית הכרם',
        description: 'פרויקט התחדשות עירונית בשכונת בית הכרם הירושלמית. הפרויקט כולל הריסה ובנייה מחדש של 3 בניינים, עם תוספת קומות ודירות חדשות.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        status: 'בתכנון מתקדם',
        completion: '2026',
      },
    ]
  },
  properties: {
    pageContent: {
      title: 'נכסים זמינים',
      subtitle: 'גלו את מבחר הנכסים היוקרתיים שלנו בשכונות המבוקשות ביותר בירושלים',
    },
    properties: [
      {
        id: 1,
        title: 'דירת יוקרה ברחוב ראול ולנברג',
        location: 'ראול ולנברג 3, ירושלים',
        price: '3,700,000 ₪',
        bedrooms: 4,
        bathrooms: 2,
        area: '120',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      },
      {
        id: 2,
        title: 'פנטהאוז ברחוב הנביאים',
        location: 'הנביאים 22, ירושלים',
        price: '12,500,000 ₪',
        bedrooms: 5,
        bathrooms: 3,
        area: '280',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      },
      {
        id: 3,
        title: 'דירת גן בבקעה',
        location: 'דרך בית לחם, ירושלים',
        price: '4,200,000 ₪',
        bedrooms: 3,
        bathrooms: 2,
        area: '110',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      },
      {
        id: 4,
        title: 'דופלקס במרכז העיר',
        location: 'המלך ג׳ורג׳ 35, ירושלים',
        price: '5,900,000 ₪',
        bedrooms: 4,
        bathrooms: 2,
        area: '160',
        image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      },
    ]
  }
}

async function initDb() {
  try {
    await dbConnect()
    console.log('Connected to MongoDB')

    // Insert or update each content document
    for (const [pageId, content] of Object.entries(initialData)) {
      await Content.findOneAndUpdate(
        { pageId },
        { content },
        { upsert: true, new: true }
      )
      console.log(`Initialized content for: ${pageId}`)
    }

    console.log('Database initialization completed successfully')
    process.exit(0)
  } catch (error) {
    console.error('Error initializing database:', error)
    process.exit(1)
  }
}

initDb() 