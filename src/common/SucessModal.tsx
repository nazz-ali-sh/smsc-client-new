'use client'

import React from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  Typography,
  IconButton,
  Divider
} from '@mui/material'

import CustomButton from './CustomButton'

type SuccessModalProps = {
  open: boolean
  onClose: () => void
  onConfirm?: () => void
  onClick?: () => void
  message?: string
  title?: string
  buttonText?: string
  confirmButtonText?: string
  loading?: boolean
  cancelButton: string
}

const SuccessModal = ({
  open,
  onClose,
  onConfirm,
  message = 'The operation was successful.',
  title = 'Success',
  confirmButtonText,
  loading = false,
  cancelButton
}: SuccessModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: '220px',
          paddingX: '14px',
          width: '800px'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1, px: 3, pt: 3 }}>
        <Box display='flex' justifyContent='space-between' alignItems='flex-start' sx={{ paddingTop: '16px' }}>
          <Typography
            variant='h4'
            sx={{
              color: '#1F4E8D',
              fontSize: '1.7rem',
              paddingLeft: '8px'
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

      <DialogContent>
        <DialogContentText sx={{ color: '#696969', fontSize: '16px', marginTop: '8px', whiteSpace: 'pre-line'}}>{message}</DialogContentText>
      </DialogContent>
      <DialogActions className='flex justify-between items-center'>
        {cancelButton && (
          <CustomButton variant='outlined' onClick={onClose} disabled={loading} autoFocus>
            {cancelButton}
          </CustomButton>
        )}

        <div className='flex justify-end w-full'>
          {onConfirm && (
            <CustomButton variant='contained' onClick={onConfirm} disabled={loading} autoFocus>
              {loading ? 'Submitting...' : confirmButtonText}
            </CustomButton>
          )}
        </div>
      </DialogActions>
    </Dialog>
  )
}

export default SuccessModal
