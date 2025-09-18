'use client'

import React from 'react'

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'

type DeleteModalProps = {
  open: boolean
  onClose: () => void
  onReject?: () => void
  onReschedule?: () => void
  onConfirmVideCall?: () => void
  onVideoCallRejected?: () => void
  
  onAccept?: () => void
  itemName?: string
  title?: string
  types?: any
}

const PendingModal = ({
  open,
  onClose,
  onReject = () => {},
  onReschedule = () => {},
  onConfirmVideCall = () => {},
  onVideoCallRejected = () => {},
  itemName = 'item',
  title,
  types
}: DeleteModalProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this {itemName}? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {types?.trim() === 'rescheduled' ? (
          <>
            <Button color='error' variant='contained' onClick={onVideoCallRejected}>
              Rejected
            </Button>
          </>
        ) : (
          <>
            <Button color='error' variant='contained' onClick={onReject}>
              cancel
            </Button>
          </>
        )}

        <Button color='primary' variant='contained' onClick={onReschedule}>
          Reschedule
        </Button>

        {types?.trim() === 'rescheduled' ? (
          <Button color='error' variant='contained' onClick={onConfirmVideCall}>
            confirm
          </Button>
        ) : (
          ''
        )}

     
      </DialogActions>
    </Dialog>
  )
}

export default PendingModal
