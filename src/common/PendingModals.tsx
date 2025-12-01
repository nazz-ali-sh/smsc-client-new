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
import { getUserType } from '@/utils/tokenSync'
import { isPmaPortalAndUser } from '@/utils/portalHelper'

type DeleteModalProps = {
  open: boolean
  onClose: () => void
  onReject?: () => void
  onReschedule?: () => void
  onConfirmVideCall?: () => void
  onVideoCallRejected?: () => void
  onPmaReschedual?: () => void
  pmaCallAccepted?: () => void

  onAccept?: () => void
  itemName?: string
  title?: string
  types?: any
  siteVisitData?: any
}

const PendingModal = ({
  open,
  onClose,
  onReject = () => {},
  onReschedule = () => {},
  onConfirmVideCall = () => {},
  onVideoCallRejected = () => {},
  onPmaReschedual = () => {},
  pmaCallAccepted = () => {},
  title,
  types,
  siteVisitData
}: DeleteModalProps) => {
  const userType = getUserType()
  const isPmaUser = isPmaPortalAndUser(userType)


  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: '300px',
          paddingX: '24px',
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
   
      {isPmaUser ? (
         <DialogContent>
          <DialogContentText sx={{ marginTop: '5px' }}>
            <span className='font-bold'>Rmc Name: </span> {siteVisitData?.rmc_details?.name}
          </DialogContentText>
          <DialogContentText sx={{ marginTop: '5px' }}>
            <span className='font-bold'>Date & Time: </span> {siteVisitData?.timeline}{' '}
          </DialogContentText>
          <DialogContentText sx={{ marginTop: '5px' }}>
            <span className='font-bold'>Block Name: </span> {siteVisitData?.rmc_details?.name || 'no data '}
          </DialogContentText>
          <DialogContentText sx={{ marginTop: '5px' }}>
            <span className='font-bold'>Region: </span> {siteVisitData?.rmc_details?.region || 'No data'}
          </DialogContentText>
          <DialogContentText sx={{ marginTop: '5px' }}>
            {siteVisitData?.location && 'location :'} {siteVisitData?.location && siteVisitData?.location}
          </DialogContentText>
        </DialogContent>
      ) : (
        <DialogContent>
          <DialogContentText sx={{ marginTop: '5px' }}>
            <span className='font-bold'>Pma Name: </span> {siteVisitData?.pma_username}
          </DialogContentText>
          <DialogContentText sx={{ marginTop: '5px' }}>
            <span className='font-bold'>Date & Time: </span> {siteVisitData?.slot}{' '}
          </DialogContentText>
          <DialogContentText sx={{ marginTop: '5px' }}>
            <span className='font-bold'>Block Name: </span> {siteVisitData?.block_name || 'no data '}
          </DialogContentText>
          <DialogContentText sx={{ marginTop: '5px' }}>
            <span className='font-bold'>Region: </span> {siteVisitData?.region || 'No data'}
          </DialogContentText>
          <DialogContentText sx={{ marginTop: '5px' }}>
            {siteVisitData?.location && 'location :'} {siteVisitData?.location && siteVisitData?.location}
          </DialogContentText>
        </DialogContent>
      )}

      <DialogActions>
        {isPmaUser ? (
          <>
            <CustomButton variant='contained' onClick={pmaCallAccepted}>
              Accepted PMA Call
            </CustomButton>

            <CustomButton color='primary' variant='contained' onClick={onPmaReschedual}>
              Pma Reschedule
            </CustomButton>
          </>
        ) : (
          <>
            {' '}
            {types?.trim() === 'rescheduled' ? (
              <>
                <CustomButton color='error' variant='contained' onClick={onVideoCallRejected}>
                  Rejected
                </CustomButton>
              </>
            ) : (
              <>
                <CustomButton variant='contained' onClick={onReject}>
                  Cancel Call
                </CustomButton>
              </>
            )}
            <CustomButton color='primary' variant='contained' onClick={onReschedule}>
              Reschedule
            </CustomButton>
            {types?.trim() === 'rescheduled' ? (
              <CustomButton variant='contained' onClick={onConfirmVideCall}>
                Confirm
              </CustomButton>
            ) : (
              ''
            )}{' '}
          </>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default PendingModal
