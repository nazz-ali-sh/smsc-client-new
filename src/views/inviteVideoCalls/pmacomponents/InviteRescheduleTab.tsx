'use client'

import React, { useState } from 'react'

import { Box } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'react-toastify'

import CommonTable from '@/common/CommonTable'

import SuccessModal from '@/common/SucessModal'
import VideosCallsModal from '@/common/VideosCallsModal'
import CustomTooltip from '@/common/CustomTooltip'
import { pmaVideoCallAccept } from '@/services/pma_video_call/pma_video_call'

interface RescheduledCallType {
  rmcName: string
  yearBuilt: string | number | null
  blockName: string
  rmcEmail: string
  zoom_meeting_link: string
  timeline: string
  updated_timeline: string
  invite_id: number
  slot_ids: string
  status_label: string
  siteRechedual: any
  region: any
  tenderId: any
}

const columnHelper = createColumnHelper<RescheduledCallType>()

const InviteRescheduleTab = ({ rescheduaInviteData }: any) => {
  const [SuccessOpen, setSuccessOpen] = useState(false)
  const [visitsSchedualInviteId, setVisitsSchedualInviteId] = useState<number | undefined>(undefined)
  const [onlineCallsModalOpen, setOnlineCallsModalOpen] = useState(false)
  const [selectedTenderId, setSelectedTenderId] = useState<string | number | null>(null)
  const queryClient = useQueryClient()

  const tableData =
    rescheduaInviteData?.data?.invites?.map((invite: any) => ({
      rmcName: invite.rmc_details?.rmc_name ?? '',
      tenderId: invite.tender_id ?? '',
      yearBuilt: invite.rmc_details?.year_built ?? '',
      blockName: invite.rmc_details?.block_name ?? '',
      region: invite.rmc_details?.region ?? '',
      rmcEmail: invite.rmc_details?.rmc_email ?? '',
      zoom_meeting_link: invite?.zoom_meeting_link ?? '',
      timeline: invite.timeline ?? '',
      updated_timeline: invite?.updated_timeline,
      invite_id: invite?.id,
      slot_ids: invite.slot?.id ?? '',
      status_label: invite.status_label ?? '',
      rescheduaInviteData
    })) || []

  const rechedualRmcAgain = useMutation({
    mutationFn: ({ visitsSchedualInviteId, rmctender_id }: { visitsSchedualInviteId: any; rmctender_id: any }) =>
      pmaVideoCallAccept(visitsSchedualInviteId, rmctender_id),
    onSuccess: (data: any) => {
      toast.success(data?.message || 'Invite sent successfully!')
      setSuccessOpen(true)

      queryClient.invalidateQueries({ queryKey: ['pmaVideoCallData'] })
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to send invite'

      toast.error(errorMessage)
      console.error('Failed to send invite:', error)
    }
  })

  const handlePmaAccepted = () => {
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

    columnHelper.accessor('zoom_meeting_link', {
      header: 'Video Call Link',
      cell: info => (
        <a href={info.getValue()} className='text-[13px] font-bold text-[#8BD6F4]'>
          Join Meeting
        </a>
      ),
      size: 200,
      enableSorting: false
    }),

    columnHelper.accessor('timeline', {
      header: 'Timeline',
      cell: info => <span className='text-[13px] whitespace-normal break-words'>{info.getValue()}</span>,
      size: 150,

      enableSorting: true
    }),

    columnHelper.accessor('updated_timeline', {
      header: 'Updated Timeline',
      cell: info => <span className='text-[13px] whitespace-normal break-words'>{info.getValue()}</span>,
      size: 150,
      enableSorting: true
    }),

    columnHelper.display({
      id: 'action',
      header: 'Action',
      size: 100,
      enableSorting: false,
      cell: info => (
        <div className='flex gap-2'>
          <CustomTooltip text='Accept Rescheduled Video Call' position='left' align='left'>
            <span className='size-[33px] rounded-[5px] cursor-pointer bg-[#E8F9FE] text-[#35C0ED] flex justify-center items-center'>
              <i
                onClick={() => {
                  const row = info.row.original

                  setSelectedTenderId(row.tenderId)
                  setVisitsSchedualInviteId(row.invite_id)
                  setSuccessOpen(true)
                }}
                className='ri-check-line'
              />
            </span>
          </CustomTooltip>

          <CustomTooltip text='Reschedule Video Call' position='left' align='left'>
            <span className='size-[33px] rounded-[5px] cursor-pointer bg-[#E8F9FE] text-[#35C0ED] flex justify-center items-center'>
              <i
                onClick={() => {
                  const row = info.row.original

                  setVisitsSchedualInviteId(row.invite_id)
                  setSelectedTenderId(row.tenderId)
                  setOnlineCallsModalOpen(true)
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

      <VideosCallsModal
        open={onlineCallsModalOpen}
        VideoCallInviteId={visitsSchedualInviteId}
        onClose={() => setOnlineCallsModalOpen(false)}
        shorlistedPmas={null}
        tenderID={selectedTenderId}
        types='pmavideoCallReschedual'
      />

      <SuccessModal
        open={SuccessOpen}
        onClose={() => setSuccessOpen(false)}
        onConfirm={handlePmaAccepted}
        cancelButton='Cancel'
        message='Success! You have Sent the new meeting time.'
        title='Reschedule Request Accepted!'
        confirmButtonText='Confirm'
        loading={rechedualRmcAgain.isPending}
      />
    </Box>
  )
}

export default InviteRescheduleTab
