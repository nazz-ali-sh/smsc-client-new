'use client'

import React from 'react'

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'

type DeleteModalProps = {
  open: boolean
  onClose: () => void
  onCanceledSiteVisit?: () => void
  onSiteVisitReschedule?: () => void
  onRejectedSiteVisit?: () => void
  onConfirmSiteVisit?: () => void
  onAccept?: () => void
  itemName?: string
  title?: string
  types?: any
}

const PendingSiteVisitModal = ({
  open,
  onClose,
  onCanceledSiteVisit = () => {},
  onSiteVisitReschedule = () => {},
  onRejectedSiteVisit = () => {},
  onConfirmSiteVisit = () => {},
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
            <Button color='error' variant='contained' onClick={onRejectedSiteVisit}>
              Rejected
            </Button>
          </>
        ) : (
          <>
            <Button color='error' variant='contained' onClick={onCanceledSiteVisit}>
              cancel
            </Button>
          </>
        )}

        <Button color='primary' variant='contained' onClick={onSiteVisitReschedule}>
          Reschedule
        </Button>

        {types?.trim() === 'rescheduled' ? (
          <Button color='error' variant='contained' onClick={onConfirmSiteVisit}>
            confirm
          </Button>
        ) : (
          ''
        )}

      </DialogActions>
    </Dialog>
  )
}

export default PendingSiteVisitModal
