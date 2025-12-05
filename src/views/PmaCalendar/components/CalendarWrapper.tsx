'use client'
import { useEffect, useState } from 'react'

import { useMediaQuery } from '@mui/material'
import type { Theme } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query'

import type { CalendarColors } from '@/types/apps/calendarTypes'
import Calendar from './Calendar'
import SidebarLeft from './SidebarLeft'
import type { RootState } from '@/redux-store'
import { pmagettingCalanderDates } from '@/services/pma_site_visit/pma_site_visit'
import { setCalendarApiPayload } from '@/redux-store/slices/rmcCalendar'

const calendarsColor: CalendarColors = {
  Personal: 'primary',
  Business: 'secondary',
  Family: 'success',
  Holiday: 'warning',
  ETC: 'error',
  'Site Visits': 'error',
  'Online Calls': 'info'
}

interface RmcDetails {
  name: string
  email: string
  block_name: string
  region: string
  year_built: string
}

interface CalendarEvent {
  invite_Id: number
  tender_id?: any
  slot_id: number
  title: string
  start: string
  end: string
  status: string
  zoom_meeting_link?: any
  calendartype: 'VideoCall' | 'SiteVisit'
  rmc_details: RmcDetails
  timeline: string
  updated_timeline: string | null
}

interface Invite {
  id: number
  tender_id?: any
  slot_id: number
  status: string
  scheduled_date: string
  timeline: string
  zoom_meeting_link?: any
  updated_timeline: string | null
  rmc_details: RmcDetails
  pma_user: {
    company: { name: string }
  }
  slot: {
    start_time: string
    end_time: string
  }
}

interface ApiResponse {
  success: boolean
  data: {
    video_call_invites: Invite[]
    site_visit_invites: Invite[]
  }
}

const CalendarWrapper = () => {
  const [calendarApi, setCalendarApi] = useState<any>(null)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false)
  const [eventsData, setEventsData] = useState<CalendarEvent[]>([])

  const dispatch = useDispatch()
  const mdAbove = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  const calendarApiPayload = useSelector((state: RootState) => state.rmcCalendarReducer.calendarApiPayload)
  const calendarActiveStatus = useSelector((state: RootState) => state.rmcCalendarReducer.calendarStatus)

  useEffect(() => {
    const today = dayjs()

    dispatch(
      setCalendarApiPayload({
        tenderId: null, 
        status: 'month',
        selectedYearMonth: today.format('YYYY-MM'),
        selectedFullDate: today.format('YYYY-MM-DD')
      })
    )
  }, [dispatch])

  const { data: rmcCalendarData } = useQuery<ApiResponse | undefined>({
    queryKey: [
      'pmaCalendarDates',
      calendarApiPayload?.status,
      calendarActiveStatus,
      calendarApiPayload?.selectedYearMonth,
      calendarApiPayload?.selectedFullDate
    ],
    queryFn: () =>
      pmagettingCalanderDates(
        calendarApiPayload!.status || 'month',
        calendarActiveStatus!,
        calendarApiPayload!.selectedYearMonth!,
        calendarApiPayload!.selectedFullDate!
      ),
    enabled: !!calendarApiPayload?.selectedYearMonth && calendarActiveStatus !== null,
  })

  useEffect(() => {
    if (calendarActiveStatus === null || !rmcCalendarData?.data) {
      setEventsData([])

      return
    }

    const videoCalls: CalendarEvent[] = (rmcCalendarData.data.video_call_invites ?? []).map(invite => ({
      invite_Id: invite.id,
      tender_id: invite?.tender_id,
      slot_id: invite.slot_id,
      zoom_link: invite?.zoom_meeting_link,
      title: `Video Call with ${invite.pma_user.company.name}`,
      start: `${invite.scheduled_date}T${invite.slot.start_time}`,
      end: `${invite.scheduled_date}T${invite.slot.end_time}`,
      status: invite.status,
      calendartype: 'VideoCall' as const,
      rmc_details: invite.rmc_details,
      timeline: invite.timeline,
      updated_timeline: invite.updated_timeline
    }))

    const siteVisits: CalendarEvent[] = (rmcCalendarData.data.site_visit_invites ?? []).map(invite => ({
      invite_Id: invite.id,
      tender_id: invite?.tender_id,
      slot_id: invite.slot_id,
      title: `Site Visit - ${invite?.rmc_details?.block_name}`,
      start: `${invite?.scheduled_date}T${invite?.slot?.start_time}`,
      end: `${invite?.scheduled_date}T${invite?.slot?.end_time}`,
      status: invite?.status,
      calendartype: 'SiteVisit' as const,
      rmc_details: invite?.rmc_details,
      timeline: invite?.timeline,
      updated_timeline: invite?.updated_timeline
    }))

    setEventsData([...videoCalls, ...siteVisits])
  }, [rmcCalendarData, calendarActiveStatus])

  const handleLeftSidebarToggle = () => setLeftSidebarOpen(prev => !prev)

  return (
    <>
      <SidebarLeft
        mdAbove={mdAbove}
        dispatch={dispatch}
        calendarApi={calendarApi}
        calendarsColor={calendarsColor}
        leftSidebarOpen={leftSidebarOpen}
        handleLeftSidebarToggle={handleLeftSidebarToggle}
        handleAddEventSidebarToggle={() => {}}
      />

      <div className='p-5 pbe-0 flex-grow overflow-visible bg-backgroundPaper rounded'>
        <Calendar
          dispatch={dispatch}
          calendarApi={calendarApi}
          calenderEventData={eventsData}
          setCalendarApi={setCalendarApi}
          calendarsColor={calendarsColor}
          handleLeftSidebarToggle={handleLeftSidebarToggle}
          handleAddEventSidebarToggle={() => {}}
        />
      </div>
    </>
  )
}

export default CalendarWrapper
