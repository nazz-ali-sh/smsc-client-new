'use client'

import { useEffect, useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { Card, TablePagination, Checkbox, Button, Rating, Stack, Typography } from '@mui/material'
import classnames from 'classnames'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper
} from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'
import type { ColumnFiltersState, FilterFn, ColumnDef } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'
import { useSelector } from 'react-redux'
import { useQuery, useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import pdfFrame from '../../../public/images/customImages/frame.png'
import type { ApiResponseItem, DataType, TenderResponse } from './type'
import ChevronRight from '@menu/svg/ChevronRight'
import styles from '@core/styles/table.module.css'
import AnchorTemporaryDrawer from '@/common/RightDrawer'
import { downloadBlindTenderPdf, ShortlistedPma, tenderResponce } from '@/services/tender_result-apis/tender-result-api'
import SuccessModal from '../../common/SucessModal'
import ShortListAgent from '@/common/ShortListAgent'
import ViewPmaFullProfile from './ViewPmaFullProfile'

const columnHelper = createColumnHelper<DataType>()

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({ itemRank })

  return itemRank.passed
}

const KitchenSink = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [tableData, setTableData] = useState<DataType[]>([])
  const [selectedAgentId, setSelectedAgentId] = useState<number[]>([])
  const [allselectedpma, SetAllSelectedPma] = useState<number[]>([])

  console.log(allselectedpma)

  console.log(selectedAgentId)

  const router = useRouter()
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const [shortlistedModalOpen, setShortListedSuccessModalOpen] = useState(false)

  const rmcData = useSelector((state: any) => state?.rmcOnboarding?.rmcData)
  const tender_id = rmcData?.tender_id

  const [selectedResponse, setSelectedResponse] = useState<ApiResponseItem | null>(null)

  console.log(selectedResponse)

  const { data: responceData } = useQuery<TenderResponse, Error>({
    queryKey: ['tendeResponce', tender_id],
    queryFn: () => tenderResponce(Number(tender_id)),
    enabled: !!tender_id
  })

  const shortlistMutation = useMutation({
    mutationFn: ({ tender_id, pma_user_ids }: { tender_id: number; pma_user_ids: number[] }) =>
      ShortlistedPma(tender_id, pma_user_ids),
    onSuccess: () => {
      setShortListedSuccessModalOpen(true)
      table.resetRowSelection()
    },
    onError: error => {
      console.error('Error shortlisting agents:', error)
    }
  })

  const handleCloseAndNavigate = () => {
    setShortListedSuccessModalOpen(false)
    router.push('/shortlist-agent')
  }

  const downloadMutation = useMutation({
    mutationFn: (id: number) => downloadBlindTenderPdf(id),
    onSuccess: data => {
      const blob = new Blob([data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')

      link.href = url
      link.download = `tender_${tender_id}.pdf`
      link.click()
      window.URL.revokeObjectURL(url)
    },
    onError: error => {
      console.error('Download failed:', error)
    }
  })

  useEffect(() => {
    if (responceData?.data?.responses) {
      const mappedData: DataType[] = responceData?.data?.responses.map((item: ApiResponseItem) => ({
        id: item.response_id,
        pma_id: item?.pma_user_id,
        avatar: item.company_name.substring(0, 2).toUpperCase(),
        fullName: item.company_name,
        submittedDate: item.response_details.submitted_at
          ? new Date(item.response_details.submitted_at).toLocaleDateString('en-GB')
          : 'N/A',
        quotation: item.quotation.total_quote_inc_vat.toLocaleString('en-US', { style: 'currency', currency: 'GBP' }),
        location: item.location.address || 'N/A',
        NoOfUnits: item.company_metrics.total_units_managed ?? item.quotation.per_unit_equivalent_inc_vat ?? 'N/A',
        googleReview: item.reviews.google.rating || 0,
        tradingYears: item.company_metrics.trading_years ?? 'N/A',
        Questionaire: 'View agent Response & Quote'
      }))

      setTableData(mappedData)
    }
  }, [responceData])

  const columns = useMemo<ColumnDef<DataType, any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <div className='flex items-center'>
            <Checkbox
              checked={table.getIsAllRowsSelected()}
              indeterminate={table.getIsSomeRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className='flex items-center'>
            <Checkbox
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              indeterminate={row.getIsSomeSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
          </div>
        ),
        enableSorting: false,
        enableColumnFilter: false,
        size: 50
      },
      columnHelper.accessor('fullName', {
        cell: ({ row }) => (
          <div className='flex space-x-3'>
            <div className='flex items-center gap-2'>
              <div className='flex justify-center items-center bg-red-200 rounded-full p-1.5'>
                {row.original.avatar.length > 2 ? (
                  <img
                    src={row.original.avatar || '/fallback-avatar.png'}
                    alt={`${row.original.fullName}'s avatar`}
                    className='w-6 h-6 rounded-full'
                  />
                ) : (
                  <Typography
                    variant='caption'
                    className='w-6 h-6 rounded-full flex items-center justify-center font-bold text-white'
                  >
                    {row.original.avatar}
                  </Typography>
                )}
              </div>
            </div>
            <div className='pt-1'>
              <p className='truncate'>{row.getValue('fullName') || 'N/A'}</p>
              <p className='text-sm text-gray-600 min-w-[150px]'>{row.original.submittedDate || 'N/A'}</p>
            </div>
          </div>
        ),
        header: 'PMA NUMBER',
        size: 200
      }),
      columnHelper.accessor('quotation', {
        cell: info => info.getValue() || 'N/A',
        header: 'Quotation',
        size: 100
      }),
      columnHelper.accessor('location', {
        cell: info => info.getValue() || 'N/A',
        header: 'Location',
        size: 150
      }),
      columnHelper.accessor('NoOfUnits', {
        cell: info => info.getValue() || 'N/A',
        header: 'No. of Units',
        size: 80
      }),
      columnHelper.accessor('googleReview', {
        cell: ({ row }) => {
          const ratingValue = row.getValue('googleReview')

          return (
            <Stack spacing={1}>
              {typeof ratingValue === 'number' && ratingValue !== null && ratingValue > 0 ? (
                <Rating name={`rating-${row.id}`} value={ratingValue} precision={0.5} readOnly size='small' />
              ) : (
                <span className='text-gray-500'>No rating</span>
              )}
            </Stack>
          )
        },
        header: 'Google Review',
        enableSorting: false,
        enableColumnFilter: false,
        size: 150
      }),
      columnHelper.accessor('tradingYears', {
        cell: info => info.getValue() || 'N/A',
        header: 'Trading Years',
        size: 100
      }),
      columnHelper.accessor('Questionaire', {
        cell: ({ row }) => (
          <div className='min-w-[180px] max-w-[190px]'>
            <Button
              sx={{
                backgroundColor: 'customColors.ligthBlue',
                '&:hover': {
                  backgroundColor: 'customColors.ligthBlue'
                }
              }}
              variant='contained'
              onClick={() => {
                setDrawerOpen(true)
                setSelectedAgentId([row.original.pma_id])
                SetAllSelectedPma([row.original.pma_id])

                // ✅ set the full response object for drawer
                const responseObj = responceData?.data?.responses.find(
                  (item: { pma_user_id: number }) => item.pma_user_id === row.original.pma_id
                )

                console.log(responseObj)

                setSelectedResponse(responseObj || null)
              }}
            >
              {row.original.Questionaire}
            </Button>
          </div>
        ),
        header: 'Questionnaire',
        enableSorting: false,
        enableColumnFilter: false,
        size: 150
      })
    ],
    []
  )

  const table = useReactTable({
    data: tableData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      columnFilters,
      globalFilter
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    enableRowSelection: true
  })

  const handleConfirmSelected = () => {
    const selectedRows = table.getSelectedRowModel().rows
    const pma_user_ids = selectedRows.map(row => row.original.pma_id)

    // If no rows are selected but selectedAgentId exists (e.g., from Questionnaire button)
    const allSelectedIds = [...new Set([...pma_user_ids, ...selectedAgentId])]

    if (allSelectedIds.length === 0) {
      toast.warning('Please select at least one agent to shortlist')

      return
    }

    if (tender_id) {
      shortlistMutation.mutate({ tender_id: Number(tender_id), pma_user_ids: allSelectedIds })
    }
  }

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ id: 'fullName', desc: false }])
      }
    }
  }, [table])

  const openModal = () => {
    const selectedRows = table.getSelectedRowModel().rows
    const allSelectedIds = [...new Set([...selectedRows.map(row => row.original.pma_id), ...selectedAgentId])]

    SetAllSelectedPma(allSelectedIds)

    if (allSelectedIds.length === 0) {
      toast.warning('Please select at least one agent to shortlist')

      return
    }

    setSuccessModalOpen(true)
  }

  console.log(selectedResponse)

  return (
    <Card>
      <div className='text-[#35C0ED] text-[16px] font-semibold pl-[20px] py-[20px]'>
        Best Practice For Shortlisting Managing Agents
      </div>
      <section className='flex justify-between items-center px-[20px] pb-[42px]'>
        <section className=' flex items-center space-x-4'>
          <div className='size-[150px]'>
            <Image src={pdfFrame} alt='image' />
          </div>
          <div className='w-[500px]'>
            <Typography variant='h2'>
              Tender Responses <i className='ri-information-2-line bg-white pl-[2px]'></i>
            </Typography>
            <Typography sx={{ color: '#262B43E5' }}>
              When you're ready to shortlist agents, simply select the ones you’d like to shortlist and click ‘Confirm
              Selected Agents’ at the bottom of the page. You can return to this page and shortlist additional agents at
              any time
            </Typography>
          </div>
        </section>
        <section className='flex flex-col py-[12px]'>
          <div className='pb-[12px]'>
            <Button variant='contained' className='!bg-[#35C0ED] w-[280px]'>
              <i className='ri-eye-line bg-white size-[18px] pr-[5px]'></i> View Results Online
            </Button>
          </div>
          <div>
            <Button
              variant='contained'
              className='!bg-[#35C0ED] w-[280px]'
              onClick={() => downloadMutation.mutate(tender_id)}
              disabled={downloadMutation.isPending}
            >
              <i className='ri-download-2-fill bg-white size-[18px] pr-[5px]'></i>
              <span className='pl-[5px]'>
                {downloadMutation.isPending ? 'Downloading...' : 'Download Tender Response'}
              </span>
            </Button>
          </div>
        </section>
      </section>
      <div className='overflow-x-auto pt-[50px]'>
        <table className={styles.table} style={{ width: '100%' }}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, idx) => (
                  <th
                    key={header.id}
                    style={{
                      width: header.column.columnDef.size,
                      minWidth: header.column.columnDef.size,
                      maxWidth: (header.column.columnDef.size ?? 100) * 1.9,
                      padding: '3x 1px',
                      textAlign: 'center',
                      borderRight: idx !== headerGroup.headers.length - 1 ? '1px solid #ccc' : 'none'
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={classnames({
                          'flex items-center': header.column.getIsSorted() || header.id === 'select',
                          'cursor-pointer select-none': header.column.getCanSort()
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {(header.id !== 'select' &&
                          {
                            asc: <ChevronRight fontSize='1.25rem' className='-rotate-90' />,
                            desc: <ChevronRight fontSize='1.25rem' className='rotate-90' />
                          }[header.column.getIsSorted() as 'asc' | 'desc']) ??
                          null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {table.getFilteredRowModel().rows.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  No data available
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      style={{
                        width: cell.column.columnDef.size,
                        minWidth: cell.column.columnDef.size,
                        maxWidth: (cell.column.columnDef.size ?? 120) * 1.9,
                        padding: '10px',
                        verticalAlign: 'top',
                        textAlign: 'center',
                        whiteSpace: 'normal',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      <AnchorTemporaryDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        drawerData={responceData?.data}
        successModalOpen={successModalOpen}
        setSuccessModalOpen={setSuccessModalOpen}
        handleConfirmSelected={handleConfirmSelected}
        DrawerStats={selectedResponse}
      />

      <ViewPmaFullProfile />

      <TablePagination
        rowsPerPageOptions={[7, 10, 25, { label: 'All', value: tableData.length }]}
        component='div'
        className='border-bs'
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
        onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
      />
      <section className='flex justify-end px-[22px] mt-6 mb-[60px]'>
        <Button variant='contained' className='bg-buttonPrimary w-[171px]' onClick={openModal}>
          Shorlisted
        </Button>
      </section>

      <SuccessModal
        open={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        message='Please confirm that you agree to share your contact information with the selected managing agent. They will receive your details and you will receive full information for direct communication'
        title='Confirm your selection'
        confirmButtonText='Confirm Selection'
        onClick={handleConfirmSelected}
        onConfirm={() => {
          setSuccessModalOpen(false)
          handleConfirmSelected()
        }}
        cancelButton={''}
      />
      <ShortListAgent open={shortlistedModalOpen} onClose={handleCloseAndNavigate} pmaSelectedID={allselectedpma} />
    </Card>
  )
}

export default KitchenSink
