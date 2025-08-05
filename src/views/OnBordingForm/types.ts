import type { default as ReCAPTCHA } from 'react-google-recaptcha'

export interface BlockDetailsStepProps {
  formData: any
  currentStep: number
  onBack: () => void
}

export interface LocationStepProps {
  formData: any
  currentStep: number
  selectedLocation: { lat: number; lng: number } | null
  setSelectedLocation: (location: { lat: number; lng: number } | null) => void
  onBack: () => void
}

export interface FormNavigationProps {
  currentStep: number
  totalSteps: number
  onBack: () => void
  onReset?: () => void
  isSubmit?: boolean
  isDisabled?: boolean
}

export interface AboutYouStepProps {
  formData: any
  currentStep: number
  setAddressDialogOpen: (open: boolean) => void
  addressDialogOpen: boolean
  onBack: () => void
}

export interface TenderDetailsStepProps {
  formData: any
  currentStep: number
  isVerified: boolean
  recaptchaRef: React.RefObject<ReCAPTCHA>
  onChange: (token: string | null) => void
  onExpired: () => void
  onBack: () => void
}

export interface LatLng {
  lat: number
  lng: number
}


 export interface RtmRole {
    id: number | string
    name: string
    email: string
    phone_no: string
    address: string
    created_at: string
    updated_at: string
  }

  export interface NearByPmaParams {
    lat: number
    lng: number
    radius: number
  }

  export interface AutocompleteSuggestion {
  placePrediction?: {
    place: string
    placeId: string
    text: {
      text: string
      matches: Array<{ endOffset: number }>
    }
    structuredFormat?: {
      mainText: {
        text: string
        matches: Array<{ endOffset: number }>
      }
      secondaryText?: {
        text: string
        matches: Array<{ endOffset: number }>
      }
    }
    types?: string[]
  }
  queryPrediction?: {
    text: {
      text: string
      matches: Array<{ endOffset: number }>
    }
  }
}

export interface QueryPrediction {
  text: {
    text: string
    matches: Array<{ endOffset: number }>
  }
}
