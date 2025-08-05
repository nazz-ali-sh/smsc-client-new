import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface PmaRegistrationState {
  currentStep: number
  accountInfo: any
  businessInfo: any
  coordinates: { lat: string; lng: string }
  showMap: boolean
  isVerified: boolean
}

const initialFormState: any = {
  companyName: '',
  fullName: '',
  email: '',
  mobileNumber: '',
  password: '',
  confirmPassword: '',
  address: '',
  website: '',
  landline: '',
  coordinates: { lat: '', lng: '' }
}

const initialState: PmaRegistrationState = {
  currentStep: 0,
  accountInfo: initialFormState,
  businessInfo: initialFormState,
  coordinates: { lat: '', lng: '' },
  showMap: false,
  isVerified: false
}

const pmaRegistrationSlice = createSlice({
  name: 'pmaRegistration',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    },
    updateAccountInfo: (state, action: PayloadAction<any>) => {
      state.accountInfo = action.payload
    },
    updateBusinessInfo: (state, action: PayloadAction<any>) => {
      state.businessInfo = action.payload
    },
    setCoordinates: (state, action: PayloadAction<{ lat: string; lng: string }>) => {
      state.coordinates = action.payload
    },
    setShowMap: (state, action: PayloadAction<boolean>) => {
      state.showMap = action.payload
    },
    setIsVerified: (state, action: PayloadAction<boolean>) => {
      state.isVerified = action.payload
    },
    resetPmaRegistration: () => initialState
  }
})

export const {
  setCurrentStep,
  updateAccountInfo,
  updateBusinessInfo,
  setCoordinates,
  setShowMap,
  setIsVerified,
  resetPmaRegistration
} = pmaRegistrationSlice.actions

export default pmaRegistrationSlice.reducer
