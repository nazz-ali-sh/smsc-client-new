'use client'
import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useCallback } from 'react'

interface EvaluationData {
  categoryId: number
  categoryName: string
  description: string
  weighting: number
  [key: string]: any // For PMA columns
}

interface EvaluationState {
  evaluationData: EvaluationData[]
  isSaved: boolean
  hasUnsavedChanges: boolean
  isSaving: boolean
}

interface EvaluationContextType extends EvaluationState {
  setEvaluationData: (data: EvaluationData[]) => void
  updateEvaluationData: (categoryIndex: number, field: string, value: string) => void
  markAsSaved: () => void
  markAsUnsaved: () => void
  setSaving: (saving: boolean) => void
  resetState: () => void
  loadSavedData: (data: EvaluationData[]) => void
  clearUnsavedData: () => void
}

const EvaluationContext = createContext<EvaluationContextType | undefined>(undefined)

interface EvaluationProviderProps {
  children: ReactNode
  initialData?: EvaluationData[]
}

export const EvaluationProvider: React.FC<EvaluationProviderProps> = ({ children, initialData = [] }) => {
  const [evaluationData, setEvaluationData] = useState<EvaluationData[]>(initialData)
  const [isSaved, setIsSaved] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const updateEvaluationData = useCallback((categoryIndex: number, field: string, value: string) => {
    setEvaluationData(prevData => {
      const updatedData = [...prevData]

      updatedData[categoryIndex] = {
        ...updatedData[categoryIndex],
        [field]: value
      }
      
return updatedData
    })
    setHasUnsavedChanges(true)
    setIsSaved(false)
  }, [])

  const markAsSaved = useCallback(() => {
    setIsSaved(true)
    setHasUnsavedChanges(false)
  }, [])

  const markAsUnsaved = useCallback(() => {
    setHasUnsavedChanges(true)
    setIsSaved(false)
  }, [])

  const setSaving = useCallback((saving: boolean) => {
    setIsSaving(saving)
  }, [])

  const resetState = useCallback(() => {
    setEvaluationData([])
    setIsSaved(false)
    setHasUnsavedChanges(false)
    setIsSaving(false)
  }, [])

  const loadSavedData = useCallback((data: EvaluationData[]) => {
    setEvaluationData(data)
    setIsSaved(true)
    setHasUnsavedChanges(false)
  }, [])

  const clearUnsavedData = useCallback(() => {
    // Only clear if there are unsaved changes and data is not saved
    if (hasUnsavedChanges && !isSaved) {
      setEvaluationData([])
      setIsSaved(false)
      setHasUnsavedChanges(false)
    }
  }, [hasUnsavedChanges, isSaved])

  const value: EvaluationContextType = {
    evaluationData,
    isSaved,
    hasUnsavedChanges,
    isSaving,
    setEvaluationData,
    updateEvaluationData,
    markAsSaved,
    markAsUnsaved,
    setSaving,
    resetState,
    loadSavedData,
    clearUnsavedData
  }

  return <EvaluationContext.Provider value={value}>{children}</EvaluationContext.Provider>
}

export const useEvaluation = (): EvaluationContextType => {
  const context = useContext(EvaluationContext)

  if (context === undefined) {
    throw new Error('useEvaluation must be used within an EvaluationProvider')
  }

  
return context
}

// Safe version that returns undefined instead of throwing
export const useEvaluationSafe = (): EvaluationContextType | undefined => {
  const context = useContext(EvaluationContext)

  
return context
}
