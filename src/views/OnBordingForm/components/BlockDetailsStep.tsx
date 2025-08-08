import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  FormHelperText,
  FormControl,
  MenuItem,
  InputLabel,
  Select
} from '@mui/material'

import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

import { updateBlockDetails, setCurrentStep } from '@/redux-store/slices/multiStepForm'
import { blockDetailsSchema } from './PreFunnelSchema'
import FormNavigation from './FormNavigation'

import type { BlockDetailsStepProps } from '../types'
import type { RootState } from '@/redux-store'

import { onBoardingFlow } from '@/services/on-boarding-apis/onboarding-api'

import DataModal from '@/common/DataModal'

const BlockDetailsStep: React.FC<BlockDetailsStepProps> = ({ formData, currentStep, onBack }) => {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalDismissed, setModalDismissed] = useState(false) // Add this flag

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    resolver: valibotResolver(blockDetailsSchema),
    defaultValues: {
      numberOfBlocks: formData.blockDetails.numberOfBlocks?.toString() || '1',
      totalUnits: formData.blockDetails.totalUnits?.toString() || '0',
      yearBuilt: formData.blockDetails.yearBuilt || '',
      serviceChargeBudget: formData.blockDetails.serviceChargeBudget?.toString() || '0',
      budgetToggle: formData.blockDetails.budgetToggle || '',
      currentManagementFee: formData.blockDetails.currentManagementFee?.toString() || '0',
      feeToggle: formData.blockDetails.feeToggle || ''
    }
  })

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setModalDismissed(true)
  }

  const handleConfirm = () => {
    console.log('Action confirmed!')
    setIsModalOpen(false)
    setModalDismissed(true)
  }

  const session_id = useSelector((state: RootState) => state.form.steps.location.session_id)

  //  comments for a time beings

  // const { data, isLoading } = useQuery({
  //   queryKey: ['getballPark', session_id],
  //   queryFn: () => getballParkData(session_id),
  //   enabled: !!session_id
  // })
  // console.log(data, 'data', isLoading)

  const watchedValues = watch([
    'numberOfBlocks',
    'yearBuilt',
    'currentManagementFee',
    'budgetToggle',
    'serviceChargeBudget'
  ])

  useEffect(() => {
    const [numberOfBlocks, yearBuilt, currentManagementFee, budgetToggle, serviceChargeBudget] = watchedValues

    const allFieldsFilled = numberOfBlocks && yearBuilt && currentManagementFee && budgetToggle && serviceChargeBudget

    if (allFieldsFilled && !modalDismissed) {
      setIsModalOpen(true)
    } else if (!allFieldsFilled) {
      // Reset dismissal flag if fields are cleared
      setModalDismissed(false)
      setIsModalOpen(false)
    }
  }, [watchedValues, modalDismissed])

  const { mutate } = useMutation({
    mutationFn: (payload: any) => onBoardingFlow(3, payload),
    onSuccess: data => {
      const block_session_id = data?.data?.session_id

      if (block_session_id) {
        dispatch(updateBlockDetails({ session_id: block_session_id }))
      }

      if (data.payload) {
        dispatch(updateBlockDetails(data.payload))
      }

      toast.success('Block details submitted successfully')
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to submit block details'

      console.error('BlockDetails API error:', errorMessage)
      toast.error(errorMessage)
    }
  })

  const handleNumericChange = (fieldName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    if (value === '' || /^\d+$/.test(value)) {
      setValue(fieldName as any, value)
    }
  }

  const onSubmit = (data: any) => {
    console.log(`Submitting data for step 3:`, data)

    try {
      const payload = {
        session_id,
        number_of_blocks: Number(data.numberOfBlocks),
        total_units: Number(data.totalUnits),
        year_built: data?.yearBuilt,
        current_service_charge_budget_type: data.budgetToggle,
        current_service_charge_budget_amount: Number(data.serviceChargeBudget),
        current_management_fee_type: data.feeToggle,
        current_management_fee_amount: Number(data.currentManagementFee)
      }

      mutate(payload)

      dispatch(
        updateBlockDetails({
          numberOfBlocks: payload.number_of_blocks,
          totalUnits: payload.total_units,
          yearBuilt: payload.year_built,
          serviceChargeBudget: payload.current_service_charge_budget_amount,
          budgetToggle: payload.current_service_charge_budget_type,
          currentManagementFee: payload.current_management_fee_amount,
          feeToggle: payload.current_management_fee_type
        })
      )

      dispatch(setCurrentStep(currentStep + 1))
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Failed to save form data')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography className='font-medium' color='text.primary'>
            Your Block/Development
          </Typography>
          <Typography variant='body2'>Add Blocks Details</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name='numberOfBlocks'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type='number'
                inputMode='numeric'
                label='Number of Blocks'
                error={Boolean(errors.numberOfBlocks)}
                helperText={errors.numberOfBlocks?.message}
                onChange={handleNumericChange('numberOfBlocks')}
                inputProps={{ pattern: '[0-9]*', min: 1 }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name='totalUnits'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type='number'
                inputMode='numeric'
                label='Total Units'
                error={Boolean(errors.totalUnits)}
                helperText={errors.totalUnits?.message}
                onChange={handleNumericChange('totalUnits')}
                inputProps={{ pattern: '[0-9]*', min: 0 }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name='yearBuilt'
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Year Built</InputLabel>
                <Select {...field} label='Year Built'>
                  <MenuItem value='1951_2000'>1951_2000</MenuItem>
                  <MenuItem value='2001_2010'>2001_2010</MenuItem>
                  <MenuItem value='2011_2020'>2011_2020</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name='serviceChargeBudget'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type='text'
                label='Service Charge Budget'
                error={Boolean(errors.serviceChargeBudget)}
                helperText={errors.serviceChargeBudget?.message}
                onChange={e => {
                  const value = e.target.value.replace(/[^0-9.]/g, '')
                  const numericValue = value.replace(/^0+/, '') || '0'

                  setValue('serviceChargeBudget', numericValue)
                }}
                InputProps={{
                  startAdornment: <span style={{ marginRight: '8px', color: '#666' }}>£</span>
                }}
                placeholder='0.00'
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component='fieldset' error={Boolean(errors.budgetToggle)}>
            <FormLabel>Budget Type</FormLabel>
            <Controller
              name='budgetToggle'
              control={control}
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel value='per_unit' control={<Radio />} label='Per Unit' />
                  <FormControlLabel value='full-block' control={<Radio />} label='Full block' />
                </RadioGroup>
              )}
            />
            {errors.budgetToggle && <FormHelperText>{errors.budgetToggle.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name='currentManagementFee'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type='text'
                label='Current Management Fee'
                error={Boolean(errors.currentManagementFee)}
                helperText={errors.currentManagementFee?.message}
                onChange={e => {
                  const value = e.target.value.replace(/[^0-9.]/g, '')
                  const numericValue = value.replace(/^0+/, '') || '0'

                  setValue('currentManagementFee', numericValue)
                }}
                InputProps={{
                  startAdornment: <span style={{ marginRight: '8px', color: '#666' }}>£</span>
                }}
                placeholder='0.00'
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component='fieldset' error={Boolean(errors.feeToggle)}>
            <FormLabel>Fee Type</FormLabel>
            <Controller
              name='feeToggle'
              control={control}
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel value='per_unit' control={<Radio />} label='Per Unit' />
                  <FormControlLabel value='per_block' control={<Radio />} label='Full Block' />
                </RadioGroup>
              )}
            />
            {errors.feeToggle && <FormHelperText>{errors.feeToggle.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} className='flex justify-between'>
          <FormNavigation currentStep={currentStep} totalSteps={4} onBack={onBack} isSubmit={false} />
        </Grid>
      </Grid>

      <DataModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        title='Ballpark Estimate'
        description='This is a custom description that can be passed from the parent component. You can make it as detailed as needed.'
        confirmText='OK'
        cancelText='Cancel'
        confirmColor='success'
      />
    </form>
  )
}

export default BlockDetailsStep
