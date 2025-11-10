'use client'

import { useEffect, useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { Card, TablePagination, Checkbox, Typography } from '@mui/material'
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
import CustomButton from '@/common/CustomButton'
import CommonModal from '@/common/CommonModal'
import { calculateTimeLeft } from '@/utils/dateFormater'
import { useDashboardData } from '@/hooks/useDashboardData'
import CustomLoader from '@/common/CustomLoader'

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

  const router = useRouter()
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const [shortlistedModalOpen, setShortListedSuccessModalOpen] = useState(false)
  const [shortlistedResponce, setshortlistedResponce] = useState('')
  const [bestPracticesModalOpen, setBestPracticesModalOpen] = useState(false)
  const [tenderResponsesModalOpen, setTenderResponsesModalOpen] = useState(false)
  const [shortlistWarningModal, setShortlistWarningModal] = useState(false)
  const [isViewingResponse, setIsViewingResponse] = useState(false)

  const tender_id = useSelector((state: any) => state?.rmcOnboarding?.tenderId)

  const { invalidateCache } = useDashboardData()

  const [selectedResponse, setSelectedResponse] = useState<ApiResponseItem | null>(null)
  const [quoteModelOpen, setQuoteModalOpen] = useState(false)

  const { data: responceData, isLoading: isTableLoading } = useQuery<TenderResponse, Error>({
    queryKey: ['tendeResponce', tender_id],
    queryFn: () => tenderResponce(Number(tender_id)),
    enabled: !!tender_id
  })

  const tenderStatus = responceData?.data?.tender_status

  useEffect(() => {
    if (tenderStatus === 'active') {
      setShortlistWarningModal(false)
    }
  }, [tenderStatus])

  const shortlistMutation = useMutation({
    mutationFn: ({ tender_id, pma_user_ids }: { tender_id: number; pma_user_ids: number[] }) =>
      ShortlistedPma(tender_id, pma_user_ids),
    onSuccess: data => {
      const expiryAt = data?.data?.expiry_at || ''

      invalidateCache()
      setshortlistedResponce(expiryAt)
      setShortListedSuccessModalOpen(true)
      table.resetRowSelection()
    },
    onError: error => {
      console.error('Error shortlisting agents:', error)
    }
  })

  const fianlExpireDate = calculateTimeLeft(shortlistedResponce)

  const handleCloseAndNavigate = () => {
    setShortListedSuccessModalOpen(false)
    router.push('/shortlist-agent')
  }

  const downloadMutation = useMutation<Blob, Error, { id: number; open?: boolean }>({
    mutationFn: async ({ id }) => {
      return await downloadBlindTenderPdf(id)
    },
    onSuccess: (data, variables) => {
      const blob = new Blob([data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)

      if (variables.open) {
        window.open(url, '_blank')
      } else {
        const link = document.createElement('a')

        link.href = url
        link.download = `tender_${variables.id}.pdf`
        link.click()
      }

      window.URL.revokeObjectURL(url)
    },
    onError: error => {
      console.error('Download failed:', error)
    }
  })

  useEffect(() => {
    if (responceData?.data?.responses) {
      const mappedData: DataType[] = responceData?.data?.responses?.map((item: ApiResponseItem) => ({
        id: item?.response_id,
        pma_id: item?.pma_user_id,
        avatar: item?.company_name?.substring(0, 2)?.toUpperCase(),
        fullName: item?.company_name,
        submittedDate: item?.response_details?.submitted_at
          ? new Date(item?.response_details?.submitted_at)?.toLocaleDateString('en-GB')
          : '0',
        quotation: item?.quotation?.total_management_fees?.toLocaleString('en-US', {
          style: 'currency',
          currency: 'GBP'
        }),
        location: item?.location?.county || '0',
        NoOfUnits: item?.company_metrics?.total_units_managed ?? item?.quotation?.per_unit_equivalent_inc_vat ?? '0',
        googleReview: item?.reviews?.google?.rating || 0,
        tradingYears: item?.company_metrics?.trading_years ?? '0',
        Questionaire: 'View Agents Response & Quote'
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
              sx={{
                color: '#26C6F9',
                '&.Mui-checked': { color: '#26C6F9' },
                '&.MuiCheckbox-indeterminate': { color: '#26C6F9' }
              }}
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className='flex items-center'>
            <Checkbox
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              indeterminate={row.getIsSomeSelected()}
              onChange={e => {
                if (tenderStatus === 'active') {
                  e.preventDefault()

                  setShortlistWarningModal(true)

                  return
                }

                const isChecked = e.target.checked

                row.toggleSelected(isChecked)
              }}
              sx={{
                color: '#26C6F9',
                '&.Mui-checked': { color: '#26C6F9' },
                '&.MuiCheckbox-indeterminate': { color: '#26C6F9' }
              }}
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
        size: 200,
        enableSorting: false,
        enableColumnFilter: false
      }),
      columnHelper.accessor('quotation', {
        cell: info => info.getValue() || 'N/A',
        header: () => (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            Quote
            <i
              className='ri-information-line cursor-pointer text-[18px] text-black transition-colors'
              onClick={() => setQuoteModalOpen(true)}
            ></i>
          </div>
        ),
        size: 100,
        enableSorting: false,
        enableColumnFilter: false
      }),
      columnHelper.accessor('location', {
        cell: info => info.getValue() || 'N/A',
        header: 'Location',
        size: 150,
        enableSorting: false,
        enableColumnFilter: false
      }),
      columnHelper.accessor('NoOfUnits', {
        cell: info => info.getValue() || 'N/A',
        header: 'Total Units Managed',
        size: 80,
        enableSorting: false,
        enableColumnFilter: false
      }),

      columnHelper.accessor('tradingYears', {
        cell: info => info.getValue() || 'N/A',
        header: 'Years Trading',
        size: 100,
        enableSorting: false,
        enableColumnFilter: false
      }),
      columnHelper.accessor('Questionaire', {
        cell: ({ row }) => (
          <div className='w-full h-full max-w-[190px] flex justify-center items-center'>
            <CustomButton
              variant='contained'
              disabled={isTableLoading || !responceData?.data?.responses}
              onClick={() => {
                if (!responceData?.data?.responses?.length) return

                setIsViewingResponse(true)
                setDrawerOpen(true)
                setSelectedAgentId([row.original.pma_id])
                SetAllSelectedPma([row.original.pma_id])

                const responseObj = responceData.data.responses.find(
                  (item: { pma_user_id: number | string }) => Number(item.pma_user_id) === Number(row.original.pma_id)
                )

                setSelectedResponse(responseObj || null)
              }}
            >
              {row.original.Questionaire}
            </CustomButton>
          </div>
        ),
        header: '',
        enableSorting: false,
        enableColumnFilter: false,
        size: 150
      })
    ],
    [responceData, isTableLoading]
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
    const selectedRows = table?.getSelectedRowModel().rows
    const pma_user_ids = selectedRows?.map(row => row?.original?.pma_id)

    const allSelectedIds = [...new Set([...pma_user_ids, ...selectedAgentId])]

    if (allSelectedIds.length === 0) {
      toast.warning('Please select at least one agent to shortlist')

      return
    }

    if (tender_id) {
      shortlistMutation?.mutate({ tender_id: Number(tender_id), pma_user_ids: allSelectedIds })
    }
  }

  useEffect(() => {
    if (table?.getState().columnFilters[0]?.id === 'fullName') {
      if (table?.getState().sorting[0]?.id !== 'fullName') {
        table?.setSorting([{ id: 'fullName', desc: false }])
      }
    }
  }, [table])

  const openModal = () => {
    const selectedRows = table?.getSelectedRowModel().rows
    const allSelectedIds = [...new Set([...selectedRows?.map(row => row.original.pma_id), ...selectedAgentId])]

    SetAllSelectedPma(allSelectedIds)

    if (allSelectedIds?.length === 0) {
      toast.warning('Please select at least one agent to shortlist')

      return
    }

    setSuccessModalOpen(true)
  }

  return (
    <>
      {isTableLoading ? (
        <CustomLoader size='large' />
      ) : (
        <Card>
          <div className='text-[#35C0ED] text-[16px] font-semibold pl-[20px] py-[20px] flex items-center gap-2'>
            Best Practice For Shortlisting Managing Agents
            <i
              className='ri-information-line cursor-pointer text-[#35C0ED] hover:text-[#26A6D9] transition-colors'
              onClick={() => setBestPracticesModalOpen(true)}
            ></i>
          </div>
          <section className='flex justify-between items-start px-[20px] pb-[42px]'>
            <section className='flex items-start space-x-4'>
              <div className='mt-[8px] size-[150px]'>
                <Image src={pdfFrame} alt='image' />
              </div>

              <div className='w-[800px] mt-[15px]'>
                <Typography variant='h3' className='flex items-center font-bold gap-2'>
                  Tender Responses
                  <i
                    className='ri-information-line cursor-pointer text-black transition-colors'
                    onClick={() => setTenderResponsesModalOpen(true)}
                  ></i>
                </Typography>

                <Typography sx={{ color: '#262B43E5', textAlign: 'justify', mb: 1.5 }}>
                  When you’re ready, select the agents you’d like to shortlist and click ‘Confirm Selected Agents’ at
                  the bottom of the page. You can return and shortlist additional agents at any time.
                </Typography>

                <Typography sx={{ color: '#262B43E5', textAlign: 'justify', mb: 1.5 }}>
                  Once shortlisted, you’ll gain access to each managing agent’s full details, including their name and
                  contact information.
                </Typography>

                <Typography sx={{ color: '#262B43E5', textAlign: 'justify', mb: 1.5 }}>
                  Save My Service Charge’s blind tender process is designed for RMC directors. It lets you assess agent
                  responses objectively, without marketing influence, demonstrating due diligence and transparency in
                  your role.
                </Typography>

                <Typography sx={{ color: '#262B43E5', textAlign: 'justify', mb: 1.5 }}>
                  This process proves you’ve compared agents fairly, made an informed decision, and represented your
                  residents honestly and thoroughly. Once the tender is complete, you can download a full report
                  detailing your tender journey - which can also be shared with other residents as clear evidence of the
                  process and decision made.
                </Typography>
              </div>
            </section>

            <section className='flex flex-col py-[12px] mt-[15px]'>
              <div className='pb-[12px]'>
                <CustomButton
                  sx={{ width: '100%' }}
                  onClick={() => downloadMutation.mutate({ id: tender_id, open: true })}
                >
                  View Tender Report Online
                </CustomButton>
              </div>
              <div>
                <CustomButton sx={{ width: '100%' }} onClick={() => downloadMutation.mutate({ id: tender_id })}>
                  Download Tender Report
                </CustomButton>
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
            onClose={() => {
              setDrawerOpen(false)
              setIsViewingResponse(false)
            }}
            drawerData={responceData?.data}
            successModalOpen={successModalOpen}
            setSuccessModalOpen={setSuccessModalOpen}
            handleConfirmSelected={handleConfirmSelected}
            DrawerStats={selectedResponse}
          />

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
            <CustomButton
              variant='contained'
              onClick={openModal}
              disabled={
                isViewingResponse || table?.getSelectedRowModel().rows?.length === 0 || tenderStatus !== 'active'
              }
            >
              Confirm Selection
            </CustomButton>
          </section>

          <SuccessModal
            open={successModalOpen}
            onClose={() => setSuccessModalOpen(false)}
            message='By confirming, you agree to share your contact details with the managing agents you’ve shortlisted.
            You’ll receive their details straight away so you can review them, but your own contact information won’t be shared for 3 days, unless you reach out first. This gives you time to compare agents without receiving immediate sales calls.
            You can return at any time to shortlist more agents if you wish.'
            title='Confirm Your Selection'
            confirmButtonText='Confirm Selection'
            onClick={handleConfirmSelected}
            onConfirm={() => {
              setSuccessModalOpen(false)
              handleConfirmSelected()
            }}
            cancelButton={''}
          />
          <ShortListAgent
            open={shortlistedModalOpen}
            onClose={handleCloseAndNavigate}
            pmaSelectedID={allselectedpma}
            fianlExpireDate={fianlExpireDate}
            navigateOnClose={true}
          />

          <CommonModal
            isOpen={shortlistWarningModal}
            handleClose={() => setShortlistWarningModal(false)}
            header='You Can’t Shortlist Just Yet'
            headerSx={{ color: '#1F4E8D', fontSize: '26px', fontWeight: 600 }}
            isBorder
            maxWidth='sm'
          >
            <div className='space-y-4'>
              <Typography className='text-[#696969] text-sm mt-6'>
                Your tender is still open, so shortlisting isn’t available at the moment.
              </Typography>
              <div>
                <Typography className='text-[#696969] mb-3 text-sm'>
                  You can view and compare managing agent responses now, but shortlisting will only be possible once the
                  tender has closed. When it opens, you’ll gain access to each agent’s name and contact details, and
                  you’ll be able to message them directly through the platform.
                </Typography>
              </div>
            </div>
          </CommonModal>

          <CommonModal
            isOpen={bestPracticesModalOpen}
            handleClose={() => setBestPracticesModalOpen(false)}
            header='Best Practices for Shortlisting Managing Agents'
            maxWidth='md'
          >
            <div className='space-y-4'>
              <Typography variant='body1' className='text-[#696969] text-xs leading-[22px]'>
                Choosing the right managing agent is crucial to the success and smooth operation of your block. Our
                “blind” shortlisting process creates a level playing field to ensure you select the agent that best
                suits your needs based on their response, rather than being influenced by brand size or marketing.
              </Typography>

              <div className='mt-3'>
                <Typography variant='h6' className='font-semibold text-[#696969] mb-2 '>
                  Evaluate Replies Carefully:
                </Typography>
                <Typography variant='body2' className='text-[#696969] text-xs leading-[22px] mb-3'>
                  Focus on each agent’s tailored response. Consider how they addressed your specific needs and the
                  clarity of their proposal. Do they understand your block's requirements? Do their suggestions align
                  with your expectations?
                </Typography>
              </div>

              <div className='mt-3'>
                <Typography variant='h6' className='font-semibold text-[#696969] leading-[22px] mb-2 '>
                  Review the Quote Breakdown:
                </Typography>
                <Typography variant='body2' className='text-[#696969] text-xs leading-[22px] mb-3'>
                  Compare the costs line-by-line. Pay attention not only to the overall price but also to the breakdown
                  of each line item. This will help you identify where each agent prioritizes spending.
                </Typography>
              </div>

              <div className='mt-3'>
                <Typography variant='h6' className='font-semibold text-[#696969] leading-[22px] mb-2'>
                  Consider Block Size and Service Fit:
                </Typography>
                <Typography variant='body2' className='text-[#696969] text-xs leading-[22px] mb-3'>
                  Larger agents may bring more experience with big portfolios, but smaller agents might provide more
                  personalized service. Think about what is more important for your block: being a valued client for a
                  smaller agent or having the backing of a larger firm.
                </Typography>
              </div>

              <Typography variant='body1' className='text-[#696969] text-xs leading-[22px]'>
                Once you have selected the agents you wish to shortlist, you will receive the details of your selected
                agents, and they will be given your information to start the vetting stage of the process.
              </Typography>

              <Typography variant='body1' className='text-[#696969] text-xs leading-[22px]'>
                SMSC are experts in running tenders and this approach ensures you have made an unbiased decision based
                on the information provided, without external sales pressures influencing your choice.
              </Typography>
            </div>
          </CommonModal>

          <CommonModal
            isOpen={tenderResponsesModalOpen}
            handleClose={() => setTenderResponsesModalOpen(false)}
            header='What Your Report Contains & How To Use It'
            maxWidth='md'
          >
            <div className='space-y-4'>
              <Typography variant='body1' className='text-[#696969] text-xs mt-3 leading-[22px]'>
                This report compiles responses and best offers from managing agents interested in managing your block.
                It's designed to help you easily compare and shortlist the most suitable agents for your property.
              </Typography>

              <div>
                <Typography variant='h6' className='font-semibold text-[#696969] mb-1 mt-2'>
                  Overview:
                </Typography>
                <Typography variant='body2' className='text-[#696969] mb-3 leading-[22px]'>
                  A summary showing each agent's location, company size, and proposed overall management fee for a
                  high-level comparison.
                </Typography>
              </div>

              <div>
                <Typography variant='h6' className='font-semibold text-[#696969] mb-1 mt-4'>
                  Quote Breakdown:
                </Typography>
                <Typography variant='body2' className='text-[#696969] mb-3 text-xs leading-[22px]'>
                  A table displaying what each agent would charge for each line item in the service charge budget,
                  allowing you to see cost differences and understand how each agent structures their pricing.
                </Typography>
              </div>

              <div>
                <Typography variant='h6' className='font-semibold text-[#696969] mb-2'>
                  Agent Responses:
                </Typography>
                <Typography variant='body2' className='text-[#696969] mb-3 text-xs leading-[22px]'>
                  Each agent provides a 250-word company bio covering their identity, experience, and suitability, along
                  with a tailored response to your specific tender, outlining their approach to managing your block.
                </Typography>
              </div>
              <div className='mt-6'>
                <Typography variant='body1' className='text-[#696969] leading-[22px] text-xs '>
                  We recommend selecting at least two agents for your shortlist. After reviewing the report and making
                  your selection, you'll receive the agents' contact details, and they'll receive your details to begin
                  the vetting process. You can add more managing agents to your shortlist at any time.
                </Typography>
              </div>
            </div>
          </CommonModal>

          <CommonModal
            isOpen={quoteModelOpen}
            handleClose={() => setQuoteModalOpen(false)}
            header='Be Sure to Compare Quotes Carefully'
            maxWidth='md'
          >
            <div className='space-y-4'>
              <Typography variant='body1' className='text-[#696969] text-xs mt-3 leading-[22px]'>
                Save My Service Charge only compares quotes for the fixed costs in your service charge budget.
              </Typography>

              <div>
                <Typography variant='body2' className='text-[#696969] mb-3 leading-[22px]'>
                  <span style={{ fontWeight: 600 }}>Variable contracts</span> - such as cleaning, gardening, energy, or
                  general repair funds - can be transferred to your new managing agent and will usually remain the same
                  unless you ask the new agent to:
                </Typography>

                <Typography variant='body2' className='text-[#696969] mb-3 leading-[22px]'>
                  re-tender those contracts, or a summary showing each agent's location, company size, and proposed
                  overall management fee for a high-level comparison.
                </Typography>

                <Typography variant='body2' className='text-[#696969] mb-3 leading-[22px]'>
                  review your existing contractor service level agreements (for example, the number of visits, time
                  spent on site, or scope of work) to help reduce costs.
                </Typography>
              </div>

              <div className='mt-6'>
                <Typography variant='body1' className='text-[#696969] leading-[22px] text-xs'>
                  <span style={{ fontWeight: 600 }}>The fixed costs</span> we compare are standard across all service
                  charge budgets and offer the clearest way to assess value when selecting your new managing agent. For
                  more guidance, please read the FAQ in your portal or download our factsheet on comparing managing
                  agent quotes at savemyservicecharge.co.uk.
                </Typography>
              </div>
            </div>
          </CommonModal>
        </Card>
      )}
    </>
  )
}

export default KitchenSink
