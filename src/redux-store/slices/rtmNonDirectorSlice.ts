import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface RtmNonDirectorState {
  rtmSetup: string | null
  questions: {
    q_independent_redevelopment: string | null
    q_separable_shared_services: string | null
    q_units_are_flats: string | null
    q_two_thirds_leasehold_over_21_years: string | null
    q_at_least_50_percent_residential: string | null
  }
  personalInfo: {
    name: string
    email: string
    phone_no: string
  }
}

const initialState: RtmNonDirectorState = {
  rtmSetup: null,
  questions: {
    q_independent_redevelopment: null,
    q_separable_shared_services: null,
    q_units_are_flats: null,
    q_two_thirds_leasehold_over_21_years: null,
    q_at_least_50_percent_residential: null
  },
  personalInfo: {
    name: '',
    email: '',
    phone_no: ''
  }
}

const rtmNonDirectorSlice = createSlice({
  name: 'rtmNonDirector',
  initialState,
  reducers: {
    setRtmSetup: (state, action: PayloadAction<string>) => {
      state.rtmSetup = action.payload
    },
    setQuestionAnswer: (state, action: PayloadAction<{ question: keyof RtmNonDirectorState['questions']; answer: string }>) => {
      state.questions[action.payload.question] = action.payload.answer
    },
    setPersonalInfo: (state, action: PayloadAction<Partial<RtmNonDirectorState['personalInfo']>>) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload }
    },
    clearRtmNonDirectorData: (state) => {
      state.rtmSetup = null
      state.questions = {
        q_independent_redevelopment: null,
        q_separable_shared_services: null,
        q_units_are_flats: null,
        q_two_thirds_leasehold_over_21_years: null,
        q_at_least_50_percent_residential: null
      }
      state.personalInfo = {
        name: '',
        email: '',
        phone_no: ''
      }
    }
  }
})

export const {
  setRtmSetup,
  setQuestionAnswer,
  setPersonalInfo,
  clearRtmNonDirectorData
} = rtmNonDirectorSlice.actions

export default rtmNonDirectorSlice.reducer
