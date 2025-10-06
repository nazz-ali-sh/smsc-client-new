'use client'

import React, { useState } from 'react'

import Image from 'next/image'

import { Box } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'

import CommonTable from '@/common/CommonTable'
import person from '../../../../public/images/TenderResults/person.svg'
import person1 from '../../../../public/images/TenderResults/person1.svg'
import SiteVisitsModal from '../../../common/SiteVisitsModal'
import AppointManagemnetModal from '@/common/AppointManagemnetAgent'
import { formatDates } from '@/utils/dateFormater'

interface CompletedCallType {
  pmaId: string
  yearTrading: string
  unitsManaged: number
  quotations: string
  videoCallLink: string
  timeline: string
  action: string
  invited_at: string
}

const columnHelper = createColumnHelper<CompletedCallType>()

const InviteCompletedCalls = ({ videoInviteData }: any) => {
  const [siteVisitsModalOpen, setSiteVisitsModalOpen] = useState(false)
  const [apointAgentModalOpen, setApointAgentModalOpen] = useState(false)

  const tableData: any[] =
    videoInviteData?.data?.invites?.map(
      (invite: {
        pma_name: any
        id: number
        pma_user_id: number
        pma_company: { trading_years: { toString: () => any }; total_units: any }
        quotation: { total_quote_inc_vat: any }
        zoom_meeting_link: any
        slot: { name: any; id: any }
        invited_at?: any

        status_label: any
      }) => ({
        pmaId: invite.pma_name,
        invite_id: invite?.id,
        pma_user_ids: invite?.pma_user_id,
        yearTrading: invite.pma_company?.trading_years?.toString() ?? '',
        unitsManaged: invite.pma_company?.total_units ?? 0,
        quotations: invite.quotation?.total_quote_inc_vat ?? '',
        videoCallLink: invite.zoom_meeting_link ?? '',
        timeline: invite.slot?.name ?? '',
        slot_ids: invite.slot?.id ?? '',
        rescheduled: invite.status_label ?? '',
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
    columnHelper.accessor('action', {
      header: 'Action',
      cell: () => (
        <>
          <div className='flex gap-2'>
            <span
              onClick={() => setApointAgentModalOpen(true)}
              className='size-[33px] rounded-[5px] cursor-pointer bg-[#E8F9FE] text-[#DE481A] flex justify-center items-center'
            >
              <Image src={person} alt='person' />
            </span>
            <span
              onClick={() => setSiteVisitsModalOpen(true)}
              className='size-[33px] rounded-[5px] cursor-pointer bg-[#E8F9FE] text-[#35C0ED] flex justify-center items-center'
            >
              <Image src={person1} alt='person1' />
            </span>
          </div>
        </>
      ),
      size: 250,
      enableSorting: false
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
      <SiteVisitsModal
        open={siteVisitsModalOpen}
        onClose={() => setSiteVisitsModalOpen(false)}
        shorlistedPmas={undefined}
        completedShorlistedPmas={tableData}
        types={null}
        Reschedual={undefined}
        siteVisitDate={undefined}
        SideVisitsSchedualInviteId={undefined}
        VideoCallInviteId={undefined}
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

export default InviteCompletedCalls
