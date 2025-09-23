import axios from 'axios'

const TENDER_ID = '63168138167'

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || ''
})

const getTokenFromCookie = () => {
  try {
    if (typeof document !== 'undefined') {
      const cookies = document.cookie.split(';')
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('rmc-token='))

      if (tokenCookie) {
        return tokenCookie.split('=')[1]
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
    return Promise.reject(error)
  }
)

export default axiosClient
