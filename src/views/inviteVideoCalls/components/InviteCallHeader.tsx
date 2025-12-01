'use client'

import React, { useState } from 'react'

import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

import VideosCallsModal from '@/common/VideosCallsModal'
import CustomButton from '@/common/CustomButton'
import CustomTooltip from '@/common/CustomTooltip'
import { useShortlistedPmas } from '@/hooks/useShortlistedPmasData'

interface InviteCallHeaderProps {
  title?: string
  actionButton?: React.ReactNode
}

const InviteCallHeader = ({ title = 'Video Calls', actionButton }: InviteCallHeaderProps) => {
  const [onlineCallsModalOpen, setOnlineCallsModalOpen] = useState(false)

  const isAppointmentCompleted = useSelector((state: any) => state?.siteVisitAndCallStats?.isAppointmentCompleted)
  const isShortlistedCompleted = useSelector((state: any) => state?.siteVisitAndCallStats?.isShortlistedCompleted)

  const isButtonDisabled = !isShortlistedCompleted || isAppointmentCompleted

  const tooltipText = isAppointmentCompleted
    ? `You've appointed your agent. No further actions can be taken on this tender.`
    : !isShortlistedCompleted
      ? `You’ll be able to invite agents to Video Call once you have shortlisted from your results.`
      : ''

  const handleOnlineModal = () => {
    setOnlineCallsModalOpen(true)
  }

  const { data: finalShortListedResponce } = useShortlistedPmas()

  return (
    <Box className=' p-6'>
      <Box className='flex justify-between items-center'>
        <Typography variant='h6' sx={{ color: 'customColors.gray9', fontWeight: 700, fontSize: '28px' }}>
          {title}
        </Typography>

        {isButtonDisabled ? (
          <>
            <CustomTooltip text={tooltipText} position='top' align='center'>
              <CustomButton
                onClick={() => handleOnlineModal()}
                variant='contained'
                disabled={!isShortlistedCompleted || isAppointmentCompleted}
              >
                {actionButton}
              </CustomButton>
            </CustomTooltip>
          </>
        ) : (
          <CustomButton
            onClick={() => handleOnlineModal()}
            variant='contained'
            disabled={!isShortlistedCompleted || isAppointmentCompleted}
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
        Manage your entire call history here. You can view all upcoming, rescheduled and completed calls in one
        centralized location.
      </Typography>

      <VideosCallsModal
        open={onlineCallsModalOpen}
        onClose={() => setOnlineCallsModalOpen(false)}
        shorlistedPmas={null}
        mainSiteVisitVideoCalls={finalShortListedResponce?.data?.shortlisted_pma_users}
      />
    </Box>
  )
}

export default InviteCallHeader
