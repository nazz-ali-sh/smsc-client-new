import axiosClient from '@/utils/axiosInstance'

export const getPmaBranches = async () => {
  try {
    const response = await axiosClient.get('pma/branches')

    return response.data
  } catch (error) {
    console.error('Get PMA Branches API error:', error)
    throw error
  }
}

export const getPmaBranchById = async (id: number) => {
  try {
    const response = await axiosClient.get(`pma/branches/${id}`)

    return response.data
  } catch (error) {
    console.error('Get PMA Branch By ID API error:', error)
    throw error
  }
}

export const addPmaBranch = async (payload: {
  branch_name: string
  address: string
  postcode: string
  contact_name: string
  contact_email: string
  contact_phone: string
}) => {
  try {
    const response = await axiosClient.post('pma/branches', payload)

    return response.data
  } catch (error) {
    console.error('Add PMA Branch API error:', error)
    throw error
  }
}

export const updatePmaBranch = async (
  id: number,
  payload: {
    branch_name: string
    address: string
    postcode: string
    contact_name: string
    contact_email: string
    contact_phone: string
    status?: string
  }
) => {
  try {
    const response = await axiosClient.put(`pma/branches/${id}`, payload)

    return response.data
  } catch (error) {
    console.error('Update PMA Branch API error:', error)
    throw error
  }
}

export const deletePmaBranch = async (id: number) => {
  try {
    const response = await axiosClient.delete(`pma/branches/${id}`)

    return response.data
  } catch (error) {
    console.error('Delete PMA Branch API error:', error)
    throw error
  }
}
