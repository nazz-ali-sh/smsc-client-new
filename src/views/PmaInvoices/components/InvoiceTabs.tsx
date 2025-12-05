'use client'

import React, { useState, useMemo } from 'react'

import Image from 'next/image'

import { Box } from '@mui/material'
import type { ColumnDef } from '@tanstack/react-table'

import InvoiceTabSection from './InvoiceTabSection'
import CommonTable from '@/common/CommonTable'
import CustomTooltip from '@/common/CustomTooltip'
import { dummyInvoices } from './dummyInvoices'
import { getInvoiceTabConfig } from './invoiceTabConfig'
import type { InvoiceData } from './types'

const InvoicesTabs = () => {
  const [activeTab, setActiveTab] = useState(0)

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
    setPagination({ pageIndex: 0, pageSize: 10 })
  }

  const currentTabConfig = getInvoiceTabConfig(activeTab)

  const columns: ColumnDef<InvoiceData>[] = useMemo(() => {
    return currentTabConfig.columns.map(config => {
      if (config.key === 'actions') {
        return {
          id: 'actions',
          header: config.header,
          size: config.size,
          cell: ({ row }: { row: any }) => {
            const invoice = row.original as InvoiceData
            const actions = currentTabConfig.actions

            return (
              <div className='flex gap-2'>
                {actions.map((action: any, index: number) => (
                  <CustomTooltip key={index} text={action.tooltip} position='top' align='center'>
                    <div
                      className='size-8 rounded-md flex justify-center items-center cursor-pointer'
                      style={{ backgroundColor: action.bg, color: action.color }}
                      onClick={() => action.handler(invoice)}
                    >
                      {action.iconType === 'image' ? (
                        <Image
                          src={action.icon}
                          alt={action.tooltip}
                          width={action.width || 16}
                          height={action.height || 16}
                        />
                      ) : (
                        <i className={`${action.icon} text-[16px]`} />
                      )}
                    </div>
                  </CustomTooltip>
                ))}
              </div>
            )
          }
        } as ColumnDef<InvoiceData>
      }

      return {
        accessorKey: config.key,
        header: config.header,
        size: config.size,
        cell: info => {
          const value = info.getValue() ?? (info.row.original as InvoiceData)[config.key]

          return value !== undefined && value !== null && value !== '' ? value : '-'
        }
      } as ColumnDef<InvoiceData>
    })
  }, [currentTabConfig])

  const filteredInvoices = useMemo(() => {
    return dummyInvoices.filter(invoice => invoice.status === currentTabConfig.status)
  }, [currentTabConfig.status])

  return (
    <>
      <InvoiceTabSection value={activeTab} onChange={handleTabChange} />
      <Box
        className='py-1 bg-white rounded-xl overflow-y-auto'
        sx={{
          boxShadow: '2px 2px 28px 0px #00000014'
        }}
      >
        <Box className='w-full flex justify-center'>
          <CommonTable
            data={filteredInvoices}
            columns={columns}
            title={currentTabConfig.title}
            description={currentTabConfig.description}
            pagination={pagination}
            onPaginationChange={setPagination}
            pageSizeOptions={[5, 10, 25, 50]}
            enableSorting={true}
            className='w-[97%] shadow-none border-none'
          />
        </Box>
      </Box>
    </>
  )
}

export default InvoicesTabs
