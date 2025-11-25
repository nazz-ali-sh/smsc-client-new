export type UserType = {
  id: number
  name: string
  email: string
  mobile_number: string
  branch_id: number
  status: 'active' | 'inactive'
}

export type UserFormData = {
  name: string
  email: string
  mobile_number: string
  branch_id: number
}
