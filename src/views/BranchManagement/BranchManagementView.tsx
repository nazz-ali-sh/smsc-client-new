'use client'

import React, { useMemo, useState } from 'react'

import { TextField } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import CommonTable from '@/common/CommonTable'
import CustomTooltip from '@/common/CustomTooltip'
import CustomButton from '@/common/CustomButton'
import BranchFormModal, { type BranchType, type BranchFormData } from './components/BranchFormModal'
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

  const { data: branchOptions = [], isLoading: branchesLoading, refetch: refetchBranches } = usePmaBranches()

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

  const handleConfirmDelete = async () => {
    if (branchToDelete) {
      try {
        await PmaBranchApi.deletePmaBranch(branchToDelete)
        toast.success('Branch deleted successfully!')
        await refetchBranches()
      } catch (error) {
        toast.error('Delete failed')
      }
    }

    setShowConfirmationModal(false)
    setBranchToDelete(null)
  }

  const handleCancelDelete = () => {
    setShowConfirmationModal(false)
    setBranchToDelete(null)
  }

  const saveBranchMutation = useMutation({
    mutationFn: (data: BranchFormData) => {
      if (editingBranch) {
        return PmaBranchApi.updatePmaBranch(editingBranch.id, {
          branch_name: data.branch_name,
          address: data.address,
          postcode: data.postcode,
          contact_name: data.contact_name,
          contact_email: data.contact_email,
          contact_phone: data.contact_phone
        })
      } else {
        return PmaBranchApi.addPmaBranch({
          branch_name: data.branch_name,
          address: data.address,
          postcode: data.postcode,
          contact_name: data.contact_name,
          contact_email: data.contact_email,
          contact_phone: data.contact_phone
        })
      }
    },
    onSuccess: async () => {
      toast.success(editingBranch ? 'Branch updated successfully!' : 'Branch added successfully!')
      await refetchBranches()
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
                  <i className='ri-toggle-line text-[16px] text-[#FDB528]' />
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
