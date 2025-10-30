import { useEffect, useRef } from 'react'

import { useTheme } from '@mui/material/styles'

import type { Dispatch } from '@reduxjs/toolkit'

import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { CalendarOptions } from '@fullcalendar/core'

import type { AddEventType, CalendarColors, CalendarType } from '@/types/apps/calendarTypes'

type CalenderProps = {
  calendarStore: CalendarType
  calendarApi: any
  setCalendarApi: (val: any) => void
  calendarsColor: CalendarColors
  dispatch: Dispatch
  handleLeftSidebarToggle: () => void
  handleAddEventSidebarToggle: () => void
}

const blankEvent: AddEventType = {
  title: '',
  start: '',
  end: '',
  allDay: false,
  url: '',
  extendedProps: {
    calendar: '',
    guests: [],
    description: ''
  }
}

const Calendar = (props: CalenderProps) => {
  const {
    calendarStore,
    calendarApi,
    setCalendarApi,
    calendarsColor,

    handleAddEventSidebarToggle,
    handleLeftSidebarToggle
  } = props

  const calendarRef = useRef<FullCalendar>(null)

  const theme = useTheme()

  useEffect(() => {
    if (calendarApi === null) {
      // @ts-ignore
      setCalendarApi(calendarRef.current?.getApi())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const calendarOptions: CalendarOptions = {
    events: calendarStore.events,
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'sidebarToggle, prev, next, title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    views: {
      week: {
        titleFormat: { year: 'numeric', month: 'short', day: 'numeric' }
      }
    },

    navLinks: true,
    height: 'auto',
    contentHeight: 'auto',

    eventClassNames({ event: calendarEvent }: any) {
      // @ts-ignore
      const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar]

      return [`event-bg-${colorName}`]
    },

    eventClick({ event: clickedEvent, jsEvent }: any) {
      jsEvent.preventDefault()

      if (clickedEvent.url) {
        window.open(clickedEvent.url, '_blank')
      }
    },

    customButtons: {
      sidebarToggle: {
        icon: 'ri-menu-line',
        click() {
          handleLeftSidebarToggle()
        }
      }
    },

    dateClick(info: any) {
      const ev = { ...blankEvent }

      ev.start = info.date
      ev.end = info.date
      ev.allDay = true

      handleAddEventSidebarToggle()
    },

   
    direction: theme.direction
  }

  return <FullCalendar ref={calendarRef} {...calendarOptions} />
}

export default Calendar
