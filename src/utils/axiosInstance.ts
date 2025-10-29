import axios from 'axios'

import { clearAllTokenCookies } from '@/utils/tokenSync'

const TENDER_ID = '63168138167'

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || ''
})

const getTokenFromCookie = () => {
  try {
    if (typeof document !== 'undefined') {
      const cookies = document.cookie.split(';')
      const rmcTokenCookie = cookies.find(cookie => cookie.trim().startsWith('rmc-token='))
      const pmaTokenCookie = cookies.find(cookie => cookie.trim().startsWith('pma-token='))

      if (rmcTokenCookie) {
        return rmcTokenCookie.split('=')[1]
      }

      if (pmaTokenCookie) {
        return pmaTokenCookie.split('=')[1]
      }
    }

    return null
  } catch (error) {
    console.error('Error getting token from cookie:', error)

    return null
  }
}

axiosClient.interceptors.request.use(
  (config: any) => {
    const token = getTokenFromCookie()

    if (!config.headers) {
      config.headers = {}
    }

    // Only add Tender-ID header for non-auth endpoints
    if (!config.url?.includes('/api/auth/')) {
      config.headers['Tender-ID'] = TENDER_ID
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.log('🚪 401 Unauthorized - Logging out user')

      clearAllTokenCookies()

      if (typeof window !== 'undefined') {
        localStorage.removeItem('persist:root')
        localStorage.removeItem('rmc-onboarding-postcode')
        sessionStorage.clear()

        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default axiosClient
