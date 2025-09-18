'use client'

import React from 'react'

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'

type DataModalProps = {
  open: boolean
  onClose?: () => void
  onConfirm?: () => void
  siteVisitJoinCall?: () => void
  title?: any
  siteVisitData?: any
  mettingtype?: any
  date?: any
  block?: any
  region?: any
}

const JoinMeetingModal = ({ open, onClose, siteVisitJoinCall, title, siteVisitData }: DataModalProps) => {
  console.log(siteVisitData)

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          color: '#1F4E8D',
          fontSize: '26px',
          lineHeight: '33px',
          fontWeight: 600,
          width: '600px'
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Metting Types : {siteVisitData?.calendartype}</DialogContentText>
        <DialogContentText>Date & Time: {siteVisitData?.slot} </DialogContentText>
        <DialogContentText>Block Name: {siteVisitData?.block_name || 'no data '} </DialogContentText>
        <DialogContentText>Region {siteVisitData?.region || 'No data'} </DialogContentText>
        <DialogContentText>
          {siteVisitData?.location && 'location :'} {siteVisitData?.location && siteVisitData?.location}{' '}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            backgroundColor: 'customColors.ligthBlue',
            '&:hover': { backgroundColor: 'customColors.ligthBlue' }
          }}
          onClick={onClose}
          variant='contained'
        >
          cancel
        </Button>
        {!siteVisitData?.location && (
          <Button color='error' variant='contained' onClick={siteVisitJoinCall}>
            Join call
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default JoinMeetingModal
