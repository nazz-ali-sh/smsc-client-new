'use client'

import React, { useMemo, useState, useEffect } from 'react'

import { TextField, Chip } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import { useDispatch, useSelector } from 'react-redux'

import CommonTable from '@/common/CommonTable'
import CustomTooltip from '@/common/CustomTooltip'
import CustomButton from '@/common/CustomButton'
import { dummyBranches } from './dummyData'
import type { BranchType } from './types'
import type { RootState } from '@/redux-store'
import { setBranches } from '@/redux-store/slices/branchSlice'

const columnHelper = createColumnHelper<BranchType>()

const BranchManagementView = () => {
  const dispatch = useDispatch()
  const branches = useSelector((state: RootState) => state.branches.branches)

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (branches.length === 0) {
      dispatch(setBranches(dummyBranches))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const filteredData = useMemo(() => {
    if (!searchQuery) return branches

    return branches.filter(
      branch =>
        branch.branch_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.postcode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.contact_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.contact_email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [branches, searchQuery])

  const handleOpenModal = () => {}

  const columns = useMemo(
    () => [
      columnHelper.accessor('branch_name', {
        header: 'BRANCH NAME',
        cell: info => info.getValue(),
        size: 150,
        enableSorting: true
      }),
      columnHelper.accessor('address', {
        header: 'ADDRESS',
        cell: info => info.getValue(),
        size: 180,
        enableSorting: true
      }),
      columnHelper.accessor('postcode', {
        header: 'POSTCODE',
        cell: info => info.getValue(),
        size: 100,
        enableSorting: true
      }),
      columnHelper.accessor('contact_name', {
        header: 'CONTACT NAME',
        cell: info => info.getValue(),
        size: 150,
        enableSorting: true
      }),
      columnHelper.accessor('contact_email', {
        header: 'CONTACT EMAIL',
        cell: info => info.getValue(),
        size: 180,
        enableSorting: true
      }),
      columnHelper.accessor('contact_phone', {
        header: 'CONTACT PHONE',
        cell: info => info.getValue(),
        size: 150,
        enableSorting: true
      }),
      columnHelper.accessor('status', {
        header: 'STATUS',
        cell: info => {
          const value = info.getValue()

          return (
            <Chip
              label={value === 'active' ? 'Active' : 'Inactive'}
              sx={{
                backgroundColor: value === 'active' ? '#22C55E1A' : '#F59E0B1A',
                color: value === 'active' ? '#22C55E' : '#F59E0B',
                fontWeight: 500,
                fontSize: '12px',
                height: '24px',
                width: '100px',
                borderRadius: '20px'
              }}
              size='small'
            />
          )
        },
        size: 100
      }),
      {
        id: 'actions',
        header: 'ACTION',
        cell: ({ row }: { row: any }) => {
          const branch = row.original

          console.log(branch, 'branch')

          return (
            <div className='flex gap-2'>
              <CustomTooltip text='Edit' position='top' align='center'>
                <div className='size-8 rounded-md flex justify-center items-center bg-[#26C6F93D]'>
                  <i className='ri-edit-line text-[16px] text-[#26C6F9]' />
                </div>
              </CustomTooltip>

              <CustomTooltip text='Delete' position='top' align='center'>
                <div className='size-8 rounded-md flex justify-center items-center bg-[#E1473D3D]'>
                  <i className='ri-delete-bin-line text-[16px] text-[#E1473D]' />
                </div>
              </CustomTooltip>

              <CustomTooltip text='Active' position='top' align='center'>
                <div className='size-8 rounded-md flex justify-center items-center bg-[#FDB5283D]'>
                  <i className='ri-toggle-line text-[16px] text-[#FDB528]' />
                </div>
              </CustomTooltip>
            </div>
          )
        },
        size: 150
      }
    ],
    [branches]
  )

  const headerActions = (
    <div className='flex justify-between gap-4 items-center w-full mb-5'>
      <TextField
        placeholder='Search'
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        size='small'
        sx={{
          backgroundColor: '#E9F9FF',
          color: '#35C0ED',
          borderRadius: '20px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none'
            }
          },
          '& .MuiInputBase-input': {
            padding: '10px 10px',
            fontSize: '14px',
            color: '#35C0ED',
            '&::placeholder': {
              color: '#35C0ED',
              opacity: 1
            }
          }
        }}
        InputProps={{
          startAdornment: <i className='ri-search-line text-[#26C6F9] mr-2' />
        }}
      />

      <CustomButton variant='contained' onClick={() => handleOpenModal()}>
        Add New Branch
      </CustomButton>
    </div>
  )

  return (
    <>
      <div className='p-6'>
        <h1 className='text-[#262B43] text-[24px] font-semibold mb-6'>Branch Management</h1>
        {headerActions}
        <CommonTable
          data={filteredData}
          columns={columns}
          pagination={pagination}
          onPaginationChange={setPagination}
          pageSizeOptions={[10, 25, 50]}
          enableSorting={true}
        />
      </div>
    </>
  )
}

export default BranchManagementView
