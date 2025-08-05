export type DataTypes = {
  id: number
  avatar: string
  fullName: string
  tradingYears: number | string
  city: string
  start_date: string
  location: number | string
  NoOfUnits: number | string
  googleReview: number | string
  experience: string
  status: number
  submittedDate: number | string
  quotation: number | string
  Actions: number | string
  Questionaire: string
}

export const data: DataTypes[] = [
  {
    id: 1,
    avatar: 'MA',
    fullName: 'PMSE1xxxxx',
    submittedDate: 'Submitted on: 20/12/2025',
    quotation: '100,00',
    location: '800, London',
    NoOfUnits: '20',
    googleReview: 3,
    tradingYears: '11',
    Questionaire: 'View agent Response & Quote',
    Actions: '',
    city: '',
    start_date: '',
    experience: '',
    status: 0
  },
  {
    id: 2,
    avatar: 'MA',
    fullName: 'PMSE1xxxxx',
    submittedDate: 'Submitted on: 20/12/2025',
    quotation: '100,00',
    location: '800, London 800',
    NoOfUnits: '20',
    googleReview: 2,
    tradingYears: '11',
    Questionaire: 'View agent Response & Quote',
    Actions: '',
    city: '',
    start_date: '',
    experience: '',
    status: 0
  },
  {
    id: 3,
    avatar: 'MA',
    fullName: 'PMSE1xxxxx',
    submittedDate: 'Submitted on: 20/12/2025',
    quotation: '100,00',
    location: '800, London',
    NoOfUnits: '20',
    googleReview: 1,
    tradingYears: '11',
    Questionaire: 'View agent Response & Quote',
    Actions: '',
    city: '',
    start_date: '',
    experience: '',
    status: 0
  },
  {
    id: 4,
    avatar: 'MA',
    fullName: 'PMSE1xxxxx',
    submittedDate: 'Submitted on: 20/12/2025',
    quotation: '100,00',
    location: '800, London',
    NoOfUnits: '20',
    googleReview: 'google',
    tradingYears: '11',
    Questionaire: 'View agent Response & Quote',
    Actions: '',
    city: '',
    start_date: '',
    experience: '',
    status: 0
  },
  {
    id: 5,
    avatar: 'MA',
    fullName: 'PMSE1xxxxx',
    submittedDate: 'Submitted on: 20/12/2025',
    quotation: '100,00',
    location: '800, London',
    NoOfUnits: '20',
    googleReview: 'google',
    tradingYears: '11',
    Questionaire: 'View agent Response & Quote',
    Actions: '',
    city: '',
    start_date: '',
    experience: '',
    status: 0
  },
  {
    id: 6,
    avatar: 'MA',
    fullName: 'PMSE1xxxx',
    submittedDate: 'Submitted on: 20/12/2025',
    quotation: '100,00',
    location: '800, London',
    NoOfUnits: '20',
    googleReview: 'google',
    tradingYears: '11',
    Questionaire: 'View agent Response & Quote',
    Actions: '',
    city: '',
    start_date: '',
    experience: '',
    status: 0
  },
  {
    id: 7,
    avatar: 'MA',
    fullName: 'PMSE1xxxx',
    submittedDate: 'Submitted on: 20/12/2025',
    quotation: '100,00',
    location: '800, London',
    NoOfUnits: '20',
    googleReview: 'google',
    tradingYears: '11',
    Questionaire: 'View agent Response & Quote',
    Actions: '',
    city: '',
    start_date: '',
    experience: '',
    status: 0
  },
  {
    id: 8,
    avatar: 'MA',
    fullName: 'PMSE1xxxx',
    submittedDate: 'Submitted on: 20/12/2025',
    quotation: '100,00',
    location: '800, London',
    NoOfUnits: '20',
    googleReview: 'google',
    tradingYears: '11',
    Questionaire: 'View agent Response & Quote',
    Actions: '',
    city: '',
    start_date: '',
    experience: '',
    status: 0
  },
  {
    id: 9,
    avatar: 'MA',
    fullName: 'PMSE1xxxx',
    submittedDate: 'Submitted on: 20/12/2025',
    quotation: '100,00',
    location: '800, London',
    NoOfUnits: '20',
    googleReview: 'google',
    tradingYears: '11',
    Questionaire: 'View agent Response & Quote',
    Actions: '',
    city: '',
    start_date: '',
    experience: '',
    status: 0
  }
]

export default data

export type Quotation = {
  total_quote_inc_vat: number
  per_unit_equivalent_inc_vat: number | null
  vat_option: string
  pricing_breakdown: Array<{
    description: string
    type: string
    amount: number
  }>
}

export type Location = {
  address: string
  postcode: string | null
  coordinates: {
    lat: number
    lng: number
  }
}

export type CompanyMetrics = {
  trading_years: number | null
  total_units_managed: number | null
  avg_units_per_manager: number | null
  fee_range: {
    min_fee_per_unit: number
    max_fee_per_unit: number
  }
}

export type ContactDetails = {
  website: string | null
  landline: string | null
}

export type Review = {
  rating: number
  review_count: number | null
}

export type Reviews = {
  google: Review
  trustpilot: Review
}

export type ResponseDetails = {
  message: string
  additional_fields: {
    special_requirements: string
    insurance_coverage: string
  }
  submitted_at: string
}

export type ApiResponseItem = {
  response_id: number
  pma_user_id: number
  pma_number: string
  company_name: string
  is_shortlisted: boolean
  quotation: Quotation
  location: Location
  company_metrics: CompanyMetrics
  contact_details: ContactDetails
  reviews: Reviews
  response_details: ResponseDetails
}

export type TenderResponse = {
  data: any
  total_count: number
  responses: ApiResponseItem[]
}

export type DataType = {
  id: number // Mapped from response_id
  pma_id: number
  avatar: string // This might need a default or be based on company_name
  fullName: string // Mapped from company_name
  tradingYears: number | string // Mapped from company_metrics.trading_years
  city: string // Not directly in API, could extract from location.address or remove if not needed
  start_date: string // Not directly in API, remove if not needed
  location: number | string // Mapped from location.address
  NoOfUnits: number | string // Mapped from quotation.per_unit_equivalent_inc_vat or total_units_managed
  googleReview: number | string // Mapped from reviews.google.rating
  experience: string // Not directly in API, remove or derive
  status: number // Not directly in API, remove or derive
  submittedDate: number | string // Mapped from response_details.submitted_at
  quotation: number | string // Mapped from quotation.total_quote_inc_vat
  Actions: number | string // Keep as is for your action column
  Questionaire: string // Keep as is for your button text
}
