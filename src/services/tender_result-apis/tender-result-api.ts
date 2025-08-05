import axiosClient from '../../utils/axiosInstance'
import { apiEndpoints } from '../../utils/apisEndpoints'

export const tenderResponce = async (tender_id: number) => {
  try {
    const url = apiEndpoints.getTenderResult(tender_id)

    console.log('Generated URL:', url)
    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Tender Responce API error:', error)

    throw error
  }
}




export const ShortlistedPma = async (tender_id: number, pma_user_ids: number[]) => {
  try {
    const url = apiEndpoints.selectShortListpma()

    // Create the payload to send in the request body
    const payload = {
      tender_id,
      pma_user_ids,
    }

    console.log('Generated URL:', url)
    console.log('Sending Payload:', payload)

    // Pass the payload as the second argument to the POST request
    const response = await axiosClient.post(url, payload)

    return response.data
  } catch (error) {
    console.error('RTM setup API error:', error)
    throw error
  }
}


// 

export const finalShortListedAgent = async (tender_id: number) => {
  try {
    const url = apiEndpoints.finalShortList(tender_id)

    console.log('Generated URL:', url)
    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Tender Responce API error:', error)

    throw error
  }
}

