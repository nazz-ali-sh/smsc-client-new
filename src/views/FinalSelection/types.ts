export interface ManagingAgentData {
  id: string
  companyName: string
  website: string
  contactPerson: string
  email: string
  phone: string
  address: string
}

export interface ProjectMetric {
  title: string
  value: string
  icon: string
  color: string
}

export interface BudgetItem {
  item: string
  total: string
  perFlat: string
}

export interface FinalSelectionData {
  startDate: string
  managingAgent: ManagingAgentData
  metrics: ProjectMetric[]
  budgetItems: BudgetItem[]
  totalBudget: {
    total: string
    perFlat: string
  }
}
