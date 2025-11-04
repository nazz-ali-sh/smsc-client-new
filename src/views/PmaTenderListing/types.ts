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

export type QuoteFormData = {
  managementFee: string
  accountingFee: string
  coSecFee: string
  outOfHouseFee: string
  emergencyLightingTasks: string
  fireDoorInspections: string
  amlMoneyLaunderingChecks: string
}

export interface QuoteFormSectionProps {
  tenderId?: number
}

export interface RmcDetailsCardProps {
  rmcName?: string
  blockData?: any
}

export interface TenderId {
  tenderId: number
}

export interface PmaTemplateType {
  id: number
  user_id: number
  name: string
  message: string
  created_at: string
  updated_at: string
}

export interface PmaTemplatesResponse {
  success: boolean
  message: string
  data: {
    templates: PmaTemplateType[]
    stats: {
      total_templates: number
    }
  }
}

export type AppointedFormData = {
  startDate: string
  notes: string
}

export interface AppointedModalProps {
  open: boolean
  onClose: () => void
  tenderId: number | null
}

export interface SaveTemplatePayload {
  name: string
  message: string
}

export interface AddTemplateModalProps {
  isOpen: boolean
  handleClose: () => void
  onSave: (data: SaveTemplatePayload) => void
  isLoading?: boolean
  initialMessage?: string
  responseMessage?: string
}

export interface TemplateFormModalProps {
  isOpen: boolean
  handleClose: () => void
  onSave: (data: SaveTemplatePayload) => void
  isLoading?: boolean
  mode?: 'add' | 'edit'
}
