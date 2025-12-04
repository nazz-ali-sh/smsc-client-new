'use client'

import { useRef, useState } from 'react'
import type { MouseEvent } from 'react'

import Image from 'next/image'

import PerfectScrollbar from 'react-perfect-scrollbar'
import { useSelector } from 'react-redux'
import { DialogActions, DialogContent, DialogContentText, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import Avatar from '../../../public/images/dashboardImages/notificationAvatar.svg'
import { useNotifications } from '@/hooks/useNotifications'
import CustomButton from '@/common/CustomButton'
import CustomTooltip from '@/common/CustomTooltip'
import { formatTime } from '@/utils/dateFormater'
import SuccessModal from '@/common/SucessModal'
import { reSchedualAccepted, rmcSideVisitAccept } from '@/services/site_visit_apis/site_visit_api'
import CommonModal from '@/common/CommonModal'
import { useStatusNavigation } from './NotificationNavigation'

const NotificationDropDown = () => {
  const navigationOnRoutes = useStatusNavigation()

  const [successOpen, setSuccessOpen] = useState(false)
  const [videocallacceptedid, setVideoCallAcceptedId] = useState<number | null>(null)
  const [visitsSchedualInviteId, setVisitsSchedualInviteId] = useState<number | null>(null)
  const [siteVisitAccpted, setSiteVisitAccpted] = useState(false)

  const userId = 29
  const tenderId = useSelector((state: any) => state?.rmcOnboarding?.tenderId)

  const {
    notifications,
    hasMore,
    loadMore,
    isLoadingMore,
    isLoading,
    markAsRead,
  } = useNotifications(userId)

  const containerRef = useRef<any>(null)

  // Scroll handler for infinite loading
  const handleScroll = () => {
    if (!containerRef.current || isLoadingMore || !hasMore) return

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100 

    if (isNearBottom) {
      loadMore() 
    }
  }

  const handleReadNotification = async (event: MouseEvent<HTMLElement>, notificationId: number, isRead: boolean) => {
    event.stopPropagation()

    if (!isRead) {
      try {
        await markAsRead(notificationId)
      } catch (error) {
        console.error('Failed to mark notification as read:', error)
      }
    }
  }

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
    }
  })

  const handleAgainReschedual = () => {
    if (videocallacceptedid && tenderId) {
      rechedualRmcAgain.mutate({ videocallacceptedid, rmctender_id: tenderId })
    }
  }

  const acceptedSiteVsist = useMutation({
    mutationFn: ({ invite_id, rmctender_id }: { invite_id: number; rmctender_id: number }) =>
      rmcSideVisitAccept(invite_id, rmctender_id),
    onSuccess: (data: any) => {
      toast.success(data?.message || 'Site visit accepted!')
      setSiteVisitAccpted(false)
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to accept'

      toast.error(errorMessage)
      setSiteVisitAccpted(false)
    }
  })

  const handleSiteVisitAccepted = () => {
    if (visitsSchedualInviteId && tenderId) {
      acceptedSiteVsist.mutate({ invite_id: visitsSchedualInviteId, rmctender_id: tenderId })
    }
  }

  const getInvitationId = (notification: any) => {
    const code = notification.event?.code

    if (['VID_006', 'VID_002'].includes(code)) return notification.data?.call_id
    if (['SIT_006', 'SIT_002'].includes(code)) return notification.data?.visit_id
    if (['VID_001', 'SIT_001'].includes(code)) return notification.data?.invite_id
    
return null
  }

  return (
    <>
      <PerfectScrollbar
        className='bs-full'
        options={{ wheelPropagation: false, suppressScrollX: true }}
        containerRef={(ref) => (containerRef.current = ref)}
        onScrollY={handleScroll}
      >
        {isLoading ? (
          <div className='flex justify-center py-8'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className='flex flex-col items-center justify-center p-8'>
            <i className='ri-notification-off-line text-6xl text-textDisabled mb-2' />
            <Typography variant='body2' color='text.secondary'>
              No notifications yet
            </Typography>
          </div>
        ) : (
          <>
            {notifications.map((notification) => {
              const isRead = notification?.read_at !== null
              const invitationId = getInvitationId(notification)

              return (
                <div key={notification.id} className='bg-white m-[18px]'>
                  <section
                    className={`flex flex-col justify-between pl-3 pb-3 ml-3 gap-x-3 cursor-pointer rounded-lg border-2 ${
                      isRead ? 'bg-white border-gray-200' : 'bg-[#f2fcff] border-blue-200'
                    }`}
                  >
                    <div
                      onClick={(e) => handleReadNotification(e, notification.id, isRead)}
                      className='flex justify-between items-center mt-[10px] mb-[10px]'
                    >
                      <div className='flex items-center'>
                        <Image src={Avatar} alt='Avatar' className='w-[28px] h-[32px]' />
                        <Typography variant='body2' className='font-semibold pl-[8px]' color='text.primary'>
                          {notification.title}
                        </Typography>
                      </div>
                      <Typography variant='caption' className='text-[10px] mr-[15px]' color='text.disabled'>
                        {formatTime(notification.created_at)}
                      </Typography>
                    </div>

                    <Typography variant='caption' className='pl-[36px] text-secondary'>
                      {notification.message}
                    </Typography>

                    <div className='flex justify-end mr-[10px] mt-4'>
                      {notification?.event?.code === 'VID_006' || notification?.event?.code === 'SIT_006' ? (
                        <CustomTooltip text='Reschedule' position='left'>
                          <span
                            onClick={(e) => {
                              e.stopPropagation()
                              if (notification?.event?.code === 'VID_006') setVideoCallAcceptedId(invitationId)
                              else setVisitsSchedualInviteId(invitationId)
                              navigationOnRoutes(notification?.event?.code, invitationId)
                            }}
                            className='size-[33px] rounded-[5px] cursor-pointer bg-[#c1effe] text-[#35C0ED] flex justify-center items-center'
                          >
                            <i className='ri-edit-box-line'></i>
                          </span>
                        </CustomTooltip>
                      ) : notification?.event?.code === 'SIT_002' ? (
                        <div className='flex gap-2'>
                          <CustomTooltip text='Accept'>
                            <span
                              onClick={(e) => {
                                e.stopPropagation()
                                setVisitsSchedualInviteId(invitationId)
                                setSiteVisitAccpted(true)
                              }}
                              className='size-[33px] rounded-[5px] cursor-pointer bg-[#c1effe] text-[#35C0ED] flex justify-center items-center'
                            >
                              <i className='ri-check-line' />
                            </span>
                          </CustomTooltip>
                          <CustomTooltip text='Reschedule'>
                            <span
                              onClick={(e) => {
                                e.stopPropagation()
                                setVisitsSchedualInviteId(invitationId)
                                navigationOnRoutes(notification?.event?.code, invitationId)
                              }}
                              className='size-[33px] rounded-[5px] cursor-pointer bg-[#c1effe] text-[#35C0ED] flex justify-center items-center'
                            >
                              <i className='ri-edit-box-line'></i>
                            </span>
                          </CustomTooltip>
                        </div>
                      ) : notification?.event?.code === 'VID_002' ? (
                        <div className='flex gap-2'>
                          <CustomTooltip text='Accept'>
                            <span
                              onClick={(e) => {
                                e.stopPropagation()
                                setVideoCallAcceptedId(invitationId)
                                setSuccessOpen(true)
                              }}
                              className='size-[33px] rounded-[5px] cursor-pointer bg-[#c1effe] text-[#35C0ED] flex justify-center items-center'
                            >
                              <i className='ri-check-line' />
                            </span>
                          </CustomTooltip>
                          <CustomTooltip text='View Details'>
                            <span
                              onClick={(e) => {
                                e.stopPropagation()
                                setVideoCallAcceptedId(invitationId)
                                navigationOnRoutes(notification?.event?.code, invitationId)
                              }}
                              className='size-[33px] rounded-md bg-[#c1effe] cursor-pointer flex items-center justify-center'
                            >
                              <i className='ri-eye-line text-[#26C6F9]'></i>
                            </span>
                          </CustomTooltip>
                        </div>
                      ) : (
                        <CustomTooltip text='View Details'>
                          <span
                            onClick={(e) => {
                              e.stopPropagation()
                              navigationOnRoutes(notification?.event?.code)
                            }}
                            className='w-9 h-9 rounded-md bg-[#c1effe] flex items-center justify-center cursor-pointer'
                          >
                            <i className='ri-eye-line text-[#26C6F9] text-sm'></i>
                          </span>
                        </CustomTooltip>
                      )}
                    </div>
                  </section>
                </div>
              )
            })}

            {isLoadingMore && (
              <div className='flex justify-center py-6'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
              </div>
            )}

            {!hasMore && notifications.length > 0 && (
              <div className='text-center py-6 text-gray-500 text-sm'>
                You're all caught up!
              </div>
            )}
          </>
        )}
      </PerfectScrollbar>

      <SuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        onConfirm={handleAgainReschedual}
        cancelButton='Cancel'
        message='Success! You have sent the new meeting time.'
        title='Reschedule Request Accepted!'
        confirmButtonText='OK'
      />

      <CommonModal
        isOpen={siteVisitAccpted}
        handleClose={() => setSiteVisitAccpted(false)}
        header='Reschedule Request Accepted!'
        headerSx={{ color: '#1F4E8D', fontSize: '26px', fontWeight: 600 }}
        isBorder
        maxWidth='sm'
        fullWidth
      >
        <DialogContent>
          <DialogContentText sx={{ color: '#696969', fontSize: '16px', mt: 1 }}>
            Success! You have accepted the rescheduled site visit.
          </DialogContentText>
        </DialogContent>
        <DialogActions className='flex justify-between'>
          <CustomButton variant='outlined' onClick={() => setSiteVisitAccpted(false)}>
            Cancel
          </CustomButton>
          <CustomButton variant='contained' onClick={handleSiteVisitAccepted}>
            Confirm
          </CustomButton>
        </DialogActions>
      </CommonModal>
    </>
  )
}

export default NotificationDropDown
