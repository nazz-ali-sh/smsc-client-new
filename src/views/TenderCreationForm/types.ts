export interface AccountFormData {
  summary: any | string
}

export interface PersonalFormData {
  firstName: string
  lastName: string
  country: string
  language: string[]
}

export interface TenderPriority {
  id: number
  name: string
  description: string
}

export interface ActivactionQuestion {
  id: number
  question: string
  answer: string
}

export interface TenderActivationPayload {
  user_id: number
  funnel_id: number | null
  status: string
  stage: string
  approved_by: number
  priority: TenderPriority[]
  question: ActivactionQuestion[]
}

export interface SocialFormData {
  questions: { question: string; answer: string }[]
}

export interface DragAndDrop {
  id: string
  name: string
  description: string
}

export interface SortableListProps {
  sortListData: DragAndDrop[]
  isLoading: boolean
}
