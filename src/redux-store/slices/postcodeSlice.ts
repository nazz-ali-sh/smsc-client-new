import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface PostcodeAddress {
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

interface PostcodeState {
  addresses: PostcodeAddress[]
  selectedAddress: PostcodeAddress | null
  currentPostcode: string
  isLoading: boolean
  error: string | null
}

const initialState: PostcodeState = {
  addresses: [],
  selectedAddress: null,
  currentPostcode: '',
  isLoading: false,
  error: null
}

const postcodeSlice = createSlice({
  name: 'postcode',
  initialState,
  reducers: {
    setPostcodeAddresses: (state, action: PayloadAction<{ addresses: PostcodeAddress[]; postcode: string }>) => {
      state.addresses = action.payload.addresses
      state.currentPostcode = action.payload.postcode
      state.selectedAddress = null
      state.error = null
    },
    setSelectedAddress: (state, action: PayloadAction<PostcodeAddress>) => {
      state.selectedAddress = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    clearPostcodeData: state => {
      state.addresses = []
      state.selectedAddress = null
      state.currentPostcode = ''
      state.error = null
    }
  }
})

export const { setPostcodeAddresses, setSelectedAddress, setLoading, setError, clearPostcodeData } =
  postcodeSlice.actions

export default postcodeSlice.reducer
