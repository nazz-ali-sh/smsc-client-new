'use client'

import React, { useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Chip, MenuItem, Select } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'

import CommonTable from '@/common/CommonTable'

interface PmaArchiveTableRow {
  tenderId: string
  tenderName: string
  status: 'Appointed' | 'Expired' | 'Declined'
  totalResponses: number
  shortlisted: number
  rmcDetails: string
  submittedDate: string
  completedDate: string
}

const columnHelper = createColumnHelper<PmaArchiveTableRow>()

const PmaArchiveTable = () => {
  const router = useRouter()
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const [value, setValue] = React.useState('all')

  const dummyData: PmaArchiveTableRow[] = [
    {
      tenderId: 'TND-00001',
      tenderName: 'Greenwich Apartments',
      status: 'Appointed',
      totalResponses: 10,
      shortlisted: 5,
      rmcDetails: 'Valley Café - 2\nNew With - 1',
      submittedDate: 'May 12, 2025',
      completedDate: 'May 12, 2025'
    },
    {
      tenderId: 'TND-00002',
      tenderName: 'Greenwich Apartments',
      status: 'Expired',
      totalResponses: 7,
      shortlisted: 6,
      rmcDetails: 'Valley Café - 2\nNew With - 1',
      submittedDate: 'May 12, 2025',
      completedDate: 'May 12, 2025'
    },
    {
      tenderId: 'TND-00003',
      tenderName: 'Greenwich Apartments',
      status: 'Expired',
      totalResponses: 10,
      shortlisted: 6,
      rmcDetails: 'Valley Café - 2\nNew With - 1',
      submittedDate: 'May 12, 2025',
      completedDate: 'May 12, 2025'
    },
    {
      tenderId: 'TND-00004',
      tenderName: 'Greenwich Apartments',
      status: 'Appointed',
      totalResponses: 10,
      shortlisted: 5,
      rmcDetails: 'Valley Café - 2\nNew With - 1',
      submittedDate: 'May 12, 2025',
      completedDate: 'May 12, 2025'
    },
    {
      tenderId: 'TND-00005',
      tenderName: 'Greenwich Apartments',
      status: 'Appointed',
      totalResponses: 10,
      shortlisted: 5,
      rmcDetails: 'Valley Café - 1\nNew With - 1',
      submittedDate: 'May 12, 2025',
      completedDate: 'May 12, 2025'
    },
    {
      tenderId: 'TND-00006',
      tenderName: 'Greenwich Apartments',
      status: 'Appointed',
      totalResponses: 10,
      shortlisted: 5,
      rmcDetails: 'Valley Café - 2\nNew With - 1',
      submittedDate: 'May 12, 2025',
      completedDate: 'May 12, 2025'
    },
    {
      tenderId: 'TND-00007',
      tenderName: 'Greenwich Apartments',
      status: 'Appointed',
      totalResponses: 10,
      shortlisted: 5,
      rmcDetails: 'Valley Café - 2\nNew With - 1',
      submittedDate: 'May 12, 2025',
      completedDate: 'May 12, 2025'
    },
    {
      tenderId: 'TND-00008',
      tenderName: 'Greenwich Apartments',
      status: 'Appointed',
      totalResponses: 10,
      shortlisted: 5,
      rmcDetails: 'Valley Café - 2\nNew With - 1',
      submittedDate: 'May 12, 2025',
      completedDate: 'May 12, 2025'
    },
    {
      tenderId: 'TND-00009',
      tenderName: 'Greenwich Apartments',
      status: 'Expired',
      totalResponses: 10,
      shortlisted: 5,
      rmcDetails: 'Valley Café - 2\nNew With - 1',
      submittedDate: 'May 14, 2025',
      completedDate: 'May 12, 2025'
    },
    {
      tenderId: 'TND-00010',
      tenderName: 'Greenwich Apartments',
      status: 'Appointed',
      totalResponses: 10,
      shortlisted: 5,
      rmcDetails: 'Valley Café - 2\nNew With - 1',
      submittedDate: 'May 12, 2025',
      completedDate: 'May 12, 2025'
    }
  ]

  const columns = useMemo(
    () => [
      columnHelper.accessor('tenderName', {
        header: 'TENDER NAME',
        cell: info => info.getValue(),
        size: 180,
        enableSorting: true
      }),
      columnHelper.accessor('tenderId', {
        header: 'TENDER ID',
        cell: info => info.getValue(),
        size: 120,
        enableSorting: true
      }),
      columnHelper.accessor('status', {
        header: 'STATUS',
        cell: info => {
          const status = info.getValue()
          const isAppointed = status === 'Appointed'
          const isExpired = status === 'Expired'

          return (
            <Chip
              label={status}
              color={isAppointed ? 'success' : 'error'}
              variant='outlined'
              size='small'
              sx={{
                width: 90,
                backgroundColor: isAppointed
                  ? 'customColors.green4'
                  : isExpired
                    ? 'customColors.red2'
                    : 'customColors.red2',
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
        cell: info => String(info.getValue()).padStart(2, '0'),
        size: 120,
        enableSorting: true
      }),
      columnHelper.accessor('rmcDetails', {
        header: 'RMC DETAILS',
        cell: info => <div className='text-[12px] text-[#262B43E5] whitespace-pre-line'>{info.getValue()}</div>,
        size: 150,
        enableSorting: false
      }),
      columnHelper.accessor('submittedDate', {
        header: 'SUBMITTED DATE',
        cell: info => info.getValue(),
        size: 130,
        enableSorting: true
      }),
      columnHelper.accessor('completedDate', {
        header: 'COMPLETED DATE',
        cell: info => info.getValue(),
        size: 130,
        enableSorting: true
      }),
      columnHelper.display({
        id: 'action',
        header: 'ACTIONS',
        cell: info => (
          <div className='flex gap-2'>
            <span
              className='size-[33px] rounded-[5px] cursor-pointer bg-[#E8F9FE] text-[#35C0ED] flex justify-center items-center'
              onClick={() => router.push(`/archive/${info.row.original.tenderId}`)}
            >
              <i className='ri-eye-line' />
            </span>
          </div>
        ),
        size: 100,
        enableSorting: false
      })
    ],
    [router]
  )

  const menuItems = [
    { value: 'all', label: 'All' },
    { value: 'appointed', label: 'Appointed' },
    { value: 'expired', label: 'Expired' },
    { value: 'declined', label: 'Declined' }
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
    <CommonTable
      data={dummyData}
      columns={columns}
      title='Archive'
      actionButton={filterButton}
      pagination={pagination}
      onPaginationChange={setPagination}
      pageSizeOptions={[10, 25, 50]}
      enableSorting={true}
    />
  )
}

export default PmaArchiveTable
