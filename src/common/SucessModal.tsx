'use client'

import React from 'react'

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Box } from '@mui/material'

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
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <DialogTitle
          sx={{
            color: '#1F4E8D',
            fontSize: '26px',
            lineHeight: '33px',
            fontWeight: 600
          }}
        >
          {title}
        </DialogTitle>
        <DialogTitle onClick={onClose} sx={{ cursor: 'pointer' }}>
          <i className='ri-close-line'></i>
        </DialogTitle>
      </Box>
      <DialogContent>
        <DialogContentText sx={{ color: '#696969', fontSize: '16px' }}>{message}</DialogContentText>
      </DialogContent>
      <DialogActions className='flex justify-between items-center'>
        {cancelButton && (
          <CustomButton variant='outlined' onClick={onConfirm} disabled={loading} autoFocus>
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
