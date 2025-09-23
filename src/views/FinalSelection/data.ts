import type { FinalSelectionData } from './types'

export const finalSelectionData: FinalSelectionData = {
  startDate: '2025-09-29',
  managingAgent: {
    id: 'PMA-SE10077',
    companyName: 'Ouma Property Management London',
    website: 'www.oumapropertymanagement.co.uk',
    contactPerson: 'David Greenway',
    email: 'david@oumapropertymanagement.co.uk',
    phone: '07825 97 3421',
    address: '52 Old Quay Street London SW11 6HP'
  },
  metrics: [
    {
      title: 'No. of Units Managed',
      value: '23 Properties',
      icon: 'ri-building-line',
      color: '#4CAF50'
    },
    {
      title: 'Quotation',
      value: '$ 11,000',
      icon: 'ri-money-dollar-circle-line',
      color: '#2196F3'
    },
    {
      title: 'Trading Years',
      value: '11 Years',
      icon: 'ri-time-line',
      color: '#FF9800'
    }
  ],
  budgetItems: [
    { item: 'Enter Winning Budget', total: '£1,500', perFlat: '£75' },
    { item: 'Enter Winning Budget', total: '£1,500', perFlat: '£75' },
    { item: 'Enter Winning Budget', total: '£1,500', perFlat: '£75' }
  ],
  totalBudget: {
    total: '£4,500',
    perFlat: '£225'
  }
}
