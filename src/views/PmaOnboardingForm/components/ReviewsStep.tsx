'use client'

import React from 'react'

import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Box, Grid, TextField, Typography, Switch, FormControlLabel, Button } from '@mui/material'

import { reviewsSchema } from '../PmaOnboardingSchema'
import type { ReviewsForm } from '../types'

interface Props {
  defaultValues: ReviewsForm
  onNext: (data: ReviewsForm) => void
  onBack: () => void
}

const ReviewsStep: React.FC<Props> = ({ defaultValues, onNext, onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ReviewsForm>({
    defaultValues,
    resolver: valibotResolver(reviewsSchema) as any
  })

  const onSubmit = (data: ReviewsForm) => {
    onNext(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography variant='h6' className='mb-2'>
        Google Reviews
      </Typography>

      <FormControlLabel control={<Switch {...register('google.showOnReport')} />} label='Show on shortlist report' />

      <Typography variant='body2' className='text-gray-500 mb-4'>
        These scores are only displayed to RMCs when you’re shortlisted. If left blank, a dash (–) will appear.
      </Typography>

      <Grid container spacing={4} className='mb-6'>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Average Rating'
            type='number'
            fullWidth
            {...register('google.averageRating')}
            error={!!errors.google?.averageRating}
            helperText={errors.google?.averageRating?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Number of Reviews'
            type='number'
            fullWidth
            {...register('google.numberOfReviews')}
            error={!!errors.google?.numberOfReviews}
            helperText={errors.google?.numberOfReviews?.message}
          />
        </Grid>
      </Grid>

      <Typography variant='h6' className='mb-2'>
        Trustpilot Reviews
      </Typography>

      <FormControlLabel
        control={<Switch {...register('trustPilot.showOnReport')} />}
        label='Show on shortlist report'
      />

      <Typography variant='body2' className='text-gray-500 mb-4'>
        These scores are only displayed to RMCs when you’re shortlisted. If left blank, a dash (–) will appear.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Average Rating'
            type='number'
            fullWidth
            {...register('trustPilot.averageRating')}
            error={!!errors.trustPilot?.averageRating}
            helperText={errors.trustPilot?.averageRating?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Number of Reviews'
            type='number'
            fullWidth
            {...register('trustPilot.numberOfReviews')}
            error={!!errors.trustPilot?.numberOfReviews}
            helperText={errors.trustPilot?.numberOfReviews?.message}
          />
        </Grid>
      </Grid>
      <Box display='flex' justifyContent='space-between' mt={6}>
        <Button variant='outlined' onClick={onBack}>
          Back
        </Button>
        <Button type='submit' variant='contained'>
          Next
        </Button>
      </Box>
    </form>
  )
}

export default ReviewsStep
