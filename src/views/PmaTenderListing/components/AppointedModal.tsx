'use client'

import React from 'react'

import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { toast } from 'react-toastify'
import { Box, Typography } from '@mui/material'

import CommonModal from '@/common/CommonModal'
import FormInput from '@/components/form-components/FormInput'
import CustomButton from '@/common/CustomButton'
import { startDateSchema } from '@/schemas/validation-schemas'
import type { AppointedFormData, AppointedModalProps } from '../types'

const AppointedModal = ({ open, onClose, tenderId }: AppointedModalProps) => {
  const { control, handleSubmit, reset } = useForm<AppointedFormData>({
    resolver: valibotResolver(startDateSchema),
    defaultValues: {
      startDate: '',
      notes: ''
    },
    mode: 'onChange'
  })

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleStartDateSubmit = (data: AppointedFormData) => {
    console.log('Start Date Form Data:', data)
    console.log('Tender ID:', tenderId)
    toast.success('Start date confirmed successfully!')
    handleClose()
  }

  return (
    <CommonModal
      isOpen={open}
      handleClose={handleClose}
      header='Confirm Start Date'
      maxWidth='sm'
      fullWidth
      headerSx={{ fontWeight: 600, fontSize: '24px', color: '#1F4E8D' }}
      isBorder
    >
      <Box sx={{ paddingY: 4 }}>
        <Typography
          sx={{
            color: '#6B7280',
            fontSize: '14px',
            marginBottom: 8,
            lineHeight: 1.6
          }}
        >
          Add any notes about the proposed onboarding timeline...
        </Typography>

        <Box sx={{ marginBottom: 4 }}>
          <FormInput name='startDate' control={control} label='' type='date' />
        </Box>

        <Box sx={{ marginBottom: 4 }}>
          <FormInput name='notes' control={control} label='Add Additional Notes' multiline rows={4} />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CustomButton variant='contained' onClick={handleSubmit(handleStartDateSubmit)}>
            Confirm
          </CustomButton>
        </Box>
      </Box>
    </CommonModal>
  )
}

export default AppointedModal
