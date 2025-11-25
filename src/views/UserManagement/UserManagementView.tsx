'use client'

import React, { useMemo, useState } from 'react'

import { TextField, Chip } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import CommonTable from '@/common/CommonTable'
import CustomTooltip from '@/common/CustomTooltip'
import UserFormModal, { type UserType, type UserFormData } from './components/UserFormModal'
import CustomButton from '@/common/CustomButton'
import * as PmaUserApi from '@/services/pma-user-management-apis/pma-user-management-apis'
import { usePmaUsers } from '@/hooks/usePmaUsers'

const branchOptions = [
  { value: 1, label: 'Branch Name 1' },
  { value: 2, label: 'Branch Name 2' },
  { value: 3, label: 'Branch Name 3' },
  { value: 4, label: 'Branch Name 4' }
]

const columnHelper = createColumnHelper<UserType>()

const UserManagementView = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserType | null>(null)

  const { data: users, refetch } = usePmaUsers()

  const smallTextStyle = "text-[#262B43E5] text-[12px]";

  const handleOpenModal = (user?: UserType) => {
    setEditingUser(user || null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingUser(null)
  }

  const saveUserMutation = useMutation({
    mutationFn: (data: UserFormData) => {
      if (editingUser) {
        return PmaUserApi.updatePmaUser(editingUser.id, {
          name: data.name,
          email: data.email,
          mobile_number: data.mobile_number,
          branch_id: data.branch_id
        })
      } else {
        return PmaUserApi.addPmaUser({
          name: data.name,
          email: data.email,
          mobile_number: data.mobile_number,
          branch_id: data.branch_id
        })
      }
    },
    onSuccess: async () => {
      toast.success(editingUser ? 'User updated successfully!' : 'User added successfully!')
      await refetch()
      handleCloseModal()
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to save user'

      toast.error(errorMessage)
    }
  })

  const handleFormSubmit = (data: UserFormData) => {
    saveUserMutation.mutate(data)
  }

  const handleDelete = async (id: number) => {
    try {
      await PmaUserApi.deletePmaUser(id)
      toast.success('User deleted successfully!')

      await refetch()
    } catch (error) {
      toast.error('Delete failed')
    }
  }

  const filteredData = useMemo(() => {
    if (!users) return []

    return users.filter(
      (user: UserType) =>
        (user.name ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.email ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.mobile_number ?? '').toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, users])

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'NAME',
        cell: info => <span className={smallTextStyle}>{info.getValue()}</span>,
        size: 200
      }),
      columnHelper.accessor('email', {
        header: 'EMAIL',
        cell: info => <span className={smallTextStyle}>{info.getValue()}</span>,
        size: 180
      }),
      columnHelper.accessor('mobile_number', {
        header: 'MOBILE',
        cell: info => <span className={smallTextStyle}>{info.getValue()}</span>,
        size: 100
      }),
      columnHelper.accessor('branch_id', {
        header: 'BRANCH',
        cell: info => <span className={smallTextStyle}>{info.getValue()}</span>,
        size: 150
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
        size: 120
      }),
      {
        id: 'actions',
        header: 'ACTION',
        cell: ({ row }: { row: any }) => {
          const user = row.original

          return (
            <div className='flex gap-2'>
              <CustomTooltip text='Edit' position='top' align='center'>
                <div
                  className='size-8 rounded-md flex justify-center items-center bg-[#26C6F93D]'
                  onClick={() => handleOpenModal(user)}
                >
                  <i className='ri-edit-line text-[16px] text-[#26C6F9]' />
                </div>
              </CustomTooltip>

              <CustomTooltip text='Delete' position='top' align='center'>
                <div
                  className='size-8 rounded-md flex justify-center items-center bg-[#E1473D3D]'
                  onClick={() => handleDelete(user.id)}
                >
                  <i className='ri-delete-bin-line text-[16px] text-[#E1473D]' />
                </div>
              </CustomTooltip>

              <CustomTooltip text='Active' position='top' align='center'>
                <div
                  className='size-8 rounded-md flex justify-center items-center bg-[#FDB5283D]'
                  onClick={() => console.log('Delete user:', user)}
                >
                  <i className='ri-toggle-line text-[16px] text-[#FDB528]' />
                </div>
              </CustomTooltip>
            </div>
          )
        },
        size: 150
      }
    ],
    [users]
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
        Add New User
      </CustomButton>
    </div>
  )

  return (
    <>
      <div className='p-6'>
        <h1 className='text-[#262B43] text-[24px] font-semibold mb-6'>User Management</h1>
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

      <UserFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingUser={editingUser}
        onSubmit={handleFormSubmit}
        branchOptions={branchOptions}
      />
    </>
  )
}

export default UserManagementView
