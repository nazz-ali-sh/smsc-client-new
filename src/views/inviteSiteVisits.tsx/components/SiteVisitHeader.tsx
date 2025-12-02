'use client'

import React, { useState } from 'react'

import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

import SiteVisitsModal from '@/common/SiteVisitsModal'
import CustomButton from '@/common/CustomButton'
import CustomTooltip from '@/common/CustomTooltip'
import { useShortlistedPmas } from '@/hooks/useShortlistedPmasData'

interface InviteCallHeaderProps {
  title?: string
  actionButton?: React.ReactNode
  videoCallmodalData: any
}

const SiteVisitHeader = ({ title = 'Video Calls', actionButton }: InviteCallHeaderProps) => {
  const [siteVisitsModalOpen, setSiteVisitsModalOpen] = useState(false)

  const isAppointmentCompleted = useSelector((state: any) => state?.siteVisitAndCallStats?.isAppointmentCompleted)
  const isShortlistedCompleted = useSelector((state: any) => state?.siteVisitAndCallStats?.isShortlistedCompleted)

  const { data: finalShortListedResponce } = useShortlistedPmas()

  const isButtonDisabled = !isShortlistedCompleted || isAppointmentCompleted

  const tooltipText = isAppointmentCompleted
    ? `You've appointed your agent. No further actions can be taken on this tender.`
    : !isShortlistedCompleted
      ? `You’ll be able to invite agents to site visits once you have shortlisted from your results.`
      : ''

  return (
    <Box className=' p-6'>
      <Box className='flex justify-between items-center'>
        <Typography variant='h6' sx={{ color: 'customColors.gray9', fontWeight: 700, fontSize: '28px' }}>
          {title}
        </Typography>

        {isButtonDisabled ? (
          <CustomTooltip text={tooltipText} position='top' align='center'>
            <CustomButton
              variant='contained'
              className='flex items-center gap-2'
              onClick={() => setSiteVisitsModalOpen(true)}
              disabled={isButtonDisabled}
            >
              {actionButton}
            </CustomButton>
          </CustomTooltip>
        ) : (
          <CustomButton
            variant='contained'
            className='flex items-center gap-2'
            onClick={() => setSiteVisitsModalOpen(true)}
            disabled={false}
          >
            {actionButton}
          </CustomButton>
        )}
      </Box>
      <Typography
        sx={{
          fontSize: '14px',
          fontWeight: 400,
          color: 'customColors.gray8',
          paddingTop: '16px',
          maxWidth: '660px'
        }}
      >
        Manage your entire visits history here. You can view all upcoming, rescheduled and completed visits in one
        centralized location.
      </Typography>

      <SiteVisitsModal
        open={siteVisitsModalOpen}
        onClose={() => setSiteVisitsModalOpen(false)}
        types='fromSiteVisitTable'
        siteVisitDate={undefined}
        SideVisitsSchedualInviteId={undefined}
        VideoCallInviteId={undefined}
        completedShorlistedPmas={undefined}
        shorlistedPmas={finalShortListedResponce?.data?.shortlisted_pma_users}
      />
    </Box>
  )
}

export default SiteVisitHeader
