'use client'
import React from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  useTheme,
  Divider,
} from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useSelector } from 'react-redux'

import { toast } from 'react-toastify'

import type { AxiosError } from 'axios'

import { removeMatric } from '@/services/evaluation_matrix/evaluation_matrix'
import CustomButton from './CustomButton'

interface ToolTipModalProps {
  open: boolean
  onClose?: () => void
  title?: string
  type?: any
  description?: any
  categoryid?: any
}

const DeleteCatagoryModal: React.FC<ToolTipModalProps> = ({ open, onClose, title, description, categoryid }) => {
  const theme = useTheme()
  const queryClient = useQueryClient()

  const tender_id = useSelector((state: any) => state?.rmcOnboarding?.tenderId)

  const mutation = useMutation({
    mutationFn: ({ categoryid, tender_id }: { categoryid: number; tender_id: number }) =>
      removeMatric(categoryid, tender_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metrix', tender_id] })
      onClose?.()
    },
    onError: error => {
      const axiosError = error as AxiosError<{ message: string }>

      const errorMessage = axiosError.response?.data?.message || axiosError.message || 'Something went wrong!'

      toast.error(errorMessage)
      onClose?.()
    }
  })

  const handleDelete = () => {
    if (categoryid && tender_id) {
      mutation.mutate({ categoryid, tender_id })
    } else {
      console.error('Missing categoryid or tender_id')
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: '200px',
          paddingX: '24px',
          width: '1100px'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1, px: 3, pt: 3 }}>
        <Box display='flex' justifyContent='space-between' alignItems='flex-start' sx={{ paddingTop: '16px' }}>
          <Typography
            variant='h4'
            sx={{
              color: theme.colorSchemes.light.palette.customColors.darkBlue,
              fontSize: '1.7rem'
            }}
          >
            {title}
          </Typography>

          <IconButton onClick={onClose} sx={{ color: 'customColors.textGray' }}>
            <i className='ri-close-line' />
          </IconButton>
        </Box>

        <Box sx={{ paddingY: '12px' }}>
          <Divider />
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 3, mt: 3 }}>
        <Typography
          variant='h5'
          sx={{
            fontSize: '16px',
            marginTop: '10px',
            fontWeight: '400px',
            color: '#696969'
          }}
        >
          {description}
        </Typography>

        <div className='flex justify-end items-end gap-x-[12px] mt-[34px]'>
          <CustomButton onClick={onClose} variant='outlined'>
            Cancel
          </CustomButton>

          <div className='flex justify-end mt-8'>
            <CustomButton onClick={handleDelete} variant='contained' disabled={mutation.isPending}>
              {mutation.isPending ? 'Deleting...' : 'Delete'}
            </CustomButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteCatagoryModal
