'use client'

import React, { useState } from 'react'

import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Box } from '@mui/material'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

import {
  reSchedualRejectInvite,
  rmcSiteVisitCancel,
  rmcSiteVisitRejected
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
  calanderSiteVisitReject?: any
}

const DeleteModal = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  types,
  SideVisitsSchedualInviteId,
  VideoCallInviteId,
  setConfirmOpen,
  calanderSiteVisitReject
}: DeleteModalProps) => {
  const [textValue, setTextValue] = useState('')
  const [error, setError] = useState('')

  const rmctender_id = useSelector((state: any) => state?.rmcOnboarding?.tenderId)

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

  const sideVisitRejected = useMutation({
    mutationFn: ({ invite_Id, rmctender_id, message }: { invite_Id: number; rmctender_id: number; message: string }) =>
      rmcSiteVisitRejected(invite_Id, rmctender_id, message),
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

    if (types === 'SiteVisits' || types === 'reject' || types == 'siteVisitRejectCalander') {
      const invite_Id = SideVisitsSchedualInviteId || calanderSiteVisitReject?.invite_Id

      sideVisitRejected.mutate({
        invite_Id,
        rmctender_id,
        message: textValue
      })
    } else if (types === 'cancel') {
      sideVisitCancel.mutate({
        SideVisitsSchedualInviteId,
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

export default DeleteModal
