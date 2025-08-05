export interface ArchivedTenderType {
  id: string
  tenderName: string
  tenderId: string
  status: 'Appointed' | 'Expired' | 'Shortlisted' | 'Won' | 'Not Shortlisted'
  totalResponses: number
  shortlisted: number
  meetingHeld: {
    videoCalls: number
    siteVisits: number
  }
  submittedDate: string
  closedDate: string
}

export interface SummaryStats {
  totalArchived: number
  expired: number
  shortlisted: number
  won: number
  notShortlisted: number
}
