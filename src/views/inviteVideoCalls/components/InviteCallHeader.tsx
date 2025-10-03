'use client'

import React, { useState } from 'react'

import { Box, Typography } from '@mui/material'

import VideosCallsModal from '@/common/VideosCallsModal'
import CustomButton from '@/common/CustomButton'
import { useShortlistedPmas } from '@/hooks/useShortlistedPmasData'

interface InviteCallHeaderProps {
  title?: string
  actionButton?: React.ReactNode
}

const InviteCallHeader = ({ title = 'Video Calls', actionButton }: InviteCallHeaderProps) => {
  const [onlineCallsModalOpen, setOnlineCallsModalOpen] = useState(false)

  const handleOnlineModal = () => {
    setOnlineCallsModalOpen(true)
  }

  const { data: finalShortListedResponce  } = useShortlistedPmas()

  return (
    <Box className=' p-6'>
      <Box className='flex justify-between items-center'>
        <Typography variant='h6' sx={{ color: 'customColors.gray9', fontWeight: 700, fontSize: '28px' }}>
          {title}
        </Typography>
        <CustomButton onClick={() => handleOnlineModal()} variant='contained'>
          {actionButton}
        </CustomButton>
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
