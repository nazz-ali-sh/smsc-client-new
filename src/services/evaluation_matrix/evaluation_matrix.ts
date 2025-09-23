import { apiEndpoints } from '@/utils/apisEndpoints'
import axiosClient from '@/utils/axiosInstance'

export const gettingmetrixDetails = async (tender_id: number) => {
  try {
    const url = apiEndpoints.eveluationCatagories(tender_id)
    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Archive Details', error)
    throw error
  }
}

export const addEMetric = async (
  tender_id: number,
  name: string,
  description: string,
  default_weight: number,
  active: boolean
) => {
  try {
    const url = apiEndpoints.addEvaluationMetric()

    const response = await axiosClient.post(url, {
      tender_id,
      name,
      description,
      default_weight,
      active
    })

    return response.data
  } catch (error) {
    console.error('Add Evaluation Metric Error', error)
    throw error
  }
}


export const editEMetric = async (
  id: number,
  tender_id: number,
  name: string,
  description: string,
  default_weight: number,
  active: boolean
) => {
  try {
    const url = apiEndpoints.editEvaluationMetric(id)

    const response = await axiosClient.put(url , {
      tender_id,
      name,
      description,
      default_weight,
      active
    })

    return response.data
  } catch (error) {
    console.error('Add Evaluation Metric Error', error)
    throw error
  }
}



export const removeMatric = async ( id : number, tender_id: number) => {
  try {
    const url = apiEndpoints.removeEvaluationCatagory(id, tender_id)
    const response = await axiosClient.delete(url)

    return response.data
  } catch (error) {
    console.error('Archive Details', error)
    throw error
  }
}


// removeEvaluationCatagory
