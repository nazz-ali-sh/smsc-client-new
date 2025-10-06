'use client'

import React, { useState } from 'react'

import { Box } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'

import CommonTable from '@/common/CommonTable'
import RejectModal from '@/common/RejectModal'
import CancelVideoCallsAndSiteVisist from '@/common/CancelVideoCallsAndSiteVisist'
import { formatDates } from '@/utils/dateFormater'
import VideosCallsModal from '@/common/VideosCallsModal'

interface RescheduledCallType {
  pmaId: string
  yearTrading: string
  unitsManaged: number
  quotations: string
  videoCallLink: string
  timeline: string
  rescheduled: string
  invite_id: any
  invited_at: string
  slot_ids?: string
}
interface pendingInviteData {
  pendingInviteData?: any
}

const columnHelper = createColumnHelper<RescheduledCallType>()

const InviteUpcomingCalls: React.FC<pendingInviteData> = ({ pendingInviteData }) => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [onlineCallsModalOpen, setOnlineCallsModalOpen] = useState(false)
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
        invited_at: any

        status_label: any
      }) => ({
        pmaId: invite.pma_name,
        invite_id: invite?.id,
        yearTrading: invite?.pma_company?.trading_years?.toString() ?? '',
        unitsManaged: invite?.pma_company?.total_units ?? 0,
        quotations: invite?.quotation?.total_quote_inc_vat ?? '',
        videoCallLink: invite?.zoom_meeting_link ?? '',
        timeline: invite.slot?.name ?? '',
        slot_ids: invite.slot?.id ?? '',
        invited_at: formatDates(invite?.invited_at) ?? ''
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
      header: 'PMA Name',
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
      header: 'Scheduled Slot',
      cell: info => info.getValue(),
      size: 150,
      enableSorting: true
    }),

    columnHelper.accessor('invited_at', {
      header: 'Scheduled Date',
      cell: info => info.getValue(),
      size: 150,
      enableSorting: true
    }),
    columnHelper.display({
      id: 'action',
      header: 'Action',
      cell: ({ row }) => (
        <div className='flex gap-2'>
          <span className='size-[33px] rounded-[5px] cursor-pointer bg-[#F5DADB] text-[#DE481A] flex justify-center items-center'>
            <i
              onClick={() => {
                setVisitsSchedualInviteId(row.original.invite_id)
                setConfirmOpen(true)
              }}
              className='ri-close-line'
            />
          </span>
          <span className='size-[33px] rounded-[5px] cursor-pointer bg-[#E8F9FE] text-[#35C0ED] flex justify-center items-center'>
            <i
              onClick={() => {
                setVisitsSchedualInviteId(row.original.invite_id)
                setOnlineCallsModalOpen(true)
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
    <Box className='bg-white  overflow-y-auto'>
      <CommonTable
        data={tableData}
        columns={columns}
        pagination={{ pageIndex: 0, pageSize: 5 }}
        onPaginationChange={() => {}}
        pageSizeOptions={[5, 10, 25]}
        enableSorting={true}
      />

      <RejectModal
        open={confirmOpen}
        title='Reschedule Request Rejected!'
        description='You have rejected the reschedule request from [PMA Name]. The meeting will not be updated.Please provide a reason for the rejection in the box below. This explanation will be sent to the managing agent.'
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {}}
        RejectInviteData={tableData}
        VideoCallInviteId={visitsSchedualInviteId}
        types='cancel'
        sitePendingData={undefined}
        SideVisitsSchedualInviteId={undefined}
      />

      <VideosCallsModal
        open={onlineCallsModalOpen}
        onClose={() => setOnlineCallsModalOpen(false)}
        VideoCallInviteId={visitsSchedualInviteId}
        shorlistedPmas={null}
        mainSiteVisitVideoCalls={undefined}
        types='videoCallReschedual'
      />

      <CancelVideoCallsAndSiteVisist
        open={confirmOpen}
        title='Reschedule Request Rejected!'
        description='You have rejected the reschedule request from [PMA Name]. The meeting will not be updated.Please provide a reason for the rejection in the box below. This explanation will be sent to the managing agent.'
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {}}
        RejectInviteData={tableData}
        VideoCallInviteId={visitsSchedualInviteId}
        types='VideoCallcancel'
        sitePendingData={undefined}
        SideVisitsSchedualInviteId={undefined}
      />
    </Box>
  )
}

export default InviteUpcomingCalls
