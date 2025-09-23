'use client'
import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useQuery, useMutation } from '@tanstack/react-query'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { Typography, TextField } from '@mui/material'

import CustomButton from '@/common/CustomButton'
import CommonModal from '@/common/CommonModal'
import {
  getRmcQuestions,
  submitRmcProcess,
  type RmcProcessPayload
} from '@/services/rmc-onboarding-apis/rmc-onboarding-api'
import type { RootState } from '@/redux-store'
import { setTenderId } from '@/redux-store/slices/rmcOnboardingSlice'
import { useRmcOnboardingData } from '@/hooks/useRmcOnboardingData'

const OnboardingEndedQuestions = () => {
  const [open, setOpen] = useState(false)
  const [responses, setResponses] = useState<Record<string, string>>({})

  const router = useRouter()
  const dispatch = useDispatch()
  const rmcData = useSelector((state: RootState) => state?.rmcOnboarding?.rmcData)

  const { data: onboardingData, invalidateCache } = useRmcOnboardingData()

  const { data: questions } = useQuery({
    queryKey: ['rmc-questions', rmcData?.tender_onboarding_id],
    queryFn: getRmcQuestions,
    enabled: !!rmcData?.tender_onboarding_id,
    retry: 2
  })

  useEffect(() => {
    if (questions && questions?.length > 0) {
      const existingAnswers = onboardingData?.steps?.step_7?.answers || []
      const initialResponses: Record<string, string> = {}

      questions?.forEach(question => {
        const questionId = question?.id?.toString()
        const existingAnswer = existingAnswers?.find((answer: any) => answer?.question_id === question?.id)

        initialResponses[questionId] = existingAnswer?.answer || ''
      })

      setResponses(initialResponses)
    }
  }, [questions, onboardingData])

  const mutation = useMutation({
    mutationFn: submitRmcProcess,
    onSuccess: data => {
      console.log(data, 'data')

      if (data) {
        dispatch(setTenderId(data?.data?.tender_id))
      }

      invalidateCache()
      setOpen(true)
    },
    onError: (error: any) => {
      let errorMessage = 'Failed to submit questions. Please try again.'

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error?.response?.status === 400) {
        errorMessage = 'Please check your responses and try again.'
      } else if (error?.response?.status === 401) {
        errorMessage = 'Unauthorized. Please login again.'
      }

      toast.error(errorMessage)
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setResponses(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLaunch = () => {
    if (!rmcData?.tender_onboarding_id) {
      toast.error('Tender onboarding ID not found. Please try again.')

      return
    }

    if (!questions || questions?.length === 0) {
      toast.error('No questions available. Please try again.')

      return
    }

    const answers = questions?.map(question => ({
      question_id: question?.id,
      answer: responses[question?.id?.toString()] || ''
    }))

    const unansweredQuestions = answers?.filter(answer => !answer?.answer?.trim())

    if (unansweredQuestions?.length > 0) {
      toast.error('Please answer all questions before Launch.')

      return
    }

    const payload: RmcProcessPayload = {
      tender_onboarding_id: rmcData?.tender_onboarding_id,
      step: 7,
      answers
    }

    mutation.mutate(payload)
  }

  const handleBack = () => {
    router.push('/rmc-onboarding-priorities')
  }

  const handleDashbaord = () => {
    setOpen(false)
    router.push('/dashboard')
  }

  const buttonStyles = { fontSize: '14px', fontWeight: 700 }

  return (
    <>
      <div className='flex flex-col items-center pt-10 pb-32'>
        <h1 className='text-[48px] font-bold text-[#262B43E5] '>RMC Onboarding</h1>
        <div className='bg-white p-8 pt-10 w-full max-w-7xl mt-8 '>
          <Typography variant='h6' sx={{ fontSize: '24px', fontWeight: 500, color: '#333' }} className='mb-10'>
            Open- Ended Questions
          </Typography>

          {questions &&
            questions?.map(question => {
              const questionId = question?.id?.toString()
              const currentValue = responses[questionId] || ''

              return (
                <div key={question?.id} className='mb-8'>
                  <p className=' font-medium mb-2 text-[#424242] text-lg'>{question?.question}</p>
                  <TextField
                    name={questionId}
                    placeholder='Response'
                    multiline
                    rows={4}
                    fullWidth
                    value={currentValue}
                    onChange={handleChange}
                    inputProps={{ maxLength: 2000 }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '6px',
                        '&.Mui-focused fieldset': {
                          borderColor: '#35C0ED',
                          border: '1px solid #35C0ED'
                        }
                      },
                      '& .MuiInputBase-input::placeholder': {
                        color: 'customColors.textGray',
                        opacity: 1
                      }
                    }}
                  />
                  <div className='text-right text-gray-400 text-sm mt-1'>{currentValue?.length}/2000 Characters</div>
                </div>
              )
            })}

          <div className='flex justify-between gap-3 mt-10'>
            <CustomButton
              sx={buttonStyles}
              variant='outlined'
              onClick={handleBack}
              startIcon={<i className='ri-arrow-left-line'></i>}
            >
              Back
            </CustomButton>
            <CustomButton
              sx={buttonStyles}
              endIcon={<i className='ri-arrow-right-line'></i>}
              onClick={handleLaunch}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Submitting...' : 'Launch'}
            </CustomButton>
          </div>
        </div>
      </div>
      {open && (
        <CommonModal isOpen={open} handleClose={() => setOpen(false)} header='Thank You !' maxWidth='sm' fullWidth>
          <p className='text-[#696969] text-base font-normal'>
            Thanks! Your tender is now under review. You will be notified when it goes live and when the results are in.
            Tenders typically run for 5 days. Quotes will start arriving soon."
          </p>
          <div className='mt-8 flex justify-end'>
            <CustomButton onClick={handleDashbaord} sx={buttonStyles}>
              Ok
            </CustomButton>
          </div>
        </CommonModal>
      )}
    </>
  )
}

export default OnboardingEndedQuestions
