import { apiEndpoints } from '@/utils/apisEndpoints'
import axiosClient from '@/utils/axiosInstance'

export const fianlResults = async (tender_id: number) => {
  try {
    const url = apiEndpoints.gettingFianlSelectionDetails(tender_id)

    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Tender Responce API error:', error)

    throw error
  }
}
