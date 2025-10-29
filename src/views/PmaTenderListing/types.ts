export interface PmaTenderType {
  sr_no: number
  tender_id: number
  tender_name: string
  stage: string
  status: string
  region: string
  unit_count: number
  blocks_count: number
  block_condition: string
  outdoor_space: string
  year_built: string
  property_type: string
  end_date: string
  distance_miles: number
}

export interface PmaStatsType {
  pma_number: string | null
  pma_id: number
  pma_name: string
  active_offices: number
  active_users: number
  sub_user_visibility: boolean
  responses_sent_to: number
  shortlisted_for_tender: number
  tender_won: number
}
