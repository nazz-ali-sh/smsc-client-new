'use client'

import React, { useState } from 'react'

import { Dialog, DialogTitle, DialogContent, DialogContentText, Button, TextField, Box } from '@mui/material'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

import {
  reSchedualRejectInvite,
  rmcSiteVisitCancel,
  rmcVideoCallsCancel
} from '@/services/site_visit_apis/site_visit_api'

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

  const rmcData = useSelector((state: any) => state?.rmcOnboarding?.rmcData)
  const rmctender_id = rmcData?.tender_id

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

  const handleConfirm = () => {
    if (!textValue.trim()) {
      setError('Reason is required')

      return
    }

    if (types === 'SiteVisits' || types === 'reject') {
      sideVisitCancel.mutate({
        SideVisitsSchedualInviteId,
        rmctender_id,
        message: textValue
      })
    } else if (types === 'fromSiteVisitCalander') {
      sideVisitCancel.mutate({
        SideVisitsSchedualInviteId: calanderCancelData?.invite_Id,
        rmctender_id,
        message: textValue
      })
    } else if (types === 'VideoCallcancel') {
      videoCallCancel.mutate({
        VideoCallInviteId,
        rmctender_id,
        message: textValue
      })
    } else if (types?.trim().toLowerCase() === 'fromvideocalander') {
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
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>{description}</DialogContentText>

        {/* TextArea */}
        <TextField
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
          <Button onClick={onClose} variant='outlined'>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleConfirm}>
            Confirm
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default CancelVideoCallsAndSiteVisist
