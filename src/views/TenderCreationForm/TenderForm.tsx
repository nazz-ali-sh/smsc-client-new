'use client'

// React Imports
import { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { Card, Grid, CardContent, Stepper, Step, StepLabel, Typography, TextField, Button, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import * as v from 'valibot'
import { useMutation, useQuery } from '@tanstack/react-query'

import {
  setSummary,
  setDragList,
  setQuestions,
  selectFormStateDragList,
  selectFormStateQuestions,
  setTenderIds
} from '../../redux-store/slices/tenderFormSlice'
import { selectFormStateSummary } from './components/OnboardingData'

// Component Imports
import StepperWrapper from '@core/styles/stepper'
import StepperCustomDot from '@components/stepper-dot'
import SortableList from './components/SortableList'

// Third-party Imports
import {
  gettingOnboardingDetails,
  gettingQuestion,
  OnboardingData,
  tenderActivaction
} from '@/services/tender-activacition-apis/tender-activacition'

// Types
import { steps } from './data'
import type { ActivactionQuestion, DragAndDrop, SocialFormData, TenderActivationPayload, TenderPriority } from './types'
import type { RootState } from '@/redux-store'
import SuccessModal from '@/common/SucessModal'

interface Step {
  title: string
}

const socialFormSchema = v.object({
  questions: v.array(
    v.object({
      question: v.pipe(v.string(), v.nonEmpty('Question is required')),
      answer: v.pipe(v.string(), v.nonEmpty('Answer is required'))
    })
  )
})

const TenderForm = () => {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [localPriorities, setLocalPriorities] = useState<TenderPriority[]>([])
  const [ActivactionQuestion, setActivactionQuestion] = useState<ActivactionQuestion[]>([])
  const [formDataToSubmit, setFormDataToSubmit] = useState<TenderActivationPayload | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)

  // Redux Hooks
  const dispatch = useDispatch()
  const summary = useSelector(selectFormStateSummary)
  const dragList = useSelector(selectFormStateDragList)
  const questions = useSelector(selectFormStateQuestions)

  // Form Hooks
  const { handleSubmit: handleAccountSubmit, setValue: setAccountValue } = useForm<{ summary: any }>({
    defaultValues: {
      summary: null
    }
  })

  const { handleSubmit: handleDragSubmit, reset: dragReset } = useForm<{ dragList: DragAndDrop[] }>({
    defaultValues: {
      dragList
    }
  })

  const {
    control: socialControl,
    handleSubmit: handleSocialSubmit,
    reset: socialReset,
    formState: { errors }
  } = useForm<SocialFormData>({
    defaultValues: {
      questions
    },
    mode: 'onChange',
    resolver: valibotResolver(socialFormSchema)
  })

  const funnel_id = useSelector((state: RootState) => state.form.steps.tenderDetails.funnel_Id)

  useEffect(() => {
    setAccountValue('summary', summary)
    dragReset({ dragList })
    socialReset({ questions })
  }, [summary, dragList, questions, setAccountValue, dragReset, socialReset])

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const {
    data: tenderCreationpriorities,
    isLoading,
    error
  } = useQuery({
    queryKey: ['onboardingDetails'],
    queryFn: gettingOnboardingDetails
  })

  const {
    data: activacitionQuestionData,
    isPending,
    isError
  } = useQuery({
    queryKey: ['activationQuestion'],
    queryFn: gettingQuestion
  })

  interface onBording {
    data: any
    id: string
  }

  const { data: tenderOnboardingData } = useQuery<onBording, Error>({
    queryKey: ['tenderOnboarding', funnel_id],
    queryFn: () => OnboardingData(Number(funnel_id)),
    enabled: !!funnel_id
  })

  // Sync local state with fetched data
  useEffect(() => {
    if (tenderCreationpriorities || activacitionQuestionData) {
      setLocalPriorities(tenderCreationpriorities || [])
      setActivactionQuestion(activacitionQuestionData || [])
    }
  }, [tenderCreationpriorities, activacitionQuestionData])

  const { mutate } = useMutation<unknown, Error, TenderActivationPayload>({
    mutationFn: async (payload: TenderActivationPayload) => {
      return await tenderActivaction(payload)
    },
    onSuccess: (responseData: any) => {
      setIsSubmitting(false)
      setSuccessOpen(false)
      const tender_id = responseData?.data?.id || responseData?.id

      if (tender_id) {
        console.log('Dispatching setTenderId with:', tender_id)
        dispatch(setTenderIds(tender_id))
      } else {
        console.error('No tender ID found in response')
      }

      router.push('/dashboard')
    },
    onError: (error: any) => {
      setSuccessOpen(false)
      setIsSubmitting(false)

      const errorMessage = error?.response?.data?.message || 'Something went wrong'

      console.error('Failed to Activate Tender:', errorMessage)
      toast.error(errorMessage)
    }
  })

  const user_id = useSelector((state: RootState) => state.form.steps.tenderDetails.user_id)

  const onSubmit = (data: { summary: any } | { dragList: DragAndDrop[] } | SocialFormData, event?: any) => {
    event?.preventDefault()

    if (activeStep === 2 && 'questions' in data) {
      if (!errors.questions) {
        dispatch(setQuestions(data.questions))

        const payload: TenderActivationPayload = {
          user_id: user_id,
          funnel_id: funnel_id,
          status: 'inactive',
          stage: 'date_registered',
          approved_by: 2,
          priority: localPriorities,
          question: ActivactionQuestion
        }

        setFormDataToSubmit(payload)
        setSuccessOpen(true)
      } else {
        toast.error('Please fill in all required fields')

        return
      }
    } else {
      // Handle other steps normally
      if (activeStep === 0 && 'summary' in data) {
        dispatch(setSummary(data.summary))
        setActiveStep(prev => prev + 1)
      }

      if (activeStep === 1 && 'dragList' in data) {
        dispatch(setDragList(data.dragList as any))

        setActiveStep(prev => prev + 1)
      }
    }
  }

  const handleModalConfirm = () => {
    if (!formDataToSubmit) {
      toast.error('No data to submit')

      return
    }

    setIsSubmitting(true)
    mutate(formDataToSubmit)
  }

  const renderField = (label: string, value: any) =>
    value !== null &&
    value !== 'N/A' &&
    value !== '' && (
      <Grid item xs={12} sm={6}>
        <Box className='flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0'>
          <Typography variant='body2' className='text-gray-600 font-medium flex-shrink-0'>
            {label}:
          </Typography>
          <Typography variant='body2' className='text-gray-900 font-semibold text-right ml-16'>
            {value}
          </Typography>
        </Box>
      </Grid>
    )

  const renderSection = (title: string, children: React.ReactNode) => (
    <Card elevation={0} variant='outlined' className='mb-6 border border-gray-200 rounded-lg'>
      <CardContent className='p-6'>
        <Box className='mb-4'>
          <Typography variant='h6' className='font-semibold text-gray-800'>
            {title}
          </Typography>
        </Box>
        <Grid container spacing={2} columnSpacing={{ xs: 10, sm: 10, md: 60 }}>
          {children}
        </Grid>
      </CardContent>
    </Card>
  )

  const renderStepContent = (activeStep: number) => {
    switch (activeStep) {
      case 0:
        return (
          <form onSubmit={handleAccountSubmit((data, event) => onSubmit(data, event))}>
            <Grid container spacing={5} sx={{ px: { xs: 2, sm: 4, md: 6 }, pt: { xs: 2, sm: 4, md: 6 }, pb: 0 }}>
              <Grid item xs={12}>
                <Box className='max-h-[600px] overflow-y-auto'>
                  {tenderOnboardingData ? (
                    <>
                      {renderSection(
                        'About You',
                        <>
                          {renderField('Role', tenderOnboardingData?.data?.step_1?.role)}
                          {renderField('Company Number', tenderOnboardingData?.data?.step_1?.company_number)}
                          {renderField('RTM Setup', tenderOnboardingData?.data?.step_1?.is_rtm_setup ? 'Yes' : 'No')}
                          {renderField('Leasehold Type', tenderOnboardingData?.data?.step_1?.leasehold_type)}
                          {renderField(
                            'Leasehold Type Other Details',
                            tenderOnboardingData?.data?.step_1?.leasehold_type_other_details
                          )}
                          {renderField('Block Condition', tenderOnboardingData?.data?.step_1?.block_condition)}
                          {renderField(
                            'Block Condition Image',
                            tenderOnboardingData?.data?.step_1?.block_condition_image || 'N/A'
                          )}
                          {renderField('Outdoor Space', tenderOnboardingData?.data?.step_1?.outdoor_space)}
                          {renderField(
                            'Outdoor Space Image',
                            tenderOnboardingData?.data?.step_1?.outdoor_space_image || 'N/A'
                          )}
                        </>
                      )}

                      {renderSection(
                        'Location',
                        <>
                          {renderField('Postcode', tenderOnboardingData?.data?.step_2?.postcode)}
                          {renderField('City', tenderOnboardingData?.data?.step_2?.city)}
                          {renderField('State', tenderOnboardingData?.data?.step_2?.state)}
                          {renderField('Address', tenderOnboardingData?.data?.step_2?.address)}
                        </>
                      )}
                      {renderSection(
                        'Block Details',
                        <>
                          {renderField('Number of Blocks', tenderOnboardingData?.data?.step_3?.number_of_blocks)}
                          {renderField('Total Units', tenderOnboardingData?.data?.step_3?.total_units)}
                          {renderField('Year Built', tenderOnboardingData?.data?.step_3?.year_built)}
                          {renderField(
                            'Service Charge Budget Type',
                            tenderOnboardingData?.data?.step_3?.current_service_charge_budget_type
                          )}
                          {renderField(
                            'Service Charge Budget Amount',
                            tenderOnboardingData?.data?.step_3?.current_service_charge_budget_amount
                          )}
                          {renderField(
                            'Management Fee Type',
                            tenderOnboardingData?.data?.step_3?.current_management_fee_type
                          )}
                          {renderField(
                            'Management Fee Amount',
                            tenderOnboardingData?.data?.step_3?.current_management_fee_amount
                          )}
                          {renderField(
                            'Quote Generated',
                            tenderOnboardingData?.data?.step_3?.quote_generated ? 'Yes' : 'No'
                          )}
                          {renderField('Quote Generated At', tenderOnboardingData?.data?.step_3?.quote_generated_at)}
                        </>
                      )}
                      {renderSection(
                        'User Details',
                        <>
                          {renderField('Name', tenderOnboardingData?.data?.step_4_user_data?.name)}
                          {renderField('Email', tenderOnboardingData?.data?.step_4_user_data?.email)}
                          {renderField('Mobile', tenderOnboardingData?.data?.step_4_user_data?.mobile)}
                          {renderField('Block Name', tenderOnboardingData?.data?.step_4_user_data?.block_name)}
                          {renderField(
                            'Current Managing Agent',
                            tenderOnboardingData?.data?.step_4_user_data?.current_managing_agent
                          )}
                          {renderField(
                            'SMS Consent',
                            tenderOnboardingData?.data?.step_4_user_data?.smsc_consent ? 'Yes' : 'No'
                          )}
                          {renderField(
                            'Verification Method',
                            tenderOnboardingData?.data?.step_4_user_data?.verification_method || 'N/A'
                          )}
                          {renderField(
                            'Is Verified',
                            tenderOnboardingData?.data?.step_4_user_data?.is_verified ? 'Yes' : 'No'
                          )}
                          {renderField('User Status', tenderOnboardingData?.data?.step_4_user_data?.user_status)}
                          {renderField('User Address', tenderOnboardingData?.data?.step_4_user_data?.user_address)}
                          {renderField('User Postcode', tenderOnboardingData?.data?.step_4_user_data?.user_postcode)}
                          {renderField(
                            'Google Maps Validated',
                            tenderOnboardingData?.data?.step_4_user_data?.google_maps_validated ? 'Yes' : 'No'
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <Box className='text-center py-8'>
                      <Typography variant='h6' color='text.secondary'>
                        No summary provided yet.
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} className='flex flex-col sm:flex-row justify-between gap-4 mt-8'>
                <Button
                  variant='outlined'
                  disabled={activeStep <= 0}
                  onClick={handleBack}
                  color='secondary'
                  className='w-full sm:w-auto'
                >
                  Back
                </Button>
                <Box className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'>
                  <Button
                    sx={{
                      backgroundColor: 'customColors.ligthBlue',
                      '&:hover': { backgroundColor: 'customColors.ligthBlue' }
                    }}
                    href='pre-funnel-onboarding'
                    variant='contained'
                    className='w-full sm:w-auto'
                  >
                    Edit the Form
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: 'customColors.ligthBlue',
                      '&:hover': { backgroundColor: 'customColors.ligthBlue' }
                    }}
                    variant='contained'
                    type='submit'
                    className='w-full sm:w-auto'
                  >
                    Next
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        )

      case 1:
        return (
          <form onSubmit={handleDragSubmit((data, event) => onSubmit(data, event))}>
            <Grid container spacing={5} sx={{ px: { xs: 2, sm: 4, md: 6 }, pt: { xs: 2, sm: 4, md: 6 }, pb: 0 }}>
              <Grid item xs={12} sm={12}>
                <SortableList sortListData={tenderCreationpriorities} isLoading={isLoading} />
              </Grid>
              <Grid item xs={12} className='flex flex-col sm:flex-row justify-between gap-4'>
                <Button
                  sx={{
                    backgroundColor: 'customColors.ligthBlue',
                    '&:hover': { backgroundColor: 'customColors.ligthBlue' }
                  }}
                  variant='outlined'
                  disabled={false}
                  onClick={handleBack}
                  color='secondary'
                  className='w-full sm:w-auto'
                >
                  Back
                </Button>
                <Button
                  sx={{
                    backgroundColor: 'customColors.ligthBlue',
                    '&:hover': { backgroundColor: 'customColors.ligthBlue' }
                  }}
                  variant='contained'
                  type='submit'
                  className='w-full sm:w-auto'
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )

      case 2:
        return (
          <form onSubmit={handleSocialSubmit((data, event) => onSubmit(data, event))}>
            <Grid container spacing={5} sx={{ px: { xs: 2, sm: 4, md: 6 }, pt: { xs: 2, sm: 4, md: 6 }, pb: 0 }}>
              {isPending && <Typography>Loading questions...</Typography>}
              {isError && <Typography color='error'>Error: {error?.message}</Typography>}
              {activacitionQuestionData && activacitionQuestionData.length > 0
                ? activacitionQuestionData.map(
                    (item: { id: string; question: string; answer?: string }, index: number) => (
                      <Grid item xs={12} key={item.id}>
                        <Card elevation={0} className='border border-gray-200 rounded-lg'>
                          <CardContent className='p-6'>
                            <Typography variant='h6' gutterBottom className='font-semibold text-gray-800 mb-4'>
                              {item.question}
                            </Typography>
                            <Controller
                              name={`questions.${index}.answer`}
                              control={socialControl}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  value={item?.answer}
                                  label={`Answer ${index + 1}`}
                                  placeholder='Enter your answer'
                                  multiline
                                  rows={3}
                                  error={!!errors.questions?.[index]?.answer}
                                  helperText={errors.questions?.[index]?.answer?.message || ''}
                                  className='mb-2'
                                />
                              )}
                            />
                            <input type='hidden' name={`questions.${index}.question`} value={item.question} />
                          </CardContent>
                        </Card>
                      </Grid>
                    )
                  )
                : !isPending && <Typography>No questions available.</Typography>}

              <Grid item xs={12} className='flex flex-col sm:flex-row justify-between gap-4'>
                <Button
                  variant='outlined'
                  disabled={false}
                  onClick={handleBack}
                  className='w-full sm:w-auto'
                  sx={{
                    backgroundColor: 'customColors.ligthBlue',
                    '&:hover': { backgroundColor: 'customColors.ligthBlue' }
                  }}
                >
                  Back
                </Button>
                <Button
                  sx={{
                    backgroundColor: 'customColors.ligthBlue',
                    '&:hover': { backgroundColor: 'customColors.ligthBlue' }
                  }}
                  variant='contained'
                  type='submit'
                  disabled={!!errors.questions}
                  className='w-full sm:w-auto'
                >
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </Grid>
            </Grid>

            <SuccessModal
              open={successOpen}
              onClose={() => {
                if (!isSubmitting) setSuccessOpen(false)
              }}
              message='Are you sure you want to submit your tender activation?'
              title='Confirm Submission'
              buttonText={isSubmitting ? 'Submitting...' : 'OK'}
              cancelButton={''}
            />
          </form>
        )
      default:
        return <Typography>Unknown step</Typography>
    }
  }

  return (
    <StepperWrapper>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label: Step) => (
          <Step key={label.title}>
            <StepLabel StepIconComponent={StepperCustomDot}>
              <div className='step-label'>
                <Typography className='step-title'>{label.title}</Typography>
              </div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Card className='mt-4'>
        <CardContent>
          {activeStep === steps.length ? (
            <>
              <Typography className='mb-2 py-[40px] text-center' color='text.primary'>
                Thanks! Your tender is now under review. You will be notified when it goes live and when the results are
                in. Tenders typically run for 5 days. Quotes will start arriving soon
              </Typography>
              <div className='flex justify-end mt-4'></div>
            </>
          ) : (
            renderStepContent(activeStep)
          )}
        </CardContent>
      </Card>

      <SuccessModal
        open={successOpen}
        onClose={() => {
          if (!isSubmitting) setSuccessOpen(false)
        }}
        onConfirm={handleModalConfirm}
        message='Thanks! Your tender is now under review. You will be notified when it goes live and when the results are in. Tenders typically run for 5 days. Quotes will start arriving soon."'
        title='Thank You !'
        buttonText='Cancel'
        confirmButtonText={isSubmitting ? 'Submitting...' : 'OK'}
        loading={isSubmitting}
        cancelButton={''}
      />
    </StepperWrapper>
  )
}

export default TenderForm
