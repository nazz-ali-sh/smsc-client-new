'use client'

import React, { useState } from 'react'

import { Box } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'

import CommonTable from '@/common/CommonTable'

import AppointManagemnetModal from '@/common/AppointManagemnetAgent'
import { formatDates } from '@/utils/dateFormater'

interface CompletedCallType {
  rmcName: string
  yearBuilt: string | number | null
  blockName: string
  rmcEmail: string
  location: string
  rescheduledSlot: string
  rescheduledDate: string
  invite_id: number
  slot_ids: string
  status_label: string
  siteRechedual: any
  timeline: any
  region: any
}

const columnHelper = createColumnHelper<CompletedCallType>()

const SiteVisitCompletedCalls = ({ siteCompleted }: any) => {
  const [apointAgentModalOpen, setApointAgentModalOpen] = useState(false)

  const tableData =
    siteCompleted?.data?.invites?.map((invite: any) => ({
      rmcName: invite.rmc_details?.rmc_name ?? '',
      yearBuilt: invite.rmc_details?.year_built ?? '',
      blockName: invite.rmc_details?.block_name ?? '',
      region: invite.rmc_details?.region ?? '',
      rmcEmail: invite.rmc_details?.rmc_email ?? '',
      location: invite.rmc_details?.site_location ?? '',
      rescheduledSlot: invite.timeline ?? '',
      rescheduledDate: formatDates(invite.scheduled_date),
      invite_id: invite?.id,
      slot_ids: invite.slot?.id ?? '',
      status_label: invite.status_label ?? '',
      siteCompleted
    })) || []

  const columns = [
    columnHelper.accessor('rmcName', {
      header: 'RMC Name',
      size: 150,
      enableSorting: true
    }),

    columnHelper.accessor('yearBuilt', {
      header: 'Year Built',
      size: 120,
      enableSorting: true
    }),

    columnHelper.accessor('blockName', {
      header: 'Block Name',
      size: 150,
      enableSorting: true
    }),

    columnHelper.accessor('region', {
      header: 'Region',
      size: 150,
      enableSorting: true
    }),

    columnHelper.accessor('rmcEmail', {
      header: 'Email',
      size: 150,
      enableSorting: true
    }),

    columnHelper.accessor('location', {
      header: 'Location',
      cell: info => <span className='text-[13px] whitespace-normal break-words'>{info.getValue()}</span>,
      size: 200,
      enableSorting: false
    }),

    columnHelper.accessor('rescheduledSlot', {
      header: 'Timeline',
      size: 150,
      enableSorting: true,
      cell: info => <span className='whitespace-normal break-words text-[13px]'>{info.getValue()}</span>
    })
  ]

  return (
    <Box className='overflow-y-auto'>
      <CommonTable
        data={tableData}
        columns={columns}
        pagination={{ pageIndex: 0, pageSize: 5 }}
        onPaginationChange={() => {}}
        pageSizeOptions={[5, 10, 25]}
        enableSorting={true}
      />

      <AppointManagemnetModal
        open={apointAgentModalOpen}
        onClose={() => setApointAgentModalOpen(false)}
        finalShortListedResponce={null}
        pmaSelectedID={null}
        InviteCompletedCalls={tableData}
      />
    </Box>
  )
}

export default SiteVisitCompletedCalls
