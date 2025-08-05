import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import { FormControlLabel, FormLabel, Radio, RadioGroup, FormHelperText } from '@mui/material'
import { toast } from 'react-toastify'
import { useMutation, useQuery } from '@tanstack/react-query'

import AddEditAddress from './PreFunnelModal'
import { updateAboutYou, setCurrentStep } from '@/redux-store/slices/multiStepForm'
import FormNavigation from './FormNavigation'
import { aboutYouSchema } from './PreFunnelSchema'
import { getRtmRoles, onBoardingFlow } from '../../../services/on-boarding-apis/onboarding-api'

import type { RtmRole } from '../types'

const AboutYouStep: React.FC<any> = ({
  formData,
  currentStep,

  onBack
}) => {
  const dispatch = useDispatch()

  const [isModal, setIsModal] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: valibotResolver(aboutYouSchema),
    defaultValues: {
      role: formData.aboutYou.role || '',
      rmcNumber: formData.aboutYou.rmcNumber || '',
      leaseholdType: formData.aboutYou.leaseholdType || '',
      blockCondition: formData.aboutYou.blockCondition || '',
      outdoorSpace: formData.aboutYou.outdoorSpace || '',
      nonLeaseholder: formData.aboutYou.nonLeaseholder || ''
    }
  })

  const nonLeaseholderValue = watch('nonLeaseholder')
  const roleValue = watch('role')

  const [getRtmRole, setGetRtmRole] = useState<any>([])

  useEffect(() => {
    setIsModal(nonLeaseholderValue === 'setup Rtm')
  }, [nonLeaseholderValue])

  const {
    data: rolesData,
    error: rolesError,
    isLoading: rolesLoading
  } = useQuery<RtmRole[]>({
    queryKey: ['rtmRoles'],
    queryFn: getRtmRoles
  })

  console.log('Rtm Data = ', rolesData)

  useEffect(() => {
    if (rolesData) {
      setGetRtmRole(rolesData)
    }
  }, [rolesData])

  const onSubmit = (data: any) => {
    const apiData = {
      role: data.role?.toLowerCase() || '',
      company_number: data.rmcNumber || '',
      is_rtm_setup: data.nonLeaseholder !== 'I want to set up an RTM',
      leasehold_type: data.leaseholdType?.replace(/\s+/g, '_').toLowerCase(),
      block_condition: data.blockCondition?.toLowerCase(),
      outdoor_space: data.outdoorSpace?.toLowerCase(),
      rtm_role: data.rtmRole
    }

    const apiPayload = apiData

    if (data.role === 'Leaseholder' && !data.nonLeaseholder) {
      toast.error('Please select an option for Leaseholder status')

      return
    }

    if (data.nonLeaseholder === 'We already have an RTM' && !data.rtmRole) {
      toast.error('Please select an RTM role for existing RTM')

      return
    }

    submitAboutYou({ step: 1, payload: apiPayload })
  }

  const { mutate: submitAboutYou } = useMutation({
    mutationFn: ({ step, payload }: { step: number; payload: Record<string, any> }) => {
      console.log('Mutation triggered with:', { step, payload })

      return onBoardingFlow(step, payload)
    },
    onSuccess: (data: any) => {
      try {
        console.log('Full API Response:', JSON.stringify(data, null, 2))

        console.log('API Response checking:', data)

        const locationSessionID = data?.data?.session_id || data?.session_id

        if (locationSessionID) {
          dispatch(updateAboutYou({ session_id: locationSessionID }))
          console.log('Dispatched updateAboutYou with:', { session_id: locationSessionID })
          toast.success('About You data saved and submitted')
        } else {
          console.warn('No session_id found in API response:', data)
          toast.error('Failed to save session ID')
        }
      } catch (error) {
        console.error('Error in onSuccess:', error)
        toast.error('An error occurred while processing the response')
      }

      dispatch(setCurrentStep(currentStep + 1))
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to About Step'

      console.error('About API error:', errorMessage)
      toast.error(errorMessage)
    }
  })

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography className='font-medium' color='text.primary'>
              About You
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={Boolean(errors.role)}>
              <InputLabel>Role</InputLabel>
              <Controller
                name='role'
                control={control}
                render={({ field }) => (
                  <Select label='Role' {...field}>
                    <MenuItem value='rmc_director'>I m a Director Of A Residential Management Company</MenuItem>
                    <MenuItem value='Leaseholder'>Leaseholder</MenuItem>
                  </Select>
                )}
              />
              {errors.role && <FormHelperText>{errors.role.message}</FormHelperText>}
            </FormControl>
          </Grid>

          {roleValue === 'rmc_director' && (
            <Grid item xs={12} sm={6}>
              <Controller
                name='rmcNumber'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Company Number'
                    error={Boolean(errors.rmcNumber)}
                    helperText={errors.rmcNumber?.message}
                  />
                )}
              />
            </Grid>
          )}

          {roleValue === 'Leaseholder' && (
            <Grid item xs={12} sm={6}>
              <FormControl component='fieldset' error={Boolean(errors.nonLeaseholder)}>
                <FormLabel>I m a Leaseholder Not a Director</FormLabel>
                <Controller
                  name='nonLeaseholder'
                  control={control}
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel value='setup Rtm' control={<Radio />} label='I want to set up an RTM' />
                      <FormControlLabel
                        value='We already have an RTM'
                        control={<Radio />}
                        label='We already have an RTM'
                      />
                    </RadioGroup>
                  )}
                />
                {errors.nonLeaseholder && <FormHelperText>{errors.nonLeaseholder.message}</FormHelperText>}
              </FormControl>
            </Grid>
          )}

          {nonLeaseholderValue === 'We already have an RTM' && roleValue === 'Leaseholder' && (
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={Boolean(errors.rtmRole)}>
                <InputLabel>RTM Role</InputLabel>
                <Controller
                  name='rtmRole'
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label='RTM Role'
                      value={field.value || ''}
                      onChange={e => field.onChange(e.target.value)}
                    >
                      {rolesLoading && <MenuItem disabled>Loading...</MenuItem>}
                      {rolesError && <MenuItem disabled>Error loading roles</MenuItem>}
                      {getRtmRole?.data?.length > 0 ? (
                        getRtmRole?.data?.map((role: any) => {
                          return (
                            <MenuItem key={role?.id} value={role?.id}>
                              {role?.name}
                            </MenuItem>
                          )
                        })
                      ) : (
                        <MenuItem disabled>No roles available</MenuItem>
                      )}
                    </Select>
                  )}
                />
                {errors.rtmRole && <FormHelperText>{errors.rtmRole.message}</FormHelperText>}
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12} sm={6}>
            <FormControl component='fieldset' error={Boolean(errors.leaseholdType)}>
              <FormLabel>Leasehold Type</FormLabel>
              <Controller
                name='leaseholdType'
                control={control}
                render={({ field }) => (
                  <RadioGroup row {...field}>
                    <FormControlLabel value='purpose_built_flats' control={<Radio />} label='Purpose-Built Flats' />
                    <FormControlLabel value='converted_house' control={<Radio />} label='Converted House' />
                    <FormControlLabel value='mixed_use_development' control={<Radio />} label='Mixed-Use Development' />
                    <FormControlLabel value='Others' control={<Radio />} label='Others' />
                  </RadioGroup>
                )}
              />
              {errors.leaseholdType && <FormHelperText>{errors.leaseholdType.message}</FormHelperText>}
            </FormControl>
          </Grid>

          {watch('leaseholdType') === 'Others' && (
            <Grid item xs={12} sm={6}>
              <Controller
                name='leaseholdTypeOtherDetails'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Please specify other leasehold type'
                    error={Boolean(errors.leaseholdTypeOtherDetails)}
                    helperText={errors.leaseholdTypeOtherDetails?.message}
                  />
                )}
              />
            </Grid>
          )}

          <Grid item xs={12} sm={6}>
            <FormControl component='fieldset' error={Boolean(errors.blockCondition)}>
              <FormLabel>Block Condition</FormLabel>
              <Controller
                name='blockCondition'
                control={control}
                render={({ field }) => (
                  <RadioGroup row {...field}>
                    <FormControlLabel value='Excellent' control={<Radio />} label='Excellent' />
                    <FormControlLabel value='Good' control={<Radio />} label='Good' />
                    <FormControlLabel value='Fair' control={<Radio />} label='Fair' />
                    <FormControlLabel value='Poor' control={<Radio />} label='Poor' />
                  </RadioGroup>
                )}
              />
              {errors.blockCondition && <FormHelperText>{errors.blockCondition.message}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl component='fieldset' error={Boolean(errors.outdoorSpace)}>
              <FormLabel>Outdoor Space</FormLabel>
              <Controller
                name='outdoorSpace'
                control={control}
                render={({ field }) => (
                  <RadioGroup row {...field}>
                    <FormControlLabel value='None' control={<Radio />} label='None' />
                    <FormControlLabel value='Some' control={<Radio />} label='Small shared space' />
                    <FormControlLabel value='Large shared space' control={<Radio />} label='Large shared space' />
                  </RadioGroup>
                )}
              />
              {errors.outdoorSpace && <FormHelperText>{errors.outdoorSpace.message}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} className='flex justify-between'>
            <FormNavigation currentStep={currentStep} totalSteps={4} onBack={onBack} isSubmit={false} />
          </Grid>
        </Grid>
      </form>

      <AddEditAddress modalOpen={isModal} setModalOpen={setIsModal} />
    </>
  )
}

export default AboutYouStep
