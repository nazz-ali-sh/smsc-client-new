import type { RootState } from '@/redux-store'

export interface BudgetFormData {
  managing_fee: string
  accounting_fee: string
  cosec_fee: string
  out_of_hours_fee: string
  emergency_fee: string
  fire_door_fee: string
  anti_money_fee: string
}

export interface BudgetConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  budgetData: BudgetFormData | null
  onConfirm: () => void
  onEdit: () => void
  isLoading?: boolean
}

export interface BudgetSkipModalProps {
  isOpen: boolean
  onClose: () => void
  onSkipAnyway: () => void
  onBackToEdit: () => void
  isLoading: boolean
}

export interface QuestionCardProps {
  question: string
  questionKey: keyof RootState['rtmNonDirector']['questions']
  nextRoute: string
  backRoute: string
  questionNumber: number
}
