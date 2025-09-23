import { useEffect, useRef, useState } from 'react'

import type { Dispatch } from '@reduxjs/toolkit'
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { CalendarOptions } from '@fullcalendar/core'
import { useSelector } from 'react-redux'

import { useMutation } from '@tanstack/react-query'

import { toast } from 'react-toastify'

import type { CalendarColors, CalendarType } from '@/types/apps/calendarTypes'
import VideosCallsModal from '@/common/VideosCallsModal'
import PendingModal from '@/common/PendingModals'
import SiteVisitsModal from '@/common/SiteVisitsModal'
import CancelVideoCallsAndSiteVisist from '@/common/CancelVideoCallsAndSiteVisist'
import RejectModal from '@/common/RejectModal'
import PendingSiteVisitModal from '@/common/PendingSiteVisitModal'
import { reSchedualAccepted, rmcSideVisitAccept } from '@/services/site_visit_apis/site_visit_api'
import JoinMeetingModal from '@/common/JoinMeetingModal'

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

  console.log(calenderEventData)
  const [onlineCallsModalOpen, setOnlineCallsModalOpen] = useState(false)
  const [pendingsModalOpen, setPendingsModalOpen] = useState(false)
  const [sitependingsModalOpen, setSitePendingsModalOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const [siteVisitRejectedModal, setsiteVisitRejectedModal] = useState(false)
  const [selectedPillsData, setselectedPillsData] = useState<PillsData>()
  const [callsAndSiteStatus, setCallsAndSiteStatus] = useState()
  const [siteVisitsModalOpen, setSiteVisitsModalOpen] = useState(false)
  const [joinSiteVisitmetting, setJoinSiteVisitMetting] = useState(false)

  interface PillsData {
    invite_Id: any
    tender_id?: any
    status?: any
    zoom_link: string
    calendartype?: any
  }

  const calendarRef = useRef<FullCalendar>(null)

  const rmcData = useSelector((state: any) => state?.rmcOnboarding?.rmcData)
  const rmctender_id = rmcData?.tender_id

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

  const rechedualRmcAgain = useMutation({
    mutationFn: ({ invite_id, tender_id }: { invite_id: number; tender_id: number }) =>
      rmcSideVisitAccept(invite_id, tender_id),
    onSuccess: (data: any) => {
      toast.success(data?.message || 'Invite sent successfully!')
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

      setCallsAndSiteStatus(status)

      if (status === 'pending') {
        classes.push('bg-gray-300')
      } else if (status === 'accepted') {
        classes.push('bg-[#35c0ed]')
      } else if (status === 'rescheduled') {
        classes.push('bg-yellow-300')
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
        {
          setJoinSiteVisitMetting(true)
        }
      } else {
        setJoinSiteVisitMetting(true)
      }
    }
  }

  return (
    <>
      {/* Inline style to increase slot box height */}
      <style>
        {`
          .fc .fc-timegrid-slot {
            height: 60px !important; /* increase slot row height */
            
          }
          .fc .fc-timegrid-event {
            min-height: 50px !important; /* make events inside look taller */
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
        setConfirmOpen={siteVisitRejectedModal}
        title='Reschedule Request Rejected!'
        description='You have rejected the reschedule request from [PMA Name]. The meeting will not be updated.Please provide a reason for the rejection in the box below. This explanation will be sent to the managing agent.'
        onClose={() => setsiteVisitRejectedModal(false)}
        onConfirm={function (): void {}}
        calanderSiteVisitReject={selectedPillsData}
        types='siteVisitRejectCalander'
      />

      <CancelVideoCallsAndSiteVisist
        open={confirmOpen}
        title={`${callsAndSiteStatus == 'pending' ? 'Reschedule Request Cancel' : callsAndSiteStatus == 'rescheduled' ? 'Reschedule Request Cancel ' : ''}`}
        description='You have rejected the reschedule request from [PMA Name]. The meeting will not be updated.Please provide a reason for the rejection in the box below. This explanation will be sent to the managing agent.'
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
        title={`Pending Meeting`}
        open={pendingsModalOpen}
        onClose={() => setPendingsModalOpen(false)}
        onReject={handleReject}
        onReschedule={handleReschedualVideoCall}
        onConfirmVideCall={onConfirmVideCall}
        types={`${selectedPillsData?.status == 'rescheduled' ? ' rescheduled ' : ''}`}
      />

      <PendingSiteVisitModal
        title={`Pending Meeting `}
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
        title={` ${selectedPillsData?.calendartype == 'SiteVisit' ? ' Sitevisit Details' : selectedPillsData?.calendartype == 'VideoCall' ? 'Join Metting' : ''} `}
        onClose={() => setJoinSiteVisitMetting(false)}
        siteVisitData={selectedPillsData}
        siteVisitJoinCall={siteVisitJoinCall}
      />
    </>
  )
}

export default Calendar
