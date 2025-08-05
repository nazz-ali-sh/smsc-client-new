'use client'

import React, { useMemo, useState, useEffect } from 'react'

import { Card, CardHeader, Divider, Button, TextField, TablePagination, Chip } from '@mui/material'
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel
} from '@tanstack/react-table'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

import ActionsDropdown from '@/common/ActionsDropdown'
import DeleteModal from '@/common/DeleteModal'
import UserModal from './components/UserModal'
import tableStyles from '@core/styles/table.module.css'
import { dummyUsers } from './dummyData'
import type { RootState } from '@/redux-store'
import type { UserType } from './types'
import { deleteUser, setUsers, toggleUserStatus } from '@/redux-store/slices/userSlice'

const columnHelper = createColumnHelper<UserType>()

const UserListTable = () => {
  const dispatch = useDispatch()
  const data = useSelector((state: RootState) => state.users.users)

  const [globalFilter, setGlobalFilter] = useState('')
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const [openDialog, setOpenDialog] = useState(false)
  const [editUser, setEditUser] = useState<UserType | null>(null)
  const [userToDelete, setUserToDelete] = useState<UserType | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  useEffect(() => {
    if (data.length === 0) {
      dispatch(setUsers(dummyUsers))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const handleEdit = (user: UserType) => {
    setEditUser(user)
    setOpenDialog(true)
  }

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      dispatch(deleteUser(userToDelete.id))
      toast.success('User deleted successfully!')
      setUserToDelete(null)
    }

    setConfirmOpen(false)
  }

  const handleToggleStatus = (user: UserType) => {
    dispatch(toggleUserStatus(user.id))
    toast.success(`User marked as ${user.status === 'active' ? 'Inactive' : 'Active'}`)
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', { header: 'Name', cell: info => info.getValue() }),
      columnHelper.accessor('email', { header: 'Email', cell: info => info.getValue() }),
      columnHelper.accessor('mobile_number', { header: 'Mobile', cell: info => info.getValue() }),
      columnHelper.accessor('branch_name', {
        header: 'Branch',
        cell: info => info.getValue() || '—'
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: info => {
          const value = info.getValue()

          return (
            <Chip
              label={value === 'active' ? 'Active' : 'Inactive'}
              color={value === 'active' ? 'success' : 'warning'}
              variant='outlined'
              size='small'
              sx={{ fontWeight: 500 }}
            />
          )
        }
      }),
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }: { row: any }) => {
          const user = row.original

          return (
            <ActionsDropdown
              actions={[
                {
                  label: 'Edit',
                  icon: <i className='ri-edit-box-line text-primary text-lg' />,
                  onClick: () => handleEdit(user)
                },
                {
                  label: 'Delete',
                  icon: <i className='ri-delete-bin-7-line text-error text-lg' />,
                  onClick: () => {
                    setUserToDelete(user)
                    setConfirmOpen(true)
                  }
                },
                {
                  label: user.status === 'active' ? 'Mark Inactive' : 'Mark Active',
                  icon: (
                    <i
                      className={`${
                        user.status === 'active' ? 'ri-toggle-line text-warning' : 'ri-toggle-fill text-success'
                      } text-lg`}
                    />
                  ),
                  onClick: () => handleToggleStatus(user)
                }
              ]}
            />
          )
        }
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  )

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, pagination },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    filterFns: {} as Record<string, any>
  })

  return (
    <>
      <Card>
        <CardHeader title='Users Management' />
        <Divider />
        <div className='flex justify-between gap-4 p-5 flex-col sm:flex-row'>
          <TextField
            placeholder='Search User'
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
            size='small'
          />
          <Button
            variant='contained'
            onClick={() => {
              setEditUser(null)
              setOpenDialog(true)
            }}
          >
            Add New User
          </Button>
        </div>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table} style={{ tableLayout: 'fixed', width: '100%' }}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className='text-center py-4 text-textSecondary'>
                    No users found.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map(row => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <TablePagination
          component='div'
          count={table.getFilteredRowModel().rows.length}
          page={pagination.pageIndex}
          onPageChange={(_, newPage) => setPagination(p => ({ ...p, pageIndex: newPage }))}
          rowsPerPage={pagination.pageSize}
          onRowsPerPageChange={e => setPagination(p => ({ ...p, pageSize: +e.target.value }))}
          rowsPerPageOptions={[10, 25, 50]}
        />
      </Card>

      <UserModal open={openDialog} setOpen={setOpenDialog} user={editUser} />

      <DeleteModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName='user'
      />
    </>
  )
}

export default UserListTable
