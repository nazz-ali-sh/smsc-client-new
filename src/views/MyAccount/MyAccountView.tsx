'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { Box, Typography, Paper } from '@mui/material'

import CustomButton from '@/common/CustomButton'
import { useMyAccount } from '@/hooks/useMyAccount'

const MyAccountView: React.FC = () => {
  const router = useRouter()
  const { data: accountData } = useMyAccount()

  const handleEditProfile = () => {
    router.push('/my-accounts-update')
  }

  const user = accountData?.user
  const notificationPreferences = accountData?.notification_preferences

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: '#F8FAFC'
      }}
    >
      <Paper
        sx={{
          maxWidth: '100%',
          width: '100%',
          borderRadius: '12px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
          padding: '32px'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <Box
            sx={{
              width: '48px',
              height: '48px',
              backgroundColor: '#1F2937',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '16px',
              overflow: 'hidden'
            }}
          >
            {user?.logo_url ? (
              <img
                src={user.logo_url}
                alt='User Logo'
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <Typography
                sx={{
                  color: '#FFFFFF',
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}
              >
                S
              </Typography>
            )}
          </Box>
          <Typography
            variant='h4'
            sx={{
              color: '#1F2937',
              fontWeight: 700,
              fontSize: '28px'
            }}
          >
            {user?.name || 'RMC Name'}
          </Typography>
        </Box>

        <Box
          sx={{
            height: '1px',
            backgroundColor: '#E5E7EB',
            marginBottom: '24px'
          }}
        />

        <Box sx={{ marginBottom: '32px' }}>
          <Typography
            variant='h6'
            sx={{
              color: '#1F2937',
              fontWeight: 600,
              fontSize: '18px',
              marginBottom: '16px'
            }}
          >
            Details
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='body1' sx={{ color: '#6B7280' }}>
                Contact Name
              </Typography>
              <Typography variant='body1' sx={{ color: '#1F2937', fontWeight: 500 }}>
                {user?.name || 'N/A'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='body1' sx={{ color: '#6B7280' }}>
                Phone Number
              </Typography>
              <Typography variant='body1' sx={{ color: '#1F2937', fontWeight: 500 }}>
                {user?.mobile_number || 'N/A'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='body1' sx={{ color: '#6B7280' }}>
                Email
              </Typography>
              <Typography variant='body1' sx={{ color: '#1F2937', fontWeight: 500 }}>
                {user?.email || 'N/A'}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ marginBottom: '32px' }}>
          <Typography
            variant='h6'
            sx={{
              color: '#1F2937',
              fontWeight: 600,
              fontSize: '18px',
              marginBottom: '16px'
            }}
          >
            Notification Preferences
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant='body1' sx={{ color: '#374151' }}>
                Get notification through Email
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography
                  variant='body2'
                  sx={{
                    color: !notificationPreferences?.notify_email ? '#3B82F6' : '#9CA3AF',
                    textDecoration: !notificationPreferences?.notify_email ? 'underline' : 'none',
                    fontWeight: 500
                  }}
                >
                  No
                </Typography>
                <Typography variant='body2' sx={{ color: '#9CA3AF' }}>
                  /
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    color: notificationPreferences?.notify_email ? '#3B82F6' : '#9CA3AF',
                    textDecoration: notificationPreferences?.notify_email ? 'underline' : 'none',
                    fontWeight: 500
                  }}
                >
                  Yes
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant='body1' sx={{ color: '#374151' }}>
                Get notification through Message
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography
                  variant='body2'
                  sx={{
                    color: !notificationPreferences?.notify_message ? '#3B82F6' : '#9CA3AF',
                    textDecoration: !notificationPreferences?.notify_message ? 'underline' : 'none',
                    fontWeight: 500
                  }}
                >
                  No
                </Typography>
                <Typography variant='body2' sx={{ color: '#9CA3AF' }}>
                  /
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    color: notificationPreferences?.notify_message ? '#3B82F6' : '#9CA3AF',
                    textDecoration: notificationPreferences?.notify_message ? 'underline' : 'none',
                    fontWeight: 500
                  }}
                >
                  Yes
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant='body1' sx={{ color: '#374151' }}>
                Get notification in Portal
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography
                  variant='body2'
                  sx={{
                    color: !notificationPreferences?.notify_portal ? '#3B82F6' : '#9CA3AF',
                    textDecoration: !notificationPreferences?.notify_portal ? 'underline' : 'none',
                    fontWeight: 500
                  }}
                >
                  No
                </Typography>
                <Typography variant='body2' sx={{ color: '#9CA3AF' }}>
                  /
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    color: notificationPreferences?.notify_portal ? '#3B82F6' : '#9CA3AF',
                    textDecoration: notificationPreferences?.notify_portal ? 'underline' : 'none',
                    fontWeight: 500
                  }}
                >
                  Yes
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '32px'
          }}
        >
          <CustomButton
            variant='contained'
            onClick={handleEditProfile}
            sx={{
              backgroundColor: '#3B82F6',
              '&:hover': {
                backgroundColor: '#2563EB'
              }
            }}
          >
            Edit Profile
          </CustomButton>
        </Box>
      </Paper>
    </Box>
  )
}

export default MyAccountView
