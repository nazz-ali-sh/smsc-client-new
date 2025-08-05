'use client'

import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, Stepper, Step, StepLabel, Typography, Grid } from '@mui/material'

import StepperWrapper from '@core/styles/stepper'
import StepperCustomDot from '@components/stepper-dot'

import type { RootState } from '@/redux-store'
import { setCurrentStep, updateAccountInfo, updateBusinessInfo } from '@/redux-store/slices/pmaRegistrationSlice'

import AccountInfoStep from './components/AccountInfoStep'
import BusinessInfoStep from './components/BusinessInfoStep'
import VerificationStep from './components/VerificationStep'

const steps = [{ title: 'Account Info' }, { title: 'Business Info' }, { title: 'Verification' }]

const PmaRegistrationForm: React.FC = () => {
  const dispatch = useDispatch()
  const { currentStep, accountInfo, businessInfo } = useSelector((state: RootState) => state.pmaRegistration)

  const handleBack = () => {
    if (currentStep > 0) {
      dispatch(setCurrentStep(currentStep - 1))
    }
  }

  const handleNext = (data: any) => {
    switch (currentStep) {
      case 0:
        dispatch(updateAccountInfo(data))
        break
      case 1:
        dispatch(updateBusinessInfo(data))
        break
      default:
        break
    }

    dispatch(setCurrentStep(currentStep + 1))
  }

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <AccountInfoStep defaultValues={accountInfo} onNext={handleNext} />
      case 1:
        return <BusinessInfoStep defaultValues={businessInfo} onNext={handleNext} onBack={handleBack} />
      case 2:
        return <VerificationStep />
      default:
        return (
          <Grid container spacing={5} className='flex flex-col items-center'>
            <Grid item xs={12}>
              <Typography variant='body1' color='text.secondary' className='text-center mt-2 max-w-[500px]'>
                You will start receiving tender invitations based on your region and profile settings.
              </Typography>
            </Grid>
          </Grid>
        )
    }
  }

  return (
    <StepperWrapper>
      <Stepper activeStep={currentStep} alternativeLabel>
        {steps.map(step => (
          <Step key={step.title}>
            <StepLabel StepIconComponent={StepperCustomDot}>
              <div className='step-label'>
                <Typography className='step-title'>{step.title}</Typography>
              </div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Card className='mt-4'>
        <CardContent>{renderStepContent(currentStep)}</CardContent>
      </Card>
    </StepperWrapper>
  )
}

export default PmaRegistrationForm
