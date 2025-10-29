import type { AxiosResponse } from 'axios'

import axiosClient from '../../utils/axiosInstance'
import { apiEndpoints } from '../../utils/apisEndpoints'

export interface PmaOnboardingFormData {
  companyName: string
  website: string
  landline: string
  fullName: string
  lastName: string
  mobileNumber: string
  email: string
  password: string
  confirmPassword: string
}

export interface PmaOnboardingStep1Payload {
  company_name: string
  website: string
  landline: string
  name: string
  mobile_number: string
  email: string
  password: string
  confirm_password: string
}

export interface PmaOnboardingStep1Response {
  status: string
  message: string
  data: {
    user_id: number
    company_id: number | null
    email: string
    company_name: string
    status: string
    next_step: string
  }
}

export const addCompanyAccount = async (
  payload: PmaOnboardingStep1Payload
): Promise<AxiosResponse<PmaOnboardingStep1Response>> => {
  const url = apiEndpoints.comapnyAccount()

  return await axiosClient.post(url, payload)
}

export interface PmaOnboardingStep3Payload {
  step: number
  show_google_reviews: boolean
  google_rating: number | null
  google_review_count: number | null
  show_trustpilot_reviews: boolean | null
  trustpilot_rating: number | null
  trustpilot_review_count: number | null
  received_email_notification?: string
}

export interface PmaOnboardingStep3Response {
  message: string
  data?: any
}

export interface PmaGoogleReviewsSetupPayload {
  step: number
  google_reviews: string
  google_average_rating: string | number | ''
  google_number_of_reviews: string | number | ''
  trustpilot_reviews: string | ''
  trustpilot_average_rating: string | number | ''
  trustpilot_number_of_reviews: string | number | ''
  google_reviews_report: string | boolean | ''
  trustpilot_reviews_report: string | boolean | ''
}

export interface PmaBusinessProfilePayload {
  step: number
  trading_years: number
  units_managed_by_company: number
  units_managed_by_account_manager: number
  preferred_contact_number: string
  full_name: string
  email: string
  mobile_number: string
  landline_number: string
}

export interface PmaEmailNotificationPayload {
  step: number
  received_email_notification: string
}

export interface PmaTendersNotificationPayload {
  step: number
  received_tender_notification: string
}

export interface PmaManagementFeePayload {
  step: number
  bio?: string
  company_logo?: any
  min_fee_per_unit?:any
  max_fee_per_unit?:any
}

export const submitPmaOnboardingStep3 = async (
  payload: PmaOnboardingStep3Payload
): Promise<AxiosResponse<PmaOnboardingStep3Response>> => {
  const url = apiEndpoints.pmaOnboarding()

  return await axiosClient.post(url, payload)
}

export const submitPmaEmailNotification = async (
  payload: PmaEmailNotificationPayload
): Promise<AxiosResponse<PmaOnboardingStep3Response>> => {
  const url = apiEndpoints.pmaOnboarding()

  return await axiosClient.post(url, payload)
}

export const submitPmaTendersNotification = async (
  payload: PmaTendersNotificationPayload
): Promise<AxiosResponse<PmaOnboardingStep3Response>> => {
  const url = apiEndpoints.pmaOnboarding()

  return await axiosClient.post(url, payload)
}

export const submitPmaBusinessProfile = async (
  payload: PmaBusinessProfilePayload
): Promise<AxiosResponse<PmaOnboardingStep3Response>> => {
  const url = apiEndpoints.pmaOnboarding()

  return await axiosClient.post(url, payload)
}

export interface PmaAddressPayload {
  step: number
  postcode: string
  address: string
  address_line2?: string
  address_line3?: string
  address_type: 'api' | 'manual'
  county: string
  region: string
  state: string
  lat: number
  lng: number
  branch_name?: string
  contact_name?: string
  contact_email?: string
  contact_phone?: string
  use_head_office_contact?: boolean
}

export const submitPmaAddress = async (payload: PmaAddressPayload): Promise<AxiosResponse<any>> => {
  const url = apiEndpoints.pmaOnboarding()

  return await axiosClient.post(url, payload)
}

export const getPmaOnboardingData = async (): Promise<AxiosResponse<any>> => {
  const url = apiEndpoints.pmaOnboarding()

  return await axiosClient.get(url)
}

export const submitPmaGoogleReviewsSetup = async (
  payload: PmaGoogleReviewsSetupPayload
): Promise<AxiosResponse<PmaOnboardingStep3Response>> => {
  const url = apiEndpoints.pmaOnboarding()

  return await axiosClient.post(url, payload)
}

export const submitPmaManagementFee = async (
  payload: PmaManagementFeePayload
): Promise<AxiosResponse<PmaOnboardingStep3Response>> => {
  const url = apiEndpoints.pmaOnboarding()

  const formData = new FormData()

  formData.append('step', payload.step.toString())

  if (payload.bio !== undefined) {
    formData.append('bio', payload.bio)
  }

  if (payload.company_logo !== undefined) {
    if (payload.company_logo) {
      formData.append('company_logo', payload.company_logo)
    } else {
      formData.append('company_logo', '')
    }
  }

  return await axiosClient.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const submitPmaManagementFeeJson = async (
  payload: Pick<PmaManagementFeePayload, 'step'>
): Promise<AxiosResponse<PmaOnboardingStep3Response>> => {
  const url = apiEndpoints.pmaOnboarding()

  return await axiosClient.post(url, payload)
}

export const deletePmaSecondaryUser = async (userId: number): Promise<AxiosResponse<any>> => {
  const url = `/pma/secondary-users/${userId}`

  return await axiosClient.delete(url)
}
