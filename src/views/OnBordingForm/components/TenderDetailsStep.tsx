'use client'

import { useRouter } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { default as ReCAPTCHA } from 'react-google-recaptcha'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import { FormControlLabel, FormLabel, Radio, RadioGroup, FormHelperText } from '@mui/material'

import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

import { updateTenderDetails, submitForm, setCurrentStep } from '@/redux-store/slices/multiStepForm'
import { tenderDetailsSchema } from './PreFunnelSchema'
import FormNavigation from './FormNavigation'
import type { TenderDetailsStepProps } from '../types'
import type { RootState } from '@/redux-store'
import { onBoardingFlow } from '@/services/on-boarding-apis/onboarding-api'

const TenderDetailsStep: React.FC<TenderDetailsStepProps> = ({
  formData,
  currentStep,
  isVerified,
  recaptchaRef,
  onChange,
  onExpired,
  onBack
}) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: valibotResolver(tenderDetailsSchema),
    defaultValues: {
      fullName: formData.tenderDetails.fullName || '',
      email: formData.tenderDetails.email || '',
      mobile: formData.tenderDetails.mobile || '',
      password: formData.tenderDetails.password || '',
      confirmPassword: formData.tenderDetails.confirmPassword || '',
      address: formData.tenderDetails.address || '',
      blockName: formData.tenderDetails.blockName || '',
      currentManagingAgent: formData.tenderDetails.currentManagingAgent || '',
      verificationMethod: formData.tenderDetails.verificationMethod || 'email'
    }
  })

  const session_id = useSelector((state: RootState) => state.form.steps.aboutYou.session_id)

  const { mutate } = useMutation({
    mutationFn: (payload: any) => onBoardingFlow(4, payload),
    onSuccess: data => {
      const funnelId = data?.data.funnel_id

      console.log('Funnel:', funnelId)

      if (data?.data?.session_id && data?.data?.funnel_id && data?.data?.user_id) {
        dispatch(updateTenderDetails({ session_id: data.data.session_id }))
        dispatch(updateTenderDetails({ funnel_Id: data.data.funnel_id }))
        dispatch(updateTenderDetails({ user_id: data.data.user_id }))
      }

      if (data?.status === 'success' && data?.payload) {
        dispatch(updateTenderDetails(data.payload))
      }

      dispatch(submitForm())

      dispatch(setCurrentStep(currentStep + 1))
      router.push('/opt-verification')

      toast.success('Tender step submitted')
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Something went wrong. Please try again.'

      console.error('Step 4 API error', errorMessage)
      toast.error(errorMessage)
    }
  })

  const onSubmit = (data: any) => {
    if (!isVerified) {
      toast.error('Please complete the reCAPTCHA verification')

      return
    }

    const payload = {
      session_id,
      name: data.fullName || 'John Smith',
      email: data.email || 'john.smith@example.com',
      mobile: data.mobile || '07700900123',
      password: data.password || 'SecurePass123!',
      password_confirmation: data.confirmPassword || 'SecurePass123!',
      address: data.address || 'Flat 5, Westminster Heights, 123 Westminster Street, London',
      postcode: 'SW1A 1AA',
      lat: 51.5014,
      lng: -0.1419,
      block_name: data.blockName || 'Westminster Heights',
      current_managing_agent: data.currentManagingAgent || 'ABC Property Management Ltd',
      smsc_consent: true,

      captcha_token: 'mock_captcha_token_12345',
      verification_method: data.verificationMethod || 'email'
    }

    dispatch(updateTenderDetails(data))
    mutate(payload)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography className='font-medium' color='text.primary'>
            Register Your Tender
          </Typography>
          <Typography variant='body2'>Share Tender Details</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name='fullName'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Full Name'
                error={Boolean(errors.fullName)}
                helperText={errors.fullName?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type='email'
                label='Email'
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name='mobile'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type='tel'
                label='Mobile'
                error={Boolean(errors.mobile)}
                helperText={errors.mobile?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type='password'
                label='Password'
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name='confirmPassword'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type='password'
                label='Confirm Password'
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name='address'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Address'
                error={Boolean(errors.address)}
                helperText={errors.address?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name='blockName'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Block Name'
                error={Boolean(errors.blockName)}
                helperText={errors.blockName?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name='currentManagingAgent'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Current Managing Agent'
                error={Boolean(errors.currentManagingAgent)}
                helperText={errors.currentManagingAgent?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/** @ts-expect-error */}
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
            ref={recaptchaRef}
            onChange={onChange}
            onExpired={onExpired}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component='fieldset' error={Boolean(errors.verificationMethod)}>
            <FormLabel>Verification Method</FormLabel>
            <Controller
              name='verificationMethod'
              control={control}
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel value='email' control={<Radio />} label='Email' />
                  <FormControlLabel value='sms' control={<Radio />} label='SMS' />
                </RadioGroup>
              )}
            />
            {errors.verificationMethod && <FormHelperText>{errors.verificationMethod.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} className='flex justify-between'>
          <FormNavigation
            currentStep={currentStep}
            totalSteps={4}
            onBack={onBack}
            isSubmit={true}
            isDisabled={!isVerified}
          />
        </Grid>
      </Grid>
    </form>
  )
}

export default TenderDetailsStep
