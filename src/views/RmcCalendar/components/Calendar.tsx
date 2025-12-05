import { useEffect, useRef, useState } from 'react'

import type { Dispatch } from '@reduxjs/toolkit'
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { CalendarOptions } from '@fullcalendar/core'
import { useDispatch, useSelector } from 'react-redux'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'react-toastify'

import { Box, DialogContent, DialogContentText } from '@mui/material'

import type { CalendarColors, CalendarType } from '@/types/apps/calendarTypes'
import VideosCallsModal from '@/common/VideosCallsModal'
import PendingModal from '@/common/PendingModals'
import SiteVisitsModal from '@/common/SiteVisitsModal'
import CancelVideoCallsAndSiteVisist from '@/common/CancelVideoCallsAndSiteVisist'
import RejectModal from '@/common/RejectModal'
import PendingSiteVisitModal from '@/common/PendingSiteVisitModal'
import { reSchedualAccepted, rmcSideVisitAccept } from '@/services/site_visit_apis/site_visit_api'
import JoinMeetingModal from '@/common/JoinMeetingModal'
import CommonModal from '@/common/CommonModal'
import { setCalendarApiPayload } from '@/redux-store/slices/rmcCalendar'
import { formatCalendarDate } from '@/utils/dateformate'

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
  const [sitependingsModalOpen, setSitePendingsModalOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const [siteVisitRejectedModal, setsiteVisitRejectedModal] = useState(false)
  const [selectedPillsData, setselectedPillsData] = useState<PillsData>()
  const [isOpen, setIsOpen] = useState(false)
  const [siteVisitsModalOpen, setSiteVisitsModalOpen] = useState(false)
  const [joinSiteVisitmetting, setJoinSiteVisitMetting] = useState(false)
   const dispatch = useDispatch()

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

  const rmctender_id = useSelector((state: any) => state?.rmcOnboarding?.tenderId)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (calendarApi === null) {
      // @ts-ignore
      setCalendarApi(calendarRef.current?.getApi())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleReject = () => {
    setPendingsModalOpen(false)
    setConfirmOpen(true)
  }

  const handleModalClose = () => {
    setIsOpen(false)
  }

  const handleReschedualVideoCall = () => {
    setPendingsModalOpen(false)
    setOnlineCallsModalOpen(true)
  }

  const onCanceledSiteVisit = () => {
    setSitePendingsModalOpen(false)
    setConfirmOpen(true)
  }

  const onSiteVisitReschedule = () => {
    setSiteVisitsModalOpen(true)
  }

  const onRejectedSiteVisit = () => {
    setsiteVisitRejectedModal(true)
  }

  const rescheduledCallDate = () => {
    setOnlineCallsModalOpen(true)
  }

  const reschedualeSiteInvite = () => {
    setSiteVisitsModalOpen(true)
  }

  const cancelSiteVisitCancel = () => {
    setConfirmOpen(true)
  }

  const onVideoCallRejected = () => {
    setsiteVisitRejectedModal(true)
  }

  const cancelVideoCall = () => {
    setConfirmOpen(true)
  }

  const rechedualRmcAgain = useMutation({
    mutationFn: ({ invite_id, tender_id }: { invite_id: number; tender_id: number }) =>
      rmcSideVisitAccept(invite_id, tender_id),
    onSuccess: (data: any) => {
      toast.success(data?.message || 'Invite sent successfully!')

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

  const onConfirmSiteVisit = () => {
    rechedualRmcAgain.mutate({
      invite_id: selectedPillsData?.invite_Id,
      tender_id: rmctender_id
    })
  }

  const accepVideCallInvite = useMutation({
    mutationFn: ({ invite_id, tender_id }: { invite_id: any; tender_id: number }) =>
      reSchedualAccepted(invite_id, tender_id),
    onSuccess: (data: any) => {
      toast.success(data?.message || 'Invite sent successfully!')
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

  const onConfirmVideCall = () => {
    accepVideCallInvite.mutate({
      invite_id: selectedPillsData?.invite_Id,
      tender_id: rmctender_id
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


   datesSet: (dateInfo) => {

  const { yearMonth, fullDate } = formatCalendarDate(dateInfo.start);

  dispatch(
    setCalendarApiPayload({
      tenderId: rmctender_id,
      status: 'month',
      selectedYearMonth: yearMonth,     
      selectedFullDate: fullDate      
    })
  );
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

      <VideosCallsModal
        open={onlineCallsModalOpen}
      onClose={() => setOnlineCallsModalOpen(false)}
        componentTypes='fromCalender'
        types='reschedual'
        mainSiteVisitVideoCalls={undefined}
        calanderReschedualData={selectedPillsData}
      />

      <RejectModal
        open={siteVisitRejectedModal}
        setConfirmOpen={setsiteVisitRejectedModal}
        title='Reschedule Request Rejected!'
        description={`You have rejected the reschedule request from ${
          selectedPillsData && selectedPillsData?.pma_username
        }. The meeting will not be updated. Please provide a reason for the rejection in the box below. This explanation will be sent to the managing agent.`}
        onClose={() => setsiteVisitRejectedModal(false)}
        onConfirm={() => {}}
        calanderSiteVisitReject={selectedPillsData}
        types={`${selectedPillsData?.calendartype == 'SiteVisit' ? 'siteVisitRejectCalander' : 'fromVideoCalander'}`}
      />

      <CancelVideoCallsAndSiteVisist
        open={confirmOpen}
        title={`${selectedPillsData?.status == 'pending' ? `Pending ${selectedPillsData?.calendartype == 'VideoCall' ? 'Call' : 'Site Visit'} Cancelled !` : selectedPillsData?.status == 'rescheduled' ? 'Rescheduled Request Cancel ' : `Upcoming ${selectedPillsData?.calendartype == 'VideoCall' ? 'Video Call' : 'Site Visit'}  Cancel`}`}
        description={`You have successfully cancelled your ${selectedPillsData?.status == 'accepted' ? 'upcoming' : 'pending'}  ${selectedPillsData?.calendartype == 'VideoCall' ? 'call' : 'site visit'}  with ${selectedPillsData && selectedPillsData?.pma_username} . Please provide a brief reason for the cancellation in the box below. This explanation will be sent to the Managing Agent.`}
        onClose={() => setConfirmOpen(false)}
        calanderCancelData={selectedPillsData}
        onConfirm={() => {}}
        types={`${selectedPillsData?.calendartype == 'SiteVisit' ? 'fromSiteVisitCalander' : 'fromVideoCalander'} `}
      />

      <SiteVisitsModal
        open={siteVisitsModalOpen}
        onClose={() => setSiteVisitsModalOpen(false)}
        types='siteVisistfromCalander'
        calanderReschedualData={selectedPillsData}
      />

      <PendingModal
        title={` ${selectedPillsData?.status == 'rescheduled' ? ' Rescheduled Meeting' : selectedPillsData?.status == 'pending' ? 'Pending Video Call Details' : ''} `}
        open={pendingsModalOpen}
        onClose={() => setPendingsModalOpen(false)}
        onReject={handleReject}
        onReschedule={handleReschedualVideoCall}
        onConfirmVideCall={onConfirmVideCall}
        onVideoCallRejected={onVideoCallRejected}
        siteVisitData={selectedPillsData}
        types={`${selectedPillsData?.status == 'rescheduled' ? ' rescheduled ' : ''}`}
      />

      <PendingSiteVisitModal
        title={` ${selectedPillsData?.status == 'rescheduled' ? ' Rescheduled Meeting' : selectedPillsData?.status == 'pending' ? 'Pending Meeting' : ''} `}
        siteVisitData={selectedPillsData}
        open={sitependingsModalOpen}
        onClose={() => setSitePendingsModalOpen(false)}
        onCanceledSiteVisit={onCanceledSiteVisit}
        onSiteVisitReschedule={onSiteVisitReschedule}
        onRejectedSiteVisit={onRejectedSiteVisit}
        onConfirmSiteVisit={onConfirmSiteVisit}
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
        cancelSiteVisitCancel={cancelSiteVisitCancel}
        cancelVideoCall={cancelVideoCall}
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
