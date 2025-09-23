'use client'
import React from 'react'

import { EvaluationProvider } from '@/contexts/EvaluationContext'
import EvaluationMatrix from './index'

const EvaluationMatrixWrapper: React.FC = () => {
  return (
    <EvaluationProvider>
      <EvaluationMatrix />
    </EvaluationProvider>
  )
}

export default EvaluationMatrixWrapper
