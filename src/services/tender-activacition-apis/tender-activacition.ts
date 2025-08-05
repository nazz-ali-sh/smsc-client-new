import axiosClient from '../../utils/axiosInstance'
import { apiEndpoints } from '../../utils/apisEndpoints'
import type { TenderActivationPayload } from '@/views/TenderCreationForm/types'

export const gettingOnboardingDetails = async () => {
  const url = apiEndpoints.getPriorities

  try {
    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Get Onboarding Details API error:', error)
    throw error
  }
}

/**
 * Fetches Activaction Questions  .
 */
export const gettingQuestion = async () => {
  const url = apiEndpoints.getActivactionQuestion

  try {
    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Get Onboarding Details API error:', error)
    throw error
  }
}

/**
 * Active Tender Activate  .
 */
export const tenderActivaction = async (data: TenderActivationPayload) => {
  const url = apiEndpoints.tenderActivaction

  try {
    const response = await axiosClient.post(url, data)

    return response.data
  } catch (error) {
    console.error('Get Onboarding Details API error:', error)
    throw error
  }
}

export const OnboardingData = async (funnel_Id: number | string) => {
  try {
    // Construct URL with query param
    const url = apiEndpoints.gettingOnboardingData(funnel_Id)
    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Dashboard API error:', error)
    throw error
  }
}
