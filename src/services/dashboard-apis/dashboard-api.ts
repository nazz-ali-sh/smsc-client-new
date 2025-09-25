import axiosClient from '../../utils/axiosInstance'
import { apiEndpoints } from '../../utils/apisEndpoints'

export const dashboardData = async (tender_id: number) => {
  try {
    // Construct URL with query param
    const url = apiEndpoints.getDashboardData(Number(tender_id))
    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Dashboard API error:', error)
    throw error
  }
}

export const dashboardFaqs = async (tender_id: number) => {
  try {
    // Construct URL with query param
    const url = apiEndpoints.getDashbaordFaq(tender_id)
    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Dashboard API error:', error)
    throw error
  }
}

export const gettingRmcTenderId = async () => {
  try {
    const url = apiEndpoints.getTenderId
    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Get RTM roles API error:', error)
    throw error
  }
}

export interface DashboardDataResponse {
  success: boolean
  message: string
  tender_id: number
  tender_name: string
  data: {
    pma_count: number
    tender_response_count: number
    tender_expiry: string
    tender_end_date: {
      date: string
      formatted_date: string
      formatted_datetime: string
      day_name: string
      is_past: boolean
      can_rmc_see_applications: boolean
      working_days_from_activation: number
      description: string
    }
    tender_progress: string
    tender_stage_progress: {
      current_stage: {
        stage: string
        display_name: string
        stage_number: number
      }
      progress_percentage: number
      total_stages: number
      completed_stages: number
      remaining_stages: number
      stages: Array<{
        stage: string
        display_name: string
        stage_number: number
        is_completed: boolean
        is_current: boolean
        completed_at: string
      }>
    }
    schedule_calls: any
    shortlisted_pma: any
    days_since_last_shorlisted: number
  }
}

export const getDashboardData = async (tender_id: number): Promise<DashboardDataResponse> => {
  try {
    const url = apiEndpoints.getDashboardData(tender_id)
    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Dashboard data API error:', error)
    throw error
  }
}
