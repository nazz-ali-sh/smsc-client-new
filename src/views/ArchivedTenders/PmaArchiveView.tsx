'use client'

import React from 'react'

import SummaryCards from '@/common/SummaryCardsDetails'
import PmaArchiveTable from './components/PmaArchiveTable'

const PmaArchiveView = () => {
  const dummyTenderStatusDetails = {
    data: {
      totals: {
        total_archived: 52,
        total_expired: 5,
        total_shortlisted: 7,
        total_appointed: 3,
        total_not_shortlisted: 0
      }
    }
  }

  return (
    <div className='space-y-10'>
      <SummaryCards tenderStatusdetails={dummyTenderStatusDetails} />
      <PmaArchiveTable />
    </div>
  )
}

export default PmaArchiveView
