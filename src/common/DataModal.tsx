'use client'

import React from 'react'

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'

type DataModalProps = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  confirmColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  borderUnderTitle?: boolean
}

const DataModal = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmColor = 'primary',
  borderUnderTitle = false
}: DataModalProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          color: '#1F4E8D',
          fontSize: '26px',
          lineHeight: '33px',
          fontWeight: 600,
          borderBottom: borderUnderTitle ? '2px solid #E0E0E0' : 'none',
          paddingBottom: borderUnderTitle ? '10px' : '0',
          marginBottom: borderUnderTitle ? '20px' : '0'
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelText}</Button>
        <Button
          sx={{
            backgroundColor: 'customColors.ligthBlue',
            '&:hover': { backgroundColor: 'customColors.ligthBlue' }
          }}
          variant='contained'
          color={confirmColor}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DataModal
