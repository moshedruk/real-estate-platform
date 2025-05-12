'use client'

import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { Bars3Icon, XMarkIcon, PencilIcon } from '@heroicons/react/24/outline'
import { useEditMode } from '../contexts/EditModeContext'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Properties', href: '/properties' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isEditMode, toggleEditMode } = useEditMode()

  return (
    <header className="bg-white">
      <nav className="container mx-auto flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold text-primary">Levi Tzvi - Druk</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
          <button
            onClick={toggleEditMode}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              isEditMode 
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <PencilIcon className="h-4 w-4" />
            <span className="opacity-0 transition-opacity animate-fade-in">{isEditMode ? 'מצב עריכה פעיל' : 'הפעל עריכה'}</span>
          </button>
          <Link href="/contact" className="btn-primary">
            Contact Us
          </Link>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <div className={`lg:hidden ${mobileMenuOpen ? 'fixed inset-0 z-50' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="text-2xl font-bold text-primary">Levi Tzvi - Druk</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={toggleEditMode}
                  className={`-mx-3 w-full text-right rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                    isEditMode 
                      ? 'bg-primary text-white'
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {isEditMode ? 'מצב עריכה פעיל' : 'הפעל עריכה'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 