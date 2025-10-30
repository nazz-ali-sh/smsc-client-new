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

type DataModalProps = {
  open: boolean
  onClose?: () => void
  onConfirm?: () => void
  siteVisitJoinCall?: () => void
  rescheduledCallDate?: () => void
  reschedualeSiteInvite?: () => void
  cancelSiteVisitCancel?: () => void
  cancelVideoCall?: () => void
  title?: any
  siteVisitData?: any
  mettingtype?: any
  date?: any
  block?: any
  region?: any
}

const JoinMeetingModal = ({
  rescheduledCallDate = () => {},
  reschedualeSiteInvite = () => {},
  cancelSiteVisitCancel = () => {},
  cancelVideoCall = () => {},
  open,
  onClose,
  siteVisitJoinCall,
  title,
  siteVisitData
}: DataModalProps) => {

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
     
        <DialogContentText sx={{ marginTop: '5px' }}>
          <strong className='font-bold '>Date & Time: </strong> {siteVisitData?.slot}
        </DialogContentText>
        <DialogContentText sx={{ marginTop: '5px' }}>
          <span className='font-bold'>Block Name: </span> {siteVisitData?.block_name || 'no data '}{' '}
        </DialogContentText>
        <DialogContentText sx={{ marginTop: '5px' }}>
          <span className='font-bold'>Region: </span> {siteVisitData?.region || 'No data'}{' '}
        </DialogContentText>
        <DialogContentText sx={{ marginTop: '5px' }}>
          {siteVisitData?.location && <span className='font-bold'>Location: </span>}{' '}
          {siteVisitData?.location && siteVisitData?.location}{' '}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {siteVisitData?.location && (
          <CustomButton onClick={cancelSiteVisitCancel} variant='contained'>
            Cancel Visit
          </CustomButton>
        )}
        {siteVisitData?.location && (
          <CustomButton onClick={reschedualeSiteInvite} variant='contained'>
            Reschedule Visit
          </CustomButton>
        )}
       
        {!siteVisitData?.location && (
          <CustomButton onClick={rescheduledCallDate} variant='contained'>
            Reschedule Call
          </CustomButton>
        )}
           {!siteVisitData?.location && (
          <CustomButton variant='contained' onClick={cancelVideoCall}>
            Cancel Call
          </CustomButton>
        )}
         {!siteVisitData?.location && (
          <CustomButton variant='contained' onClick={siteVisitJoinCall}>
            Join call
          </CustomButton>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default JoinMeetingModal
