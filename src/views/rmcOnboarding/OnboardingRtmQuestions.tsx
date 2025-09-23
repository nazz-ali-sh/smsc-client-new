'use client'
import React from 'react'

import QuestionCard from '@/views/rmcOnboarding/components/QuestionCard'
import { rtmQuestions } from '@/constants'

const OnboardingRtmQuestions = () => {
  const questionData = rtmQuestions[0]

  return (
    <QuestionCard
      question={questionData?.question}
      questionKey={questionData?.questionKey}
      nextRoute={questionData?.nextRoute}
      backRoute={questionData?.backRoute}
      questionNumber={questionData?.id}
    />
  )
}

export default OnboardingRtmQuestions
