'use client'

import React from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
  IconButton,
  Box,
  Typography
} from '@mui/material'

import CustomButton from './CustomButton'

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
  siteVisitData?: any
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
  types,
  siteVisitData
}: DeleteModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: '300px',
          paddingX: '24px',
          width: '1000px'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1, px: 3, pt: 3 }}>
        <Box display='flex' justifyContent='space-between' alignItems='flex-start' sx={{ paddingTop: '16px' }}>
          <Typography
            variant='h4'
            sx={{
              color: '#1F4E8D',
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
      <DialogContent>
        <DialogContentText >
          <span className='font-bold'>Meeting Types :</span> {siteVisitData?.calendartype}
        </DialogContentText>
        <DialogContentText sx={{ marginTop: '5px' }}>
          <span className='font-bold'>Date & Time: </span> {siteVisitData?.slot}{' '}
        </DialogContentText>
        <DialogContentText sx={{ marginTop: '5px' }}>
          <span className='font-bold'>Block Name: </span> {siteVisitData?.block_name || 'no data '}{' '}
        </DialogContentText>
        <DialogContentText sx={{ marginTop: '5px' }}>
          <span className='font-bold'>Region: </span> {siteVisitData?.region || 'No data'}{' '}
        </DialogContentText>
        <DialogContentText sx={{ marginTop: '5px' }}>
          {siteVisitData?.location && <span className='font-bold'>Location: </span>}
          {siteVisitData?.location && siteVisitData?.location}{' '}
        </DialogContentText>
      </DialogContent>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this {itemName}? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {types?.trim() === 'rescheduled' ? (
          <>
            <CustomButton color='error' variant='contained' onClick={onRejectedSiteVisit}>
              Rejected
            </CustomButton>
          </>
        ) : (
          <>
            <CustomButton color='error' variant='contained' onClick={onCanceledSiteVisit}>
              Cancel Meeting
            </CustomButton>
          </>
        )}

        <CustomButton color='primary' variant='contained' onClick={onSiteVisitReschedule}>
          Reschedule
        </CustomButton>

        {types?.trim() === 'rescheduled' ? (
          <CustomButton color='error' variant='contained' onClick={onConfirmSiteVisit}>
            confirm
          </CustomButton>
        ) : (
          ''
        )}
      </DialogActions>
    </Dialog>
  )
}

export default PendingSiteVisitModal
