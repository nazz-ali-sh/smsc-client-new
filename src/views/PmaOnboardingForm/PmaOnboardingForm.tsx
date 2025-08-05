'use client'

import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Card, Grid, CardContent, Stepper, Step, StepLabel, Typography } from '@mui/material'

import StepperWrapper from '@core/styles/stepper'
import StepperCustomDot from '@components/stepper-dot'

import type { RootState } from '@/redux-store'
import { steps } from './data'

import BusinessProfileStep from './components/BusinessProfileStep'
import CommunicationPreferencesStep from './components/CommunicationPreferencesStep'
import ReviewsStep from './components/ReviewsStep'
import ManagementFeeStep from './components/ManagementFeeStep'
import CompanyLogoStep from './components/CompanyLogoStep'
import CompanyBioStep from './components/CompanyBioStep'
import BranchLocationsStep from './components/BranchLocationsStep'
import PmaOnboardingAlert from './components/PmaOnboardingAlert'

import {
  setCurrentStep,
  updateBusinessProfile,
  updateCommunicationPreferences,
  updateReviews,
  updateManagementFee,
  updateCompanyBio,
  updateBranchLocations
} from '@/redux-store/slices/pmaOnboardingFormSlice'

const PmaOnboardingForm: React.FC = () => {
  const dispatch = useDispatch()

  const {
    currentStep,
    businessProfile,
    communicationPreferences,
    reviews,
    managementFee,
    companyLogo,
    companyBio,
    branchLocations
  } = useSelector((state: RootState) => state.pmaOnboardingForm)

  const handleBack = () => {
    if (currentStep > 0) {
      dispatch(setCurrentStep(currentStep - 1))
    }
  }

  const handleNext = (data: any) => {
    switch (currentStep) {
      case 0:
        dispatch(updateBusinessProfile(data))
        break
      case 1:
        dispatch(updateCommunicationPreferences(data))
        break
      case 2:
        dispatch(updateReviews(data))
        break
      case 3:
        dispatch(updateManagementFee(data))
        break
      case 5:
        dispatch(updateCompanyBio(data))
        break
      case 6:
        dispatch(updateBranchLocations(data))
        break
      default:
        break
    }

    dispatch(setCurrentStep(currentStep + 1))
  }

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <BusinessProfileStep defaultValues={businessProfile} onNext={handleNext} />
      case 1:
        return (
          <CommunicationPreferencesStep
            defaultValues={communicationPreferences}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 2:
        return <ReviewsStep defaultValues={reviews} onNext={handleNext} onBack={handleBack} />
      case 3:
        return <ManagementFeeStep defaultValues={managementFee} onNext={handleNext} onBack={handleBack} />
      case 4:
        return <CompanyLogoStep defaultValues={companyLogo} onBack={handleBack} />
      case 5:
        return <CompanyBioStep defaultValues={companyBio} onNext={handleNext} onBack={handleBack} />
      case 6:
        return (
          <BranchLocationsStep defaultValues={branchLocations.branches?.[0]} onNext={handleNext} onBack={handleBack} />
        )
      default:
        return (
          <Grid container spacing={5} className='flex flex-col items-center'>
            <Grid item xs={12}>
              <Typography variant='body1' color='text.secondary' className='text-center mt-2 max-w-[500px]'>
                Your profile is complete and your account is now active. You will start receiving tender invitations
                based on your region and profile settings.
              </Typography>
            </Grid>
          </Grid>
        )
    }
  }

  return (
    <StepperWrapper>
      {currentStep < steps.length && <PmaOnboardingAlert />}
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

export default PmaOnboardingForm
