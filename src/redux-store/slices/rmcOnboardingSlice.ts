import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { setTokenCookie, clearTokenCookie } from '@/utils/tokenSync'

export interface RmcOnboardingData {
  user_id: number
  onboarding_id: number
  verified: boolean
  status: string
  current_step: number
  next_step: number
  token: string
  is_completed: boolean
  tender_onboarding_id?: number
  tender_id?: number
}

interface AddressData {
  addressLine1: string
  addressLine2: string
  postcode: string
  region: string
  county: string
}

interface RmcOnboardingState {
  rmcData: RmcOnboardingData | null
  verificationMethod: 'sms' | 'email' | null
  selectedAddress: any | null
  manualAddressData: AddressData
  tenderId: number | null
}

const initialState: RmcOnboardingState = {
  rmcData: null,
  verificationMethod: null,
  selectedAddress: null,
  manualAddressData: {
    addressLine1: '',
    addressLine2: '',
    postcode: '',
    region: '',
    county: ''
  },
  tenderId: null
}

const rmcOnboardingSlice = createSlice({
  name: 'rmcOnboarding',
  initialState,
  reducers: {
    setRmcData: (state, action: PayloadAction<RmcOnboardingData>) => {
      state.rmcData = action.payload

      // Sync token with cookie for middleware
      if (action.payload.token) {
        setTokenCookie(action.payload.token)
      }
    },
    setVerificationMethod: (state, action: PayloadAction<'sms' | 'email'>) => {
      state.verificationMethod = action.payload
    },

    setOtpVerificationData: (
      state,
      action: PayloadAction<{ token: string; tender_onboarding_id: number; verified: boolean }>
    ) => {
      if (state.rmcData) {
        state.rmcData.token = action.payload.token
        state.rmcData.tender_onboarding_id = action.payload.tender_onboarding_id
        state.rmcData.verified = action.payload.verified

        // Sync token with cookie for middleware
        setTokenCookie(action.payload.token)
      }
    },
    setSelectedAddress: (state, action: PayloadAction<any>) => {
      state.selectedAddress = action.payload

      state.manualAddressData = {
        addressLine1: '',
        addressLine2: '',
        postcode: '',
        region: '',
        county: ''
      }
    },
    setManualAddressData: (state, action: PayloadAction<AddressData>) => {
      state.manualAddressData = action.payload

      state.selectedAddress = null
    },
    clearAddressData: state => {
      state.selectedAddress = null
      state.manualAddressData = {
        addressLine1: '',
        addressLine2: '',
        postcode: '',
        region: '',
        county: ''
      }
    },
    setTenderId: (state, action: PayloadAction<number>) => {
      if (state.rmcData) {
        state.rmcData.tender_id = action.payload
      }
    },
    setRmcTenderId: (state, action: PayloadAction<number>) => {
      state.tenderId = action.payload
    },
    clearRmcData: state => {
      state.rmcData = null
      state.verificationMethod = null
      state.selectedAddress = null
      state.tenderId = null
      state.manualAddressData = {
        addressLine1: '',
        addressLine2: '',
        postcode: '',
        region: '',
        county: ''
      }

      // Clear token cookie for middleware
      clearTokenCookie()
    }
  }
})

export const {
  setRmcData,
  setVerificationMethod,
  setOtpVerificationData,
  setSelectedAddress,
  setManualAddressData,
  clearAddressData,
  setTenderId,
  setRmcTenderId,
  clearRmcData
} = rmcOnboardingSlice.actions

export default rmcOnboardingSlice.reducer
