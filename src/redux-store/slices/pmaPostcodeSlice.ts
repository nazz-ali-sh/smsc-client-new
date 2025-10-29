import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface PmaPostcodeAddress {
  longitude: number
  latitude: number
  postcode: string
  country: string
  post_town: string
  line_1: string
  line_2?: string
  line_3?: string
  udprn: number
  county: string
}

interface PmaPostcodeState {
  addresses: PmaPostcodeAddress[]
  selectedAddress: PmaPostcodeAddress | null
  currentPostcode: string
  isLoading: boolean
  error: string | null
}

const initialState: PmaPostcodeState = {
  addresses: [],
  selectedAddress: null,
  currentPostcode: '',
  isLoading: false,
  error: null
}

const pmaPostcodeSlice = createSlice({
  name: 'pmaPostcode',
  initialState,
  reducers: {
    setPmaPostcodeAddresses: (state, action: PayloadAction<{ addresses: PmaPostcodeAddress[]; postcode: string }>) => {
      state.addresses = action.payload.addresses
      state.currentPostcode = action.payload.postcode
      state.selectedAddress = null
      state.error = null
    },
    setPmaSelectedAddress: (state, action: PayloadAction<PmaPostcodeAddress>) => {
      state.selectedAddress = action.payload
    },
    setPmaLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setPmaError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    clearPmaPostcodeData: state => {
      state.addresses = []
      state.selectedAddress = null
      state.currentPostcode = ''
      state.error = null
    }
  }
})

export const { setPmaPostcodeAddresses, setPmaSelectedAddress, setPmaLoading, setPmaError, clearPmaPostcodeData } =
  pmaPostcodeSlice.actions

export default pmaPostcodeSlice.reducer
