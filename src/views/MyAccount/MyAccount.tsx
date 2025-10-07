'use client'

import React, { useState } from 'react'

import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import type { InferOutput } from 'valibot'
import { Box, CardContent, Typography, Grid, Paper } from '@mui/material'

import { profileSchema } from '@/schemas/validation-schemas'
import FormInput from '@/components/form-components/FormInput'
import CustomButton from '@/common/CustomButton'
import { updateMyAccount, type MyAccountPayload } from '@/services/auth-apis/auth-api'

type ProfileFormData = InferOutput<typeof profileSchema>

const MyAccount: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)

  const { control, handleSubmit, setValue, watch } = useForm<ProfileFormData>({
    resolver: valibotResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      mobile_number: '',
      notify_email: true,
      notify_message: true,
      notify_portal: true
    }
  })

  const notifyEmail = watch('notify_email')
  const notifyMessage = watch('notify_message')
  const notifyPortal = watch('notify_portal')

  const handleFileValidation = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/svg+xml']
    const maxSize = 2 * 1024 * 1024
    const errorMessage = 'Logo Format: JPG, PNG, JPG, WebP, SVG Suggested Size: 2MB'

    if (!allowedTypes.includes(file.type)) {
      setFileError(errorMessage)

      return false
    }

    if (file.size > maxSize) {
      setFileError(errorMessage)

      return false
    }

    setFileError(null)

    return true
  }

  const updateProfileMutation = useMutation({
    mutationFn: (data: MyAccountPayload) => updateMyAccount(data),
    onSuccess: response => {
      toast.success(response.message || 'Profile updated successfully!')
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to update profile'

      toast.error(errorMessage)
    }
  })

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const payload: MyAccountPayload = {
        name: data.name,
        email: data.email,
        mobile_number: data.mobile_number,
        logo: selectedFile || undefined,
        notify_email: data.notify_email,
        notify_message: data.notify_message,
        notify_portal: data.notify_portal
      }

      updateProfileMutation.mutate(payload)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]

      if (handleFileValidation(file)) {
        setSelectedFile(file)

        const reader = new FileReader()

        reader.onload = e => {
          setImagePreview(e.target?.result as string)
        }

        reader.readAsDataURL(file)
      }
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      if (handleFileValidation(file)) {
        setSelectedFile(file)

        const reader = new FileReader()

        reader.onload = e => {
          setImagePreview(e.target?.result as string)
        }

        reader.readAsDataURL(file)
      }
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Paper
        sx={{
          maxWidth: '100%',
          width: '100%',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white'
        }}
      >
        <CardContent sx={{ padding: '32px' }}>
          <Box sx={{ marginBottom: '32px' }}>
            <Typography
              variant='h4'
              component='h1'
              sx={{
                color: '#1F2937',
                fontWeight: 600,
                fontSize: '24px',
                marginBottom: '8px'
              }}
            >
              Edit Profile
            </Typography>
            <Typography
              variant='body2'
              sx={{
                color: '#6B7280',
                fontSize: '14px'
              }}
            >
              Sub Text
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ marginBottom: '32px' }}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <FormInput name='name' control={control} label='Full Name' placeholder='Full Name' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormInput name='email' control={control} label='Email' placeholder='Email' type='email' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormInput name='mobile_number' control={control} label='Mobile Number' placeholder='Mobile Number' />
                </Grid>
              </Grid>
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

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                    <Typography variant='body1' sx={{ color: '#374151' }}>
                      Get notification through Email
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Typography
                        variant='body2'
                        onClick={() => setValue('notify_email', false)}
                        sx={{
                          color: !notifyEmail ? '#3B82F6' : '#9CA3AF',
                          textDecoration: !notifyEmail ? 'underline' : 'none',
                          cursor: 'pointer'
                        }}
                      >
                        No
                      </Typography>
                      <Typography variant='body2' sx={{ color: '#9CA3AF' }}>
                        /
                      </Typography>
                      <Typography
                        variant='body2'
                        onClick={() => setValue('notify_email', true)}
                        sx={{
                          color: notifyEmail ? '#3B82F6' : '#9CA3AF',
                          textDecoration: notifyEmail ? 'underline' : 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Yes
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                    <Typography variant='body1' sx={{ color: '#374151' }}>
                      Get notification through Message
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Typography
                        variant='body2'
                        onClick={() => setValue('notify_message', false)}
                        sx={{
                          color: !notifyMessage ? '#3B82F6' : '#9CA3AF',
                          textDecoration: !notifyMessage ? 'underline' : 'none',
                          cursor: 'pointer'
                        }}
                      >
                        No
                      </Typography>
                      <Typography variant='body2' sx={{ color: '#9CA3AF' }}>
                        /
                      </Typography>
                      <Typography
                        variant='body2'
                        onClick={() => setValue('notify_message', true)}
                        sx={{
                          color: notifyMessage ? '#3B82F6' : '#9CA3AF',
                          textDecoration: notifyMessage ? 'underline' : 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Yes
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                    <Typography variant='body1' sx={{ color: '#374151' }}>
                      Get notification in Portal
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Typography
                        variant='body2'
                        onClick={() => setValue('notify_portal', false)}
                        sx={{
                          color: !notifyPortal ? '#3B82F6' : '#9CA3AF',
                          textDecoration: !notifyPortal ? 'underline' : 'none',
                          cursor: 'pointer'
                        }}
                      >
                        No
                      </Typography>
                      <Typography variant='body2' sx={{ color: '#9CA3AF' }}>
                        /
                      </Typography>
                      <Typography
                        variant='body2'
                        onClick={() => setValue('notify_portal', true)}
                        sx={{
                          color: notifyPortal ? '#3B82F6' : '#9CA3AF',
                          textDecoration: notifyPortal ? 'underline' : 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Yes
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ marginBottom: '32px' }}>
              <Box
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
                sx={{
                  border: '2px dashed #3B82F6',
                  borderRadius: '8px',
                  padding: '40px',
                  textAlign: 'center',
                  backgroundColor: dragActive ? '#EFF6FF' : '#F8FAFC',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  position: 'relative',
                  '&:hover': {
                    backgroundColor: '#EFF6FF'
                  }
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  {imagePreview ? (
                    <Box
                      sx={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '2px solid #3B82F6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <img
                        src={imagePreview}
                        alt='Preview'
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>
                  ) : (
                    <>
                      <Typography
                        variant='h4'
                        sx={{
                          color: '#3B82F6',
                          fontSize: '24px'
                        }}
                      >
                        ↑
                      </Typography>
                      <Typography
                        variant='body1'
                        sx={{
                          color: '#3B82F6',
                          fontWeight: 500
                        }}
                      >
                        Drag & Drop or Browse File
                      </Typography>
                    </>
                  )}
                </Box>
                <input
                  type='file'
                  onChange={handleFileInput}
                  accept='image/jpeg,image/png,image/jpg,image/webp,image/svg+xml'
                  style={{ display: 'none' }}
                  id='file-upload'
                />
              </Box>

              {fileError && (
                <Typography
                  variant='caption'
                  sx={{
                    color: '#EF4444',
                    fontSize: '12px',
                    marginTop: '8px',
                    display: 'block'
                  }}
                >
                  {fileError}
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
                marginTop: '32px'
              }}
            >
              <CustomButton variant='outlined'>Cancel</CustomButton>
              <CustomButton type='submit' variant='contained' disabled={updateProfileMutation.isPending}>
                {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
              </CustomButton>
            </Box>
          </form>
        </CardContent>
      </Paper>
    </Box>
  )
}

export default MyAccount
