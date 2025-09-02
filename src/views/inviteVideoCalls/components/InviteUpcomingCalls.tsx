'use client'

import React, { useState } from 'react'

import { Box } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'

import CommonTable from '@/common/CommonTable'
import SiteVisitsModal from '@/common/SiteVisitsModal'

interface RescheduledCallType {
  pmaId: string
  yearTrading: string
  unitsManaged: number
  quotations: string
  videoCallLink: string
  timeline: string
  rescheduled: string
  invite_id: number
}

interface pendingInviteData {
  pendingInviteData?: any
}

const columnHelper = createColumnHelper<RescheduledCallType>()

const InviteUpcomingCalls: React.FC<pendingInviteData> = ({ pendingInviteData }) => {
  const [siteVisitsModalOpen, setSiteVisitsModalOpen] = useState(false)
  const [visitsSchedualInviteId, setVisitsSchedualInviteId] = useState<number | undefined>(undefined)

  const tableData: RescheduledCallType[] =
    pendingInviteData?.data?.invites?.map(
      (invite: {
        pma_name: any
        id: number
        pma_company: { trading_years: { toString: () => any }; total_units: any }
        quotation: { total_quote_inc_vat: any }
        zoom_meeting_link: any
        slot: { name: any; id: any }

        status_label: any
      }) => ({
        pmaId: invite.pma_name,
        invite_id: invite?.id,
        yearTrading: invite.pma_company?.trading_years?.toString() ?? '',
        unitsManaged: invite.pma_company?.total_units ?? 0,
        quotations: invite.quotation?.total_quote_inc_vat ?? '',
        videoCallLink: invite.zoom_meeting_link ?? '',
        timeline: invite.slot?.name ?? '',
        slot_ids: invite.slot?.id ?? '',
        rescheduled: invite.status_label ?? ''
      })
    ) || []

  const columns = [
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
    columnHelper.accessor('rescheduled', {
      header: 'Rescheduled',
      cell: info => info.getValue(),
      size: 150,
      enableSorting: true
    }),
    columnHelper.display({
      id: 'action',
      header: 'Action',
      cell: ({ row }) => (
        <div className='flex gap-2'>
          <span className='size-[33px] rounded-[5px] cursor-pointer bg-[#E8F9FE] text-[#35C0ED] flex justify-center items-center'>
            <i
              onClick={() => {
                setVisitsSchedualInviteId(row.original.invite_id)
              }}
              className='ri-edit-box-line'
            />
          </span>
        </div>
      ),
      size: 100,
      enableSorting: false
    })
  ]

  return (
    <Box className='bg-white h-[70vh] overflow-y-auto'>
      <CommonTable
        data={tableData}
        columns={columns}
        pagination={{ pageIndex: 0, pageSize: 5 }}
        onPaginationChange={() => {}}
        pageSizeOptions={[5, 10, 25]}
        enableSorting={true}
      />

      <SiteVisitsModal
        open={siteVisitsModalOpen}
        onClose={() => setSiteVisitsModalOpen(false)}
        shorlistedPmas={undefined}
        Reschedual={tableData}
        VideoCallInviteId={visitsSchedualInviteId}
        types='Reschedual'
      />
    </Box>
  )
}

export default InviteUpcomingCalls
