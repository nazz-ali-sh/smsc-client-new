export interface SummaryStats {
  totalArchived: number
  expired: number
  shortlisted: number
  won: number
  notShortlisted: number
}

export interface TenderApi {
  tender_name?: string
  tender_number: string
  status: string
  total_responses: number
  total_shortlisted: number
  meeting_held_count: number
  site_visit_count: number
  submitted_date: string | null
  closed_date: string | null
}

export interface ArchivedTenderType {
  id: string
  tenders?: any
  status?: any
  tenderId?: string
  tenderName?: string
  tender_name?: string
  totalResponses: number
  shortlisted: number
  meetingHeld: {
    videoCalls: number
    siteVisits: number
  }
  submittedDate: string | null
  closedDate: string | null
}

export interface ArchiveDataResponse {
  data?: {
    tenders?: TenderApi[]
  }
}
