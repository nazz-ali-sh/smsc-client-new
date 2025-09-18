import axios from 'axios'

const TENDER_ID = '63168138167'

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || ''
})

axiosClient.interceptors.request.use(
  (config: any) => {
    const token = `27|Izo2erPzI9N80qow35uKm2jw3A8Cno6trt1vPdId378f2c3c`

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
