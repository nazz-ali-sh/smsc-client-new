'use client'

import React, { useMemo, useState } from 'react'

import { Box } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'

import { useSelector } from 'react-redux'

import { useQuery } from '@tanstack/react-query'

import InviteRescheduleTab from './InviteRescheduleTab'
import InviteCompletedCalls from './InviteCompletedCalls'
import InviteCallHeader from './InviteCallHeader'
import { InviteTabItems } from '../data'
import InviteCallsTabSection, { type InviteTabItem } from './InviteCallsTabSection'
import { rmcVideoCallDetails } from '@/services/site_visit_apis/site_visit_api'
import InvitePendingCalls from './InvitePendingCalls'
import InviteUpcomingCalls from './InviteUpcomingCalls'
import InviteRejectedTab from './InviteRejectedTab'

interface TenderType {
  tenderName: string
  pmaId: string
  yearTrading: number
  unitsManaged: number
  quotations: number
  videoCallLink: string
  timeline: string
  status: string
}

const columnHelper = createColumnHelper<TenderType>()

const InviteCallsTabs = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [activeStatus, setActiveStatus] = useState('')

  const rmcData = useSelector((state: any) => state?.rmcOnboarding?.rmcData)
  const tender_id = rmcData?.tender_id

  const { data: getVideoCallsData } = useQuery({
    queryKey: ['gettingVideoCallsDetails', tender_id, activeStatus],
    queryFn: () => rmcVideoCallDetails(activeStatus, tender_id),

    enabled: !!activeStatus
  })

  console.log(getVideoCallsData)

  const columns = useMemo(
    () => [
      columnHelper.accessor((row, index) => index + 1, {
        id: 'sr',
        header: 'SR #',
        cell: info => info.getValue(),
        size: 30,
        enableSorting: true
      }),
      columnHelper.accessor('pmaId', {
        header: 'PMA ID',
        cell: info => info.getValue(),
        size: 150,
        enableSorting: true
      }),
      columnHelper.accessor('yearTrading', {
        header: 'Year Trading',
        cell: info => info.getValue(),
        size: 120,
        enableSorting: true
      }),
      columnHelper.accessor('unitsManaged', {
        header: 'Units Managed',
        cell: info => info.getValue(),
        size: 150,
        enableSorting: true
      }),
      columnHelper.accessor('quotations', {
        header: 'Quotations',
        cell: info => info.getValue(),
        size: 150,
        enableSorting: true
      }),
      columnHelper.accessor('videoCallLink', {
        header: 'Video Call Link',
        cell: info => (
          <a
            href={info.getValue()}
            target='_blank'
            rel='noopener noreferrer'
            className='text-[#26C6F9] text-[13px] underline'
          >
            {info.getValue()}
          </a>
        ),
        size: 200,
        enableSorting: false
      }),
      columnHelper.accessor('timeline', {
        header: 'Timeline',
        cell: info => info.getValue(),
        size: 150,
        enableSorting: true
      }),
      columnHelper.display({
        id: 'action',
        header: 'Action',
        cell: () => (
          <div>
            <span className='size-[33px] rounded-[5px]  bg-[#E8F9FE] text-[#35C0ED] flex justify-center items-center'>
              <i className='ri-edit-box-line size-[18px] cursor-pointer' />
            </span>
          </div>
        ),
        size: 100,
        enableSorting: false
      })
    ],
    []
  )

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

  const tableData: any[] =
    getVideoCallsData?.data?.invites?.map(
      (invite: {
        pma_name: any
        pma_company: { trading_years: { toString: () => any }; total_units: any }
        quotation: { total_quote_inc_vat: any }
        zoom_meeting_link: any
        slot: { name: any }
        status_label: any
      }) => ({
        pmaId: invite.pma_name,
        yearTrading: invite.pma_company?.trading_years?.toString() ?? '',
        unitsManaged: invite.pma_company?.total_units ?? 0,
        quotations: invite.quotation?.total_quote_inc_vat ?? '',
        videoCallLink: invite.zoom_meeting_link ?? '',
        timeline: invite.slot?.name ?? '',
        rescheduled: invite.status_label ?? ''
      })
    ) || []

  console.log(tableData, columns)

  return (
    <Box className='p-1 bg-white rounded-lg shadow h-[70vh] overflow-y-auto'>
      <InviteCallHeader title={getTitle()} actionButton='Schedule New Calls' />
      <InviteCallsTabSection value={activeTab} onChange={handleTabChange} tabs={InviteTabItems as InviteTabItem[]} />
      {activeTab === 0 && <InviteUpcomingCalls pendingInviteData={getVideoCallsData} />}
      {activeTab === 1 && <InviteRescheduleTab rescheduaInviteData={getVideoCallsData} />}
      {activeTab === 2 && <InviteCompletedCalls videoInviteData={getVideoCallsData} />}
      {activeTab === 3 && <InvitePendingCalls pendingInviteData={getVideoCallsData} />}
      {activeTab === 4 && <InviteRejectedTab rejectedInviteData={getVideoCallsData} />}
    </Box>
  )
}

export default InviteCallsTabs
