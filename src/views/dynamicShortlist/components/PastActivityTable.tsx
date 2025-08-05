'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Image from 'next/image'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { Typography } from '@mui/material'

import avatar1 from '../../../../public/images/customImages/company.png'

// Third-party Imports

// Type Imports

// Data Imports
import defaultData from '../data'

// Column Definitions
const columnHelper = createColumnHelper<any>()

const columns = [
  columnHelper.accessor('fullName', {
    header: 'Users',
    cell: info => {
      const { fullName, email } = info.row.original

      return (
        <div className='flex items-center space-x-3'>
          <Image
            src={avatar1} // fallback avatar
            alt={fullName}
            className='w-10 h-10 rounded-full object-cover'
          />
          <div>
            <p className='font-medium text-gray-900'>{fullName}</p>
            <p className='text-sm text-gray-500'>{email}</p>
          </div>
        </div>
      )
    }
  }),
  columnHelper.accessor('start_date', {
    header: 'Date'
  }),
  columnHelper.accessor('time', {
    header: 'Time'
  }),
  columnHelper.accessor('Activity', {
    header: 'Activity'
  }),
  columnHelper.accessor('age', {
    header: 'Actions',
    cell: () => {
      return <i className='ri-more-2-fill'></i>
    }
  })
]

const fuzzyFilter = (row: any, columnId: string, filterValue: string) => {
  const rowValue = row.getValue(columnId)

  return String(rowValue).toLowerCase().includes(String(filterValue).toLowerCase())
}

const EditableDataTables = () => {
  // States
  const [data] = useState(() => defaultData)

  // Hooks
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter
    }
  })

  const lastHeaderGroup = table.getHeaderGroups()[table.getHeaderGroups().length - 1]

  return (
    <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <CardHeader
        title={
          <Typography variant='h3' className='text-[#262B43E5]' component='div'>
            Past Activity
          </Typography>
        }
      />
      <div className='overflow-x-auto'>
        <table className='min-w-full  border-collapse border-bordercolor'>
          <thead>
            <tr className='border-bordercolor'>
              {lastHeaderGroup.headers.map((header, idx) => (
                <th
                  key={header.id}
                  className={`text-center px-4 py-2 ${
                    idx !== lastHeaderGroup.headers.length - 1 ? 'border-r border-gray-300' : ''
                  }`}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 10)
              .map(row => (
                <tr key={row.id} className='border-b border-gray-200 text-center'>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className='px-4 py-4 '>
                      {' '}
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default EditableDataTables
