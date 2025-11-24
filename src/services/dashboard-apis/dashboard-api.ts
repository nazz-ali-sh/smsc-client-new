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

export const rmcRetender = async (payload: { tender_id: number; days: number; miles: number }) => {
  try {
    const url = apiEndpoints.rmcRetender()
    const response = await axiosClient.post(url, payload)
    
    return response.data
  } catch (error) {
    console.error('RMC Retender API error:', error)
    throw error
  }
}

export interface DashboardDataResponse {
  success: boolean
  message: string
  tender_id: number
  tender_name: string
  block_name: string
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
      stages: any
    }
    schedule_calls: any
    shortlisted_pma: any
    days_since_last_shorlisted: number
    days_since_last_site_visit: number
    days_since_last_video_call: number
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

export interface PmadsahbaordStatsResponse {
  status: string
  message: string
  data: {
    dashboard_stats: {
      tender_submitted: number
      tender_shortlisted: number
      tender_won: number
    }
    primary_user: {
      user_id: string
      active_offices: number
      active_users: number
    }
    pending_invoices: null
    stages: {
      live_tenders: {
        total_count: number
        today_count: number
      }
      submitted_tenders: {
        total_count: number
        today_count: number
      }
      shortlisted_tenders: {
        total_count: number
        today_count: number
      }
      video_calls: {
        total_count: number
        today_count: number
      }
      site_visits: {
        total_count: number
        today_count: number
      }
      appointed: {
        total_count: number
        today_count: number
      }
      closed: {
        total_count: number
        today_count: number
      }
      payments: {
        total_count: null
        today_count: null
        due_payments: null
        overdue_payments: null
      }
    }
    tender_updates: {
      appointed: {
        total_count: number
        last_thirty_days_count: number
      }
      submitted: {
        total_count: number
        last_thirty_days_count: number
      }
      shortlisted: {
        total_count: number
        last_thirty_days_count: number
      }
    }
  }
}

export const getPmadsahbaordStats = async (): Promise<PmadsahbaordStatsResponse> => {
  try {
    const url = apiEndpoints.getPmadsahbaordStats()
    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('PMA Dashboard stats API error:', error)
    throw error
  }
}
