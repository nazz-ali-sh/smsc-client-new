'use client'

import React from 'react'

import { Grid, Typography, TextField, FormControlLabel, Switch, FormHelperText, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'

import { managementFeeSchema } from '../PmaOnboardingSchema'
import type { ManagementFeeForm } from '../types'

interface Props {
  defaultValues: ManagementFeeForm
  onNext: (data: ManagementFeeForm) => void
  onBack: () => void
}

const ManagementFeeStep: React.FC<Props> = ({ defaultValues, onNext, onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    watch
  } = useForm<ManagementFeeForm>({
    resolver: valibotResolver(managementFeeSchema) as any,
    defaultValues
  })

  const minFee = watch('minFee')
  const maxFee = watch('maxFee')

  const renderSoftValidation = (field: 'minFee' | 'maxFee', value: number | undefined) => {
    if (!dirtyFields[field] || value === undefined) return null

    if (value < 100) {
      return <FormHelperText error>That figure looks unusually low – please double-check it.</FormHelperText>
    }

    if (value > 900) {
      return <FormHelperText error>That figure looks unusually high – please double-check it.</FormHelperText>
    }

    return null
  }

  return (
    <form onSubmit={handleSubmit(onNext)}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Switch {...register('showFeesWithVat')} color='primary' />}
            label='Display fees inclusive of VAT'
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label='Minimum Fee Per Unit'
            fullWidth
            type='number'
            error={!!errors.minFee}
            helperText={errors.minFee?.message}
            {...register('minFee')}
          />
          {renderSoftValidation('minFee', minFee)}
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label='Maximum Fee Per Unit'
            fullWidth
            type='number'
            error={!!errors.maxFee}
            helperText={errors.maxFee?.message}
            {...register('maxFee')}
          />
          {renderSoftValidation('maxFee', maxFee)}
        </Grid>

        <Grid item xs={12}>
          <Typography variant='body2' color='text.secondary'>
            This information is never shown to RMCs. It’s used by SMSC to calculate industry benchmarks.
          </Typography>
        </Grid>

        <Grid item xs={12} container justifyContent='space-between'>
          <Button variant='outlined' onClick={onBack}>
            Back
          </Button>
          <Button type='submit' variant='contained'>
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default ManagementFeeStep
