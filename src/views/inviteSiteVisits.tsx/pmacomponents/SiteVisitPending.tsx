'use client'

import React, { useState } from 'react'

import { Box } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'

import { toast } from 'react-toastify'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import CommonTable from '@/common/CommonTable'
import SiteVisitsModal from '@/common/SiteVisitsModal'
import SuccessModal from '@/common/SucessModal'
import { formatDates } from '@/utils/dateFormater'
import CustomTooltip from '@/common/CustomTooltip'
import { pmaSideVisitAccept } from '@/services/pma_site_visit/pma_site_visit'

interface RescheduledCallType {
  rmcName: string
  yearBuilt: string | number | null
  blockName: string
  rmcEmail: string
  location: string
  rescheduledSlot: string
  rescheduledDate: string
  invite_id: number
  slot_ids: string
  status_label: string
  siteRechedual: any
  tenderId: any
}

const columnHelper = createColumnHelper<RescheduledCallType>()

const SiteVisitPending = ({ sitePendingData }: any) => {
  const [SuccessOpen, setSuccessOpen] = useState(false)
  const [siteVisitsModalOpen, setSiteVisitsModalOpen] = useState(false)
  const queryClient = useQueryClient()

  const [visitsSchedualInviteId, setVisitsSchedualInviteId] = useState<number>()

  console.log(visitsSchedualInviteId)

  const [selectedTenderId, setSelectedTenderId] = useState<string | number | null>(null)

  const tableData =
    sitePendingData?.data?.invites?.map((invite: any) => ({
      rmcName: invite.rmc_details?.rmc_name ?? '',
      tenderId: invite.tender_id ?? '',
      yearBuilt: invite.rmc_details?.year_built ?? '',
      blockName: invite.rmc_details?.block_name ?? '',
      rmcEmail: invite.rmc_details?.rmc_email ?? '',
      location: invite.rmc_details?.site_location ?? '',
      rescheduledSlot: invite.timeline ?? '',
      rescheduledDate: formatDates(invite.scheduled_date),
      invite_id: invite?.id,
      slot_ids: invite.slot?.id ?? '',
      status_label: invite.status_label ?? '',
      sitePendingData
    })) || []

  const rechedualRmcAgain = useMutation({
    mutationFn: ({ visitsSchedualInviteId, rmctender_id }: { visitsSchedualInviteId: any; rmctender_id: any }) =>
      pmaSideVisitAccept(visitsSchedualInviteId, rmctender_id),
    onSuccess: (data: any) => {
      toast.success(data?.message || 'Invite sent successfully!')
      setSuccessOpen(true)

      queryClient.invalidateQueries({
        queryKey: ['PmaData', 'pending']
      })
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to send invite'

      toast.error(errorMessage)
      console.error('Failed to send invite:', error)
    }
  })

  const handleAgainReschedual = () => {
    rechedualRmcAgain.mutate({
      visitsSchedualInviteId,
      rmctender_id: selectedTenderId
    })
  }

  const columns = [
    columnHelper.accessor('rmcName', {
      header: 'RMC Name',
      size: 150,
      enableSorting: true
    }),

    columnHelper.accessor('yearBuilt', {
      header: 'Year Built',
      size: 120,
      enableSorting: true
    }),

    columnHelper.accessor('blockName', {
      header: 'Block Name',
      size: 150,
      enableSorting: true
    }),

    columnHelper.accessor('rmcEmail', {
      header: 'Email',
      size: 150,
      enableSorting: true
    }),

    columnHelper.accessor('location', {
      header: 'Location',
      cell: info => <span className='text-[13px] whitespace-normal break-words'>{info.getValue()}</span>,
      size: 200,
      enableSorting: false
    }),

    columnHelper.accessor('rescheduledSlot', {
      header: 'Timeline',
      cell: info => <span className='text-[13px] whitespace-normal break-words'>{info.getValue()}</span>,

      size: 150,
      enableSorting: true
    }),

    columnHelper.accessor('rescheduledDate', {
      header: 'Updated Timeline',
      cell: () => <span className='text-[13px] whitespace-normal break-words'>--</span>,

      size: 150,
      enableSorting: true
    }),

    columnHelper.display({
      id: 'action',
      header: 'Action',
      cell: info => (
        <div className='flex gap-2'>
          <CustomTooltip text='Accept Pending Site Visit' position='left' align='left'>
            <span className='size-[33px] rounded-[5px] cursor-pointer bg-[#E8F9FE] text-[#35C0ED] flex justify-center items-center'>
              <i
                onClick={() => {
                  const row = info.row.original

                  setSelectedTenderId(row?.tenderId)
                  setVisitsSchedualInviteId(row.invite_id)
                  setSuccessOpen(true)
                }}
                className='ri-check-line'
              />
            </span>
          </CustomTooltip>

          <CustomTooltip text='Reschedule Pending Site Visit ' position='left' align='left'>
            <span className='size-[33px] rounded-[5px] cursor-pointer bg-[#E8F9FE] text-[#35C0ED] flex justify-center items-center'>
              <i
                onClick={() => {
                  const row = info.row.original

                  setVisitsSchedualInviteId(row?.invite_id)
                  setSelectedTenderId(row?.tenderId)
                  setSiteVisitsModalOpen(true)
                }}
                className='ri-edit-box-line'
              ></i>
            </span>
          </CustomTooltip>
        </div>
      ),
      size: 100,
      enableSorting: false
    })
  ]

  return (
    <Box className='bg-white overflow-y-auto'>
      <CommonTable
        data={tableData}
        columns={columns}
        pagination={{ pageIndex: 0, pageSize: 5 }}
        onPaginationChange={() => {}}
        pageSizeOptions={[5, 10, 25]}
        enableSorting={true}
      />

      {siteVisitsModalOpen && (
        <SiteVisitsModal
          open={siteVisitsModalOpen}
          setSiteVisitsModalOpen={setSiteVisitsModalOpen}
          onClose={() => setSiteVisitsModalOpen(false)}
          shorlistedPmas={undefined}
          siteVisitDate={tableData}
          types='PmaReschedual'
          tenderID={selectedTenderId}
          SideVisitsSchedualInviteId={visitsSchedualInviteId}
        />
      )}

      <SuccessModal
        open={SuccessOpen}
        onClose={() => setSuccessOpen(false)}
        onConfirm={handleAgainReschedual}
        cancelButton='Cancel'
        message='Success! You have Sent the new meeting time.'
        title='Reschedule Request Accepted!'
        confirmButtonText='Confirm'
        loading={rechedualRmcAgain.isPending}
      />
    </Box>
  )
}

export default SiteVisitPending
