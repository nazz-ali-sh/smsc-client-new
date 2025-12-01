'use client'

import React, { useEffect, useState } from 'react'

import { Box } from '@mui/material'


import { useQuery } from '@tanstack/react-query'

import SiteVisitHeader from './SiteVisitHeader'
import SiteReschedule from './SiteVisitReschedule'
import SiteVisitCompletedCalls from './SiteVisitCompletedCalls'
import SiteVisitPending from './SiteVisitPending'
import SiteVisitUpcoming from './SiteVisitUpcoming'
import SiteVisitReject from './SiteVisitReject'
import SiteVisitTabSection from './SiteVisitTabSection'
import { pamSiteVisit } from '@/services/pma_site_visit/pma_site_visit'

const SiteVisitTabs = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [activeStatus, setActiveStatus] = useState('')

  useEffect(() => {
    if (activeTab === 0) {
      setActiveStatus('upcoming')
    } else if (activeTab === 1) {
      setActiveStatus('rescheduled')
    } else if (activeTab === 2) {
      setActiveStatus('accepted')
    } else if (activeTab === 3) {
      setActiveStatus('pending')
    } else if (activeTab === 4) {
      setActiveStatus('rejected')
    } else {
      setActiveStatus('site visit')
    }
  }, [activeTab])

  const { data: getSiteVisit } = useQuery({
    queryKey: ['PmaData', activeStatus],
    queryFn: () => pamSiteVisit(activeStatus),
    enabled: !!activeStatus
  })

  console.log(getSiteVisit, 'getSiteVisit')

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const getTitle = () => {
    switch (activeTab) {
      case 0:
        return 'Site Visits'
      case 1:
        return 'Rescheduled Site Visits'
      case 2:
        return 'Completed Site Visits'
      case 3:
        return 'Pending Site Visits'
      case 4:
        return 'Rejected / Cancelled Site Visits'
      default:
        return 'Site Visits'
    }
  }

  return (
    <Box className='p-1 bg-white rounded-lg shadow h-[70vh] overflow-y-auto'>
      <SiteVisitHeader title={getTitle()} actionButton='Schedule New Site Visit' videoCallmodalData={getSiteVisit} />
      <SiteVisitTabSection value={activeTab} onChange={handleTabChange} />

      {activeTab === 0 && <SiteVisitUpcoming SiteUpComingData={getSiteVisit} />}
      {activeTab === 1 && <SiteReschedule siteRechedual={getSiteVisit} />}
      {activeTab === 2 && <SiteVisitCompletedCalls siteCompleted={getSiteVisit} />}
      {activeTab === 3 && <SiteVisitPending sitePendingData={getSiteVisit} />}
      {activeTab === 4 && <SiteVisitReject siteRejectedData={getSiteVisit} />}
    </Box>
  )
}

export default SiteVisitTabs
