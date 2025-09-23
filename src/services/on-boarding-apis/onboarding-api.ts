import axiosClient from '../../utils/axiosInstance'
import { apiEndpoints } from '../../utils/apisEndpoints'

interface RtmSetupData {
  name: string
  email: string
  phone_no: string
  address: string
}

interface RtmRole {
  id: number
  name: string
  email: string
  phone_no: string
  address: string
  created_at: string
  updated_at: string
}

/**
 * Submits onboarding data for a specific step.
 * @param step - The onboarding step number.
 * @param data - The payload to send for the onboarding step.
 * @returns The API response data.
 * @throws Error if the API call fails.
 */
export const onBoardingFlow = async (step: number, data: Record<string, any>) => {
  try {
    const url = apiEndpoints.rmcOnboarding()
    const response = await axiosClient.post(url, data)

    return response.data
  } catch (error) {
    console.error(`Onboarding API error for step ${step}:`, error)
    throw error
  }
}

/**
 * Submits RTM setup data.
 * @param data - The RTM setup data (name, email, phone_no, address).
 * @returns The API response data.
 * @throws Error if the API call fails.
 */
export const submitRtmSetup = async (data: RtmSetupData) => {
  try {
    const url = apiEndpoints.setRtmRole()
    const response = await axiosClient.post(url, data)

    return response.data
  } catch (error) {
    console.error('RTM setup API error:', error)
    throw error
  }
}

/**
 * Fetches available RTM roles.
 * @returns An array of RTM roles.
 * @throws Error if the API call fails.
 */
export const getRtmRoles = async (): Promise<RtmRole[]> => {
  try {
    const url = apiEndpoints.getRoleRtm
    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Get RTM roles API error:', error)
    throw error
  }
}

export const Verification = async (data: { user_id: number; otp: string }) => {
  try {
    const url = apiEndpoints.otpVerification()

    const response = await axiosClient.post(url, {
      user_id: data.user_id,
      otp: data.otp
    })

    return response.data
  } catch (error) {
    console.error('OTP verification API error:', error)
    throw error
  }
}

export const getballParkData = async (session_Id: number | string) => {
  try {
    const url = apiEndpoints.ballParkQuote(session_Id)

    console.log('Generated URL:', url)
    const response = await axiosClient.post(url)

    return response.data
  } catch (error) {
    console.error('RTM setup API error:', error)

    throw error
  }
}

//  nearByPma

export const getNearByPmaData = async (lat: number, lng: number, radius: number = 10) => {
  try {
    const url = apiEndpoints.nearByPma(lat, lng, radius)

    console.log('Generated URL:', url)
    const response = await axiosClient.post(url)

    return response.data
  } catch (error) {
    console.error('Nearby PMA API error:', error)

    throw error
  }
}
