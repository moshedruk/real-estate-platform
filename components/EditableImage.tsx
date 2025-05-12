'use client'

import React, { useState, useRef } from 'react'
import { PencilIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { useEditMode } from '../contexts/EditModeContext'

interface EditableImageProps {
  src: string
  alt: string
  className?: string
  onSave: (newSrc: string) => void
}

export default function EditableImage({ src, alt, className = '', onSave }: EditableImageProps) {
  const [isHovering, setIsHovering] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { isEditMode } = useEditMode()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // בדיקת גודל הקובץ (מקסימום 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('התמונה גדולה מדי. אנא בחר תמונה עד 5MB')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onSave(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  if (!isEditMode) {
    return <img src={src} alt={alt} className={className} />
  }

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img src={src} alt={alt} className={className} />
      
      {/* כפתור העריכה */}
      <div className={`absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
        >
          <PhotoIcon className="h-5 w-5 text-gray-600" />
          <span className="text-gray-700">החלף תמונה</span>
        </button>
      </div>

      {/* שדה קובץ מוסתר */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
    </div>
  )
} 