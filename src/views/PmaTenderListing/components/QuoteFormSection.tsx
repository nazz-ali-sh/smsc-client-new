'use client'

import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Box, Grid, Typography } from '@mui/material'

import CustomButton from '@/common/CustomButton'
import FormInput from '@/components/form-components/FormInput'
import ServiceChargeBudgetSection from '@/views/TenderInformationUpdated/components/ServiceChargeBudgetSection'
import { titleClass } from '@/constants/styles'
import { quoteFeeFields } from '@/constants'
import { quoteFormSchema } from '@/schemas/validation-schemas'
import {
  submitPmaTenderResponse,
  type PmaTenderResponsePayload
} from '@/services/pma-tender-listing-apis/pma-tender-response-api'
import type { QuoteFormData, QuoteFormSectionProps } from '../types'

const QuoteFormSection = ({ tenderId }: QuoteFormSectionProps) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedFeeData, setSubmittedFeeData] = useState<any>(null)
  const [budgetDataFromStorage, setBudgetDataFromStorage] = useState<any>(null)

  const { control, handleSubmit, reset } = useForm<QuoteFormData>({
    resolver: valibotResolver(quoteFormSchema),
    defaultValues: {
      managementFee: '',
      accountingFee: '',
      coSecFee: '',
      outOfHouseFee: '',
      emergencyLightingTasks: '',
      fireDoorInspections: '',
      amlMoneyLaunderingChecks: ''
    },
    mode: 'onChange'
  })

  useEffect(() => {
    const savedData = localStorage.getItem('submitted_tender_data')

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)

        setBudgetDataFromStorage(parsedData)
      } catch (error) {
        console.error('Error parsing submitted tender data:', error)
      }
    }
  }, [])

  const savedResponse = localStorage.getItem('template_response')

  const mutation = useMutation({
    mutationFn: submitPmaTenderResponse,
    onSuccess: (response: any) => {
      const successMessage = response?.message || 'Response submitted successfully'

      toast.success(successMessage)

      reset()
      setSubmittedFeeData(null)
      setIsSubmitting(false)
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to submit response. Please try again.'

      toast.error(errorMessage)
      setIsSubmitting(false)
    }
  })

  const handleFormSubmit = (data: QuoteFormData) => {
    const feeData = {
      managing_fee: data.managementFee,
      accounting_fee: data.accountingFee,
      cosec_fee: data.coSecFee,
      out_of_hours_fee: data.outOfHouseFee,
      emergency_fee: data.emergencyLightingTasks,
      fire_door_fee: data.fireDoorInspections,
      anti_money_fee: data.amlMoneyLaunderingChecks
    }

    localStorage.setItem('submitted_tender_data', JSON.stringify(feeData))
    setSubmittedFeeData(feeData)
    setBudgetDataFromStorage(feeData)

    toast.success('Fee data saved successfully')
  }

  const handleNext = () => {
    if (isSubmitting || mutation.isPending) return

    if (!submittedFeeData) {
      toast.error('Please submit the Fee category data first')

      return
    }

    if (!savedResponse?.trim()) {
      toast.error('Please enter a response message first')
      router.push(`/tender-response/${tenderId}`)

      return
    }

    setIsSubmitting(true)

    const payload: PmaTenderResponsePayload = {
      tender_id: tenderId || 0,
      response_message: savedResponse,
      management_fee: Number(submittedFeeData.managing_fee) || 0,
      accounting_fee: Number(submittedFeeData.accounting_fee) || 0,
      cosec_fee: Number(submittedFeeData.cosec_fee) || 0,
      out_of_hours_fee: Number(submittedFeeData.out_of_hours_fee) || 0,
      emergency_fee: Number(submittedFeeData.emergency_fee) || 0,
      fire_door_fee: Number(submittedFeeData.fire_door_fee) || 0,
      anti_money_fee: Number(submittedFeeData.anti_money_fee) || 0
    }

    mutation.mutate(payload)
  }

  const handleEdit = () => {
    if (tenderId) {
      router.push(`/tender-response/${tenderId}`)
    }
  }

  const displayBudgetData = budgetDataFromStorage

  return (
    <Box>
      <Box sx={{ marginBottom: '32px' }}>
        <Typography sx={titleClass}>Fee category</Typography>

        <Grid container spacing={6} sx={{ paddingTop: '22px' }}>
          {quoteFeeFields.map(item => (
            <Grid item xs={12} sm={6} key={item.name}>
              <FormInput name={item.name} control={control} label={item.label} type='number' />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: 6 }}>
          <CustomButton
            variant='contained'
            endIcon={<i className='ri-arrow-right-line' />}
            onClick={handleSubmit(handleFormSubmit)}
          >
            Submit
          </CustomButton>
        </Box>
      </Box>
      <Box sx={{ marginBottom: 4, marginTop: '80px' }}>
        <Typography sx={titleClass}>Response</Typography>

        <Box>
          <Typography sx={{ color: '#6B7280', fontSize: '14px', lineHeight: 1.8 }}>{savedResponse}</Typography>
        </Box>
      </Box>

      <Box sx={{ marginTop: '32px' }}>
        <ServiceChargeBudgetSection
          budgetData={displayBudgetData}
          itemsPerRow={3}
          sx={titleClass}
          title='PMA Cost Breakdown'
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3, marginTop: 6 }}>
        <CustomButton variant='outlined' onClick={handleEdit} startIcon={<i className='ri-arrow-left-line' />}>
          Edit
        </CustomButton>
        <CustomButton
          endIcon={<i className='ri-arrow-right-line' />}
          variant='contained'
          onClick={handleNext}
          isLoading={isSubmitting || mutation.isPending}
        >
          {isSubmitting || mutation.isPending ? 'Processing...' : 'Next'}
        </CustomButton>
      </Box>
    </Box>
  )
}

export default QuoteFormSection
