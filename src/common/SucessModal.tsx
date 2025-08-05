'use client'

import React from 'react'

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box } from '@mui/material'

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
}

const SuccessModal = ({
  open,
  onClose,
  onConfirm,
  message = 'The operation was successful.',
  title = 'Success',
  confirmButtonText,
  loading = false
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
      <DialogActions>
        {onConfirm && (
          <Button
            sx={{
              backgroundColor: 'customColors.ligthBlue',
              '&:hover': { backgroundColor: 'customColors.ligthBlue' }
            }}
            variant='contained'
            color='primary'
            onClick={onConfirm}
            disabled={loading}
            autoFocus
          >
            {loading ? 'Submitting...' : confirmButtonText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default SuccessModal
