'use client'

import React from 'react'

import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'

import type { InferOutput } from 'valibot'
import { Box, Typography, Grid, Paper } from '@mui/material'

import { insuranceSchema } from '@/schemas/validation-schemas'
import FormInput from '@/components/form-components/FormInput'
import FormSelect from '@/components/form-components/FormSelect'
import CustomButton from '@/common/CustomButton'
import { insuranceTypeOptions, paymentMethodOptions, planSelectionOptions } from '@/constants'

type InsuranceFormData = InferOutput<typeof insuranceSchema>

const InsuranceForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<InsuranceFormData>({
    resolver: valibotResolver(insuranceSchema),
    defaultValues: {
      fullname: '',
      national_id: '',
      contact: '',
      email: '',
      date_of_birth: '',
      address: '',
      insurance_type: '',
      plan_selection: '',
      payment_method: ''
    }
  })

  const onSubmit = async (data: InsuranceFormData) => {
    try {
      console.log('Insurance form data:', data)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <>
      <Paper>
        <Box sx={{ margin: '0 auto', padding: 3, mx: 3 }}>
          <Box sx={{ marginBottom: 4, my: 4 }}>
            <Typography
              variant='h4'
              component='h1'
              gutterBottom
              sx={{
                color: '#1F4E8D',
                fontWeight: 600,
                fontSize: '26px',
                marginBottom: 1
              }}
            >
              Insurance Information
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <FormInput name='fullname' control={control} label='Full Name' placeholder='Enter full name' />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormInput name='national_id' control={control} label='National ID' placeholder='Enter national ID' />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormInput
                  name='date_of_birth'
                  control={control}
                  label='Date of Birth'
                  type='date'
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormInput name='contact' control={control} label='Phone Number' placeholder='Enter Phone number' />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormInput name='email' control={control} label='Email' placeholder='Enter Email' type='email' />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormInput name='address' control={control} label='Address' placeholder='Enter address' />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormSelect
                  name='insurance_type'
                  control={control}
                  label='Insurance Type'
                  options={insuranceTypeOptions}
                  placeholder='Select insurance type'
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormSelect
                  name='plan_selection'
                  control={control}
                  label='Plan Selection'
                  options={planSelectionOptions}
                  placeholder='Select plan'
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormSelect
                  name='payment_method'
                  control={control}
                  label='Payment Method'
                  options={paymentMethodOptions}
                  placeholder='Select payment method'
                />
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 3,
                    my: 10
                  }}
                >
                  <CustomButton variant='outlined'>Cancel</CustomButton>
                  <CustomButton type='submit' variant='contained' disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Insurance'}
                  </CustomButton>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </>
  )
}

export default InsuranceForm
