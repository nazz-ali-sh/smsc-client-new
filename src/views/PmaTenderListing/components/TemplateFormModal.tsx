'use client'

import React, { useState } from 'react'

import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Box, Typography } from '@mui/material'

import CommonModal from '@/common/CommonModal'
import FormInput from '@/components/form-components/FormInput'
import CustomButton from '@/common/CustomButton'
import type { SaveTemplatePayload, TemplateFormModalProps } from '../types'
import { templateFormSchema } from '@/schemas/validation-schemas'

const TemplateFormModal: React.FC<TemplateFormModalProps> = ({ isOpen, handleClose, onSave, isLoading = false }) => {
  const [messageLength, setMessageLength] = useState(0)
  const maxCharacters = 3500

  const { control, handleSubmit, reset, watch } = useForm<SaveTemplatePayload>({
    resolver: valibotResolver(templateFormSchema),
    defaultValues: {
      name: '',
      message: ''
    },
    mode: 'onChange'
  })

  const watchedMessage = watch('message')

  React.useEffect(() => {
    setMessageLength(watchedMessage?.length || 0)
  }, [watchedMessage])

  React.useEffect(() => {
    if (!isOpen) {
      reset()
    }
  }, [isOpen, reset])

  const handleFormSubmit = (data: SaveTemplatePayload) => {
    onSave(data)
    reset()
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

        <Box sx={{ marginBottom: 3 }}>
          <FormInput
            name='message'
            control={control}
            label='Description'
            placeholder='Enter description'
            fullWidth
            multiline
            rows={8}
            disabled={isLoading}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 1 }}>
            <Typography sx={{ color: '#9CA3AF', fontSize: '12px' }}>
              {messageLength}/{maxCharacters} Characters
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            color: '#EF4444',
            fontSize: '12px',
            marginBottom: 3,
            fontStyle: 'italic'
          }}
        >
          Please do not include your company name, email address, phone number or website. Breaching this may result in
          account suspension.
        </Typography>

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

export default TemplateFormModal
