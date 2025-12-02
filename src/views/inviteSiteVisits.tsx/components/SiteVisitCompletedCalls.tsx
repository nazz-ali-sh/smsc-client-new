'use client'

import React, { useState } from 'react'

import Image from 'next/image'

import { Box } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'

import CommonTable from '@/common/CommonTable'

import person from '../../../../public/images/TenderResults/person.svg'
import AppointManagemnetModal from '@/common/AppointManagemnetAgent'
import { formatDates } from '@/utils/dateFormater'
import CustomTooltip from '@/common/CustomTooltip'

interface CompletedCallType {
  pmaId: string
  yearTrading: string
  unitsManaged: number
  quotations: string
  videoCallLink: string
  timeline: string
  action: string
  location: any
  invited_at: any
}

const columnHelper = createColumnHelper<CompletedCallType>()

const SiteVisitCompletedCalls = ({ siteCompleted }: any) => {
  const [apointAgentModalOpen, setApointAgentModalOpen] = useState(false)

  const tableData: any[] =
    siteCompleted?.data?.invites?.map(
      (invite: {
        pma_name: any
        id: number
        pma_user_id: number
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
        pma_user_ids: invite?.pma_user_id,
        yearTrading: invite.pma_company?.trading_years?.toString() ?? '',
        unitsManaged: invite.pma_company?.total_units ?? 0,
        quotations: invite.quotation?.total_quote_inc_vat ?? '',
        videoCallLink: invite.location ?? '',
        timeline: invite.slot?.name ?? '',
        slot_ids: invite.slot?.id ?? '',
        rescheduled: invite.status_label ?? '',
        invited_at: formatDates(invite?.invited_at) ?? '',
        siteCompleted
      })
    ) || []

  const columns = [
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
      header: 'Location',
      cell: info => (
        <a href={info.getValue()} className=' text-[13px]'>
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
            <CustomTooltip text='Appoint the Agent' position='left' align='left'>
              <span
                onClick={() => setApointAgentModalOpen(true)}
                className='size-[33px] rounded-[5px] cursor-pointer bg-[#E8F9FE] text-[#DE481A] flex justify-center items-center'
              >
                <Image src={person} alt='person' />
              </span>
            </CustomTooltip>
          </div>
        </>
      ),
      size: 250,
      enableSorting: false
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
