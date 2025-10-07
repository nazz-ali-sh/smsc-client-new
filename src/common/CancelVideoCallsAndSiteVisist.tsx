'use client'

import React, { useState } from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Box,
  Typography,
  Divider,
  IconButton
} from '@mui/material'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

import {
  reSchedualRejectInvite,
  rmcSiteVisitCancel,
  rmcVideoCallsCancel
} from '@/services/site_visit_apis/site_visit_api'
import CustomButton from './CustomButton'

type DeleteModalProps = {
  open: boolean
  onClose: () => void
  onConfirm?: () => void
  title: string
  description: string
  RejectInviteData?: any
  types: any
  sitePendingData?: any
  SideVisitsSchedualInviteId?: any
  VideoCallInviteId?: any
  setConfirmOpen?: any
  calanderCancelData?: any
}

const CancelVideoCallsAndSiteVisist = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  types,
  SideVisitsSchedualInviteId,
  VideoCallInviteId,
  setConfirmOpen,
  calanderCancelData
}: DeleteModalProps) => {
  const [textValue, setTextValue] = useState('')
  const [error, setError] = useState('')

  const rmctender_id = useSelector((state: any) => state?.rmcOnboarding?.tenderId)
  const queryClient = useQueryClient()

  const rechedualRmcAgain = useMutation({
    mutationFn: ({
      VideoCallInviteId,
      rmctender_id,
      message
    }: {
      VideoCallInviteId: number
      rmctender_id: number
      message: string
    }) => reSchedualRejectInvite(VideoCallInviteId, rmctender_id, message),
    onSuccess: (data: any) => {
      toast.success(data?.message || 'Invite rejected successfully!')
      queryClient.invalidateQueries({
        queryKey: ['calendarDates']
      })
      if (onConfirm) onConfirm()
      onClose()
      setTextValue('')
      setError('')
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to reject invite'

      setConfirmOpen(false)
      setTextValue('')
      setError('')
      toast.error(errorMessage)
      console.error('Failed to reject invite:', error)
    }
  })

  const videoCallCancel = useMutation({
    mutationFn: ({
      VideoCallInviteId,
      rmctender_id,
      message
    }: {
      VideoCallInviteId: number
      rmctender_id: number
      message: string
    }) => rmcVideoCallsCancel(VideoCallInviteId, rmctender_id, message),
    onSuccess: (data: any) => {
      toast.success(data?.message || 'Invite rejected successfully!')
      queryClient.invalidateQueries({
        queryKey: ['calendarDates']
      })
      if (onConfirm) onConfirm()
      onClose()
      setTextValue('')
      setError('')
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to reject invite'

      setConfirmOpen(false)
      setTextValue('')
      setError('')
      toast.error(errorMessage)
      console.error('Failed to reject invite:', error)
    }
  })

  // site vsist cancel
  const sideVisitCancel = useMutation({
    mutationFn: ({
      SideVisitsSchedualInviteId,
      rmctender_id,
      message
    }: {
      SideVisitsSchedualInviteId: number
      rmctender_id: number
      message: string
    }) => rmcSiteVisitCancel(SideVisitsSchedualInviteId, rmctender_id, message),
    onSuccess: (data: any) => {
      toast.success(data?.message || 'Invite rejected successfully!')
      queryClient.invalidateQueries({
        queryKey: ['calendarDates']
      })
      if (onConfirm) onConfirm()
      onClose()
      setTextValue('')
      setError('')
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to reject invite'

      setConfirmOpen(false)
      setTextValue('')
      setError('')
      toast.error(errorMessage)
      console.error('Failed to reject invite:', error)
    }
  })

  console.log(types)

  const normalizedType = types?.trim()?.toLowerCase()

  const handleConfirm = () => {
    if (!textValue.trim()) {
      setError('Reason is required')

      return
    }

    console.log('types:', types)

    if (normalizedType === 'sitevisits' || normalizedType === 'reject') {
      sideVisitCancel.mutate({
        SideVisitsSchedualInviteId,
        rmctender_id,
        message: textValue
      })
    } else if (normalizedType === 'fromsitevisitcalander') {
      sideVisitCancel.mutate({
        SideVisitsSchedualInviteId: calanderCancelData?.invite_Id,
        rmctender_id,
        message: textValue
      })
    } else if (normalizedType === 'videocallcancel') {
      videoCallCancel.mutate({
        VideoCallInviteId,
        rmctender_id,
        message: textValue
      })
    } else if (normalizedType === 'fromvideocalander') {
      videoCallCancel.mutate({
        VideoCallInviteId: calanderCancelData?.invite_Id,
        rmctender_id,
        message: textValue
      })
    } else {
      rechedualRmcAgain.mutate({
        VideoCallInviteId,
        rmctender_id,
        message: textValue
      })
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      {/* <DialogTitle>{title}</DialogTitle> */}
      <DialogTitle sx={{ pb: 1, px: 3, pt: 3 }}>
        <Box display='flex' justifyContent='space-between' alignItems='flex-start' sx={{ paddingTop: '16px' }}>
          <Typography
            variant='h4'
            sx={{
              color: '#1F4E8D',
              fontSize: '1.7rem',
              paddingLeft: '6px'
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
        <DialogContentText sx={{ mb: 2 }}>{description}</DialogContentText>

        {/* TextArea */}
        <TextField
          sx={{ marginTop: '5px' }}
          multiline
          rows={4}
          fullWidth
          variant='outlined'
          placeholder='Reason'
          value={textValue}
          onChange={e => {
            setTextValue(e.target.value)
            setError('')
          }}
          error={!!error}
          helperText={error}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '20px' }}>
          <CustomButton onClick={onClose} variant='outlined'>
            Cancel
          </CustomButton>
          <CustomButton variant='contained' onClick={handleConfirm}>
            Confirm
          </CustomButton>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default CancelVideoCallsAndSiteVisist
