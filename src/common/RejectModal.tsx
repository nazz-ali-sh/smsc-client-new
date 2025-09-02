'use client'

import React, { useState } from 'react'

import { Dialog, DialogTitle, DialogContent, DialogContentText, Button, TextField, Box } from '@mui/material'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

import { useSelector } from 'react-redux'

import { reSchedualRejectInvite, rmcSiteVisitRejected } from '@/services/site_visit_apis/site_visit_api'
import type { RootState } from '@/redux-store'

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
}

const DeleteModal = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  types,
  SideVisitsSchedualInviteId,
  VideoCallInviteId
}: DeleteModalProps) => {
  const [textValue, setTextValue] = useState('')

  const rmctender_id = useSelector((state: RootState) => state?.tenderForm?.tender_id)

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
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to reject invite'

      setTextValue('')
      toast.error(errorMessage)
      console.error('Failed to reject invite:', error)
    }
  })

  const sideVisitRejected = useMutation({
    mutationFn: ({
      SideVisitsSchedualInviteId,
      rmctender_id,
      message
    }: {
      SideVisitsSchedualInviteId: number
      rmctender_id: number
      message: string
    }) => rmcSiteVisitRejected(SideVisitsSchedualInviteId, rmctender_id, message),
    onSuccess: (data: any) => {
      toast.success(data?.message || 'Invite rejected successfully!')
      if (onConfirm) onConfirm()
      onClose()
      setTextValue('')
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to reject invite'

      setTextValue('')
      toast.error(errorMessage)
      console.error('Failed to reject invite:', error)
    }
  })

  const handleConfirm = () => {
    if (types == 'SiteVisits') {
      sideVisitRejected.mutate({
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

        {/* TextArea */}
        <TextField
          multiline
          rows={4}
          fullWidth
          variant='outlined'
          placeholder='Reason'
          value={textValue}
          onChange={e => setTextValue(e.target.value)}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '20px' }}>
          <Button onClick={onClose} variant='outlined'>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleConfirm}>
            {'Confirm'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteModal
