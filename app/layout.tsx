import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Levi Tzvi - Druk Real Estate',
  description: 'Find your perfect home in Jerusalem and surrounding areas with Levi Tzvi - Druk Real Estate',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white flex flex-col">
        <div className="flex-grow">
          {children}
        </div>
        <footer className="bg-gray-50 py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600">© {new Date().getFullYear()} Levi Tzvi - Druk Real Estate. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
} 