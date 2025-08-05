'use client'

import React from 'react'

import type { SubmitHandler } from 'react-hook-form'
import { useForm, Controller } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Grid, TextField, Button, Card, CardHeader, CardContent, Typography, Box } from '@mui/material'

import { validatedAccountInfoSchema } from '../PmaRegistrationSchema'
import type { FormData } from '../types'

interface Props {
  defaultValues: FormData
  onNext: (data: FormData) => void
}

const AccountInfoStep: React.FC<Props> = ({ defaultValues, onNext }) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: valibotResolver(validatedAccountInfoSchema) as any,
    defaultValues
  })

  const onSubmit: SubmitHandler<FormData> = data => {
    onNext(data)
  }

  return (
    <Card elevation={0} sx={{ boxShadow: 'none' }}>
      <CardHeader title={<Typography variant='h6'>Account Information</Typography>} />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name='companyName'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Company Name'
                    error={!!errors.companyName}
                    helperText={errors.companyName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='fullName'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Full Name'
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Email'
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='mobileNumber'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Mobile Number'
                    error={!!errors.mobileNumber}
                    helperText={errors.mobileNumber?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name='password'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type='password'
                    fullWidth
                    label='Password'
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name='confirmPassword'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type='password'
                    fullWidth
                    label='Confirm Password'
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display='flex' justifyContent='space-between' mt={4}>
                <span />
                <Button variant='contained' type='submit'>
                  Next
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default AccountInfoStep
