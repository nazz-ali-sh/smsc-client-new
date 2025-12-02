'use client'

import { Box } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'

import CommonTable from '@/common/CommonTable'
import { formatDates } from '@/utils/dateFormater'

interface CompletedCallType {
  rmcName: string
  yearBuilt: string | number | null
  blockName: string
  rmcEmail: string
  rescheduledSlot: string
  timeline: string
  invite_id: number
  slot_ids: string
  status_label: string
  siteRechedual: any
  region: any
  zoom_meeting_link?: string
  updated_timeline?: string
}

const columnHelper = createColumnHelper<CompletedCallType>()

const InviteCompletedCalls = ({ videoInviteData }: any) => {
  const tableData =
    videoInviteData?.data?.invites?.map((invite: any) => ({
      rmcName: invite.rmc_details?.rmc_name ?? '',
      yearBuilt: invite.rmc_details?.year_built ?? '',
      blockName: invite.rmc_details?.block_name ?? '',
      region: invite.rmc_details?.region ?? '',
      rmcEmail: invite.rmc_details?.rmc_email ?? '',
      zoom_meeting_link: invite?.zoom_meeting_link ?? '',
      timeline: invite.timeline ?? '',
      rescheduledDate: formatDates(invite.scheduled_date),
      invite_id: invite?.id,
      slot_ids: invite.slot?.id ?? '',
      status_label: invite.status_label ?? '',
      updated_timeline: invite?.updated_timeline,
      videoInviteData
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

    columnHelper.accessor('zoom_meeting_link', {
      header: 'Video Call Link',
      cell: info => (
        <a href={info.getValue()} className='text-[13px] font-bold text-[#8BD6F4]'>
          Join Meeting
        </a>
      ),
      size: 200,
      enableSorting: false
    }),

    columnHelper.accessor('timeline', {
      header: 'Timeline',
      cell: info => <span className='text-[13px] whitespace-normal break-words'>{info.getValue()}</span>,
      size: 150,
      enableSorting: true
    }),
    columnHelper.accessor('updated_timeline', {
      header: 'Updated Timeline',
      cell: info => <span className='text-[13px] whitespace-normal break-words'>{info.getValue() ?? '--'}</span>,
      size: 150,
      enableSorting: true
    })
  ]

  return (
    <Box className=' overflow-y-auto'>
      <CommonTable
        data={tableData}
        columns={columns}
        pagination={{ pageIndex: 0, pageSize: 5 }}
        onPaginationChange={() => {}}
        pageSizeOptions={[5, 10, 25]}
        enableSorting={true}
      />
    </Box>
  )
}

export default InviteCompletedCalls
