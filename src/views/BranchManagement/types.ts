export interface BranchType {
  id: number
  company_id: number
  user_id: number | undefined
  branch_name: string
  address: string
  postcode: string
  lat: string
  lng: string
  contact_name: string
  contact_email: string
  contact_phone: string
  status: string
  tenderRecipient?: string
}

export type UserType = {
  id: number
  name: string
  email: string
  mobile_number: string
}
