'use client'

import React, { useState, useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { APIProvider } from '@vis.gl/react-google-maps'
import type { default as ReCAPTCHA } from 'react-google-recaptcha'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'

import StepperWrapper from '@core/styles/stepper'
import StepperCustomDot from '@components/stepper-dot'
import { setCurrentStep } from '@/redux-store/slices/multiStepForm'
import type { RootState } from '@/redux-store'
import AboutYouStep from './components/AboutYouStep'
import LocationStep from './components/LocationStep'
import BlockDetailsStep from './components/BlockDetailsStep'
import TenderDetailsStep from './components/TenderDetailsStep'
import { steps } from './data'
import type { LatLng } from './types'

const PreFunnelForm: React.FC = () => {
  const dispatch = useDispatch()
  const { currentStep, steps: formData } = useSelector((state: RootState) => state.form)
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null)
  const [addressDialogOpen, setAddressDialogOpen] = useState<boolean>(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [isVerified, setIsVerified] = useState(false)

  const googleMapsApiKey = process.env.NEXT_PUBLIC_Maps_API_KEY || ''

  async function handleCaptchaSubmission(token: string | null) {
    try {
      if (token) {
        await fetch('/api', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token })
        })
        setIsVerified(true)
      }
    } catch (e) {
      setIsVerified(false)
    }
  }

  useEffect(() => {
    if (currentStep === steps.length) {
      const timer = setTimeout(() => {
        dispatch(setCurrentStep(0))
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [currentStep, dispatch])

  const handleChange = (token: string | null) => {
    handleCaptchaSubmission(token)
  }

  const handleExpired = () => {
    setIsVerified(false)
  }

  const handleBack = () => {
    dispatch(setCurrentStep(currentStep - 1))
  }

  const renderStepContent = (step: number) => {
    if (step === steps.length) {
      return (
        <Grid container spacing={5} className='flex justify-center mt-4'>
          <Grid item xs={12}>
            <Typography variant='h5' align='center'>
              Thank you for completing the form!
            </Typography>
            <Typography variant='body1' align='center' sx={{ mt: 2 }}>
              We will review your submission. You will be redirected shortly.
            </Typography>
          </Grid>
        </Grid>
      )
    }

    switch (step) {
      case 0:
        return (
          <AboutYouStep
            formData={formData}
            currentStep={currentStep}
            setAddressDialogOpen={setAddressDialogOpen}
            addressDialogOpen={addressDialogOpen}
            onBack={handleBack}
          />
        )
      case 1:
        return (
          <APIProvider apiKey={googleMapsApiKey} libraries={['places', 'geometry']}>
            <LocationStep
              formData={formData}
              currentStep={currentStep}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              onBack={handleBack}
            />
          </APIProvider>
        )
      case 2:
        return <BlockDetailsStep formData={formData} currentStep={currentStep} onBack={handleBack} />
      case 3:
        return (
          <TenderDetailsStep
            formData={formData}
            currentStep={currentStep}
            isVerified={isVerified}
            recaptchaRef={recaptchaRef}
            onChange={handleChange}
            onExpired={handleExpired}
            onBack={handleBack}
          />
        )
      default:
        return <Typography color='error'>An unexpected error occurred with the step.</Typography>
    }
  }

  return (
    <StepperWrapper>
      <Stepper activeStep={currentStep} alternativeLabel>
        {steps.map(label => (
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
          {renderStepContent(currentStep)}
          <Grid container spacing={5} className='flex justify-center mt-4'></Grid>
        </CardContent>
      </Card>
    </StepperWrapper>
  )
}

export default PreFunnelForm
