export interface PmaDetailsResponse {
  success: boolean
  message: string
  data: {
    pma_user: {
      id: number
      name: string
      email: string
      pma_number: string
      mobile_number: string
    }
    company_details: {
      id: number
      name: string
      website: string
      address: string
      postcode: string
      landline: string
      trading_years: number
      total_units: number
      avg_units_per_manager: number
      bio: string
      logo_url: string
    }
    ratings_and_reviews: {
      three_star_count: any
      two_star_count: any
      one_star_count: any
      four_star_count: any
      five_star_count: any
      google_rating: string
      google_review_count: number
      trustpilot_rating: string | null
      trustpilot_review_count: number | null
    }
    quotation: {
      min_fee_per_unit: string
      max_fee_per_unit: string
      latest_quote: string
      latest_quote_date: string // ISO date format (YYYY-MM-DD)
    }
    upcoming_video_call: any | null
    upcoming_site_visit: any | null
    completed_video_calls: any[]
    completed_site_visits: any[]
  }
}
