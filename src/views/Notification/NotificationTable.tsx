'use client'

import { useState } from 'react'

import { Box, Card, Typography, DialogActions, DialogContent, DialogContentText } from '@mui/material'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'react-toastify'

import { useSelector } from 'react-redux'

import CommonTable from '@/common/CommonTable'

import CustomTooltip from '@/common/CustomTooltip'
import SuccessModal from '@/common/SucessModal'

import CustomButton from '@/common/CustomButton'
import CommonModal from '@/common/CommonModal'
import { reSchedualAccepted, rmcSideVisitAccept } from '@/services/site_visit_apis/site_visit_api'
import { useStatusNavigation } from './NotificationNavigation'
import { notificationApi } from '@/services/notification-apis/notification-api'

interface NotificationTableProps {
  notifications: any[]
}

const NotificationTable = ({ notifications }: NotificationTableProps) => {
  const [successOpen, setSuccessOpen] = useState(false)
  const [siteVisitAccpted, setSiteVisitAccpted] = useState(false)
  const [videocallacceptedid, setVideoCallAcceptedId] = useState<number | any>()
  const [visitsSchedualInviteId, setVisitsSchedualInviteId] = useState<number | any>()
  const tenderId = useSelector((state: any) => state?.rmcOnboarding?.tenderId)
  const navigationOnRoutes = useStatusNavigation()
  const queryClient = useQueryClient()

  const rechedualRmcAgain = useMutation({
    mutationFn: ({ videocallacceptedid, rmctender_id }: { videocallacceptedid: any; rmctender_id: number }) =>
      reSchedualAccepted(videocallacceptedid, rmctender_id),
    onSuccess: (data: any) => {
      toast.success(data?.message || 'Invite sent successfully!')
      setSuccessOpen(true)
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to send invite'

      toast.error(errorMessage)
      console.error('Failed to send invite:', error)
    }
  })

  const handleAgainReschedual = () => {
    debugger
    rechedualRmcAgain.mutate({
      videocallacceptedid,
      rmctender_id: tenderId
    })
  }

  const acceptedSiteVsist = useMutation({
    mutationFn: ({ invite_id, rmctender_id }: { invite_id: number; rmctender_id: number }) =>
      rmcSideVisitAccept(invite_id, rmctender_id),
    onSuccess: (data: any) => {
      toast.success(data?.message || 'Invite sent successfully!')
      setSuccessOpen(false)
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to send invite'

      setSuccessOpen(false)
      toast.error(errorMessage)
      console.error('Failed to send invite:', error)
    }
  })

  const handleSiteVisitAccepted = () => {
    acceptedSiteVsist.mutate({
      invite_id: visitsSchedualInviteId,
      rmctender_id: tenderId
    })
  }

  const deleteNotificationMutation = useMutation({
    mutationFn: (id: number) => notificationApi.deleteNotification(id),
    onSuccess: () => {
      toast.success('Notification deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['notifications', 'list'] })
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unreadCount'] })
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to delete notification'

      toast.error(errorMessage)
      console.error('Delete notification error:', error)
    }
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)

    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getInvitationId = (notification: any) => {
    const code = notification.event?.code

    if (code === 'VID_006' || code === 'VID_002') return notification.data?.call_id
    if (code === 'SIT_006' || code === 'SIT_002') return notification.data?.visit_id
    if (code === 'VID_001' || code === 'SIT_001') return notification.data?.invite_id

    return null
  }

  const tableColumns = [
    {
      accessorKey: 'title',
      header: 'Notification Title',
      cell: ({ row }: any) => <Typography sx={{ fontSize: '14px', color: '#374151' }}>{row.original.title}</Typography>
    },
    {
      accessorKey: 'message',
      header: () => <Box sx={{ textAlign: 'center', width: '100%' }}>Description</Box>,
      cell: ({ row }: any) => (
        <Typography sx={{ fontSize: '14px', color: '#6B7280' }}>{row.original.message}</Typography>
      )
    },
   {
  accessorKey: 'time_ago',
  header: () => (
    <Box sx={{ textAlign: 'center', width: '100%' }}>
      Time & Date
    </Box>
  ),
  cell: ({ row }: any) => (
    <Box sx={{ textAlign: 'center' }}>
      <Typography sx={{ fontSize: '14px', color: '#6B7280' }}>
        {formatDate(row.original.created_at)}
      </Typography>
      <Typography sx={{ fontSize: '12px', color: '#9CA3AF', mt: 0.5 }}>
        {row.original.time_ago}
      </Typography>
    </Box>
  ),
},
    {
  accessorKey: 'action',
  header: () => (
    <Box sx={{ textAlign: 'center', width: '100%' }}>
      ACTION
    </Box>
  ),
  enableSorting: false,
  cell: ({ row }: any) => {
    const notification = row.original
    const invitationId = getInvitationId(notification)

    const getActionButtons = () => {
      switch (notification.event?.code) {
        case 'VID_006':
          return (
            <CustomTooltip text='Reschedule Video Call'>
              <span
                onClick={() => {
                  setVideoCallAcceptedId(invitationId)
                  navigationOnRoutes(notification.event.code, invitationId)
                }}
                className='size-9 rounded bg-[#c1effe] text-[#35C0ED] flex items-center justify-center cursor-pointer hover:bg-[#a0e8ff] transition'
              >
                <i className='ri-edit-box-line text-lg' />
              </span>
            </CustomTooltip>
          )

        case 'SIT_006':
          return (
            <CustomTooltip text='Reschedule Site Visit'>
              <span
                onClick={() => {
                  setVisitsSchedualInviteId(invitationId)
                  navigationOnRoutes(notification.event.code, invitationId)
                }}
                className='size-9 rounded bg-[#c1effe] text-[#35C0ED] flex items-center justify-center cursor-pointer hover:bg-[#a0e8ff] transition'
              >
                <i className='ri-edit-box-line text-lg' />
              </span>
            </CustomTooltip>
          )

        case 'SIT_002':
          return (
            <>
              <CustomTooltip text='Accept Rescheduled Site Visit'>
                <span
                  onClick={() => {
                    setVisitsSchedualInviteId(invitationId)
                    setSiteVisitAccpted(true)
                  }}
                  className='size-9 rounded bg-[#c1effe] text-[#35C0ED] flex items-center justify-center cursor-pointer hover:bg-[#a0e8ff] transition'
                >
                  <i className='ri-check-line text-lg' />
                </span>
              </CustomTooltip>

              <CustomTooltip text='Reschedule'>
                <span
                  onClick={() => {
                    setVisitsSchedualInviteId(invitationId)
                    navigationOnRoutes(notification.event.code, invitationId)
                  }}
                  className='size-9 rounded bg-[#c1effe] text-[#35C0ED] flex items-center justify-center cursor-pointer hover:bg-[#a0e8ff] transition'
                >
                  <i className='ri-edit-box-line text-lg' />
                </span>
              </CustomTooltip>
            </>
          )

        case 'VID_002':
          return (
            <>
              <CustomTooltip text='Accept Rescheduled Video Call'>
                <span
                  onClick={() => {
                    setVideoCallAcceptedId(invitationId)
                    setSuccessOpen(true)
                  }}
                  className='size-9 rounded bg-[#c1effe] text-[#35C0ED] flex items-center justify-center cursor-pointer hover:bg-[#a0e8ff] transition'
                >
                  <i className='ri-check-line text-lg' />
                </span>
              </CustomTooltip>

              <CustomTooltip text='View Details'>
                <span
                  onClick={() => {
                    setVideoCallAcceptedId(invitationId)
                    navigationOnRoutes(notification.event.code, invitationId)
                  }}
                  className='size-9 rounded bg-[#c1effe] text-[#35C0ED] flex items-center justify-center cursor-pointer hover:bg-[#a0e8ff] transition'
                >
                  <i className='ri-eye-line text-lg' />
                </span>
              </CustomTooltip>
            </>
          )

        default:
          return (
            <CustomTooltip text='View Details'>
              <span
                onClick={() => navigationOnRoutes(notification.event?.code)}
                className='size-9 rounded bg-[#c1effe] text-[#26C6F9] flex items-center justify-center cursor-pointer hover:bg-[#a0e8ff] transition'
              >
                <i className='ri-eye-line text-lg' />
              </span>
            </CustomTooltip>
          )
      }
    }

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5, py: 1 }}>
        {getActionButtons()}

        <CustomTooltip text='Delete Notification'>
          <span
            onClick={() => deleteNotificationMutation.mutate(notification.id)}
            className='size-9 rounded bg-red-100 text-red-600 flex items-center justify-center cursor-pointer hover:bg-red-200 transition'
          >
            <i className='ri-delete-bin-line text-lg' />
          </span>
        </CustomTooltip>
      </Box>
    )
  },
},
  ]

  return (
    <Box sx={{ marginTop: 12, marginBottom: 4 }}>
      <Card sx={{ backgroundColor: '#FFFFFF', borderRadius: '12px', overflow: 'hidden' }}>
        <Typography sx={{ fontSize: '28px', fontWeight: 600, padding: '32px' }}>Notifications</Typography>
        <CommonTable
          data={notifications}
          columns={tableColumns}
          pagination={{ pageIndex: 0, pageSize: 5 }}
          pageSizeOptions={[5, 10, 25]}
        />
      </Card>

      <SuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        onConfirm={handleAgainReschedual}
        cancelButton='Cancel'
        message='Success! You have Sent the new meeting time.'
        title='Reschedule Request Accepted!'
        confirmButtonText='Confirm'
      />

      <CommonModal
        isOpen={siteVisitAccpted}
        headerSx={{ color: '#1F4E8D', fontSize: '26px', fontWeight: 600 }}
        isBorder
        handleClose={() => setSiteVisitAccpted(false)}
        header='Reschedule Request Accepted!'
        maxWidth='sm'
        fullWidth
      >
        <DialogContent>
          <DialogContentText sx={{ color: '#696969', fontSize: '16px', marginTop: '8px', whiteSpace: 'pre-line' }}>
            Success! You have Sent the new meeting time.
          </DialogContentText>
        </DialogContent>
        <DialogActions className='flex justify-between items-center'>
          <CustomButton variant='outlined' onClick={() => setSiteVisitAccpted(false)} autoFocus>
            Cancel
          </CustomButton>

          <div className='flex justify-end w-full'>
            <CustomButton variant='contained' onClick={handleSiteVisitAccepted} autoFocus>
              Confirm
            </CustomButton>
          </div>
        </DialogActions>
      </CommonModal>
    </Box>
  )
}

export default NotificationTable
