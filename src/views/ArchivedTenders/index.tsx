'use client'

import React from 'react'

import ArchiveTable from './components/ArchiveTable'
import SummaryCards from './components/SummaryCards'

const ArchivedTenders = () => {
  return (
    <div className='space-y-10'>
      <SummaryCards />
      <ArchiveTable />
    </div>
  )
}

export default ArchivedTenders
