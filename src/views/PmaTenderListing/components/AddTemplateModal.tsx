'use client'

import React from 'react'

import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Box } from '@mui/material'
import { toast } from 'react-toastify'

import CommonModal from '@/common/CommonModal'
import FormInput from '@/components/form-components/FormInput'
import CustomButton from '@/common/CustomButton'
import { templateSchema } from '@/schemas/validation-schemas'
import type { AddTemplateModalProps } from '../types'

type TemplateFormData = {
  name: string
}

const AddTemplateModal: React.FC<AddTemplateModalProps> = ({
  isOpen,
  handleClose,
  onSave,
  isLoading = false,
  responseMessage = ''
}) => {
  const { control, handleSubmit, reset } = useForm<TemplateFormData>({
    resolver: valibotResolver(templateSchema),
    defaultValues: {
      name: ''
    },
    mode: 'onChange'
  })

  const handleFormSubmit = (data: TemplateFormData) => {
    if (!responseMessage.trim()) {
      toast.error('Please enter a response message')

      return
    }

    onSave({
      name: data.name,
      message: responseMessage
    })
  }

  const handleModalClose = () => {
    reset()
    handleClose()
  }

  return (
    <CommonModal
      isOpen={isOpen}
      handleClose={handleModalClose}
      header='Add New Template'
      maxWidth='md'
      isBorder={true}
      headerSx={{
        color: '#1F4E8D',
        fontSize: '26px',
        lineHeight: '33px',
        fontWeight: 600
      }}
    >
      <Box component='form' onSubmit={handleSubmit(handleFormSubmit)} sx={{ paddingTop: 2 }}>
        <Box sx={{ marginY: 6 }}>
          <FormInput
            name='name'
            control={control}
            label='Template Name'
            placeholder='Enter template name'
            fullWidth
            disabled={isLoading}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, paddingTop: 2 }}>
          <CustomButton variant='outlined' onClick={handleModalClose} disabled={isLoading}>
            Cancel
          </CustomButton>
          <CustomButton type='submit' variant='contained' disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </CustomButton>
        </Box>
      </Box>
    </CommonModal>
  )
}

export default AddTemplateModal
