'use client'

import React, { useState } from 'react'

import { Card, CardHeader, CardContent, TablePagination, Typography } from '@mui/material'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
  type PaginationState,
  type SortingState
} from '@tanstack/react-table'

import tableStyles from '@core/styles/table.module.css'

function CommonTable<T>({
  data,
  columns,
  title,
  description,
  actionButton,
  pagination: externalPagination,
  onPaginationChange,
  pageSizeOptions = [5, 10, 25],
  className = '',
  enableSorting = true
}: CommonTableProps<T>) {
  const [internalPagination, setInternalPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 })
  const [sorting, setSorting] = useState<SortingState>([])

  const pagination = externalPagination || internalPagination
  const setPagination = onPaginationChange || setInternalPagination

  const table = useReactTable({
    data,
    columns,
    state: { pagination, sorting },

    // onPaginationChange: updater => {
    //   const newPagination = typeof updater === 'function' ? updater(pagination) : updater

    //   setPagination(newPagination)
    // },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    filterFns: {
      fuzzy: () => true
    }
  })

  return (
    <Card className={className}>
      {(title || actionButton) && (
        <CardHeader
          title={
            title ? (
              <div>
                <div className='flex justify-between items-center pb-5 pt-2'>
                  <Typography variant='h4' component='h2' className='font-bold'>
                    {title}
                  </Typography>
                  {actionButton}
                </div>
                {description && (
                  <Typography
                    variant='body2'
                    sx={{
                      color: '#696969',
                      fontSize: '14px',
                      lineHeight: '23px',
                      whiteSpace: 'pre-line',
                      paddingBottom: '16px',
                      maxWidth: '75%'
                    }}
                  >
                    {description}
                  </Typography>
                )}
              </div>
            ) : undefined
          }
        />
      )}

      <CardContent className='p-0'>
        <div className='overflow-x-auto'>
          <table className={tableStyles?.table} style={{ tableLayout: 'fixed', width: '100%' }}>
            <thead>
              {table?.getHeaderGroups()?.map(headerGroup => (
                <tr key={headerGroup?.id} className='text-[#262B43E5] text-[13px] font-normal '>
                  {headerGroup?.headers?.map(header => (
                    <th key={header.id}>
                      <div
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          cursor: enableSorting && header.column.getCanSort() ? 'pointer' : 'default',
                          fontWeight: 400
                        }}
                        onClick={enableSorting ? header.column.getToggleSortingHandler() : undefined}
                        className={enableSorting && header.column.getCanSort() ? ' transition-colors' : ''}
                      >
                        <div className='flex items-center gap-1'>
                          {flexRender(header?.column?.columnDef?.header, header?.getContext())}
                          {enableSorting && header.column.getCanSort() && (
                            <span className='ml-1'>
                              {{
                                asc: <i className='ri-arrow-up-line text-[14px] align-middle' />,
                                desc: <i className='ri-arrow-down-line text-[14px] align-middle' />
                              }[header.column.getIsSorted() as string] ?? null}
                            </span>
                          )}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table?.getRowModel()?.rows?.length === 0 ? (
                <tr>
                  <td colSpan={columns?.length} className='text-center py-4 text-textSecondary'>
                    No data found.
                  </td>
                </tr>
              ) : (
                table?.getRowModel()?.rows?.map(row => (
                  <tr key={row?.id}>
                    {row?.getVisibleCells()?.map(cell => (
                      <td
                        key={cell.id}
                        style={{
                          minWidth: cell?.column?.columnDef?.size,
                          maxWidth: cell?.column?.columnDef?.size || '1px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          color: '#262B43E5',
                          fontSize: '12px',
                          paddingTop: '22px',
                          paddingBottom: '22px'
                        }}
                      >
                        {flexRender(cell?.column?.columnDef?.cell, cell.getContext())}
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
          count={table?.getFilteredRowModel()?.rows?.length}
          page={pagination?.pageIndex}
          onPageChange={(_, newPage) => setPagination({ ...pagination, pageIndex: newPage })}
          rowsPerPage={pagination?.pageSize}
          onRowsPerPageChange={e => setPagination({ ...pagination, pageSize: +e.target.value })}
          rowsPerPageOptions={pageSizeOptions}
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
          labelRowsPerPage='Page'
        />
      </CardContent>
    </Card>
  )
}

export default CommonTable
