export type InvoiceStatus = 'pending' | 'issued' | 'overdue' | 'paid'

export interface InvoiceData {
  invoice_id?: string | number
  id?: string | number
  invoice_number?: string
  tender_id?: string | number
  creation_date?: string
  issue_date?: string
  due_date?: string
  total_amount?: string | number
  paid_amount?: string | number
  payment_date?: string
  days_overdue?: number
  status?: InvoiceStatus
  [key: string]: any
}

export type InvoiceColumnKey =
  | 'invoice_number'
  | 'tender_id'
  | 'total_amount'
  | 'creation_date'
  | 'issue_date'
  | 'due_date'
  | 'days_overdue'
  | 'paid_amount'
  | 'payment_date'
  | 'status'
  | 'actions'

export interface InvoiceColumnConfig {
  key: InvoiceColumnKey
  header: string
  size?: number
}

export interface InvoiceTabItem {
  label: string
  icon: () => JSX.Element
  bg: string
  color: string
}

export interface InvoiceTabsProps {
  value: number
  onChange: (event: React.SyntheticEvent, newValue: number) => void
  tabs?: InvoiceTabItem[]
}
