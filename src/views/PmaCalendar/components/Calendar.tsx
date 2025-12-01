import { useEffect, useRef, useState } from 'react'

import type { Dispatch } from '@reduxjs/toolkit'
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { CalendarOptions } from '@fullcalendar/core'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'react-toastify'

import { Box, DialogContent, DialogContentText } from '@mui/material'

import type { CalendarColors, CalendarType } from '@/types/apps/calendarTypes'
import PendingModal from '@/common/PendingModals'

import PendingSiteVisitModal from '@/common/PendingSiteVisitModal'
import JoinMeetingModal from '@/common/JoinMeetingModal'
import CommonModal from '@/common/CommonModal'

import VideosCallsModal from '../../../common/VideosCallsModal'
import SiteVisitsModal from '../../../common/SiteVisitsModal'
import SuccessModal from '@/common/SucessModal'
import { pmaVideoCallAccept } from '@/services/pma_video_call/pma_video_call'
import { pmaSideVisitAccept } from '@/services/pma_site_visit/pma_site_visit'

type CalenderProps = {
  calendarStore?: CalendarType
  calendarApi: any
  setCalendarApi: (val: any) => void
  calendarsColor: CalendarColors
  dispatch: Dispatch
  handleLeftSidebarToggle: () => void
  handleAddEventSidebarToggle: () => void
  calenderEventData?: any
}

const Calendar = (props: CalenderProps) => {
  const { calendarApi, setCalendarApi, calendarsColor, calenderEventData } = props

  const [onlineCallsModalOpen, setOnlineCallsModalOpen] = useState(false)
  const [pendingsModalOpen, setPendingsModalOpen] = useState(false)
  const [SuccessOpen, setSuccessOpen] = useState(false)

  const [sitependingsModalOpen, setSitePendingsModalOpen] = useState(false)

  const [selectedPillsData, setselectedPillsData] = useState<PillsData>()

  console.log(selectedPillsData)

  const [isOpen, setIsOpen] = useState(false)
  const [siteVisitsModalOpen, setSiteVisitsModalOpen] = useState(false)
  const [joinSiteVisitmetting, setJoinSiteVisitMetting] = useState(false)
  const [isPmaSiteVisitAccepted, setIsPmaSiteVisitAccepted] = useState(false)



  interface PillsData {
    pma_username: PillsData | undefined
    invite_Id: any
    tender_id?: any
    status?: any
    zoom_link: string
    calendartype?: any
    slot?: any
    block_name?: any
    region?: any
    location?: any
  }

  const calendarRef = useRef<FullCalendar>(null)

  const queryClient = useQueryClient()

  useEffect(() => {
    if (calendarApi === null) {
      // @ts-ignore
      setCalendarApi(calendarRef.current?.getApi())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  const handleModalClose = () => {
    setIsOpen(false)
  }

  const handleReschedualVideoCall = () => {
    setPendingsModalOpen(false)
    setOnlineCallsModalOpen(true)
  }

  const PmaSiteVisitReschedual = () => {
    setSiteVisitsModalOpen(true)
    setJoinSiteVisitMetting(false)
    setSitePendingsModalOpen(false)
  }

  const rescheduledCallDate = () => {
    setOnlineCallsModalOpen(true)
  }

  const reschedualeSiteInvite = () => {
    setSiteVisitsModalOpen(true)
  }

  const PmaReschedualVideoCall = () => {
    setOnlineCallsModalOpen(true)

    setJoinSiteVisitMetting(false)
  }

  const pmaCallAccept = () => {
    setSuccessOpen(true)
  }

  const pmaSiteVisitAccepted = () => {
    setIsPmaSiteVisitAccepted(true)
    setSitePendingsModalOpen(false)
  }

  const handlePmaVideoAccaptance = () => {
    setPendingsModalOpen(false)
    pmaVideoCallAccapted.mutate({
      invite_id: selectedPillsData?.invite_Id,
      rmctender_id: selectedPillsData?.tender_id
    })
  }

  const pmaVideoCallAccapted = useMutation({
    mutationFn: ({ invite_id, rmctender_id }: { invite_id: any; rmctender_id: any }) =>
      pmaVideoCallAccept(invite_id, rmctender_id),
    onSuccess: (data: any) => {
      toast.success(data?.message || 'Invite sent successfully!')
      setSuccessOpen(false)
      queryClient.invalidateQueries({
        queryKey: ['calendarDates']
      })
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to send invite'

      toast.error(errorMessage)
      console.error('Failed to send invite:', error)
    }
  })

 
  const rechedualRmcAgain = useMutation({
    mutationFn: ({ visitsSchedualInviteId, rmctender_id }: { visitsSchedualInviteId: any; rmctender_id: any }) =>
      pmaSideVisitAccept(visitsSchedualInviteId, rmctender_id),
    onSuccess: (data: any) => {
      toast.success(data?.message || 'Invite sent successfully!')
      setIsPmaSiteVisitAccepted(false)

      queryClient.invalidateQueries({
        queryKey: ['calendarDates']
      })
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to send invite'

      toast.error(errorMessage)
      console.error('Failed to send invite:', error)
    }
  })

  const handlePmaSiteVisitAccaptance = () => {
    rechedualRmcAgain.mutate({
      visitsSchedualInviteId: selectedPillsData?.invite_Id,
      rmctender_id: selectedPillsData?.tender_id
    })
  }

  const siteVisitJoinCall = () => {
    if (!selectedPillsData?.zoom_link) {
      console.error('Zoom link not available')

      return
    }

    window.open(selectedPillsData.zoom_link, '_blank', 'noopener,noreferrer')
  }

  const calendarOptions: CalendarOptions = {
    events: calenderEventData,
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'sidebarToggle, prev, next, title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    views: {
      week: {
        titleFormat: { year: 'numeric', month: 'short', day: 'numeric' },
        slotDuration: '00:45:00'
      },
      day: {
        slotDuration: '00:45:00'
      }
    },
    navLinks: true,
    height: 'auto',
    contentHeight: 'auto',
    eventClassNames({ event: calendarEvent }: any) {
      // @ts-ignore
      const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar]
      const classes = [`event-bg-${colorName}`]

      const status = calendarEvent._def.extendedProps?.status

      if (status === 'pending') {
        classes.push('bg-gray-300')
      } else if (status === 'accepted') {
        classes.push('bg-[#35c0ed]')
      } else if (status === 'rescheduled') {
        classes.push('bg-yellow-300')
      } else if (status === 'cancelled') {
        classes.push('bg-red-400')
      } else if (status === 'rejected') {
        classes.push('bg-red-400')
      }

      return classes
    },
    eventClick({ event: clickedEvent, jsEvent }: any) {
      jsEvent.preventDefault()

      const selectedEventData = {
        ...clickedEvent._def,
        invite_Id: clickedEvent._def.extendedProps.invite_Id
      }

      setselectedPillsData(selectedEventData?.extendedProps)

      if (
        selectedEventData?.extendedProps?.calendartype === 'VideoCall' &&
        (selectedEventData?.extendedProps?.status === 'pending' ||
          selectedEventData?.extendedProps?.status === 'rescheduled')
      ) {
        setPendingsModalOpen(true)
      } else if (
        selectedEventData?.extendedProps?.calendartype === 'SiteVisit' &&
        (selectedEventData?.extendedProps?.status === 'pending' ||
          selectedEventData?.extendedProps?.status === 'rescheduled')
      ) {
        setSitePendingsModalOpen(true)
      } else if (
        selectedEventData?.extendedProps?.calendartype === 'SiteVisit' &&
        selectedEventData?.extendedProps?.status === 'accepted'
      ) {
        setJoinSiteVisitMetting(true)
      } else if (
        selectedEventData?.extendedProps?.calendartype === 'VideoCall' &&
        selectedEventData?.extendedProps?.status === 'accepted'
      ) {
        setJoinSiteVisitMetting(true)
      } else if (
        selectedEventData?.extendedProps?.calendartype === 'VideoCall' ||
        (selectedEventData?.extendedProps?.calendartype === 'SiteVisit' &&
          selectedEventData?.extendedProps?.status === 'cancelled')
      ) {
        setIsOpen(true)
      } else {
        setJoinSiteVisitMetting(true)
      }
    }
  }

  return (
    <>
      <style>
        {`
          .fc .fc-timegrid-slot {
            height: 60px !important; /* increase slot row height */
            
          }
          .fc .fc-timegrid-event {
            min-height: 50px !important; /* make events inside look taller */
          }
             .fc-event, 
    .fc-daygrid-event, 
    .fc-timegrid-event {
      cursor: pointer !important; /* show pointer on hover */
    }
        `}
      </style>
      <FullCalendar ref={calendarRef} {...calendarOptions} />

      {onlineCallsModalOpen && (
        <VideosCallsModal
          open={onlineCallsModalOpen}
          onClose={() => setOnlineCallsModalOpen(false)}
          componentTypes='fromCalender'
          types='pmavideoCallReschedual'
          mainSiteVisitVideoCalls={undefined}
          calanderReschedualData={selectedPillsData}
        />
      )}

      {siteVisitsModalOpen && (
        <SiteVisitsModal
          open={siteVisitsModalOpen}
          onClose={() => setSiteVisitsModalOpen(false)}
          types='PmaReschedual'
          calanderReschedualData={selectedPillsData}
        />
      )}

      <PendingModal
        title={` ${selectedPillsData?.status == 'rescheduled' ? ' Rescheduled Meeting' : selectedPillsData?.status == 'pending' ? 'Pending Video Call Details' : ''} `}
        open={pendingsModalOpen}
        onClose={() => setPendingsModalOpen(false)}
        onReschedule={handleReschedualVideoCall}
        onPmaReschedual={PmaReschedualVideoCall}
        pmaCallAccepted={pmaCallAccept}
        siteVisitData={selectedPillsData}
        types={`${selectedPillsData?.status == 'rescheduled' ? ' rescheduled ' : ''}`}
      />

      <SuccessModal
        open={SuccessOpen}
        onClose={() => setSuccessOpen(false)}
        onConfirm={handlePmaVideoAccaptance}
        cancelButton='Cancel'
        message='Success! You have Sent the new meeting time.'
        title='Reschedule Request Accepted!'
        confirmButtonText='Confirm'

      />

      <SuccessModal
        open={isPmaSiteVisitAccepted}
        onClose={() => setIsPmaSiteVisitAccepted(false)}
        onConfirm={handlePmaSiteVisitAccaptance}
        cancelButton='Cancel'
        message='Success! You have Sent the new meeting time.'
        title='Reschedule Request Accepted!'
        confirmButtonText='Confirm'

      />

      <PendingSiteVisitModal
        title={` ${selectedPillsData?.status == 'rescheduled' ? ' Rescheduled Meeting' : selectedPillsData?.status == 'pending' ? 'Pending Site Visit Meeting' : ''} `}
        siteVisitData={selectedPillsData}
        open={sitependingsModalOpen}
        onClose={() => setSitePendingsModalOpen(false)}
        pmaSiteVisitAccepted={pmaSiteVisitAccepted}
        PmaSiteVisitReschedual={PmaSiteVisitReschedual}
        types={`${selectedPillsData?.status == 'rescheduled' ? ' rescheduled ' : ''}`}
      />

      <JoinMeetingModal
        open={joinSiteVisitmetting}
        title={` ${selectedPillsData?.calendartype == 'SiteVisit' ? 'Upcoming Site Visit Details' : selectedPillsData?.calendartype == 'VideoCall' ? 'Upcoming Video Call Details' : ''} `}
        onClose={() => setJoinSiteVisitMetting(false)}
        siteVisitData={selectedPillsData}
        siteVisitJoinCall={siteVisitJoinCall}
        rescheduledCallDate={rescheduledCallDate}
        reschedualeSiteInvite={reschedualeSiteInvite}
        onPmaReschedual={PmaReschedualVideoCall}
        PmaSiteVisitReschedual={PmaSiteVisitReschedual}

      />

      <CommonModal
        isOpen={isOpen}
        handleClose={handleModalClose}
        header={` Cancel And Rejected Data `}
        maxWidth='sm'
        fullWidth
        headerSx={{ color: '#1F4E8D', fontSize: '26px', fontWeight: 600 }}
        isBorder
      >
        <Box sx={{ py: 2 }}>
          <DialogContent>
            <DialogContentText sx={{ marginTop: '5px' }}>
              <strong className='font-bold '>Date & Time: </strong> {selectedPillsData?.slot}
            </DialogContentText>
            <DialogContentText sx={{ marginTop: '5px' }}>
              <span className='font-bold'>Block Name: </span> {selectedPillsData?.block_name || 'no data '}{' '}
            </DialogContentText>
            <DialogContentText sx={{ marginTop: '5px' }}>
              <span className='font-bold'>Region: </span> {selectedPillsData?.region || 'No data'}{' '}
            </DialogContentText>
            <DialogContentText sx={{ marginTop: '5px' }}>
              {selectedPillsData?.location && <span className='font-bold'>Location: </span>}{' '}
              {selectedPillsData?.location && selectedPillsData?.location}{' '}
            </DialogContentText>
          </DialogContent>
        </Box>
      </CommonModal>
    </>
  )
}

export default Calendar
