'use client'

import React, { useMemo, useState } from 'react'

import { Box, Chip, Typography } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'

import { archivedTendersData } from '../data'
import type { ArchivedTenderType } from '../types'
import CommonTable from '@/common/CommonTable'

const columnHelper = createColumnHelper<ArchivedTenderType>()

const ArchiveTable = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })

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
      })
    ],
    []
  )

  const filterButton = (
    <Box
      sx={{
        backgroundColor: 'customColors.cyan1',
        paddingX: 7,
        paddingY: 2,
        borderRadius: 20,
        border: theme => `1px solid ${theme.palette.customColors.cyan2}`,
        cursor: 'pointer'
      }}
    >
      <Typography
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          paddingX: 5,
          color: 'customColors.cyan2',
          fontWeight: 700
        }}
      >
        <i className='ri-equalizer-line' style={{ fontSize: 20 }} />
        Filter
      </Typography>
    </Box>
  )

  return (
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
  )
}

export default ArchiveTable
