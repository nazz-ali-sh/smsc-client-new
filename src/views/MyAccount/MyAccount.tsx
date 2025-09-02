'use client'

import type { ChangeEvent } from 'react'
import { useState } from 'react'

import { Box, Card, CardContent, Typography, TextField, Grid, Divider } from '@mui/material'

import CustomButton from '@/common/CustomButton'

interface FormData {
  contactName: string
  phoneNumber: string
  email: string
  emailNotification: 'Yes' | 'No'
  messageNotification: 'Yes' | 'No'
  portalNotification: 'Yes' | 'No'
}

const MyAccount: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    contactName: '',
    phoneNumber: '',
    email: '',
    emailNotification: 'Yes',
    messageNotification: 'Yes',
    portalNotification: 'Yes'
  })

  const [rmcName, setRmcName] = useState('RMC Name')
  const [isEditingRmcName, setIsEditingRmcName] = useState(false)

  const handleTextInputChange = (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = field === 'phoneNumber' ? e.target.value.replace(/[^0-9]/g, '') : e.target.value

    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleToggleChange = (field: keyof FormData, value: 'Yes' | 'No') => () => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleRmcNameChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRmcName(e.target.value)
  }

  const handleRmcNameEdit = () => {
    setIsEditingRmcName(true)
  }

  const handleRmcNameBlur = () => {
    setIsEditingRmcName(false)
  }

  const notifications = [
    { label: 'Get notification through Email', field: 'emailNotification' as const },
    { label: 'Get notification through Message', field: 'messageNotification' as const },
    { label: 'Get notification in Portal', field: 'portalNotification' as const }
  ]

  const borderStyle = {
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#35C0ED'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#35C0ED'
      }
    }
  }

  return (
    <Box
      sx={{
        minHeight: '70vh',
        padding: '24px',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Card
        sx={{
          maxWidth: 'full',
          width: '100%',
          borderRadius: '12px'
        }}
      >
        <CardContent sx={{ padding: '32px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <Box className='w-20 h-20 bg-[#7C3AED] rounded-lg flex flex-col items-center justify-center text-white text-2xl font-bold'>
              <Box component='span' sx={{ fontSize: '32px' }}>
                ⚡
              </Box>
              <Typography variant='caption' sx={{ fontSize: '10px', marginTop: '4px', color: 'white' }}>
                Logo
              </Typography>
            </Box>
            <Box>
              {isEditingRmcName ? (
                <TextField
                  value={rmcName}
                  onChange={handleRmcNameChange}
                  onBlur={handleRmcNameBlur}
                  autoFocus
                  variant='outlined'
                  sx={{
                    fontWeight: 700,
                    color: '#1E293B',
                    marginBottom: '8px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'transparent'
                      },
                      '&:hover fieldset': {
                        borderColor: '#35C0ED'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#35C0ED'
                      },
                      height: '50px'
                    }
                  }}
                  inputProps={{ style: { fontSize: '20px', lineHeight: '20px' } }}
                />
              ) : (
                <Typography
                  variant='h4'
                  sx={{
                    fontWeight: 700,
                    color: '#1E293B',
                    marginBottom: '8px',
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                  onClick={handleRmcNameEdit}
                >
                  {rmcName}
                </Typography>
              )}
              <Typography variant='body2' sx={{ color: '#64748B' }}>
                Logo Format : JPG, PNG Suggested Size: 600×600px
              </Typography>
            </Box>
          </Box>
          <Box sx={{ marginBottom: 6, marginTop: 4 }}>
            <Divider />
          </Box>

          <Box sx={{ marginBottom: 7 }}>
            <Typography
              sx={{
                fontSize: '18px',
                fontWeight: 500,
                color: '#1F4E8D',
                marginBottom: '16px'
              }}
            >
              Details
            </Typography>
            <Grid container spacing={3} sx={{ marginTop: 5 }}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='Contact Name'
                  value={formData.contactName}
                  onChange={handleTextInputChange('contactName')}
                  variant='outlined'
                  size='small'
                  sx={borderStyle}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='Phone Number'
                  type='tel'
                  value={formData.phoneNumber}
                  onChange={handleTextInputChange('phoneNumber')}
                  variant='outlined'
                  size='small'
                  inputProps={{ pattern: '[0-9]*' }}
                  sx={borderStyle}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='Email'
                  type='email'
                  value={formData.email}
                  onChange={handleTextInputChange('email')}
                  variant='outlined'
                  size='small'
                  inputProps={{ pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$' }}
                  sx={borderStyle}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginBottom: '32px' }}>
            <Typography
              sx={{
                fontSize: '18px',
                fontWeight: 500,
                color: '#1F4E8D',
                marginBottom: '18px'
              }}
            >
              Notification Preferences
            </Typography>
            {notifications.map((notification, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingY: 1
                }}
              >
                <Typography variant='body1' sx={{ color: '#777981' }}>
                  {notification.label}
                </Typography>
                <Box sx={{ display: 'flex', gap: '5px' }}>
                  <Box
                    onClick={handleToggleChange(notification.field, 'No')}
                    className={`cursor-pointer py-1 ${formData[notification.field] === 'No' ? 'text-[#35C0ED]' : 'text-[#ACACAC]'}`}
                  >
                    No
                  </Box>
                  <span className='text-[#ACACAC] pt-1'>/</span>
                  <Box
                    onClick={handleToggleChange(notification.field, 'Yes')}
                    className={`cursor-pointer py-1 ${formData[notification.field] === 'Yes' ? 'text-[#35C0ED]' : 'text-[#ACACAC]'}`}
                  >
                    Yes
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          <Box className='flex justify-end items-center gap-4 mt-40'>
            <CustomButton sx={{ fontSize: '16px', fontWeight: 700 }}>Cancel</CustomButton>
            <CustomButton sx={{ fontSize: '16px', fontWeight: 700 }}>Save Changes</CustomButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default MyAccount
