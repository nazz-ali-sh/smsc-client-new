export interface ServiceChargeBudgetData {
  managing_fee: string
  accounting_fee: string
  cosec_fee: string
  out_of_hours_fee: string
  emergency_fee: string
  fire_door_fee: string
  anti_money_fee: string
  current_service_charge_budget_type?: string | null
  current_service_charge_budget_amount?: string | null
  current_management_fee_type?: string | null
  current_management_fee_amount?: string | null
}

export interface ServiceChargeBudgetSectionProps {
  budgetData?: ServiceChargeBudgetData
}

export interface IPainPoint {
  question_id: number
  question: string
  answer: string
}

export interface PainPointsSectionProps {
  painPoints: IPainPoint[]
}

export interface IPriority {
  id: number
  name: string
  description?: string
}

export interface PrioritiesSectionProps {
  priorities: IPriority[]
}

export interface BlockDetailsData {
  block_condition: any
  postcode?: string
  address?: string
  lat?: string
  lng?: string
  region?: string
  state?: string | null
  county?: string
  address_line1?: string | null
  address_line2?: string
  number_of_blocks?: number
  total_units?: number
  year_built?: string
  name?: string
  block_name?: string
  current_managing_agent?: string
  outdoor_space?: string
  leasehold_type?: string
}

export interface BlockDetailsSectionProps {
  blockData?: BlockDetailsData
}
