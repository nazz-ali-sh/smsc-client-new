'use client'

import React, { useState } from 'react'

import { Box } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'

import CommonTable from '@/common/CommonTable'
import { formatDates } from '@/utils/dateFormater'
import VideosCallsModal from '@/common/VideosCallsModal'
import CustomTooltip from '@/common/CustomTooltip'

interface RescheduledCallType {
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
  tenderId: any
}

interface pendingInviteData {
  pendingInviteData?: any
}

const columnHelper = createColumnHelper<RescheduledCallType>()

const InviteUpcomingCalls: React.FC<pendingInviteData> = ({ pendingInviteData }) => {
  const [onlineCallsModalOpen, setOnlineCallsModalOpen] = useState(false)
  const [visitsSchedualInviteId, setVisitsSchedualInviteId] = useState<number | undefined>(undefined)
  const [selectedTenderId, setSelectedTenderId] = useState<string | number | null>(null)

  const tableData =
    pendingInviteData?.data?.invites?.map((invite: any) => ({
      rmcName: invite.rmc_details?.rmc_name ?? '',
      tenderId: invite.tender_id ?? '',
      yearBuilt: invite.rmc_details?.year_built ?? '',
      blockName: invite.rmc_details?.block_name ?? '',
      rmcEmail: invite.rmc_details?.rmc_email ?? '',
      location: invite.rmc_details?.site_location ?? '',
      rescheduledSlot: invite.timeline ?? '',
      rescheduledDate: formatDates(invite.scheduled_date),
      invite_id: invite?.id,
      slot_ids: invite.slot?.id ?? '',
      status_label: invite.status_label ?? '',
      pendingInviteData
    })) || []

  const columns = [
    columnHelper.accessor((row, index) => index + 1, {
      id: 'sr',
      header: 'SR #',
      size: 30,
      enableSorting: true
    }),

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

    columnHelper.accessor('rmcEmail', {
      header: 'Email',
      size: 150,
      enableSorting: true
    }),

    columnHelper.accessor('location', {
      header: 'Location',
      cell: info => (
        <a href={info.getValue()} className='text-[13px]'>
          {info.getValue()}
        </a>
      ),
      size: 200,
      enableSorting: false
    }),

    columnHelper.accessor('rescheduledSlot', {
      header: 'Rescheduled Slot',
      size: 150,
      enableSorting: true
    }),

    columnHelper.accessor('rescheduledDate', {
      header: 'Rescheduled Date',
      size: 150,
      enableSorting: true
    }),
    columnHelper.display({
      id: 'action',
      header: 'Action',
      cell: ({ row }) => (
        <div className='flex gap-2'>
          <CustomTooltip text=' Reschedule Upcoming Call ' position='left' align='left'>
            <span className='size-[33px] rounded-[5px] cursor-pointer bg-[#E8F9FE] text-[#35C0ED] flex justify-center items-center'>
              <i
                onClick={() => {
                  setVisitsSchedualInviteId(row.original.invite_id)
                  setSelectedTenderId(row?.original?.tenderId)
                  setOnlineCallsModalOpen(true)
                }}
                className='ri-edit-box-line'
              />
            </span>
          </CustomTooltip>
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

      <VideosCallsModal
        open={onlineCallsModalOpen}
        onClose={() => setOnlineCallsModalOpen(false)}
        VideoCallInviteId={visitsSchedualInviteId}
        shorlistedPmas={null}
        tenderID={selectedTenderId}
        types='pmavideoCallReschedual'
      />
    </Box>
  )
}

export default InviteUpcomingCalls
