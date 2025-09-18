import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { CalendarFiltersType, CalendarType } from '@/types/apps/calendarTypes'

// ✅ extended type for storing API payload & status
interface ExtendedCalendarType extends CalendarType {
  calendarApiPayload: any | null
  calendarStatus: any
}

const initialState: ExtendedCalendarType = {
  events: [],
  selectedEvent: null,
  selectedCalendars: ['Site Visits', 'Online Calls'],
  filteredEvents: [],
  calendarApiPayload: null, // ✅ API payload
  calendarStatus: 'site_visit' //
}

const rmcCalendarSlice = createSlice({
  name: 'rmcCalendar',
  initialState,
  reducers: {
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
    },

    // ✅ new reducer to store API payload
    setCalendarApiPayload: (state, action: PayloadAction<any>) => {
      state.calendarApiPayload = action.payload
    },

    // ✅ new reducer to store calendarStatus
    setCalendarStatus: (state, action: PayloadAction<string | null>) => {
      state.calendarStatus = action.payload
    }
  }
})

export const {
  selectedEvent,
  filterCalendarLabel,
  filterAllCalendarLabels,
  filterEvents,
  setCalendarApiPayload,
  setCalendarStatus // ✅ export new action
} = rmcCalendarSlice.actions

export default rmcCalendarSlice.reducer
