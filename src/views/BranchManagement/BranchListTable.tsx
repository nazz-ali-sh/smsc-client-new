'use client'

import React, { useMemo, useState, useEffect } from 'react'

import { Button, Card, CardHeader, Divider, TablePagination, TextField, Chip } from '@mui/material'
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender
} from '@tanstack/react-table'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import BranchModal from './components/BranchModal'
import DeleteModal from '@/common/DeleteModal'
import ActionsDropdown from '@/common/ActionsDropdown'
import tableStyles from '@core/styles/table.module.css'

import type { BranchType } from './types'
import type { RootState } from '@/redux-store'
import {
  addBranch,
  updateBranch,
  deleteBranch,
  setBranches,
  toggleBranchStatus
} from '@/redux-store/slices/branchSlice'
import { dummyBranches } from './dummyData'

const columnHelper = createColumnHelper<BranchType>()

const BranchListTable = () => {
  const dispatch = useDispatch()
  const data = useSelector((state: RootState) => state.branches.branches)

  const [globalFilter, setGlobalFilter] = useState('')
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const [openDialog, setOpenDialog] = useState(false)
  const [editBranch, setEditBranch] = useState<BranchType | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [branchToDelete, setBranchToDelete] = useState<BranchType | null>(null)

  useEffect(() => {
    if (data.length === 0) {
      dispatch(setBranches(dummyBranches))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const handleEdit = (branch: BranchType) => {
    setEditBranch(branch)
    setOpenDialog(true)
  }

  const handleDelete = (branch: BranchType) => {
    setBranchToDelete(branch)
    setConfirmOpen(true)
  }

  const handleToggleStatus = (branch: BranchType) => {
    dispatch(toggleBranchStatus(branch.id))
    toast.success(`Branch marked as ${branch.status === 'active' ? 'Inactive' : 'Active'}!`)
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor('branch_name', {
        header: 'Branch Name',
        cell: info => info.getValue()
      }),
      columnHelper.accessor('address', {
        header: 'Address',
        cell: info => info.getValue()
      }),
      columnHelper.accessor('postcode', {
        header: 'Postcode',
        cell: info => info.getValue()
      }),
      columnHelper.accessor('contact_name', {
        header: 'Contact Name',
        cell: info => info.getValue()
      }),
      columnHelper.accessor('contact_email', {
        header: 'Contact Email',
        cell: info => info.getValue(),
        meta: { minWidth: 200 }
      }),
      columnHelper.accessor('contact_phone', {
        header: 'Contact Phone',
        cell: info => info.getValue(),
        meta: { minWidth: 160 }
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
        },
        meta: { maxWidth: 120 }
      }),
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }: { row: any }) => {
          const branch = row.original

          return (
            <ActionsDropdown
              actions={[
                {
                  label: 'Edit',
                  icon: <i className='ri-edit-line text-primary text-lg' />,
                  onClick: () => handleEdit(branch)
                },
                {
                  label: 'Delete',
                  icon: <i className='ri-delete-bin-line text-error text-lg' />,
                  onClick: () => handleDelete(branch)
                },
                {
                  label: branch.status === 'active' ? 'Mark Inactive' : 'Mark Active',
                  icon: (
                    <i
                      className={`${
                        branch.status === 'active' ? 'ri-toggle-line text-warning' : 'ri-toggle-fill text-success'
                      } text-lg`}
                    />
                  ),
                  onClick: () => handleToggleStatus(branch)
                }
              ]}
            />
          )
        },
        meta: { maxWidth: 120 }
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
        <CardHeader title='Branch Management' />
        <Divider />
        <div className='flex justify-between gap-4 p-5 flex-col sm:flex-row'>
          <TextField
            placeholder='Search Branch'
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
            size='small'
          />
          <Button
            variant='contained'
            onClick={() => {
              setEditBranch(null)
              setOpenDialog(true)
            }}
          >
            Add New Branch
          </Button>
        </div>

        <div className='overflow-x-auto'>
          <table className={tableStyles.table} style={{ tableLayout: 'fixed', width: '100%' }}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      <div
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className='text-center py-4 text-textSecondary'>
                    No branches found. Try adding one.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map(row => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <td
                        key={cell.id}
                        style={{
                          minWidth: (cell.column.columnDef.meta as any)?.minWidth,
                          maxWidth: (cell.column.columnDef.meta as any)?.maxWidth || '1px',

                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
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

      <BranchModal
        open={openDialog}
        setOpen={setOpenDialog}
        branch={editBranch}
        onSave={branch => {
          if (editBranch) {
            dispatch(updateBranch(branch))
            toast.success(`Branch updated!`)
          } else {
            dispatch(addBranch({ ...branch, status: 'active' }))
            toast.success(`Branch added!`)
          }

          setEditBranch(null)
        }}
      />

      <DeleteModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          if (branchToDelete) {
            dispatch(deleteBranch(branchToDelete.id))
            toast.success(`Branch deleted!`)
            setBranchToDelete(null)
          }

          setConfirmOpen(false)
        }}
        itemName='branch'
      />
    </>
  )
}

export default BranchListTable
