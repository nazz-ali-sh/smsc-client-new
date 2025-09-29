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
  Button
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'

import { useSelector } from 'react-redux'

import { removeMatric } from '@/services/evaluation_matrix/evaluation_matrix'

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

  const tender_id = useSelector((state: any) => state?.rmcOnboarding?.tenderId)

  // ✅ Mutation Hook
  const mutation = useMutation({
    mutationFn: ({ categoryid, tender_id }: { categoryid: number; tender_id: number }) =>
      removeMatric(categoryid, tender_id),
    onSuccess: () => {
      console.log('Category deleted successfully')
      onClose?.()
    },
    onError: error => {
      console.error('Error deleting category:', error)
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

      <DialogContent sx={{ px: 3, mt: 6 }}>
        <Typography
          variant='h5'
          sx={{
            color: theme.colorSchemes.light.palette.customColors.darkGray1,
            fontSize: '16px',
            marginTop: '10px'
          }}
        >
          {description}
        </Typography>

        <div className='flex justify-end items-end gap-x-[12px] mt-[34px]'>
          <Button
            onClick={onClose}
            variant='outlined'
            className='bg-white gap-x-3 border-[buttonPrimary] py-[10px] px-7'
          >
            Cancel
          </Button>

          <div className='flex justify-end mt-8'>
            <Button
              onClick={handleDelete}
              variant='contained'
              disabled={mutation.isPending}
              className='bg-buttonPrimary gap-x-3 py-3 px-7'
            >
              {mutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteCatagoryModal
