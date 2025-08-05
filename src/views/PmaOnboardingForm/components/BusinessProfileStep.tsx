'use client'

import React from 'react'

import { useForm, Controller } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { TextField, Grid, Box, Button, Typography } from '@mui/material'

import type { BusinessProfileForm } from '../types'
import { businessProfileSchema } from '../PmaOnboardingSchema'

type Props = {
  defaultValues?: BusinessProfileForm
  onNext: (data: BusinessProfileForm) => void
}

const BusinessProfileStep = ({ defaultValues, onNext }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<BusinessProfileForm>({
    resolver: valibotResolver(businessProfileSchema) as any,
    defaultValues: defaultValues || {
      yearsTrading: 0,
      totalUnits: 0,
      avgUnitsPerManager: 0
    }
  })

  const handleNumericChange =
    (fieldName: keyof BusinessProfileForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value

      if (value === '' || /^\d+$/.test(value)) {
        setValue(fieldName, Number(value))
      }
    }

  const onSubmit = (data: BusinessProfileForm) => {
    onNext(data)
  }

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography className='font-medium' color='text.primary'>
            Business Profile
          </Typography>
          <Typography variant='body2'>Provide basic information about your company</Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name='yearsTrading'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type='text'
                inputMode='numeric'
                label='How many years has your company been trading?'
                error={!!errors.yearsTrading}
                helperText={errors.yearsTrading?.message}
                onChange={handleNumericChange('yearsTrading')}
                inputProps={{ pattern: '[0-9]*', min: 0 }}
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
                type='text'
                inputMode='numeric'
                label='How many units does your company manage?'
                error={!!errors.totalUnits}
                helperText={
                  errors.totalUnits?.message ||
                  'A unit refers to a space that is lived in or used: 1 flat = 1 unit, 1 house = 1 unit.'
                }
                onChange={handleNumericChange('totalUnits')}
                inputProps={{ pattern: '[0-9]*', min: 1 }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name='avgUnitsPerManager'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type='text'
                inputMode='numeric'
                label='How many units does each account manager typically manage?'
                error={!!errors.avgUnitsPerManager}
                helperText={
                  errors.avgUnitsPerManager?.message ||
                  'Please enter an average across your team. (e.g., 1 manager for 300 units vs several for smaller ones)'
                }
                onChange={handleNumericChange('avgUnitsPerManager')}
                inputProps={{ pattern: '[0-9]*', min: 1 }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Box display='flex' justifyContent='flex-end'>
            <Button type='submit' variant='contained'>
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default BusinessProfileStep
