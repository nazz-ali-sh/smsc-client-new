'use client'
import React from 'react'

import QuestionCard from '@/views/rmcOnboarding/components/QuestionCard'
import { rtmQuestions } from '@/constants'

const OnboardingQuestionThirdScreen = () => {
  const questionData = rtmQuestions[2]

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

export default OnboardingQuestionThirdScreen
