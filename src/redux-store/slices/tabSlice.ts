import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface TabState {
  activeTab: string
}

const initialState: TabState = {
  activeTab: 'site-visits'
}

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload
    },
    clearActiveTab: state => {
      state.activeTab = ''
    }
  }
})

export const { setActiveTab, clearActiveTab } = tabSlice.actions
export default tabSlice.reducer
