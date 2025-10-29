import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { setPmaTokenCookie, clearPmaTokenCookie } from '@/utils/tokenSync'

interface PmaOnboardingState {
  pmaUserId: number | null
  pmaToken: string | null
}

const initialState: PmaOnboardingState = {
  pmaUserId: null,
  pmaToken: null
}

const pmaOnboardingSlice = createSlice({
  name: 'pmaOnboarding',
  initialState,
  reducers: {
    setPmaUserId: (state, action: PayloadAction<number>) => {
      state.pmaUserId = action.payload
    },
    setPmaToken: (state, action: PayloadAction<string>) => {
      state.pmaToken = action.payload

      setPmaTokenCookie(action.payload)
    },
    clearPmaUserId: state => {
      state.pmaUserId = null
    },
    clearPmaToken: state => {
      state.pmaToken = null

      clearPmaTokenCookie()
    }
  }
})

export const { setPmaUserId, setPmaToken, clearPmaUserId, clearPmaToken } = pmaOnboardingSlice.actions

export default pmaOnboardingSlice.reducer
