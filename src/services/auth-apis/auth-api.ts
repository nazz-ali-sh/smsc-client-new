import axiosClient from '../../utils/axiosInstance'
import { apiEndpoints } from '../../utils/apisEndpoints'

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  data: any
  status: string
  success: boolean
  message: string
  token?: string
  user?: {
    id: number
    name: string
    email: string
    email_verified_at: string
    created_at: string
    updated_at: string
  }
  token_type?: string
}

export interface ForgotPasswordPayload {
  email: string
}

export interface ForgotPasswordResponse {
  status: string
  success: boolean
  message: string
  data?: any
}

export interface ResetPasswordPayload {
  token: string
  email: string
  password: string
  password_confirmation: string
}

export interface ResetPasswordResponse {
  status: string
  success: boolean
  message: string
  data?: any
}

export const loginUser = async (data: LoginPayload): Promise<LoginResponse> => {
  try {
    const url = apiEndpoints.login()
    const response = await axiosClient.post(url, data)

    return response.data
  } catch (error) {
    console.error('Login API error:', error)
    throw error
  }
}

export interface MyAccountPayload {
  name: string
  email: string
  mobile_number: string
  logo?: File
  notify_email: boolean
  notify_message: boolean
  notify_portal: boolean
}

export interface ProfileDetailsPayload {
  primary_details: {
    contact_name: string
    email: string
    website: string
    mobile: string
    landline: string
    address: string
  }
  management_fee: {
    min_management_fee: number
    max_management_fee: number
    management_phone: string
  }
  company_bio: string
  google_reviews: {
    google_report: boolean
    google_average_rating: string | null
    google_number_reviews: string | null
    auto_sync: boolean
  }
  trustpilot_reviews: {
    trustpilot_report: boolean
    trustpilot_average_rating: string | null
    trustpilot_number_reviews: string | null
    auto_sync: boolean
  }
  notify_email: boolean
  notify_message: boolean
  notify_portal: boolean
  logo?: File
}

export interface MyAccountResponse {
  data: any
  status: string
  success: boolean
  message: string
}

export interface MyAccountData {
  user: {
    id: number
    name: string
    email: string
    mobile_number: string
    logo: string
    logo_url: string
  }
  notification_preferences: {
    notify_email: boolean
    notify_message: boolean
    notify_portal: boolean
  }
}

export interface GetMyAccountResponse {
  status: string
  message: string
  data: MyAccountData
}

export const getMyAccount = async (): Promise<GetMyAccountResponse> => {
  try {
    const url = apiEndpoints.myAccount()
    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Get My Account API error:', error)
    throw error
  }
}

export const updateMyAccount = async (data: MyAccountPayload): Promise<MyAccountResponse> => {
  try {
    const url = apiEndpoints.myAccount()

    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('mobile_number', data.mobile_number)
    formData.append('notify_email', data.notify_email.toString())
    formData.append('notify_message', data.notify_message.toString())
    formData.append('notify_portal', data.notify_portal.toString())

    if (data.logo) {
      formData.append('logo', data.logo)
    }

    const response = await axiosClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return response.data
  } catch (error) {
    console.error('My Account API error:', error)
    throw error
  }
}

export const updateProfileDetails = async (data: ProfileDetailsPayload): Promise<MyAccountResponse> => {
  try {
    const url = apiEndpoints.myAccount()

    const formData = new FormData()

    formData.append('primary_details[contact_name]', data.primary_details.contact_name)
    formData.append('primary_details[email]', data.primary_details.email)
    formData.append('primary_details[website]', data.primary_details.website)
    formData.append('primary_details[mobile]', data.primary_details.mobile)
    formData.append('primary_details[landline]', data.primary_details.landline)
    formData.append('primary_details[address]', data.primary_details.address)

    formData.append('management_fee[min_management_fee]', data.management_fee.min_management_fee.toString())
    formData.append('management_fee[max_management_fee]', data.management_fee.max_management_fee.toString())
    formData.append('management_fee[management_phone]', data.management_fee.management_phone)

    formData.append('company_bio', data.company_bio)

    formData.append('google_reviews[google_report]', data.google_reviews.google_report.toString())

    if (data.google_reviews.google_average_rating !== null) {
      formData.append('google_reviews[google_average_rating]', data.google_reviews.google_average_rating)
    }

    if (data.google_reviews.google_number_reviews !== null) {
      formData.append('google_reviews[google_number_reviews]', data.google_reviews.google_number_reviews)
    }

    formData.append('google_reviews[auto_sync]', data.google_reviews.auto_sync.toString())

    formData.append('trustpilot_reviews[trustpilot_report]', data.trustpilot_reviews.trustpilot_report.toString())

    if (data.trustpilot_reviews.trustpilot_average_rating !== null) {
      formData.append(
        'trustpilot_reviews[trustpilot_average_rating]',
        data.trustpilot_reviews.trustpilot_average_rating
      )
    }

    if (data.trustpilot_reviews.trustpilot_number_reviews !== null) {
      formData.append(
        'trustpilot_reviews[trustpilot_number_reviews]',
        data.trustpilot_reviews.trustpilot_number_reviews
      )
    }

    formData.append('trustpilot_reviews[auto_sync]', data.trustpilot_reviews.auto_sync.toString())

    formData.append('notify_email', data.notify_email.toString())
    formData.append('notify_message', data.notify_message.toString())
    formData.append('notify_portal', data.notify_portal.toString())

    if (data.logo) {
      formData.append('logo', data.logo)
    }

    const response = await axiosClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return response.data
  } catch (error) {
    console.error('Update Profile Details API error:', error)
    throw error
  }
}

export const forgotPassword = async (data: ForgotPasswordPayload): Promise<ForgotPasswordResponse> => {
  try {
    const url = apiEndpoints.forgotPassword()
    const response = await axiosClient.post(url, data)

    return response.data
  } catch (error) {
    console.error('Forgot password API error:', error)
    throw error
  }
}

export const resetPassword = async (data: ResetPasswordPayload): Promise<ResetPasswordResponse> => {
  try {
    const url = apiEndpoints.resetPassword()
    const response = await axiosClient.post(url, data)

    return response.data
  } catch (error) {
    console.error('Reset password API error:', error)
    throw error
  }
}
