import axios from 'axios'

const TENDER_ID = '63168138167'

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || ''
})

axiosClient.interceptors.request.use(
  (config: any) => {
    const token = `2|nNEPjyseHX1dhQmDW9Co4JQzSG0lNRqkn3jmyPCq16ec6c47`

    if (!config.headers) {
      config.headers = {}
    }

    config.headers['Tender-ID'] = TENDER_ID

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
