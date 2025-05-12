'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface EditModeContextType {
  isEditMode: boolean
  toggleEditMode: () => void
}

const EditModeContext = createContext<EditModeContextType>({
  isEditMode: false,
  toggleEditMode: () => {},
})

export function EditModeProvider({ children }: { children: React.ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const savedEditMode = localStorage.getItem('isEditMode')
    if (savedEditMode) {
      setIsEditMode(JSON.parse(savedEditMode))
    }
  }, [])

  const toggleEditMode = () => {
    const newMode = !isEditMode
    setIsEditMode(newMode)
    if (typeof window !== 'undefined') {
      localStorage.setItem('isEditMode', JSON.stringify(newMode))
    }
  }

  if (!isClient) {
    return null
  }

  return (
    <EditModeContext.Provider value={{ isEditMode, toggleEditMode }}>
      {children}
    </EditModeContext.Provider>
  )
}

export function useEditMode() {
  return useContext(EditModeContext)
} 