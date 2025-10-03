'use client'

import React, { useState } from 'react'

import { Box } from '@mui/material'

import { useSelector } from 'react-redux'

import { useQuery } from '@tanstack/react-query'

import InviteRescheduleTab from './InviteRescheduleTab'
import InviteCompletedCalls from './InviteCompletedCalls'
import InviteCallHeader from './InviteCallHeader'
import InviteCallsTabSection from './InviteCallsTabSection'
import { rmcVideoCallDetails } from '@/services/site_visit_apis/site_visit_api'
import InvitePendingCalls from './InvitePendingCalls'
import InviteUpcomingCalls from './InviteUpcomingCalls'
import InviteRejectedTab from './InviteRejectedTab'

const InviteCallsTabs = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [activeStatus, setActiveStatus] = useState('')

  const tender_id = useSelector((state: any) => state?.rmcOnboarding?.tenderId)

  const { data: getVideoCallsData } = useQuery({
    queryKey: ['gettingVideoCallsDetails', tender_id, activeStatus],
    queryFn: () => rmcVideoCallDetails(activeStatus, tender_id),

    enabled: !!activeStatus
  })

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)

    if (newValue === 0) {
      setActiveStatus('upcoming')
    } else if (newValue === 1) {
      setActiveStatus('rescheduled')
    } else if (newValue === 2) {
      setActiveStatus('accepted')
    } else if (newValue === 3) {
      setActiveStatus('pending')
    } else {
      setActiveStatus('rejected')
    }
  }

  const getTitle = () => {
    switch (activeTab) {
      case 0:
        return 'Video Calls'
      case 1:
        return 'Rescheduled Call'
      case 2:
        return 'Completed Calls'
      case 3:
        return 'Pending Calls'
      case 4:
        return 'Rejected Calls'
      default:
        return 'Video Calls'
    }
  }

  return (
    <Box className='p-1 bg-white rounded-lg shadow h-[70vh] overflow-y-auto'>
      <InviteCallHeader title={getTitle()} actionButton='Schedule New Calls' />
      <InviteCallsTabSection value={activeTab} onChange={handleTabChange} />
      {activeTab === 0 && <InviteUpcomingCalls pendingInviteData={getVideoCallsData} />}
      {activeTab === 1 && <InviteRescheduleTab rescheduaInviteData={getVideoCallsData} />}
      {activeTab === 2 && <InviteCompletedCalls videoInviteData={getVideoCallsData} />}
      {activeTab === 3 && <InvitePendingCalls pendingInviteData={getVideoCallsData} />}
      {activeTab === 4 && <InviteRejectedTab rejectedInviteData={getVideoCallsData} />}
    </Box>
  )
}

export default InviteCallsTabs
