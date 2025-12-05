import { toast } from 'react-toastify'

import type { InvoiceData, InvoiceColumnConfig } from './types'
import documentViewer from '../../../../public/svgs/document-viewer1.svg'
import documentPlayIcon from '../../../../public/svgs/document-play.svg'
import payNowIcon from '../../../../public/svgs/paynow.svg'

const actionHandlers = {
  view: (invoice: InvoiceData) => toast.info(`Viewing invoice: ${invoice.invoice_number}`),
  documentViewer: (invoice: InvoiceData) => toast.info(`Document Viewer: ${invoice.invoice_number}`),
  payNow: (invoice: InvoiceData) => toast.info(`Pay Now: ${invoice.invoice_number}`),
  issue: (invoice: InvoiceData) => toast.success(`Issuing invoice: ${invoice.invoice_number}`)
}

const buttons = {
  view: {
    tooltip: 'View',
    icon: 'ri-eye-line',
    iconType: 'class',
    bg: '#26C6F93D',
    color: '#26C6F9',
    handler: actionHandlers.view
  },
  documentViewer: {
    tooltip: 'Document Viewer',
    icon: documentViewer,
    iconType: 'image',
    bg: '#26C6F93D',
    color: '#26C6F9',
    handler: actionHandlers.documentViewer
  },
  payNow: {
    tooltip: 'Pay Now',
    icon: payNowIcon,
    iconType: 'image',
    bg: '#26C6F93D',
    color: '#26C6F9',
    width: 22,
    height: 22,
    handler: actionHandlers.payNow
  },
  issue: {
    tooltip: 'Issue',
    icon: documentPlayIcon,
    iconType: 'image',
    bg: '#26C6F93D',
    color: '#26C6F9',
    handler: actionHandlers.issue
  }
}

const allColumns: Record<string, InvoiceColumnConfig[]> = {
  pending: [
    { key: 'invoice_number', header: 'Invoice No.', size: 150 },
    { key: 'tender_id', header: 'Tender ID', size: 120 },
    { key: 'total_amount', header: 'Total Amount', size: 130 },
    { key: 'creation_date', header: 'Creation Date', size: 130 },
    { key: 'status', header: 'Status', size: 120 },
    { key: 'actions', header: 'Action', size: 150 }
  ],
  issued: [
    { key: 'invoice_number', header: 'Invoice No.', size: 150 },
    { key: 'tender_id', header: 'Tender ID', size: 120 },
    { key: 'total_amount', header: 'Total Amount', size: 130 },
    { key: 'issue_date', header: 'Issue Date', size: 130 },
    { key: 'due_date', header: 'Due Date', size: 130 },
    { key: 'actions', header: 'Action', size: 150 }
  ],
  overdue: [
    { key: 'invoice_number', header: 'Invoice No.', size: 150 },
    { key: 'tender_id', header: 'Tender ID', size: 120 },
    { key: 'total_amount', header: 'Total Amount', size: 130 },
    { key: 'due_date', header: 'Due Date', size: 130 },
    { key: 'days_overdue', header: 'Days Overdue', size: 130 },
    { key: 'actions', header: 'Action', size: 150 }
  ],
  paid: [
    { key: 'invoice_number', header: 'Invoice No.', size: 150 },
    { key: 'tender_id', header: 'Tender ID', size: 120 },
    { key: 'total_amount', header: 'Total Amount', size: 130 },
    { key: 'paid_amount', header: 'Paid Amount', size: 130 },
    { key: 'payment_date', header: 'Payment Date', size: 130 },
    { key: 'actions', header: 'Action', size: 150 }
  ]
}

export type InvoiceTabConfig = {
  title: string
  description: string
  status: string
  columns: InvoiceColumnConfig[]
  actions: Array<typeof buttons[keyof typeof buttons]>
}

export const invoiceTabsConfig: InvoiceTabConfig[] = [
  {
    title: 'Pending Invoices – Not Issued Yet',
    description:
      'View and confirm the start date of RMC contracts you have won. These invoices will be auto generated if start dates are not confirmed within 5 working dates.',
    status: 'pending',
    columns: allColumns.pending,
    actions: [buttons.issue, buttons.documentViewer]
  },
  {
    title: 'Issued – Awaiting Payment',
    description: 'View all upcoming Invoices',
    status: 'issued',
    columns: allColumns.issued,
    actions: [buttons.view, buttons.documentViewer, buttons.payNow]
  },
  {
    title: 'Overdue',
    description: 'Access all invoices that are past their due date for payment.',
    status: 'overdue',
    columns: allColumns.overdue,
    actions: [buttons.view, buttons.documentViewer]
  },
  {
    title: 'Paid',
    description: 'Access all invoices that are past their due date for payment.',
    status: 'paid',
    columns: allColumns.paid,
    actions: [buttons.view, buttons.documentViewer]
  }
]

export const getInvoiceTabConfig = (tabIndex: number): InvoiceTabConfig =>
  invoiceTabsConfig[tabIndex] || invoiceTabsConfig[0]
