export type UserType = {
  id: number
  name: string
  email: string
  mobile_number: string
  branch_id: number
  status: 'active' | 'inactive'
  branch?: {
    id: number
    branch_name: string
    address: string
  }
}

export type UserFormData = {
  name: string
  email: string
  mobile_number: string
  branch_id: number
}

export interface BusinessProfileModalsProps {
  isDeleteModalOpen: boolean
  isTotalUnitModalOpen: boolean
  isUnitsAccountManagerModalOpen: boolean
  isContactPreferencesModalOpen: boolean
  isSecondaryContactModalOpen: boolean
  isSkipAction: boolean
  deleteMutationPending: boolean
  handleCancelDelete: () => void
  handleConfirmDelete: () => void
  handleModalClose: () => void
}


