'use client'

import React, { useMemo, useState } from 'react'

import { Box } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'

import CommonTable from '@/common/CommonTable'
import { InviteTabItems, sampleTenderData } from '../data'
import SiteVisitTabSection, { type InviteTabItem } from './SiteVisitTabSection'
import SiteVisitHeader from './SiteVisitHeader'
import SiteReschedule from './SiteReschedule'
import SiteVisitCompletedCalls from './SiteVisitCompletedCalls'

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
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })
  const [activeTab, setActiveTab] = useState(0)

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
  }

  const getTitle = () => {
    switch (activeTab) {
      case 0:
        return 'Site Visits'
      case 1:
        return 'Rescheduled Site Visits'
      case 2:
        return 'Completed Visits'
      default:
        return 'Site Visits'
    }
  }

  return (
    <Box className='p-1 bg-white rounded-lg shadow h-[70vh] overflow-y-auto'>
      <SiteVisitHeader title={getTitle()} actionButton='Schedule New Calls' />
      <SiteVisitTabSection value={activeTab} onChange={handleTabChange} tabs={InviteTabItems as InviteTabItem[]} />
      {activeTab === 0 && (
        <CommonTable
          data={sampleTenderData}
          columns={columns}
          pagination={pagination}
          onPaginationChange={setPagination}
          pageSizeOptions={[5, 10, 25]}
          enableSorting={true}
        />
      )}
      {activeTab === 1 && <SiteReschedule />}
      {activeTab === 2 && <SiteVisitCompletedCalls />}
    </Box>
  )
}

export default SiteVisitTabs
