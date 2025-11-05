'use client'

import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Box, Card, Grid, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { toast } from 'react-toastify'

import CustomButton from '@/common/CustomButton'
import FormInput from '@/components/form-components/FormInput'
import { editProfileSchema } from '@/schemas/validation-schemas'

type EditProfileFormData = {
  contactName: string
  email: string
  website: string
  mobile: string
  landline: string
  address: string
  minimumManagementFee: string
  maximumManagementFee: string
  preferredContact: string
  secondaryContactName: string
  secondaryPhoneNumber: string
  secondaryEmail: string
  secondaryMobileLandline: string
  googleReviews: string
  trustpilotReviews: string
  companyBio: string
}

const EditProfileView = () => {
  const router = useRouter()

  const [notificationPreferences, setNotificationPreferences] = useState({
    email: false,
    message: false,
    portal: false
  })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [fileError, setFileError] = useState<string | null>(null)
  const [charCount, setCharCount] = useState(0)

  const { control, handleSubmit, watch } = useForm<EditProfileFormData>({
    resolver: valibotResolver(editProfileSchema),
    defaultValues: {
      contactName: '',
      email: '',
      website: '',
      mobile: '',
      landline: '',
      address: '',
      minimumManagementFee: '',
      maximumManagementFee: '',
      preferredContact: '',
      secondaryContactName: '',
      secondaryPhoneNumber: '',
      secondaryEmail: '',
      secondaryMobileLandline: '',
      googleReviews: '',
      trustpilotReviews: '',
      companyBio: ''
    },
    mode: 'onChange'
  })

  const companyBio = watch('companyBio')

  React.useEffect(() => {
    setCharCount(companyBio?.length || 0)
  }, [companyBio])

  const handleFileValidation = (file: File) => {
    const allowedTypes = ['application/pdf']
    const maxSize = 8 * 1024 * 1024 // 8MB
    const errorMessage = 'Legal Format: .PDF Suggested Size: 8MB/file/page'

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

  const handleFileChange = (file: File) => {
    if (handleFileValidation(file)) {
      setSelectedFile(file)
      const reader = new FileReader()

      reader.onload = e => setFilePreview(e.target?.result as string)
      reader.readAsDataURL(file)
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
      handleFileChange(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0])
    }
  }

  const handleFormSubmit = (data: EditProfileFormData) => {
    console.log('Form Data:', data)
    console.log('Notification Preferences:', notificationPreferences)
    console.log('Selected File:', selectedFile)

    toast.success('Profile updated successfully!')
    router.push('/profile')
  }

  const handleCancel = () => {
    router.push('/profile')
  }

  return (
    <>
      <Card>
        <Box sx={{ padding: 4 }}>
          <Typography variant='h4' sx={{ color: '#1F4E8D', fontWeight: 600, marginBottom: 1 }}>
            Edit Profile
          </Typography>
          <Typography variant='body2' sx={{ color: '#6B7280', marginBottom: 4 }}>
            Auto Save
          </Typography>

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            {/* Primary Contact Details */}
            <Box sx={{ padding: 4, marginBottom: 3 }}>
              <Typography variant='h6' sx={{ color: '#1F4E8D', fontWeight: 600, marginBottom: 3 }}>
                Primary Contact Details
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <FormInput name='contactName' control={control} label='Contact Name' />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormInput name='email' control={control} label='Email' type='email' />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormInput name='website' control={control} label='Website' />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormInput name='mobile' control={control} label='Mobile' />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormInput name='landline' control={control} label='Landline' />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormInput name='address' control={control} label='Address' />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ padding: 4, marginBottom: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Typography variant='body2' sx={{ color: '#1F4E8D', fontWeight: 600, marginBottom: 1, fontSize: '14px' }}>
                    Management Fee
                  </Typography>
                  <FormInput name='minimumManagementFee' control={control} label='Minimum Management Fee' />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant='body2' sx={{ color: 'transparent', fontWeight: 600, marginBottom: 1, fontSize: '14px' }}>
                    .
                  </Typography>
                  <FormInput name='maximumManagementFee' control={control} label='Maximum Management Fee' />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant='body2' sx={{ color: '#1F4E8D', fontWeight: 600, marginBottom: 1, fontSize: '14px' }}>
                    Preferred Contact
                  </Typography>
                  <FormInput name='preferredContact' control={control} label='(219) 555-0114 (Primary)' />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ padding: 4, marginBottom: 3 }}>
              <Typography variant='h6' sx={{ color: '#1F4E8D', fontWeight: 600, marginBottom: 3 }}>
                Secondary Contact Details
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <FormInput name='secondaryContactName' control={control} label='Contact Name' />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormInput name='secondaryPhoneNumber' control={control} label='Phone Number' />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormInput name='secondaryEmail' control={control} label='Email' type='email' />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormInput name='secondaryMobileLandline' control={control} label='Mobile/ landline' />
                </Grid>
              </Grid>
            </Box>

            <Grid container spacing={3} sx={{ marginBottom: 3 }}>
              <Grid item xs={12} md={6}>
                <Box sx={{ padding: 4, height: '100%' }}>
                  <Typography variant='h6' sx={{ color: '#1F4E8D', fontWeight: 600, marginBottom: 3 }}>
                    Notification Preferences
                  </Typography>

                  <div className='space-y-3'>
                    <div className='flex items-center justify-between'>
                      <Typography variant='body2' sx={{ fontSize: '14px', color: '#6B7280' }}>
                        Get notification through Email
                      </Typography>
                      <div className='flex items-center gap-2'>
                        <Typography
                          onClick={() => setNotificationPreferences(prev => ({ ...prev, email: false }))}
                          sx={{
                            fontSize: '14px',
                            color: !notificationPreferences.email ? '#35C0ED' : '#6B7280',
                            fontWeight: !notificationPreferences.email ? 500 : 400,
                            cursor: 'pointer'
                          }}
                        >
                          No
                        </Typography>
                        <span style={{ color: '#6B7280' }}>/</span>
                        <Typography
                          onClick={() => setNotificationPreferences(prev => ({ ...prev, email: true }))}
                          sx={{
                            fontSize: '14px',
                            color: notificationPreferences.email ? '#35C0ED' : '#6B7280',
                            fontWeight: notificationPreferences.email ? 500 : 400,
                            cursor: 'pointer'
                          }}
                        >
                          Yes
                        </Typography>
                      </div>
                    </div>

                    <div className='flex items-center justify-between'>
                      <Typography variant='body2' sx={{ fontSize: '14px', color: '#6B7280' }}>
                        Get notification through Message
                      </Typography>
                      <div className='flex items-center gap-2'>
                        <Typography
                          onClick={() => setNotificationPreferences(prev => ({ ...prev, message: false }))}
                          sx={{
                            fontSize: '14px',
                            color: !notificationPreferences.message ? '#35C0ED' : '#6B7280',
                            fontWeight: !notificationPreferences.message ? 500 : 400,
                            cursor: 'pointer'
                          }}
                        >
                          No
                        </Typography>
                        <span style={{ color: '#6B7280' }}>/</span>
                        <Typography
                          onClick={() => setNotificationPreferences(prev => ({ ...prev, message: true }))}
                          sx={{
                            fontSize: '14px',
                            color: notificationPreferences.message ? '#35C0ED' : '#6B7280',
                            fontWeight: notificationPreferences.message ? 500 : 400,
                            cursor: 'pointer'
                          }}
                        >
                          Yes
                        </Typography>
                      </div>
                    </div>

                    <div className='flex items-center justify-between'>
                      <Typography variant='body2' sx={{ fontSize: '14px', color: '#6B7280' }}>
                        Get notification in Portal
                      </Typography>
                      <div className='flex items-center gap-2'>
                        <Typography
                          onClick={() => setNotificationPreferences(prev => ({ ...prev, portal: false }))}
                          sx={{
                            fontSize: '14px',
                            color: !notificationPreferences.portal ? '#35C0ED' : '#6B7280',
                            fontWeight: !notificationPreferences.portal ? 500 : 400,
                            cursor: 'pointer'
                          }}
                        >
                          No
                        </Typography>
                        <span style={{ color: '#6B7280' }}>/</span>
                        <Typography
                          onClick={() => setNotificationPreferences(prev => ({ ...prev, portal: true }))}
                          sx={{
                            fontSize: '14px',
                            color: notificationPreferences.portal ? '#35C0ED' : '#6B7280',
                            fontWeight: notificationPreferences.portal ? 500 : 400,
                            cursor: 'pointer'
                          }}
                        >
                          Yes
                        </Typography>
                      </div>
                    </div>
                  </div>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ padding: 4, height: '100%' }}>
                  <Typography variant='h6' sx={{ color: '#1F4E8D', fontWeight: 600, marginBottom: 3 }}>
                    Reviews
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FormInput name='googleReviews' control={control} label='Google Reviews' />
                    </Grid>
                    <Grid item xs={12}>
                      <FormInput name='trustpilotReviews' control={control} label='Trustpilot Reviews' />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ padding: 4, marginBottom: 3 }}>
              <Typography variant='h6' sx={{ color: '#1F4E8D', fontWeight: 600, marginBottom: 3 }}>
                Company Bio
              </Typography>

              <FormInput name='companyBio' control={control} label='Company Bio' multiline rows={4} />
              <Typography variant='caption' sx={{ color: '#6B7280', float: 'right', marginTop: 1 }}>
                {charCount}/3,000 Characters
              </Typography>
            </Box>

            <Box sx={{ padding: 4, marginBottom: 3 }}>
              <Typography variant='h6' sx={{ color: '#1F4E8D', fontWeight: 600, marginBottom: 2 }}>
                Upload Company Brochure
              </Typography>
              <Typography variant='body2' sx={{ fontSize: '14px', color: '#6B7280', marginBottom: 3 }}>
                Upload your brochure in PDF format to showcase your services. This PDF will be visible to RMCs when you
                are shortlisted.
              </Typography>
              <Typography variant='body2' sx={{ fontSize: '12px', color: '#EF4444', marginBottom: 3 }}>
                Legal Format: .PDF Suggested Size: 8MB/file/page
              </Typography>

              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
                className={`border-2 border-dashed rounded-lg p-16 text-center cursor-pointer transition-colors ${
                  dragActive ? 'bg-[#E0F7FC] border-[#35C0ED]' : 'bg-[#E0F7FC] border-[#35C0ED]'
                }`}
              >
                <div className='flex flex-col items-center gap-3'>
                  {filePreview ? (
                    <div className='flex items-center gap-2'>
                      <i className='ri-file-pdf-line text-4xl text-[#35C0ED]'></i>
                      <Typography variant='body2' sx={{ color: '#35C0ED' }}>
                        {selectedFile?.name}
                      </Typography>
                    </div>
                  ) : (
                    <>
                      <div className='text-5xl text-[#35C0ED] mb-2'>↑</div>
                      <p className='text-[#35C0ED] font-medium text-base'>Drag & Drop or browse file</p>
                    </>
                  )}
                </div>
                <input
                  id='file-upload'
                  type='file'
                  onChange={handleFileInput}
                  accept='application/pdf'
                  className='hidden'
                />
              </div>
              {fileError && <p className='text-red-500 text-xs mt-2'>{fileError}</p>}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <CustomButton variant='outlined' onClick={handleCancel}>
                Cancel
              </CustomButton>
              <CustomButton variant='contained' type='submit'>
                Save Changes
              </CustomButton>
            </Box>
          </form>
        </Box>
      </Card>
    </>
  )
}

export default EditProfileView
