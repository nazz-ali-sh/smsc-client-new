import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface LocationData {
  lat: number
  lng: number
  formattedAddress?: string
}

interface FormState {
  currentStep: number
  steps: {
    aboutYou: {
      role: string
      rmcNumber: string
      leaseholdType: string
      blockCondition: string
      nonLeaseholder: string
      outdoorSpace: string
      session_id: string
      rtmRole: string
      isModalOpen: boolean
      companyNumber: number
    }

    location: {
      address: string
      coordinates: LocationData | null
      session_id: string
    }
    blockDetails: {
      session_id: string
      numberOfBlocks: number
      totalUnits: number
      yearBuilt: string
      serviceChargeBudget: number
      budgetToggle: string
      currentManagementFee: number
      feeToggle: string
    }
    tenderDetails: {
      session_id: string
      fullName: string
      email: string
      mobile: string
      password: string
      confirmPassword: string
      address: string
      blockName: string
      currentManagingAgent: string
      verificationMethod: string
      funnel_Id: number | null
      user_id: number
    }
  }

  modalState: boolean
  isEditing: boolean
  isData: boolean
}

const initialState: FormState = {
  currentStep: 0,
  steps: {
    aboutYou: {
      role: '',
      rmcNumber: '',
      leaseholdType: '',
      blockCondition: '',
      nonLeaseholder: '',
      outdoorSpace: '',
      rtmRole: '',
      session_id: '',
      isModalOpen: false,
      companyNumber: 0
    },

    location: {
      address: '',
      coordinates: null,
      session_id: ''
    },
    blockDetails: {
      session_id: '',
      numberOfBlocks: 1,
      totalUnits: 0,
      yearBuilt: '',
      serviceChargeBudget: 0,
      budgetToggle: 'perUnit',
      currentManagementFee: 0,
      feeToggle: 'perUnit'
    },
    tenderDetails: {
      session_id: '',
      fullName: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
      address: '',
      blockName: '',
      currentManagingAgent: '',
      verificationMethod: 'email',
      funnel_Id: null,
      user_id: 0
    }
  },
  isEditing: false,
  modalState: false,
  isData: false
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    },
    updateAboutYou: (state, action: PayloadAction<Partial<FormState['steps']['aboutYou']>>) => {
      state.steps.aboutYou = {
        ...state.steps.aboutYou,
        ...action.payload
      }
    },

    updateLocation: (state, action: PayloadAction<Partial<FormState['steps']['location']>>) => {
      state.steps.location = {
        ...state.steps.location,
        ...action.payload,
        coordinates: action.payload.coordinates
          ? { ...state.steps.location.coordinates, ...action.payload.coordinates }
          : state.steps.location.coordinates
      }
    },

    updateBlockDetails: (state, action: PayloadAction<Partial<FormState['steps']['blockDetails']>>) => {
      state.steps.blockDetails = { ...state.steps.blockDetails, ...action.payload }
    },
    updateTenderDetails: (state, action: PayloadAction<Partial<FormState['steps']['tenderDetails']>>) => {
      state.steps.tenderDetails = { ...state.steps.tenderDetails, ...action.payload }
    },
    setEditMode: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload
    },

    resetForm: () => initialState,
    submitForm: state => {
      console.log('Form submitted:', state.steps)

      return state
    }
  }
})

export const {
  setCurrentStep,
  updateAboutYou,
  updateLocation,
  updateBlockDetails,
  updateTenderDetails,
  setEditMode,
  resetForm,
  submitForm

  // setModalState
} = formSlice.actions
export { initialState }

export default formSlice.reducer
