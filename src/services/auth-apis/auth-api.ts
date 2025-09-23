import axiosClient from '../../utils/axiosInstance'
import { apiEndpoints } from '../../utils/apisEndpoints'

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  data: any
  status: string
  success: boolean
  message: string
  token?: string
  user?: {
    id: number
    name: string
    email: string
    email_verified_at: string
    created_at: string
    updated_at: string
  }
  token_type?: string
}

export interface ForgotPasswordPayload {
  email: string
}

export interface ForgotPasswordResponse {
  status: string
  success: boolean
  message: string
  data?: any
}

export interface ResetPasswordPayload {
  token: string
  email: string
  password: string
  password_confirmation: string
}

export interface ResetPasswordResponse {
  status: string
  success: boolean
  message: string
  data?: any
}

export const loginUser = async (data: LoginPayload): Promise<LoginResponse> => {
  try {
    const url = apiEndpoints.login()
    const response = await axiosClient.post(url, data)

    return response.data
  } catch (error) {
    console.error('Login API error:', error)
    throw error
  }
}

export const forgotPassword = async (data: ForgotPasswordPayload): Promise<ForgotPasswordResponse> => {
  try {
    const url = apiEndpoints.forgotPassword()
    const response = await axiosClient.post(url, data)

    return response.data
  } catch (error) {
    console.error('Forgot password API error:', error)
    throw error
  }
}

export const resetPassword = async (data: ResetPasswordPayload): Promise<ResetPasswordResponse> => {
  try {
    const url = apiEndpoints.resetPassword()
    const response = await axiosClient.post(url, data)

    return response.data
  } catch (error) {
    console.error('Reset password API error:', error)
    throw error
  }
}
