'use client'

import React, { useMemo, useState } from 'react'

import { TextField, Chip, Switch } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import CommonTable from '@/common/CommonTable'
import CustomTooltip from '@/common/CustomTooltip'
import UserFormModal, { type UserType, type UserFormData } from './components/UserFormModal'
import CustomButton from '@/common/CustomButton'
import * as PmaUserApi from '@/services/pma-user-management-apis/pma-user-management-apis'
import { usePmaUsers } from '@/hooks/usePmaUsers'
import { usePmaBranches } from '@/hooks/usePmaBranches'
import DataModal from '@/common/DataModal'

const columnHelper = createColumnHelper<UserType>()

const UserManagementView = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserType | null>(null)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState<number | null>(null)

  const { data: users, refetch } = usePmaUsers()

  const { data: branchOptions = [] } = usePmaBranches()

  const smallTextStyle = 'text-[#262B43E5] text-[12px]'

  const handleOpenModal = (user?: UserType) => {
    setEditingUser(user || null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingUser(null)
  }

  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, newStatus }: { id: number; newStatus: 'active' | 'inactive' }) =>
      PmaUserApi.updatePmaUserStatus(id, newStatus),
    onSuccess: async () => {
      toast.success('User status updated successfully!')
      await refetch()
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update status')
    }
  })

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

  const handleDeleteClick = (id: number) => {
    setUserToDelete(id)
    setShowConfirmationModal(true)
  }

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      try {
        await PmaUserApi.deletePmaUser(userToDelete)
        toast.success('User deleted successfully!')
        await refetch()
      } catch (error) {
        toast.error('Delete failed')
      }
    }

    setShowConfirmationModal(false)
    setUserToDelete(null)
  }

  const handleCancelDelete = () => {
    setShowConfirmationModal(false)
    setUserToDelete(null)
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
      columnHelper.accessor(user => user.branch?.branch_name, {
        id: 'branch_name',
        header: 'BRANCH NAME',
        cell: info => <span className={smallTextStyle}>{info.getValue() || '-'}</span>,
        size: 150
      }),
      columnHelper.accessor(user => user.branch?.address, {
        id: 'branch_address',
        header: 'BRANCH ADDRESS',
        cell: info => <span className={smallTextStyle}>{info.getValue() || '-'}</span>,
        size: 200
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
                  onClick={() => handleDeleteClick(user.id)}
                >
                  <i className='ri-delete-bin-line text-[16px] text-[#E1473D]' />
                </div>
              </CustomTooltip>

              <CustomTooltip text='Active/Inactive' position='top' align='center'>
                <div className='size-8 rounded-md flex justify-center items-center bg-[#FDB5283D]'>
                  <div className='w-3 h-3 mr-[33px] mb-[25px]'>
                    <Switch
                      checked={user.status === 'active'}
                      onChange={() => {
                        const newStatus = user.status === 'active' ? 'inactive' : 'active'

                        toggleStatusMutation.mutate({ id: user.id, newStatus })
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
    [branchOptions]
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

      <DataModal
        open={showConfirmationModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title='Confirmation Deletion'
        description='Are you sure you want to delete this user? This action cannot be undone.'
        confirmText='Delete'
        cancelText='Cancel'
        confirmColor='error'
        borderUnderTitle={true}
      />
    </>
  )
}

export default UserManagementView
