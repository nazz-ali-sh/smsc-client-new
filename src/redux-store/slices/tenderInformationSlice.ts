import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface OnboardingData {
  onboarding_id: number
  status: string
  current_step: number
  total_steps?: number
}

export interface TenderInformationState {
  onboarding: OnboardingData | null
}

const initialState: TenderInformationState = {
  onboarding: null
}

const tenderInformationSlice = createSlice({
  name: 'tenderInformation',
  initialState,
  reducers: {
    setTenderInformation: (state, action: PayloadAction<OnboardingData>) => {
      state.onboarding = action.payload
    },
    clearTenderInformation: state => {
      state.onboarding = null
    }
  }
})

export const { setTenderInformation, clearTenderInformation } = tenderInformationSlice.actions

export default tenderInformationSlice.reducer
