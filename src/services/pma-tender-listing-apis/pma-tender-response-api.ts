import axiosClient from '@/utils/axiosInstance'

export interface PmaTenderResponsePayload {
  tender_id: number
  response_message: string
  management_fee: number
  accounting_fee: number
  cosec_fee: number
  out_of_hours_fee: number
  emergency_fee: number
  fire_door_fee: number
  anti_money_fee: number
}

export const submitPmaTenderResponse = async (payload: PmaTenderResponsePayload) => {
  try {
    const url = 'pma/tender-responses'
    const response = await axiosClient.post(url, payload)

    return response.data
  } catch (error) {
    console.error('PMA Tender Response API error:', error)
    throw error
  }
}

