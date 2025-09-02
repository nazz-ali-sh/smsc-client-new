'use client'

import React, { useEffect, useMemo, useState } from 'react'

import { Box } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'

import { useSelector } from 'react-redux'

import { useQuery } from '@tanstack/react-query'

import { InviteTabItems } from '../data'
import SiteVisitTabSection, { type InviteTabItem } from './SiteVisitTabSection'
import SiteVisitHeader from './SiteVisitHeader'
import SiteReschedule from './SiteVisitReschedule'
import SiteVisitCompletedCalls from './SiteVisitCompletedCalls'
import SiteVisitPending from './SiteVisitPending'
import type { RootState } from '@/redux-store'
import { rmcSiteVisitDetails } from '@/services/site_visit_apis/site_visit_api'
import SiteVisitUpcoming from './SiteVisitUpcoming'
import SiteVisitReject from './SiteVisitReject'

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

const SiteVisitTabs = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [activeStatus, setActiveStatus] = useState('')
  const tender_id = useSelector((state: RootState) => state?.tenderForm?.tender_id)

  useEffect(() => {
    if (activeTab === 0) {
      setActiveStatus('upcoming')
    } else if (activeTab === 1) {
      setActiveStatus('rescheduled')
    } else if (activeTab === 2) {
      setActiveStatus('accepted')
    } else if (activeTab === 3) {
      setActiveStatus('pending')
    } else {
      setActiveStatus('rejected')
    }
  }, [activeTab])

  const { data: getSiteVisit } = useQuery({
    queryKey: ['dashboardDatas', tender_id, activeStatus],
    queryFn: () => rmcSiteVisitDetails(activeStatus, tender_id),
    enabled: !!activeStatus
  })

  console.log(getSiteVisit)

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
        header: 'Location',
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
  }

  const getTitle = () => {
    switch (activeTab) {
      case 0:
        return 'Site Visits'
      case 1:
        return 'Rescheduled Site Visits'
      case 2:
        return 'Completed Visits'
      case 3:
        return 'RMC Pending Visits'
      case 4:
        return 'Rejected / Cancelled tabs'
      default:
        return 'Site Visits'
    }
  }

  const tableData: any[] =
    getSiteVisit?.data?.invites?.map(
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

  console.log(columns, tableData)

  return (
    <Box className='p-1 bg-white rounded-lg shadow h-[70vh] overflow-y-auto'>
      <SiteVisitHeader title={getTitle()} actionButton='Schedule New Calls' videoCallmodalData={getSiteVisit} />
      <SiteVisitTabSection value={activeTab} onChange={handleTabChange} tabs={InviteTabItems as InviteTabItem[]} />

      {activeTab === 0 && <SiteVisitUpcoming SiteUpComingData={getSiteVisit} />}
      {activeTab === 1 && <SiteReschedule siteRechedual={getSiteVisit} />}
      {activeTab === 2 && <SiteVisitCompletedCalls siteCompleted={getSiteVisit} />}
      {activeTab === 3 && <SiteVisitPending sitePendingData={getSiteVisit} />}
      {activeTab === 4 && <SiteVisitReject siteRejectedData={getSiteVisit} />}
    </Box>
  )
}

export default SiteVisitTabs
