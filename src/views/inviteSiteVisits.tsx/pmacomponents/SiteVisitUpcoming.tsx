'use client'

import React, { useState } from 'react'

import { Box } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'

import CommonTable from '@/common/CommonTable'

import CustomTooltip from '@/common/CustomTooltip'

import SiteVisitsModal from '../../../common/SiteVisitsModal'

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

const columnHelper = createColumnHelper<RescheduledCallType>()

const SiteVisitUpcoming = ({ SiteUpComingData }: any) => {
  const [siteVisitsModalOpen, setSiteVisitsModalOpen] = useState(false)
  const [visitsSchedualInviteId, setVisitsSchedualInviteId] = useState<number>()
  const [selectedTenderId, setSelectedTenderId] = useState<string | number | null>(null)

  const tableData =
    SiteUpComingData?.data?.invites?.map((invite: any) => ({
      rmcName: invite.rmc_details?.rmc_name ?? '',
      tenderId: invite.tender_id ?? '',
      yearBuilt: invite.rmc_details?.year_built ?? '',
      blockName: invite.rmc_details?.block_name ?? '',
      rmcEmail: invite.rmc_details?.rmc_email ?? '',
      location: invite.rmc_details?.site_location ?? '',
      rescheduledSlot: invite.timeline ?? '',
      invite_id: invite?.id,
      slot_ids: invite.slot?.id ?? '',
      status_label: invite.status_label ?? '',
      SiteUpComingData
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

    columnHelper.accessor('rmcEmail', {
      header: 'Email',
      size: 150,
      enableSorting: true
    }),

    columnHelper.accessor('location', {
      header: 'Location',
      cell: info => <span className='text-[13px]'>{info.getValue()}</span>,
      size: 200,
      enableSorting: false
    }),

    columnHelper.accessor('rescheduledSlot', {
      header: 'Timeline',
      size: 200,
      enableSorting: true,
      cell: info => <span className='whitespace-normal break-words text-[13px]'>{info.getValue()}</span>
    }),

    columnHelper.display({
      id: 'action',
      header: 'Action',
      cell: info => (
        <div className='flex gap-2'>
          <CustomTooltip text='Reschedule Upcoming Site Visit' position='left' align='left'>
            <span className='size-[33px] rounded-[5px] cursor-pointer bg-[#E8F9FE] text-[#35C0ED] flex justify-center items-center'>
              <i
                onClick={() => {
                  const row = info.row.original

                  setVisitsSchedualInviteId(row.invite_id)
                  setSelectedTenderId(row.tenderId)
                  setSiteVisitsModalOpen(true)
                }}
                className='ri-edit-box-line'
              ></i>
            </span>
          </CustomTooltip>
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

      {siteVisitsModalOpen && (
        <SiteVisitsModal
          open={siteVisitsModalOpen}
          setSiteVisitsModalOpen={setSiteVisitsModalOpen}
          onClose={() => setSiteVisitsModalOpen(false)}
          tenderID={selectedTenderId}
          siteVisitDate={tableData}
          types='PmaReschedual'
          SideVisitsSchedualInviteId={visitsSchedualInviteId}
        />
      )}
    </Box>
  )
}

export default SiteVisitUpcoming
