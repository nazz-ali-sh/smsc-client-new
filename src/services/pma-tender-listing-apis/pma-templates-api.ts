import axiosClient from '@/utils/axiosInstance'
import type { SaveTemplatePayload } from '@/views/PmaTenderListing/types'

export const getPmaTemplates = async () => {
  try {
    const url = 'pma/templates'
    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('PMA Templates API error:', error)
    throw error
  }
}

export const saveTemplate = async (payload: SaveTemplatePayload) => {
  try {
    const url = 'pma/templates'
    const response = await axiosClient.post(url, payload)

    return response.data
  } catch (error) {
    console.error('Save Template API error:', error)
    throw error
  }
}

export const updateTemplate = async (id: number, payload: SaveTemplatePayload) => {
  try {
    const url = `pma/templates/${id}`
    const response = await axiosClient.put(url, payload)

    return response.data
  } catch (error) {
    console.error('Update Template API error:', error)
    throw error
  }
}

export const deleteTemplate = async (id: number) => {
  try {
    const url = `pma/templates/${id}`
    const response = await axiosClient.delete(url)

    return response.data
  } catch (error) {
    console.error('Delete Template API error:', error)
    throw error
  }
}
