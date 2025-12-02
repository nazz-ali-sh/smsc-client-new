'use client'

import React, { useState } from 'react'

import { Box } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'

import { useMutation } from '@tanstack/react-query'

import { toast } from 'react-toastify'

import CommonTable from '@/common/CommonTable'
import SuccessModal from '@/common/SucessModal'
import { rmcSideVisitAccept } from '@/services/site_visit_apis/site_visit_api'
import CustomTooltip from '@/common/CustomTooltip'
import { lazyModal } from '@/utils/dynamicLoading'

const SiteVisitsModal = lazyModal('@/common/SiteVisitsModal')

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
  region: any
  tenderId: any
  updated_timeline?: string
}

const columnHelper = createColumnHelper<RescheduledCallType>()

const SiteVisitReschedule = ({ siteRechedual }: any) => {
  const [SuccessOpen, setSuccessOpen] = useState(false)
  const [siteVisitsModalOpen, setSiteVisitsModalOpen] = useState(false)
  const [visitsSchedualInviteId, setVisitsSchedualInviteId] = useState<number>()
  const [selectedTenderId, setSelectedTenderId] = useState<string | number | null>(null)

  const tableData =
    siteRechedual?.data?.invites?.map((invite: any) => ({
      rmcName: invite.rmc_details?.rmc_name ?? '',
      tenderId: invite.tender_id ?? '',
      yearBuilt: invite.rmc_details?.year_built ?? '',
      blockName: invite.rmc_details?.block_name ?? '',
      region: invite.rmc_details?.region ?? '',
      rmcEmail: invite.rmc_details?.rmc_email ?? '',
      location: invite.rmc_details?.site_location ?? '',
      rescheduledSlot: invite.timeline ?? '',
      updated_timeline: invite?.updated_timeline,
      invite_id: invite?.id,
      slot_ids: invite.slot?.id ?? '',
      status_label: invite.status_label ?? '',
      siteRechedual
    })) || []

  const reschedual_inviteId = siteRechedual?.data?.invites?.[0]?.id ?? null

  const rechedualRmcAgain = useMutation({
    mutationFn: ({ invite_id, rmctender_id }: { invite_id: number; rmctender_id: any }) =>
      rmcSideVisitAccept(invite_id, rmctender_id),
    onSuccess: (data: any) => {
      toast.success(data?.message || 'Invite sent successfully!')
      setSuccessOpen(false)
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to send invite'

      setSuccessOpen(false)
      toast.error(errorMessage)
      console.error('Failed to send invite:', error)
    }
  })

  const handleAgainReschedual = () => {
    rechedualRmcAgain.mutate({
      invite_id: reschedual_inviteId,
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

    columnHelper.accessor('region', {
      header: 'Region',
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
      cell: info => <span className='text-[13px] break-words whitespace-normal'>{info.getValue()}</span>,
      size: 200,
      enableSorting: false
    }),

    columnHelper.accessor('rescheduledSlot', {
      header: 'Timeline',
      size: 150,
      enableSorting: true,
      cell: info => <span className='whitespace-normal break-words text-[13px]'>{info.getValue()}</span>
    }),

    columnHelper.accessor('updated_timeline', {
      header: 'Updated Timeline',
      size: 150,
      enableSorting: true,
      cell: info => <span className='whitespace-normal break-words text-[13px]'>{info.getValue()}</span>
    }),

    columnHelper.display({
      id: 'action',
      header: 'Action',
      size: 100,
      enableSorting: false,
      cell: info => (
        <div className='flex gap-2'>
          <CustomTooltip text='Accept Rescheduled Site Visit' position='left' align='left'>
            <span className='size-[33px] rounded-[5px] cursor-pointer bg-[#E8F9FE] text-[#35C0ED] flex justify-center items-center'>
              <i
                onClick={() => {
                  const row = info.row.original

                  setSelectedTenderId(row.tenderId)
                  setSuccessOpen(true)
                }}
                className='ri-check-line'
              />
            </span>
          </CustomTooltip>

          <CustomTooltip text='Reschedule Site Visit' position='left' align='left'>
            <span className='size-[33px] rounded-[5px] cursor-pointer bg-[#E8F9FE] text-[#35C0ED] flex justify-center items-center'>
              <i
                onClick={() => {
                  const row = info.row.original

                  setVisitsSchedualInviteId(row.invite_id)
                  setSelectedTenderId(row.tenderId)
                  setSiteVisitsModalOpen(true)
                }}
                className='ri-edit-box-line'
              />
            </span>
          </CustomTooltip>
        </div>
      )
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
          setSiteVisitsModalOpen={setSiteVisitsModalOpen}
          open={siteVisitsModalOpen}
          onClose={() => setSiteVisitsModalOpen(false)}
          Reschedual={tableData}
          tenderID={selectedTenderId}
          SideVisitsSchedualInviteId={visitsSchedualInviteId}
          types='PmaReschedual'
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
      />
    </Box>
  )
}

export default SiteVisitReschedule
