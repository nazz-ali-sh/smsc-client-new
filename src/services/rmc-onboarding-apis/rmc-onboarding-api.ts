import axiosClient from '../../utils/axiosInstance'
import { apiEndpoints } from '../../utils/apisEndpoints'

export interface RmcOnboardingStep1Payload {
  name: string
  email: string
  phone_no: string
  password: string
  password_confirmation: string
}

export interface RmcOnboardingResponse {
  success: boolean
  message: string
  data?: any
  tender_id?: number
}

export const submitRmcOnboardingStep1 = async (data: RmcOnboardingStep1Payload): Promise<RmcOnboardingResponse> => {
  try {
    const url = apiEndpoints.rmcOnboarding()
    const response = await axiosClient.post(url, data)

    return response.data
  } catch (error) {
    throw error
  }
}

export interface verificationPayload {
  user_id: number
  verification_method: 'sms' | 'email'
}

export const onboardingVerification = async (data: verificationPayload): Promise<RmcOnboardingResponse> => {
  try {
    const url = apiEndpoints.rmcOnboardingVerification()
    const response = await axiosClient.post(url, data)

    return response.data
  } catch (error) {
    throw error
  }
}

export interface RmcOtpVerificationPayload {
  user_id: number
  otp: string
}

export const verifyRmcOtp = async (data: RmcOtpVerificationPayload): Promise<RmcOnboardingResponse> => {
  try {
    const url = apiEndpoints.otpVerification()

    const response = await axiosClient.post(url, {
      user_id: data.user_id,
      otp: data.otp
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export const resendRmcCode = async (data: verificationPayload): Promise<RmcOnboardingResponse> => {
  try {
    const url = apiEndpoints.resendCode()
    const response = await axiosClient.post(url, data)

    return response.data
  } catch (error) {
    throw error
  }
}

export interface RmcOnboardingBudgetPayload {
  managing_fee: number | string
  accounting_fee: number | string
  cosec_fee: number | string
  out_of_hours_fee: number | string
  emergency_fee: number | string
  fire_door_fee: number | string
  anti_money_fee: number | string
  step: number
  tender_onboarding_id: number
}

export const submitRmcOnboardingBudget = async (data: RmcOnboardingBudgetPayload): Promise<RmcOnboardingResponse> => {
  try {
    const url = apiEndpoints.rmcBudget()
    const response = await axiosClient.post(url, data)

    return response.data
  } catch (error) {
    throw error
  }
}

export interface RmcLeaseholderTypePayload {
  step: number
  tender_onboarding_id: number
  leasehold_type: string
  building_height: string
  block_condition: string
  outdoor_space: string
}

export const submitRmcLeaseholderType = async (data: RmcLeaseholderTypePayload): Promise<RmcOnboardingResponse> => {
  try {
    const url = apiEndpoints.rmcBudget()
    const response = await axiosClient.post(url, data)

    return response.data
  } catch (error) {
    throw error
  }
}

export interface RmcStep5Values {
  leasehold_type: string
  leasehold_type_other_details: string
  building_height: string
  block_condition: string
  outdoor_space: string
}

export interface RmcStep5StatusResponse {
  status: string
  message: string
  data: {
    current_step: number
    is_completed: boolean
    missing: string[]
    values: RmcStep5Values
  }
}

export const getRmcStep5Status = async (tender_onboarding_id: number): Promise<RmcStep5StatusResponse> => {
  try {
    const url = apiEndpoints.rmcStep5Status()

    const response = await axiosClient.get(url, {
      params: { tender_onboarding_id }
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export interface RmcPrioritiesPayload {
  tender_onboarding_id: number
  priorities: number[]
  step: number
}

export const submitRmcPriorities = async (data: RmcPrioritiesPayload): Promise<RmcOnboardingResponse> => {
  try {
    const url = apiEndpoints.rmcPriorities()
    const response = await axiosClient.post(url, data)

    return response.data
  } catch (error) {
    throw error
  }
}

export interface RmcQuestion {
  id: number
  question: string
  created_at: string
  updated_at: string
}

export const getRmcQuestions = async (): Promise<RmcQuestion[]> => {
  try {
    const url = apiEndpoints.getActivactionQuestion
    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    throw error
  }
}

export interface RmcAnswer {
  question_id: number
  answer: string
}

export interface RmcProcessPayload {
  tender_onboarding_id: number
  step: number
  answers: RmcAnswer[]
}

export const submitRmcProcess = async (data: RmcProcessPayload): Promise<RmcOnboardingResponse> => {
  try {
    const url = apiEndpoints.rmcBudget()
    const response = await axiosClient.post(url, data)

    return response.data
  } catch (error) {
    throw error
  }
}

export interface RmcPriority {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
}

export const getRmcPriorities = async (): Promise<RmcPriority[]> => {
  try {
    const url = apiEndpoints.getPriorities
    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    throw error
  }
}

export interface MeWithOnboardingResponse {
  success: boolean
  message: string
  data?: any
}

export const getMeWithOnboarding = async (): Promise<MeWithOnboardingResponse> => {
  try {
    const url = apiEndpoints.meWithOnboarding()
    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    throw error
  }
}

export interface RmcBlockDetailsPayload {
  tender_onboarding_id: number
  postcode?: string
  address?: string
  lat?: number
  lng?: number
  region?: string
  state?: string
  county?: string
  address_line2?: string
  number_of_blocks?: number | string
  total_units?: number | string
  year_built?: string
  block_name?: string
  current_managing_agent?: string
  step?: number
  address_line3?: string
}

export const submitRmcBlockDetails = async (data: RmcBlockDetailsPayload): Promise<RmcOnboardingResponse> => {
  try {
    const url = apiEndpoints.rmcBlockDetails()
    const response = await axiosClient.post(url, data)

    return response.data
  } catch (error) {
    throw error
  }
}

export interface RtmNonDirectorPayload {
  name: string
  email: string
  phone_no: string
  rtm_setup: string
  q_independent_redevelopment: string
  q_separable_shared_services: string
  q_units_are_flats: string
  q_two_thirds_leasehold_over_21_years: string
  q_at_least_50_percent_residential: string
}

export const submitRtmNonDirector = async (data: RtmNonDirectorPayload): Promise<RmcOnboardingResponse> => {
  try {
    const url = apiEndpoints.rtmNonDirector()
    const response = await axiosClient.post(url, data)

    return response.data
  } catch (error) {
    throw error
  }
}

export interface TenderDetailResponse {
  success: boolean
  message: string
  data?: any
}

export const getTenderDetail = async (): Promise<TenderDetailResponse> => {
  try {
    const url = apiEndpoints.getTenderDetail()
    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Tender detail API error:', error)
    throw error
  }
}
