import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface BusinessProfileForm {
  yearsTrading: number
  totalUnits: number
  avgUnitsPerManager: number
}

export type SecondaryContact = {
  fullName: string
  email: string
  phone: string
  preferredContact: 'Mobile' | 'Landline'
}

export type CommunicationPreferencesForm = {
  primaryContactNumber: string
  secondaryContact?: SecondaryContact
  notificationRecipient: 'Primary' | 'Secondary' | 'Both'
}

export interface ReviewsForm {
  google: {
    showOnReport: boolean
    averageRating?: number
    numberOfReviews?: number
  }
  trustPilot: {
    showOnReport: boolean
    averageRating?: number
    numberOfReviews?: number
  }
}

export interface ManagementFeeForm {
  minFee: number
  maxFee: number
  showFeesWithVat: boolean
}

export interface CompanyLogoForm {
  logoFile?: File
  logoUrl?: string
}

export interface CompanyBioForm {
  bioText: string
  status: 'Approved' | 'Pending Review' | 'Flagged'
  previousBioText?: string
}

export interface BranchLocation {
  branchName: string
  fullAddress: string
  lat: number
  lng: number
  contactName: string
  contactEmail: string
  contactPhone: string
  useHeadOfficeContact?: boolean
  tenderRecipient: 'Branch Contact' | 'Primary/Secondary User' | 'Both'
}

export interface BranchLocationsForm {
  branches: BranchLocation[]
}

interface PmaOnboardingState {
  currentStep: number
  businessProfile: BusinessProfileForm
  communicationPreferences: CommunicationPreferencesForm
  reviews: ReviewsForm
  managementFee: ManagementFeeForm
  companyLogo: CompanyLogoForm
  companyBio: CompanyBioForm
  branchLocations: BranchLocationsForm
}

const initialState: PmaOnboardingState = {
  currentStep: 0,
  businessProfile: {
    yearsTrading: 0,
    totalUnits: 0,
    avgUnitsPerManager: 0
  },
  communicationPreferences: {
    primaryContactNumber: '',
    secondaryContact: undefined,
    notificationRecipient: 'Primary'
  },
  reviews: {
    google: { showOnReport: false },
    trustPilot: { showOnReport: false }
  },
  managementFee: {
    minFee: 0,
    maxFee: 0,
    showFeesWithVat: true
  },
  companyLogo: {
    logoFile: undefined,
    logoUrl: ''
  },
  companyBio: {
    bioText: '',
    status: 'Pending Review',
    previousBioText: ''
  },
  branchLocations: {
    branches: []
  }
}

const pmaOnboardingFormSlice = createSlice({
  name: 'pmaOnboardingForm',
  initialState,
  reducers: {
    updateBusinessProfile(state, action: PayloadAction<BusinessProfileForm>) {
      state.businessProfile = action.payload
    },
    updateCommunicationPreferences(state, action: PayloadAction<CommunicationPreferencesForm>) {
      state.communicationPreferences = action.payload
    },
    updateReviews(state, action: PayloadAction<ReviewsForm>) {
      state.reviews = action.payload
    },
    updateManagementFee(state, action: PayloadAction<ManagementFeeForm>) {
      state.managementFee = action.payload
    },
    updateCompanyLogo(state, action: PayloadAction<CompanyLogoForm>) {
      state.companyLogo = action.payload
    },
    updateCompanyBio(state, action: PayloadAction<CompanyBioForm>) {
      state.companyBio = action.payload
    },
    updateBranchLocations(state, action: PayloadAction<BranchLocationsForm>) {
      state.branchLocations = action.payload
    },
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload
    },
    resetPmaForm() {
      return initialState
    }
  }
})

export const {
  updateBusinessProfile,
  updateCommunicationPreferences,
  updateReviews,
  updateManagementFee,
  updateCompanyLogo,
  updateCompanyBio,
  updateBranchLocations,
  setCurrentStep,
  resetPmaForm
} = pmaOnboardingFormSlice.actions

export default pmaOnboardingFormSlice.reducer
