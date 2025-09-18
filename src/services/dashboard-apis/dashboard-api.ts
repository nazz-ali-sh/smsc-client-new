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
