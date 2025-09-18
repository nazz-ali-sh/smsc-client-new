
 export interface ShortlistedPmaResponse {
    status: string
    message: string
    data: {
      shortlist_id: number
      tender_id: number
      tender_name: string
      shortlisted_pma_count: number
      shortlisted_pma_users: ShortlistedPmaUser[]
      shortlisted_by: {
        id: number
        name: string | null
        email: string
      }
      created_at: string
      updated_at: string
      expiry_at: string
      masking: {
        is_masked: boolean
        days_remaining: number
        seconds_remaining: number
      }
    }
  }

  export interface ShortlistedPmaUser {
  id?: number
  pma_number?: string
  name?: string
  email?: string
  phone?: string
  
}
