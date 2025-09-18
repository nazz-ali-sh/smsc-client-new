'use client'

import React, { useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Chip, MenuItem, Select } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'

import { useQuery } from '@tanstack/react-query'

import { useSelector } from 'react-redux'

import type { ArchiveDataResponse, ArchivedTenderType, TenderApi } from '../types'
import CommonTable from '@/common/CommonTable'
import { archiveData } from '@/services/final_result_and_archeive_apis/final_results_apis'
import type { RootState } from '@/redux-store'
import SummaryCards from '@/common/SummaryCardsDetails'

const columnHelper = createColumnHelper<ArchivedTenderType>()

const ArchiveTable = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })
  const [value, setValue] = React.useState('appoint')
  const router = useRouter()

  const { data: gettingArchiveData } = useQuery<ArchivedTenderType>({
    queryKey: ['AvailableSlotsAndDays', value],
    queryFn: () => archiveData(value),
    enabled: !!value
  })

  const tender_id = useSelector((state: RootState) => state?.tenderForm?.tender_id)

  const archivedTendersData: ArchivedTenderType[] =
    (gettingArchiveData as ArchiveDataResponse)?.data?.tenders?.map(
      (tender: TenderApi): ArchivedTenderType => ({
        id: tender.tender_number,
        tenders: tender.tender_name,
        status: tender.status,
        totalResponses: tender.total_responses,
        shortlisted: tender.total_shortlisted,
        meetingHeld: {
          videoCalls: tender.meeting_held_count,
          siteVisits: tender.site_visit_count
        },
        submittedDate: tender.submitted_date,
        closedDate: tender.closed_date
      })
    ) || []

  const columns = useMemo(
    () => [
      columnHelper.accessor('tenderName', {
        header: 'TENDER NAME',
        cell: info => info.getValue(),
        size: 200,
        enableSorting: true
      }),
      columnHelper.accessor('tenderId', {
        header: 'TENDER ID',
        cell: info => info.getValue(),
        size: 150,
        enableSorting: true
      }),
      columnHelper.accessor('status', {
        header: 'STATUS',
        cell: info => {
          const status = info.getValue()
          const isAppointed = status === 'Appointed'

          return (
            <Chip
              label={status}
              color={isAppointed ? 'success' : 'error'}
              variant='outlined'
              size='small'
              sx={{
                width: 80,
                backgroundColor: isAppointed ? 'customColors.green4' : 'customColors.red2',
                color: isAppointed ? 'customColors.green3' : 'customColors.red1',
                borderColor: isAppointed ? 'customColors.green3' : 'customColors.red1',
                fontWeight: 500
              }}
            />
          )
        },
        size: 120,
        enableSorting: true
      }),
      columnHelper.accessor('totalResponses', {
        header: 'TOTAL RESPONSES',
        cell: info => info.getValue(),
        size: 150,
        enableSorting: true
      }),
      columnHelper.accessor('shortlisted', {
        header: 'SHORTLISTED',
        cell: info => info.getValue(),
        size: 120,
        enableSorting: true
      }),
      columnHelper.accessor('meetingHeld', {
        header: 'MEETING HELD',
        cell: info => {
          const meetingHeld = info.getValue()

          return (
            <div className='text-[12px] text-[#262B43E5]'>
              <p>Video Calls: {meetingHeld.videoCalls}</p>
              <p>Site Visits: {meetingHeld.siteVisits}</p>
            </div>
          )
        },
        size: 150,
        enableSorting: false
      }),
      columnHelper.accessor('submittedDate', {
        header: 'SUBMITTED DATE',
        cell: info => info.getValue(),
        size: 150,
        enableSorting: true
      }),
      columnHelper.accessor('closedDate', {
        header: 'CLOSED DATE',
        cell: info => info.getValue(),
        size: 150,
        enableSorting: true
      }),
      columnHelper.display({
        id: 'action',
        header: 'Action',
        cell: () => (
          <div className='flex gap-2' onClick={() => router.push(`/archive/${tender_id}`)}>
            <span className='size-[33px] rounded-[5px] cursor-pointer bg-[#E8F9FE] text-[#35C0ED] flex justify-center items-center'>
              <i className='ri-eye-line' />
            </span>
          </div>
        ),
        size: 100,
        enableSorting: false
      })
    ],
    []
  )

  const menuItems = [
    { value: 'appoint', label: 'Appointment' },
    { value: 'shortlisted', label: 'Shortlisted' },
    { value: 'expired', label: 'Expired' }
  ]

  const filterButton = (
    <Select
      value={value}
      onChange={e => setValue(e.target.value)}
      displayEmpty
      sx={{
        width: '150px',
        backgroundColor: 'customColors.cyan1',
        borderRadius: 20,
        border: theme => `1px solid ${theme.palette.customColors.cyan2}`,
        color: 'customColors.cyan2',
        fontWeight: 700,
        '& .MuiSelect-select': {
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          padding: '6px 16px',
          minHeight: 'unset',
          lineHeight: 1.2
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none'
        }
      }}
    >
      {menuItems.map(item => (
        <MenuItem
          key={item.value}
          value={item.value}
          sx={{
            color: 'customColors.cyan2',
            '&:hover': { backgroundColor: 'customColors.cyan1' },
            '&.Mui-selected': {
              backgroundColor: 'customColors.cyan1',
              color: 'customColors.cyan2'
            },
            '&.Mui-selected:hover': { backgroundColor: 'customColors.cyan1' }
          }}
        >
          {item.label}
        </MenuItem>
      ))}
    </Select>
  )

  return (
    <>
      <SummaryCards tenderStatusdetails={gettingArchiveData} />
      <CommonTable
        data={archivedTendersData}
        columns={columns}
        title='Archive'
        actionButton={filterButton}
        pagination={pagination}
        onPaginationChange={setPagination}
        pageSizeOptions={[5, 10, 25]}
        enableSorting={true}
      />
    </>
  )
}

export default ArchiveTable
