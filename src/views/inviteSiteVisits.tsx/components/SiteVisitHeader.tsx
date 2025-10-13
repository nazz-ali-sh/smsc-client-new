'use client'

import React, { useState } from 'react'

import { Box, Typography } from '@mui/material'

import SiteVisitsModal from '@/common/SiteVisitsModal'
import CustomButton from '@/common/CustomButton'
import { useShortlistedPmas } from '@/hooks/useShortlistedPmasData'

interface InviteCallHeaderProps {
  title?: string
  actionButton?: React.ReactNode
  videoCallmodalData: any
}

const SiteVisitHeader = ({ title = 'Video Calls', actionButton }: InviteCallHeaderProps) => {
  const [siteVisitsModalOpen, setSiteVisitsModalOpen] = useState(false)

  const { data: finalShortListedResponce } = useShortlistedPmas()

  return (
    <Box className=' p-6'>
      <Box className='flex justify-between items-center'>
        <Typography variant='h6' sx={{ color: 'customColors.gray9', fontWeight: 700, fontSize: '28px' }}>
          {title}
        </Typography>

        <CustomButton
          variant='contained'
          className='flex items-center gap-2'
          onClick={() => setSiteVisitsModalOpen(true)}
        >
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
