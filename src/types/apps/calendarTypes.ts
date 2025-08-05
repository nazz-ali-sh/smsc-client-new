import type { EventInput } from '@fullcalendar/core'

export type CalendarFiltersType =
  | 'Personal'
  | 'Business'
  | 'Family'
  | 'Holiday'
  | 'ETC'
  | 'Site Visits'
  | 'Online Calls'

export type CalendarColors = {
  Personal: string
  Business: string
  Family: string
  Holiday: string
  ETC: string
  'Site Visits': string
  'Online Calls': string
}

export interface CalendarType {
  events: EventInput[]
  filteredEvents: EventInput[]
  selectedEvent: EventInput | null
  selectedCalendars: CalendarFiltersType[]
}

export interface AddEventType extends EventInput {
  url?: string
  title: string
  allDay: boolean
  start: Date | string
  end: Date | string
  extendedProps: {
    calendar: string
    guests?: string[]
    description?: string
  }
}

export interface AddEventSidebarType {
  calendarStore: CalendarType
  calendarApi: any
  dispatch: any
  addEventSidebarOpen: boolean
  handleAddEventSidebarToggle: () => void
}

export interface SidebarLeftProps {
  mdAbove: boolean
  leftSidebarOpen: boolean
  calendarStore: CalendarType
  calendarsColor: CalendarColors
  calendarApi: any
  dispatch: any
  handleLeftSidebarToggle: () => void
  handleAddEventSidebarToggle: () => void
}
