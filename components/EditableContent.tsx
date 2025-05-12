'use client'

import React, { useState, useRef } from 'react'
import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEditMode } from '../contexts/EditModeContext'

interface EditableContentProps {
  content: string
  type?: 'text' | 'heading' | 'paragraph'
  className?: string
  onSave: (newContent: string) => void
}

export default function EditableContent({ content, type = 'text', className = '', onSave }: EditableContentProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(content)
  const { isEditMode } = useEditMode()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSave = () => {
    onSave(editedContent)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedContent(content)
    setIsEditing(false)
  }

  const handleClick = () => {
    if (!isEditing && isEditMode) {
      setIsEditing(true)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault()
      handleSave()
    }
  }

  if (!isEditMode) {
    return <div className={className}>{content}</div>
  }

  if (!isEditing) {
    return (
      <div className="relative flex items-center gap-2 group">
        <div className={className}>{content}</div>
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors opacity-0 group-hover:opacity-100"
        >
          <PencilIcon className="h-4 w-4" />
          <span>ערוך</span>
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div
        className={`group relative ${className}`}
        onClick={handleClick}
      >
        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className={`w-full min-h-[1.5em] bg-white/90 text-gray-900 p-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
              type === 'paragraph' ? 'h-32' : 'resize-none overflow-hidden'
            }`}
            style={{ direction: 'rtl' }}
          />
        ) : (
          <div className={isEditMode ? "cursor-pointer hover:bg-white/10 rounded p-1" : "p-1"} style={{ direction: 'rtl' }}>
            {content}
          </div>
        )}
      </div>
      {isEditing && (
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-1 px-3 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            <CheckIcon className="h-4 w-4" />
            שמור
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center gap-1 px-3 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            <XMarkIcon className="h-4 w-4" />
            בטל
          </button>
        </div>
      )}
    </div>
  )
} 