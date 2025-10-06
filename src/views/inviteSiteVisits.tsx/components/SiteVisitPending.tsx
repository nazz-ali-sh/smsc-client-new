'use client'

import React, { useState } from 'react'

import { Box } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'

import CommonTable from '@/common/CommonTable'
import RejectModal from '@/common/RejectModal'
import SiteVisitsModal from '@/common/SiteVisitsModal'
import SuccessModal from '@/common/SucessModal'
import { formatDates } from '@/utils/dateFormater'

interface RescheduledCallType {
  pmaId: string
  yearTrading: string
  unitsManaged: number
  quotations: string
  videoCallLink: string
  timeline: string
  rescheduled: string
  sitePendingData: any
  invite_id: number
  slot_ids: string
  location: any
  invited_at: any
}

const columnHelper = createColumnHelper<RescheduledCallType>()

const SiteVisitPending = ({ sitePendingData }: any) => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [SuccessOpen, setSuccessOpen] = useState(false)
  const [siteVisitsModalOpen, setSiteVisitsModalOpen] = useState(false)

  const [visitsSchedualInviteId, setVisitsSchedualInviteId] = useState<number>()

  const tableData: RescheduledCallType[] =
    sitePendingData?.data?.invites?.map(
      (invite: {
        pma_name: any
        id: number
        pma_company: { trading_years: { toString: () => any }; total_units: any }
        quotation: { total_quote_inc_vat: any }
        zoom_meeting_link: any
        slot: { name: any; id: any }
        status_label: any
        location: any
        invited_at?: any
      }) => ({
        pmaId: invite.pma_name,
        invite_id: invite?.id,
        yearTrading: invite.pma_company?.trading_years?.toString() ?? '',
        unitsManaged: invite.pma_company?.total_units ?? 0,
        quotations: invite.quotation?.total_quote_inc_vat ?? '',
        videoCallLink: invite.location ?? '',
        timeline: invite.slot?.name ?? '',
        slot_ids: invite.slot?.id ?? '',
        rescheduled: invite.status_label ?? '',
        invited_at: formatDates(invite?.invited_at) ?? '',
        sitePendingData
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
      header: 'location',
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
    // columnHelper.accessor('rescheduled', {
    //   header: 'Rescheduled',
    //   cell: info => info.getValue(),
    //   size: 150,
    //   enableSorting: true
    // }),
    columnHelper.accessor('invited_at', {
      header: 'Scheduled Date',
      cell: info => info.getValue(),
      size: 150,
      enableSorting: true
    }),
    columnHelper.display({
      id: 'action',
      header: 'Action',
      cell: info => (
        <div className='flex gap-2'>
          <span className='size-[33px] rounded-[5px] cursor-pointer bg-[#F5DADB] text-[#DE481A] flex justify-center items-center'>
            <i
              onClick={() => {
                const row = info.row.original

                setVisitsSchedualInviteId(row.invite_id)
                setConfirmOpen(true)
              }}
              className='ri-close-line '
            />
          </span>
          <span className='size-[33px] rounded-[5px] cursor-pointer bg-[#E8F9FE] text-[#35C0ED] flex justify-center items-center'>
            <i
              onClick={() => {
                const row = info.row.original

                setVisitsSchedualInviteId(row.invite_id)
                setSiteVisitsModalOpen(true)
              }}
              className='ri-edit-box-line'
            ></i>
          </span>
        </div>
      ),
      size: 100,
      enableSorting: false
    })
  ]

  return (
    <Box className='bg-white overflow-y-auto'>
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
        setConfirmOpen={setConfirmOpen}
        title='Reschedule Request Cancel!'
        description='You have rejected the reschedule request from [PMA Name]. The meeting will not be updated.Please provide a reason for the rejection in the box below. This explanation will be sent to the managing agent.'
        onClose={() => setConfirmOpen(false)}
        onConfirm={function (): void {}}
        RejectInviteData={tableData}
        types='cancel'
        SideVisitsSchedualInviteId={visitsSchedualInviteId}
        sitePendingData={undefined}
        VideoCallInviteId={undefined}
      />

      <SiteVisitsModal
        open={siteVisitsModalOpen}
        setSiteVisitsModalOpen={setSiteVisitsModalOpen}
        onClose={() => setSiteVisitsModalOpen(false)}
        shorlistedPmas={undefined}
        siteVisitDate={tableData}
        types='SiteVisits'
        SideVisitsSchedualInviteId={visitsSchedualInviteId}
        Reschedual={undefined}
        VideoCallInviteId={undefined}
        completedShorlistedPmas={undefined}
      />

      <SuccessModal
        open={SuccessOpen}
        onClose={() => {
          setSuccessOpen(false)
        }}
        onConfirm={() => {
          setSuccessOpen(false)
        }}
        cancelButton='Ok'
        message='Success! You have Sent the new meeting time.'
        title='Reschedule Request Accepted!'
        confirmButtonText='Confirm'
      />
    </Box>
  )
}

export default SiteVisitPending
