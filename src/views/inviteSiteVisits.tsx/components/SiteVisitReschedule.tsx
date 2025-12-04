'use client'

import React, { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { Box } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'

import { useMutation } from '@tanstack/react-query'

import { useSelector } from 'react-redux'

import { toast } from 'react-toastify'

import CommonTable from '@/common/CommonTable'
import RejectModal from '@/common/RejectModal'
import SiteVisitsModal from '@/common/SiteVisitsModal'
import SuccessModal from '@/common/SucessModal'
import { rmcSideVisitAccept } from '@/services/site_visit_apis/site_visit_api'
import { formatDates } from '@/utils/dateFormater'
import CustomTooltip from '@/common/CustomTooltip'

interface RescheduledCallType {
  pmaId: string
  yearTrading: string
  unitsManaged: number
  quotations: string
  videoCallLink: string
  timeline: string
  rescheduled: string
  siteRechedual: any
  invite_id: number
  slot_ids: string
  location: any
  invited_at: string
}

const columnHelper = createColumnHelper<RescheduledCallType>()

const SiteVisitReschedule = ({ siteRechedual }: any) => {
  const searchParams = useSearchParams()

  const params = {
    tab: searchParams.get('tab'),
    id: searchParams.get('id')
  }

  // const tabParam = searchParams.get('tab')
  // const id = searchParams.get('id')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [SuccessOpen, setSuccessOpen] = useState(false)
  const [siteVisitsModalOpen, setSiteVisitsModalOpen] = useState(false)
  const [visitsSchedualInviteId, setVisitsSchedualInviteId] = useState<number>()
  const [selectedPmaName, setSelectedPmaName] = useState<string | number | null>(null)

  const tender_id = useSelector((state: any) => state?.rmcOnboarding?.tenderId)

  console.log(params?.tab)
  useEffect(() => {
    if (params?.tab === 'rescheduled') {
      setSiteVisitsModalOpen(true)
    }
  }, [params?.tab])

  const tableData: RescheduledCallType[] =
    siteRechedual?.data?.invites?.map(
      (invite: {
        pma_name: any
        id: number
        pma_company: { trading_years: { toString: () => any }; total_units: any }
        quotation: { total_quote_inc_vat: any }
        zoom_meeting_link: any
        slot: { name: any; id: any }
        status_label: any
        location: any
        invited_at: any
      }) => ({
        pmaId: invite.pma_name,
        invite_id: invite?.id,
        yearTrading: invite.pma_company?.trading_years?.toString() ?? '',
        unitsManaged: invite.pma_company?.total_units ?? 0,
        quotations: invite.quotation?.total_quote_inc_vat ?? '',
        videoCallLink: invite.location ?? '',
        timeline: invite.slot?.name ?? '',
        slot_ids: invite.slot?.id ?? '',
        rescheduled: invite.status_label ?? '',
        invited_at: formatDates(invite?.invited_at) ?? '',
        siteRechedual
      })
    ) || []

  useEffect(() => {
    if (visitsSchedualInviteId === undefined || visitsSchedualInviteId === null) {
      setSelectedPmaName(null)

      return
    }

    const matched = tableData.find(row => Number(row.invite_id) === Number(visitsSchedualInviteId))

    if (matched) {
      setSelectedPmaName(matched.pmaId)
    } else {
      setSelectedPmaName(null)
    }
  }, [visitsSchedualInviteId, tableData])

  const reschedual_inviteId = siteRechedual?.data?.invites?.[0]?.id ?? null

  const rechedualRmcAgain = useMutation({
    mutationFn: ({ invite_id, rmctender_id }: { invite_id: number; rmctender_id: number }) =>
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
      rmctender_id: tender_id
    })
  }

  const columns = [
    columnHelper.accessor('pmaId', {
      header: 'PMA Name',
      cell: info => info.getValue(),
      size: 150,
      enableSorting: true
    }),
    columnHelper.accessor('yearTrading', {
      header: 'Year Trading',
      cell: info => info.getValue(),
      size: 120,
      enableSorting: true
    }),
    columnHelper.accessor('unitsManaged', {
      header: 'Units Managed',
      cell: info => info.getValue(),
      size: 150,
      enableSorting: true
    }),
    columnHelper.accessor('quotations', {
      header: 'Quotations',
      cell: info => info.getValue(),
      size: 150,
      enableSorting: true
    }),
    columnHelper.accessor('videoCallLink', {
      header: 'Location',
      cell: info => (
        <a href={info.getValue()} className='text-[13px] '>
          {info.getValue()}
        </a>
      ),
      size: 200,
      enableSorting: false
    }),
    columnHelper.accessor('timeline', {
      header: 'Rescheduled Slot',
      cell: info => info.getValue(),
      size: 150,
      enableSorting: true
    }),

    columnHelper.accessor('invited_at', {
      header: 'Rescheduled Date',
      cell: info => info.getValue(),
      size: 150,
      enableSorting: true
    }),

    columnHelper.display({
      id: 'action',
      header: 'Action',
      cell: info => (
        <div className='flex gap-2'>
          <CustomTooltip text='Accept Rescheduled Site Visit' position='left' align='left'>
            <span className='size-[33px] rounded-[5px] cursor-pointer bg-[#E8F9FE] text-[#35C0ED] flex justify-center items-center'>
              <i onClick={() => setSuccessOpen(true)} className='ri-check-line ' />
            </span>
          </CustomTooltip>

          <CustomTooltip text='Reject Rescheduled Site Visit' position='left' align='left'>
            <span className='size-[33px] rounded-[5px] cursor-pointer bg-[#F5DADB] text-[#DE481A] flex justify-center items-center'>
              <i
                onClick={() => {
                  const row = info.row.original

                  setVisitsSchedualInviteId(row.invite_id)
                  setConfirmOpen(true)
                }}
                className='ri-close-line '
              />
            </span>
          </CustomTooltip>

          <CustomTooltip text='Reschedule Site Visit' position='left' align='left'>
            <span className='size-[33px] rounded-[5px] cursor-pointer bg-[#E8F9FE] text-[#35C0ED] flex justify-center items-center'>
              <i
                onClick={() => {
                  const row = info.row.original

                  setVisitsSchedualInviteId(row.invite_id)
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

      <RejectModal
        open={confirmOpen}
        setConfirmOpen={setConfirmOpen}
        title='Rescheduled Site Visit Rejected !'
        description={`You have successfully rejected call rescheduled by ${selectedPmaName}.Please provide a brief reason for the cancellation in the box below. This explanation will be sent to the Managing Agent`}
        onClose={() => setConfirmOpen(false)}
        onConfirm={function (): void {}}
        types='SiteVisits'
        SideVisitsSchedualInviteId={visitsSchedualInviteId}
        sitePendingData={undefined}
        VideoCallInviteId={undefined}
      />

      <SiteVisitsModal
        setSiteVisitsModalOpen={setSiteVisitsModalOpen}
        open={siteVisitsModalOpen}
        onClose={() => setSiteVisitsModalOpen(false)}
        shorlistedPmas={undefined}
        Reschedual={tableData}
        SideVisitsSchedualInviteId={visitsSchedualInviteId || params?.id}
        types='Reschedual'
        siteVisitDate={undefined}
        VideoCallInviteId={undefined}
        completedShorlistedPmas={undefined}
      />

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
