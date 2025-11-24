'use client'

import React, { useMemo, useState, useEffect } from 'react'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

import { MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'

import CommonTable from '@/common/CommonTable'
import { usePmaTenderListing } from '@/hooks/usePmaTenderListing'
import { getTenderDetails, tenderFilterMenuItems } from '@/constants'
import type { PmaTenderType } from '../types'
import PmaTenderDrawer from './PmaTenderDrawer'
import AppointedModal from './AppointedModal'
import { actionIconStyles } from '@/constants/styles'

const columnHelper = createColumnHelper<PmaTenderType>()

const PmaTenderTable = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })

  const [value, setValue] = React.useState(
    searchParams.get('active') || (pathname === '/shortlisted' ? 'shortlisted' : 'went_live')
  )

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedTenderId, setSelectedTenderId] = useState<number | null>(null)
  const [startDateModalOpen, setStartDateModalOpen] = useState(false)
  const [selectedWonTenderId, setSelectedWonTenderId] = useState<number | null>(null)

  const { tendersListData } = usePmaTenderListing({ filter: value })

  const pmaTendersData: PmaTenderType[] = tendersListData?.data?.tenders || []

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (value && value !== 'went_live') {
      params.set('active', value)
    } else {
      params.delete('active')
    }

    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname

    router.replace(newUrl, { scroll: false })
  }, [value, router, pathname, searchParams])

  useEffect(() => {
    const filterFromUrl = searchParams.get('active') || (pathname === '/shortlisted' ? 'shortlisted' : 'went_live')

    if (filterFromUrl !== value) {
      setValue(filterFromUrl)
    }
  }, [searchParams, value, pathname])

  const columns = useMemo(() => {
    const baseColumns: any[] = [
      columnHelper.accessor('tender_name', {
        header: 'Tender Id',
        cell: info => info.getValue(),
        size: 150,
        enableSorting: true
      }),
      columnHelper.accessor('region', {
        header: 'Reigon',
        cell: info => info.getValue(),
        size: 120,
        enableSorting: true
      }),
      columnHelper.accessor('unit_count', {
        header: 'Unit Count',
        cell: info => info.getValue(),
        size: 120,
        enableSorting: true
      }),
      columnHelper.accessor('blocks_count', {
        header: 'Blocks Count',
        cell: info => info.getValue(),
        size: 130,
        enableSorting: true
      }),
      columnHelper.accessor('block_condition', {
        header: 'Block Condition',
        cell: info => {
          const condition = info.getValue()

          return <span className='capitalize'>{condition}</span>
        },
        size: 150,
        enableSorting: true
      }),
      columnHelper.accessor('outdoor_space', {
        header: 'Outdoor Space',
        cell: info => info.getValue(),
        size: 130,
        enableSorting: true
      }),
      columnHelper.accessor('year_built', {
        header: 'Year Built',
        cell: info => {
          const year = info.getValue()

          const displayValue = year
            ? year
                .replace(/_/g, ' ')
                .replace(/between /g, '')
                .replace(/after /g, 'After ')
                .replace(/before /g, 'Before ')
            : '-'

          return <span className='capitalize'>{displayValue}</span>
        },
        size: 150,
        enableSorting: true
      }),
      columnHelper.accessor('property_type', {
        header: 'Property Type',
        cell: info => {
          const type = info.getValue()
          const displayValue = type ? type.replace(/_/g, ' ') : '-'

          return <span className='capitalize'>{displayValue}</span>
        },
        size: 150,
        enableSorting: true
      }),
      columnHelper.accessor('end_date', {
        header: 'End Date',
        cell: info => info.getValue() || '-',
        size: 130,
        enableSorting: true
      })
    ]

    if (value !== 'expired') {
      baseColumns.push(
        columnHelper.display({
          id: 'action',
          header: 'ACTION',
          cell: ({ row }) => {
            const tender_id = row?.original?.tender_id
            const isLiveTender = value === 'went_live'
            const isAwardedTender = value === 'date_registered'

            const handleViewClick = () => {
              if (isLiveTender) {
                setSelectedTenderId(tender_id)
                setDrawerOpen(true)
              } else {
                router.push(`/tender-detail/${tender_id}`)
              }
            }

            const handleStartDateClick = () => {
              setSelectedWonTenderId(tender_id)
              setStartDateModalOpen(true)
            }

            return (
              <div className='flex gap-2'>
                <span className={actionIconStyles} onClick={handleViewClick}>
                  <i className='ri-eye-line' />
                </span>
                {isAwardedTender && (
                  <span className={actionIconStyles} onClick={handleStartDateClick}>
                    <i className='ri-movie-line' />
                  </span>
                )}
              </div>
            )
          },
          size: 100,
          enableSorting: false
        })
      )
    }

    return baseColumns
  }, [value, router])

  const filterButton = (
    <FormControl className='w-[320px]'>
      <InputLabel
        id='tender-filter-label'
        sx={{
          color: '#26C6F9',
          '&.Mui-focused': {
            color: '#26C6F9'
          }
        }}
      >
        Select Tender Type
      </InputLabel>
      <Select
        labelId='tender-filter-label'
        id='tender-filter'
        value={value}
        onChange={e => setValue(e.target.value as string)}
        label='Select Tender Type'
        sx={{
          color: '#26C6F9 !important',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#26C6F9 !important'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#26C6F9 !important'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#26C6F9 !important'
          },
          '& .MuiSelect-select': {
            color: '#26C6F9 !important'
          },
          '& .MuiSelect-icon': {
            color: '#26C6F9 !important'
          },
          '& .MuiInputBase-input': {
            color: '#26C6F9 !important'
          },
          '& .MuiOutlinedInput-root': {
            color: '#26C6F9 !important'
          },
          '& .MuiSvgIcon-root': {
            color: '#26C6F9 !important'
          },
          '& .MuiSelect-iconOpen': {
            color: '#26C6F9 !important'
          }
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              '& .MuiMenuItem-root': {
                color: '#26C6F9 !important',
                paddingY: '10px',
                '&:hover': {
                  backgroundColor: '#26C6F93D !important',
                  color: '#26C6F9 !important'
                },
                '&.Mui-selected': {
                  backgroundColor: '#26C6F93D !important',
                  color: '#26C6F9 !important',
                  '&:hover': {
                    backgroundColor: '#26C6F93D !important',
                    color: '#26C6F9 !important'
                  }
                }
              }
            }
          }
        }}
      >
        {tenderFilterMenuItems?.map(item => (
          <MenuItem key={item?.value} value={item?.value}>
            {item?.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )

  const tenderDetails = getTenderDetails(value)

  const handleCloseDrawer = () => {
    setDrawerOpen(false)
    setSelectedTenderId(null)
  }

  const handleCloseStartDateModal = () => {
    setStartDateModalOpen(false)
    setSelectedWonTenderId(null)
  }

  return (
    <>
      <CommonTable
        data={pmaTendersData}
        columns={columns}
        title={tenderDetails?.title}
        description={tenderDetails?.description}
        actionButton={filterButton}
        pagination={pagination}
        onPaginationChange={setPagination}
        pageSizeOptions={[5, 10, 25]}
        enableSorting={true}
      />

      <PmaTenderDrawer open={drawerOpen} onClose={handleCloseDrawer} tenderId={selectedTenderId} />

      <AppointedModal open={startDateModalOpen} onClose={handleCloseStartDateModal} tenderId={selectedWonTenderId} />
    </>
  )
}

export default PmaTenderTable
