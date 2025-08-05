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

export interface PmaFormState {
  currentStep: number
  businessProfile: BusinessProfileForm
  communicationPreferences: CommunicationPreferencesForm
  reviews: ReviewsForm
  managementFee: ManagementFeeForm
  companyLogo: CompanyLogoForm
  companyBio: CompanyBioForm
  branchLocations: BranchLocationsForm
}
