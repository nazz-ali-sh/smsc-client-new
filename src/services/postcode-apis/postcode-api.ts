import axios from 'axios'

export interface PostcodeAddress {
  line_1: string
  line_2?: string
  line_3?: string
  post_town: string
  postcode: string
  country: string
}

export interface PostcodeResult {
  county: any
  postcode: string
  postcode_inward: string
  postcode_outward: string
  post_town: string
  dependant_locality?: string
  double_dependant_locality?: string
  thoroughfare?: string
  dependant_thoroughfare?: string
  building_number?: string
  building_name?: string
  sub_building_name?: string
  po_box?: string
  department_name?: string
  organisation_name?: string
  udprn: number
  umprn?: number
  postcode_type: string
  su_organisation_indicator?: string
  delivery_point_suffix: string
  line_1: string
  line_2?: string
  line_3?: string
  premise: string
  longitude: number
  latitude: number
  eastings: number
  northings: number
  country: string
  traditional_county: string
  administrative_county?: string
  postal_county: string
  district: string
  ward: string
}

export interface PostcodeLookupResponse {
  code: number
  message: string
  result?: PostcodeResult[]
}

export interface PostcodeLookupPayload {
  postcode: string
}

export const lookupPostcode = async (data: PostcodeLookupPayload): Promise<PostcodeLookupResponse> => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_POSTCODE_API_KEY
    const baseUrl = process.env.NEXT_PUBLIC_POSTCODE_API_BASE_URL

    if (!apiKey) {
      throw new Error('Postcode API key is not configured')
    }

    if (!baseUrl) {
      throw new Error('Postcode API base URL is not configured')
    }

    const url = `${baseUrl}postcodes/${data.postcode}?api_key=${apiKey}`

    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data
  } catch (error) {
    console.error('Postcode lookup API error:', error)
    throw error
  }
}
