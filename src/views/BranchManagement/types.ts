export interface BranchType {
  id: number
  company_id?: number
  user_id?: number | undefined
  branch_name?: string
  address?: string
  address_line2?: string
  postcode: string
  region?: string
  county?: string
  lat?: string
  lng?: string
  contact_name?: string
  contact_email?: string
  contact_phone?: string
  status?: string
  tenderRecipient?: string
}

export interface BranchFormData {
  company_id?: number
  user_id?: number
  branch_name: string
  address: string
  address_line_1: string
  address_line_2: string
  postcode: string
  county: string
  region: string
  lat: number
  lng: number
  contact_name: string
  contact_email: string
  contact_phone: string
}

export interface BranchFormModalProps {
  isOpen: boolean
  onClose: () => void
  editingBranch: BranchType | null
  onSubmit: (data: BranchFormData) => void
}

export interface UserType {
  id: number
  user_id: number
  name: string
  email: string
  company_id?: number
  mobile_number?: string
}

export const getBranchApiPayload = (branchFormData: any, selectedUser: UserType): BranchFormData => {
  return {
    company_id: selectedUser.company_id || undefined,
    user_id: selectedUser.user_id || undefined,
    branch_name: branchFormData.branchName,
    address: branchFormData.addressData.addressLine1,
    address_line_1: branchFormData.addressData.addressLine1,
    address_line_2: branchFormData.addressData.addressLine2 || '',
    postcode: branchFormData.addressData.postcode,
    county: branchFormData.addressData.county || '',
    region: branchFormData.addressData.region || '',
    lat: Number(branchFormData.addressData.coordinates.lat) || 0,
    lng: Number(branchFormData.addressData.coordinates.lng) || 0,
    contact_name: selectedUser.name,
    contact_email: selectedUser.email,
    contact_phone: selectedUser.mobile_number || ''
  }
}
