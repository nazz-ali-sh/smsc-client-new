import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface SiteVisitAndCallStats {
  tender_id: number
  shortlisted_pma_count: number
  scheduled_calls: number
  completed_calls: number
  scheduled_visits: number
  successful_visits: number
}

interface AppointmentStatus {
  isCompleted: boolean
}

interface ShortlistedStatus {
  isCompleted: boolean
}

interface SiteVisitAndCallState {
  stats: SiteVisitAndCallStats | null
  loading: boolean
  error: string | null
  isAppointmentCompleted: boolean
  isShortlistedCompleted: boolean
}

const initialState: SiteVisitAndCallState = {
  stats: null,
  loading: false,
  error: null,
  isAppointmentCompleted: false,
  isShortlistedCompleted: false
}

const siteVisitAndCallStatsSlice = createSlice({
  name: 'siteVisitAndCallStats',
  initialState,
  reducers: {
    fetchStatsStart(state) {
      state.loading = true
      state.error = null
    },
    fetchStatsSuccess(state, action: PayloadAction<SiteVisitAndCallStats>) {
      state.stats = action.payload
      state.loading = false
      state.error = null
    },
    fetchStatsFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    setAppointmentStatus(state, action: PayloadAction<AppointmentStatus>) {
      state.isAppointmentCompleted = action.payload.isCompleted
    },
    resetAppointmentStatus(state) {
      state.isAppointmentCompleted = false
    },
    setShortlistedStatus(state, action: PayloadAction<ShortlistedStatus>) {
      state.isShortlistedCompleted = action.payload.isCompleted
    },
    clearStats(state) {
      state.stats = null
      state.loading = false
      state.error = null
      state.isAppointmentCompleted = false
    }
  }
})

export const {
  fetchStatsStart,
  fetchStatsSuccess,
  fetchStatsFailure,
  setAppointmentStatus,
  resetAppointmentStatus,
  clearStats,
  setShortlistedStatus
} = siteVisitAndCallStatsSlice.actions

export default siteVisitAndCallStatsSlice.reducer
