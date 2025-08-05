import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { EventInput } from '@fullcalendar/core'

import type { CalendarFiltersType, CalendarType } from '@/types/apps/calendarTypes'

const initialState: CalendarType = {
  events: [],
  selectedEvent: null,
  selectedCalendars: ['Site Visits', 'Online Calls'],
  filteredEvents: []
}

const rmcCalendarSlice = createSlice({
  name: 'rmcCalendar',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      const newEvent = { ...action.payload, id: `${parseInt(state.events[state.events.length - 1]?.id ?? '0') + 1}` }

      state.events.push(newEvent)
    },
    updateEvent: (state, action: PayloadAction<EventInput>) => {
      state.events = state.events.map(event => {
        if (action.payload._def && event.id === action.payload._def.publicId) {
          return {
            id: event.id,
            url: action.payload._def.url,
            title: action.payload._def.title,
            allDay: action.payload._def.allDay,
            end: action.payload._instance.range.end,
            start: action.payload._instance.range.start,
            extendedProps: action.payload._def.extendedProps
          }
        } else if (event.id === action.payload.id) {
          return action.payload
        } else {
          return event
        }
      })
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(event => event.id !== action.payload)
    },
    selectedEvent: (state, action: PayloadAction<any>) => {
      state.selectedEvent = action.payload
    },
    filterCalendarLabel: (state, action: PayloadAction<CalendarFiltersType>) => {
      const calendarIndex = state.selectedCalendars.indexOf(action.payload)

      if (calendarIndex === -1) {
        state.selectedCalendars.push(action.payload)
      } else {
        state.selectedCalendars.splice(calendarIndex, 1)
      }
    },
    filterAllCalendarLabels: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.selectedCalendars = ['Site Visits', 'Online Calls']
      } else {
        state.selectedCalendars = []
      }
    },
    filterEvents: state => {
      return state
    }
  }
})

export const {
  addEvent,
  updateEvent,
  deleteEvent,
  selectedEvent,
  filterCalendarLabel,
  filterAllCalendarLabels,
  filterEvents
} = rmcCalendarSlice.actions

export default rmcCalendarSlice.reducer
