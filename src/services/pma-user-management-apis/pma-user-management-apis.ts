import axiosClient from '@/utils/axiosInstance'

const url = 'pma/users'

export const getPmaUsers = async () => {
  try {
    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Get PMA Users API error:', error)
    throw error
  }
}

export const addPmaUser = async (payload: {
  name: string
  email: string
  mobile_number: string
  branch_id: number
}) => {
  try {
    const response = await axiosClient.post(url, payload)

    return response.data
  } catch (error) {
    console.error('Add PMA User API error:', error)
    throw error
  }
}

export const updatePmaUser = async (
  id: number,
  payload: { name: string; email: string; mobile_number: string; branch_id: number; status?: string }
) => {
  try {
    const response = await axiosClient.put(`${url}/${id}`, payload)

    return response.data
  } catch (error) {
    console.error('Update PMA User API error:', error)
    throw error
  }
}

export const deletePmaUser = async (id: number) => {
  try {
    const response = await axiosClient.delete(`${url}/${id}`)

    return response.data
  } catch (error) {
    console.error('Delete PMA User API error:', error)
    throw error
  }
}

export const getPmaUserById = async (id: number) => {
  try {
    const response = await axiosClient.get(`${url}/${id}`)

    return response.data
  } catch (error) {
    console.error('Get PMA User By ID API error:', error)
    throw error
  }
}


export const updatePmaUserStatus = (id: number, status: 'active' | 'inactive') => {
  return axiosClient.patch(`/pma/users/${id}/status`, { status })
}
