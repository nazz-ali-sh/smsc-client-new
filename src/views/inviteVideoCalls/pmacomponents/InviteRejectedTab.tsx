'use client'

import { Box } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'

import CommonTable from '@/common/CommonTable'

import { formatDates } from '@/utils/dateFormater'

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
  region: any
  reason: any
}

const columnHelper = createColumnHelper<RescheduledCallType>()

const InviteRejectedTab = ({ rejectedInviteData }: any) => {
  const tableData =
    rejectedInviteData?.data?.invites?.map((invite: any) => ({
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
      rejectedInviteData
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

  

    columnHelper.accessor('reason', {
      header: 'Reason of Rejection',
      size: 150,
      enableSorting: true
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
    </Box>
  )
}

export default InviteRejectedTab
