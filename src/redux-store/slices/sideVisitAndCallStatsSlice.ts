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

interface SiteVisitAndCallState {
  stats: SiteVisitAndCallStats | null
  loading: boolean
  error: string | null
}

const initialState: SiteVisitAndCallState = {
  stats: null,
  loading: false,
  error: null
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
    clearStats(state) {
      state.stats = null
      state.loading = false
      state.error = null
    }
  }
})

export const { fetchStatsStart, fetchStatsSuccess, fetchStatsFailure, clearStats } = siteVisitAndCallStatsSlice.actions

export default siteVisitAndCallStatsSlice.reducer
