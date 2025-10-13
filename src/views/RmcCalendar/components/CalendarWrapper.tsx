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
import { gettingCalanderDates } from '@/services/final_result_and_archeive_apis/final_results_apis'
import type { RootState } from '@/redux-store'
import { formatDates } from '@/utils/dateFormater'

const calendarsColor: CalendarColors = {
  Personal: 'primary',
  Business: 'secondary',
  Family: 'success',
  Holiday: 'warning',
  ETC: 'error',
  'Site Visits': 'error',
  'Online Calls': 'info'
}

export interface Invite {
  id: string | number
  scheduled_date: string
  pma_user_id: string | number
  pma_user?: {
    name?: string
    block_name?: string
  }
  day_id?: string | number
  day?: {
    day_name?: string
  }
  slot_id?: string | number
  slot?: {
    slot_name?: string
    start_time: string
    end_time: string
  }
  status?: string
  zoom_meeting_link?: string // only for video call
  location?: string // only for site visit
}

interface RmcCalendarData {
  success: boolean
  message: string
  view: string
  range: {
    start: string
    end: string
  }
  data: {
    video_call_invites: Invite[]
    site_visit_invites: Invite[]
  }
}

interface CalendarEvent {
  id?: string | number
  invite_Id?: string | number
  pma_user_id?: string | number
  pma_username?: string
  block_name?: string
  location?: string
  day_id?: string | number
  slot_id?: string | number
  title: string
  day?: string
  slot?: string
  zoom_link?: string
  start: string
  end: string
  allDay: boolean
  status?: string
  calendartype: 'VideoCall' | 'SiteVisit'
}

const CalendarWrapper = () => {
  const today = dayjs()
  const [calendarApi, setCalendarApi] = useState<null | any>(null)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false)
  const [addEventSidebarOpen, setAddEventSidebarOpen] = useState<boolean>(false)
  const [eventsData, setEventsData] = useState<CalendarEvent[]>([])

  const dispatch = useDispatch()
  const mdAbove = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)
  const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)
  const tenderId = useSelector((state: any) => state?.rmcOnboarding?.tenderId)
  const calendarApiPayload = useSelector((state: RootState) => state.rmcCalendarReducer.calendarApiPayload)
  const calendarActiveStatus = useSelector((state: RootState) => state.rmcCalendarReducer.calendarStatus)

  const [calendarFilters, setCalendarFilters] = useState({
    status: 'month',
    view: calendarActiveStatus,
    selectedYearMonth: today.format('YYYY-MM'),
    selectedFullDate: today.format('YYYY-MM-DD')
  })

  console.log(setCalendarFilters)

  const { data: rmcCalendarData } = useQuery({
    queryKey: [
      'calendarDates',
      tenderId,
      calendarApiPayload?.status || calendarFilters?.status,
      calendarActiveStatus || calendarFilters?.view,
      calendarApiPayload?.selectedYearMonth || calendarFilters?.selectedYearMonth,
      calendarApiPayload?.selectedFullDate || calendarFilters?.selectedFullDate
    ],
    queryFn: () =>
      gettingCalanderDates(
        tenderId,
        calendarApiPayload?.status || calendarFilters?.status,
        calendarActiveStatus || calendarFilters?.view,
        calendarApiPayload?.selectedYearMonth || calendarFilters?.selectedYearMonth,
        calendarApiPayload?.selectedFullDate || calendarFilters?.selectedFullDate
      ),
    enabled: !!tenderId
  })

  useEffect(() => {
    if (!rmcCalendarData) return

    const mapCalendarDataToEvents = (rmcCalendarData: RmcCalendarData): CalendarEvent[] => {
      const videoCallEvents: CalendarEvent[] =
        rmcCalendarData?.data?.video_call_invites?.map(invite => {
          const date = invite.scheduled_date.split('T')[0]

          console.log(invite)

          return {
            invite_Id: invite.id,
            pma_user_id: invite?.pma_user_id,
            pma_username: invite?.pma_user?.name,
            block_name: invite?.pma_user?.block_name,
            day_id: invite?.day_id,
            slot_id: invite?.slot_id,
            title: `Video Call`,
            day: invite?.day?.day_name,
            slot: invite?.slot?.slot_name,
            zoom_link: invite?.zoom_meeting_link,
            start: `${date}T${invite?.slot?.start_time}`,
            end: `${date}T${invite?.slot?.end_time}`,
            schedualDate: formatDates(invite?.scheduled_date),
            allDay: false,

            status: invite?.status,
            calendartype: 'VideoCall'
          }
        }) ?? []

      const siteVisitEvents: CalendarEvent[] =
        rmcCalendarData?.data?.site_visit_invites?.map(invite => {
          const date = invite.scheduled_date.split('T')[0]

          return {
            invite_Id: invite.id,
            pma_user_id: invite?.pma_user_id,
            pma_username: invite?.pma_user?.name,
            block_name: invite?.pma_user?.block_name,
            location: invite?.location,
            day_id: invite?.day_id,
            slot_id: invite?.slot_id,
            title: `SiteVisit`,
            day: invite?.day?.day_name,
            slot: invite?.slot?.slot_name,
            start: `${date}T${invite?.slot?.start_time}`,
            end: `${date}T${invite?.slot?.end_time}`,
            schedualDate: formatDates(invite?.scheduled_date),
            allDay: false,
            status: invite?.status,
            calendartype: 'SiteVisit'
          }
        }) ?? []

      return [...videoCallEvents, ...siteVisitEvents]
    }

    const events = mapCalendarDataToEvents(rmcCalendarData)

    setEventsData(events)
  }, [rmcCalendarData])

  return (
    <>
      <SidebarLeft
        mdAbove={mdAbove}
        dispatch={dispatch}
        calendarApi={calendarApi}
        calendarsColor={calendarsColor}
        leftSidebarOpen={leftSidebarOpen}
        handleLeftSidebarToggle={handleLeftSidebarToggle}
        handleAddEventSidebarToggle={handleAddEventSidebarToggle}
      />
      <div className='p-5 pbe-0 flex-grow overflow-visible bg-backgroundPaper rounded'>
        <Calendar
          dispatch={dispatch}
          calendarApi={calendarApi}
          calenderEventData={eventsData}
          setCalendarApi={setCalendarApi}
          calendarsColor={calendarsColor}
          handleLeftSidebarToggle={handleLeftSidebarToggle}
          handleAddEventSidebarToggle={handleAddEventSidebarToggle}
        />
      </div>
    </>
  )
}

export default CalendarWrapper
