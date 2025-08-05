'use client'

import React from 'react'

import { useForm, Controller } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import {
  Grid,
  Box,
  TextField,
  Typography,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText
} from '@mui/material'

import { communicationPreferencesSchema } from '../PmaOnboardingSchema'
import type { CommunicationPreferencesForm } from '../types'

type Props = {
  defaultValues?: CommunicationPreferencesForm
  onNext: (data: CommunicationPreferencesForm) => void
  onBack: () => void
}

const CommunicationPreferencesStep = ({ defaultValues, onNext, onBack }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CommunicationPreferencesForm>({
    resolver: valibotResolver(communicationPreferencesSchema) as any,
    defaultValues: defaultValues || {
      primaryContactNumber: '',
      secondaryContact: undefined,
      notificationRecipient: 'Primary'
    }
  })

  const onSubmit = (data: CommunicationPreferencesForm) => {
    onNext(data)
  }

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography className='font-medium' color='text.primary'>
            Communication Preferences
          </Typography>
          <Typography variant='body2'>Set contact details and notification preferences</Typography>
        </Grid>

        <Grid item xs={12}>
          <Controller
            name='primaryContactNumber'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Primary Contact Number'
                error={!!errors.primaryContactNumber}
                helperText={errors.primaryContactNumber?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant='subtitle1' fontWeight={500}>
            Add Secondary Contact (optional)
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name='secondaryContact.fullName'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Full Name'
                error={!!errors.secondaryContact?.fullName}
                helperText={errors.secondaryContact?.fullName?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name='secondaryContact.email'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Email Address'
                error={!!errors.secondaryContact?.email}
                helperText={errors.secondaryContact?.email?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name='secondaryContact.phone'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Phone Number'
                error={!!errors.secondaryContact?.phone}
                helperText={errors.secondaryContact?.phone?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl error={!!errors.secondaryContact?.preferredContact}>
            <FormLabel>Preferred Contact</FormLabel>
            <Controller
              name='secondaryContact.preferredContact'
              control={control}
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel value='Mobile' control={<Radio />} label='Mobile' />
                  <FormControlLabel value='Landline' control={<Radio />} label='Landline' />
                </RadioGroup>
              )}
            />
            <FormHelperText>{errors.secondaryContact?.preferredContact?.message}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl error={!!errors.notificationRecipient}>
            <FormLabel>Email Notifications Will Go To:</FormLabel>
            <Controller
              name='notificationRecipient'
              control={control}
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel value='Primary' control={<Radio />} label='Primary' />
                  <FormControlLabel value='Secondary' control={<Radio />} label='Secondary' />
                  <FormControlLabel value='Both' control={<Radio />} label='Both' />
                </RadioGroup>
              )}
            />
            <FormHelperText>{errors.notificationRecipient?.message}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Box display='flex' justifyContent='space-between'>
            <Button variant='outlined' onClick={onBack}>
              Back
            </Button>
            <Button variant='contained' type='submit'>
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CommunicationPreferencesStep
