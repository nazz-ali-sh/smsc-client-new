'use client'

import React, { useMemo, useState } from 'react'

import { TextField, Switch, Chip } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import CommonTable from '@/common/CommonTable'
import CustomTooltip from '@/common/CustomTooltip'
import CustomButton from '@/common/CustomButton'
import BranchFormModal from './components/BranchFormModal'
import type { BranchType, BranchFormData } from './types'
import DataModal from '@/common/DataModal'
import { usePmaBranches } from '@/hooks/usePmaAllBranch'
import * as PmaBranchApi from '@/services/pma-branch-management-apis/pma-branch-management-apis'

const columnHelper = createColumnHelper<BranchType>()

const BranchManagementView = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBranch, setEditingBranch] = useState<BranchType | null>(null)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [branchToDelete, setBranchToDelete] = useState<number | null>(null)

  const queryClient = useQueryClient()
  const { data: branchOptions = [], isLoading: branchesLoading, refetch } = usePmaBranches()

  const handleOpenModal = (branch?: BranchType) => {
    setEditingBranch(branch || null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingBranch(null)
  }

  const handleDeleteClick = (id: number) => {
    setBranchToDelete(id)
    setShowConfirmationModal(true)
  }

  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, newStatus }: { id: number; newStatus: 'active' | 'inactive' }) =>
      PmaBranchApi.updatePmaBranchStatus(id, newStatus),
    onSuccess: async () => {
      toast.success('Branch status updated successfully!')
      await refetch()
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update status')
    }
  })

  const deleteBranchMutation = useMutation({
    mutationFn: (id: number) => PmaBranchApi.deletePmaBranch(id),
    onSuccess: () => {
      toast.success('Branch deleted successfully!')
      queryClient.invalidateQueries({ queryKey: ['pmaBranches'] })
      refetch()
      setShowConfirmationModal(false)
      setBranchToDelete(null)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete branch')
      setShowConfirmationModal(false)
      setBranchToDelete(null)
    }
  })

  const handleConfirmDelete = () => {
    if (branchToDelete) {
      deleteBranchMutation.mutate(branchToDelete)
    }
  }

  const handleCancelDelete = () => {
    setShowConfirmationModal(false)
    setBranchToDelete(null)
  }

  const saveBranchMutation = useMutation({
    mutationFn: (data: BranchFormData) => {
      if (editingBranch) {
        return PmaBranchApi.updatePmaBranch(editingBranch.id, data)
      } else {
        return PmaBranchApi.addPmaBranch(data)
      }
    },
    onSuccess: () => {
      toast.success(editingBranch ? 'Branch updated successfully!' : 'Branch added successfully!')
      queryClient.invalidateQueries({ queryKey: ['pmaBranches'] })
      refetch()
      handleCloseModal()
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to save branch'

      toast.error(errorMessage)
    }
  })

  const handleFormSubmit = (data: BranchFormData) => {
    saveBranchMutation.mutate(data)
  }

  const filteredData = useMemo(() => {
    if (!searchQuery) return branchOptions

    return branchOptions.filter(
      (branch: BranchType) =>
        (branch.branch_name ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (branch.address ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (branch.postcode ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (branch.contact_name ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (branch.contact_email ?? '').toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [branchOptions, searchQuery])

  const columns = useMemo(
    () => [
      columnHelper.accessor('branch_name', { header: 'BRANCH NAME', cell: info => info.getValue(), size: 150 }),
      columnHelper.accessor('address', { header: 'ADDRESS', cell: info => info.getValue(), size: 180 }),
      columnHelper.accessor('postcode', { header: 'POSTCODE', cell: info => info.getValue(), size: 100 }),
      columnHelper.accessor('contact_name', {
        header: 'CONTACT NAME',
        cell: info => info.getValue() || '-',
        size: 150
      }),
      columnHelper.accessor('contact_email', {
        header: 'CONTACT EMAIL',
        cell: info => info.getValue() || '-',
        size: 180
      }),
      columnHelper.accessor('contact_phone', {
        header: 'CONTACT PHONE',
        cell: info => info.getValue() || '-',
        size: 150
      }),
      columnHelper.accessor('status', {
        header: 'STATUS',
        cell: info => {
          const rawValue = info.getValue() as string | undefined
          const normalized = rawValue?.toString().toLowerCase()
          const isActive = normalized === 'active'
          const label = rawValue ?? '-'

          return (
            <Chip
              label={label}
              sx={{
                backgroundColor: isActive ? '#22C55E1A' : '#F59E0B1A',
                color: isActive ? '#22C55E' : '#F59E0B',
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
        size: 120
      }),

      {
        id: 'actions',
        header: 'ACTION',
        cell: ({ row }: { row: any }) => {
          const branch = row.original

          return (
            <div className='flex gap-2'>
              <CustomTooltip text='Edit' position='top' align='center'>
                <div
                  className='size-8 rounded-md flex justify-center items-center bg-[#26C6F93D] cursor-pointer'
                  onClick={() => handleOpenModal(branch)}
                >
                  <i className='ri-edit-line text-[16px] text-[#26C6F9]' />
                </div>
              </CustomTooltip>

              <CustomTooltip text='Delete' position='top' align='center'>
                <div
                  className='size-8 rounded-md flex justify-center items-center bg-[#E1473D3D] cursor-pointer'
                  onClick={() => handleDeleteClick(branch.id)}
                >
                  <i className='ri-delete-bin-line text-[16px] text-[#E1473D]' />
                </div>
              </CustomTooltip>
              <CustomTooltip text='Active' position='top' align='center'>
                <div className='size-8 rounded-md flex justify-center items-center bg-[#FDB5283D]'>
                  <div className='w-3 h-3 mr-[33px] mb-[25px]'>
                    <Switch
                      checked={branch.status?.toString().toLowerCase().trim() === 'active'}
                      onChange={() => {
                        const currentStatus = branch.status?.toString().toLowerCase().trim()
                        const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
                        
                        toggleStatusMutation.mutate({ id: branch.id, newStatus })
                      }}
                      sx={{
                        '& .MuiSwitch-switchBase': {
                          transitionDuration: '300ms',
                          '&.Mui-checked': {
                            color: '#22C55E',
                            '& + .MuiSwitch-track': {
                              backgroundColor: '#22C55E1A',
                              opacity: 1,
                              border: 0
                            }
                          }
                        },
                        '& .MuiSwitch-thumb': {
                          boxSizing: 'border-box',
                          boxShadow: 'none'
                        },
                        '& .MuiSwitch-track': {
                          borderRadius: 7,
                          backgroundColor: '#F59E0B1A',
                          opacity: 1,
                          border: 0
                        }
                      }}
                    />
                  </div>
                </div>
              </CustomTooltip>
            </div>
          )
        },
        size: 150
      }
    ],
    []
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
          '& .MuiOutlinedInput-root': { '& fieldset': { border: 'none' } },
          '& .MuiInputBase-input': {
            padding: '10px 10px',
            fontSize: '14px',
            color: '#35C0ED',
            '&::placeholder': { color: '#35C0ED', opacity: 1 }
          }
        }}
        InputProps={{ startAdornment: <i className='ri-search-line text-[#26C6F9] mr-2' /> }}
      />

      <CustomButton variant='contained' onClick={() => handleOpenModal()}>
        Add New Branch
      </CustomButton>
    </div>
  )

  if (branchesLoading) return <div className='p-6 text-center'>Loading branches...</div>

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
          enableSorting
          enableCellWrapping
        />
      </div>

      <BranchFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingBranch={editingBranch}
        onSubmit={handleFormSubmit}
      />

      <DataModal
        open={showConfirmationModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title='Delete Branch'
        description='Are you sure you want to delete this branch? This action cannot be undone.'
        confirmText='Delete'
        cancelText='Cancel'
        confirmColor='error'
        borderUnderTitle={true}
      />
    </>
  )
}

export default BranchManagementView
