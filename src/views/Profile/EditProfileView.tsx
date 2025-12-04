'use client'

import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Box, Card, Grid, Typography, Switch } from '@mui/material'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { toast } from 'react-toastify'

import CustomButton from '@/common/CustomButton'
import FormInput from '@/components/form-components/FormInput'
import { editProfileSchema } from '@/schemas/validation-schemas'
import { updateProfileDetails } from '@/services/auth-apis/auth-api'
import { useMyAccount } from '@/hooks/useMyAccount'

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
  googleAverageRating: string
  googleNumberOfReviews: string
  trustpilotAverageRating: string
  trustpilotNumberOfReviews: string
  companyBio: string
}

const EditProfileView = () => {
  const router = useRouter()
  const { data: accountData, isLoading: isLoadingAccount, invalidateCache } = useMyAccount()

  const [notificationPreferences, setNotificationPreferences] = useState({
    email: false,
    message: false,
    portal: false
  })

  const [googleShowOnShortlist, setGoogleShowOnShortlist] = useState(true)
  const [trustpilotShowOnShortlist, setTrustpilotShowOnShortlist] = useState(true)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [fileError, setFileError] = useState<string | null>(null)
  const [charCount, setCharCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [googleAutoSync, setGoogleAutoSync] = useState(false)
  const [trustpilotAutoSync, setTrustpilotAutoSync] = useState(false)
  const [prevGoogleValues, setPrevGoogleValues] = useState({ average: '', reviews: '' })
  const [prevTrustpilotValues, setPrevTrustpilotValues] = useState({ average: '', reviews: '' })

  const { control, handleSubmit, watch, reset, setValue } = useForm<EditProfileFormData>({
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
      googleAverageRating: '',
      googleNumberOfReviews: '',
      trustpilotAverageRating: '',
      trustpilotNumberOfReviews: '',
      companyBio: ''
    },
    mode: 'onChange'
  })

  React.useEffect(() => {
    if (accountData?.user) {
      const user = accountData.user as any

      if (accountData.notification_preferences) {
        setNotificationPreferences({
          email: accountData.notification_preferences.notify_email || false,
          message: accountData.notification_preferences.notify_message || false,
          portal: accountData.notification_preferences.notify_portal || false
        })
      }

      const formData: Partial<EditProfileFormData> = {}

      if (user.primary_details) {
        formData.contactName = user.primary_details.contact_name || ''
        formData.email = user.primary_details.email || ''
        formData.website = user.primary_details.website || ''
        formData.mobile = user.primary_details.mobile || ''
        formData.landline = user.primary_details.landline || ''
        formData.address = user.primary_details.address || ''
      }

      if (user.management_fee) {
        formData.minimumManagementFee = user.management_fee.min_management_fee?.toString() || ''
        formData.maximumManagementFee = user.management_fee.max_management_fee?.toString() || ''
        formData.preferredContact = user.management_fee.management_phone || ''
      }

      formData.companyBio = user.company_bio || ''

      if (user.google_reviews) {
        formData.googleAverageRating = user.google_reviews.google_average_rating
          ? user.google_reviews.google_average_rating.toString()
          : ''
        formData.googleNumberOfReviews = user.google_reviews.google_number_reviews
          ? user.google_reviews.google_number_reviews.toString()
          : ''
        setGoogleShowOnShortlist(user.google_reviews.google_report || false)
        setGoogleAutoSync(user.google_reviews.auto_sync || false)
      }

      if (user.trustpilot_reviews) {
        formData.trustpilotAverageRating = user.trustpilot_reviews.trustpilot_average_rating
          ? user.trustpilot_reviews.trustpilot_average_rating.toString()
          : ''
        formData.trustpilotNumberOfReviews = user.trustpilot_reviews.trustpilot_number_reviews
          ? user.trustpilot_reviews.trustpilot_number_reviews.toString()
          : ''
        setTrustpilotShowOnShortlist(user.trustpilot_reviews.trustpilot_report || false)
        setTrustpilotAutoSync(user.trustpilot_reviews.auto_sync || false)
      }

      reset(formData)

      setCharCount((user.company_bio || '').length)
    }
  }, [accountData, reset])

  const companyBio = watch('companyBio')

  React.useEffect(() => {
    setCharCount(companyBio?.length || 0)
  }, [companyBio])

  const handleGoogleHideClick = () => {
    setGoogleShowOnShortlist(false)
  }

  const handleGoogleShowClick = () => {
    setGoogleShowOnShortlist(true)
  }

  const handleTrustpilotHideClick = () => {
    setTrustpilotShowOnShortlist(false)
  }

  const handleTrustpilotShowClick = () => {
    setTrustpilotShowOnShortlist(true)
  }

  const handleFileValidation = (file: File) => {
    const allowedTypes = ['application/pdf']
    const maxSize = 8 * 1024 * 1024
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
    const file = e.target.files?.[0]

    if (!file) return

    setSelectedFile(file)

    if (file.type.startsWith('image/')) {
      const previewUrl = URL.createObjectURL(file)

      setFilePreview(previewUrl)
    }
  }

  const handleFormSubmit = async (data: EditProfileFormData) => {
    // Custom validation for rating fields when auto_sync is disabled
    const errors: string[] = []

    // Validate required fields when auto sync is disabled
    if (!googleAutoSync) {
      if (!data.googleAverageRating || data.googleAverageRating.trim() === '') {
        errors.push('Google average rating is required when auto sync is disabled')
      }

      if (!data.googleNumberOfReviews || data.googleNumberOfReviews.trim() === '') {
        errors.push('Google number of reviews is required when auto sync is disabled')
      }
    }

    if (!trustpilotAutoSync) {
      if (!data.trustpilotAverageRating || data.trustpilotAverageRating.trim() === '') {
        errors.push('Trustpilot average rating is required when auto sync is disabled')
      }

      if (!data.trustpilotNumberOfReviews || data.trustpilotNumberOfReviews.trim() === '') {
        errors.push('Trustpilot number of reviews is required when auto sync is disabled')
      }
    }

    if (errors.length > 0) {
      toast.error(errors.join('. '))

      return
    }

    setIsLoading(true)

    try {
      const payload = {
        primary_details: {
          contact_name: data.contactName,
          email: data.email,
          website: data.website,
          mobile: data.mobile,
          landline: data.landline,
          address: data.address
        },
        management_fee: {
          min_management_fee: parseFloat(data.minimumManagementFee) || 0,
          max_management_fee: parseFloat(data.maximumManagementFee) || 0,
          management_phone: data.preferredContact
        },
        company_bio: data.companyBio,
        google_reviews: {
          google_report: googleShowOnShortlist,
          google_average_rating: googleAutoSync ? null : data.googleAverageRating || null,
          google_number_reviews: googleAutoSync ? null : data.googleNumberOfReviews || null,
          auto_sync: googleAutoSync
        },
        trustpilot_reviews: {
          trustpilot_report: trustpilotShowOnShortlist,
          trustpilot_average_rating: trustpilotAutoSync ? null : data.trustpilotAverageRating || null,
          trustpilot_number_reviews: trustpilotAutoSync ? null : data.trustpilotNumberOfReviews || null,
          auto_sync: trustpilotAutoSync
        },
        notify_email: notificationPreferences.email,
        notify_message: notificationPreferences.message,
        notify_portal: notificationPreferences.portal,
        logo: selectedFile || undefined
      }

      await updateProfileDetails(payload)

      invalidateCache()

      toast.success('Profile updated successfully!')
      router.push('/profile')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.push('/profile')
  }

  if (isLoadingAccount) {
    return (
      <Card>
        <Box sx={{ padding: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <Typography variant='body1'>Loading profile data...</Typography>
        </Box>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <Box sx={{ padding: 4 }}>
          <Typography variant='h4' sx={{ color: '#1F4E8D', fontWeight: 600, marginBottom: 1 }}>
            Edit Profile
          </Typography>

          <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                  <Typography
                    variant='body2'
                    sx={{ color: '#1F4E8D', fontWeight: 600, marginBottom: 3, fontSize: '14px' }}
                  >
                    Management Fee
                  </Typography>
                  <FormInput name='minimumManagementFee' control={control} label='Minimum Management Fee' />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography
                    variant='body2'
                    sx={{ color: 'transparent', fontWeight: 600, marginBottom: 8.5, fontSize: '14px' }}
                  ></Typography>
                  <FormInput name='maximumManagementFee' control={control} label='Maximum Management Fee' />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography
                    variant='body2'
                    sx={{ color: '#1F4E8D', fontWeight: 600, marginBottom: 3, fontSize: '14px' }}
                  >
                    Preferred Contact
                  </Typography>
                  <FormInput name='preferredContact' control={control} label='(219) 555-0114 (Primary)' />
                </Grid>
              </Grid>
            </Box>

            <Grid spacing={3} sx={{ marginBottom: 3 }} className='flex flex-col w-[67%]'>
              <Grid item xs={12} md={6}>
                <Box sx={{ padding: 4, height: '100%', width: '100%' }}>
                  <Typography variant='h6' sx={{ color: '#1F4E8D', fontWeight: 600, marginBottom: 0 }}>
                    Notification Preferences
                  </Typography>

                  <div className='flex justify-between'>
                    <div className='flex items-center justify-between'>
                      <Switch
                        checked={notificationPreferences.email}
                        onChange={e => setNotificationPreferences(prev => ({ ...prev, email: e.target.checked }))}
                        color='primary'
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: 'white'
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#35C0ED'
                          }
                        }}
                      />
                      <Typography variant='body2' sx={{ fontSize: '14px', color: '#6B7280' }}>
                        Get notification through Email
                      </Typography>
                    </div>

                    <div className='flex items-center justify-between'>
                      <Switch
                        checked={notificationPreferences.message}
                        onChange={e => setNotificationPreferences(prev => ({ ...prev, message: e.target.checked }))}
                        color='primary'
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: 'white'
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#35C0ED'
                          }
                        }}
                      />
                      <Typography variant='body2' sx={{ fontSize: '14px', color: '#6B7280' }}>
                        Get notification through Message
                      </Typography>
                    </div>

                    <div className='flex items-center justify-between'>
                      <Switch
                        checked={notificationPreferences.portal}
                        onChange={e => setNotificationPreferences(prev => ({ ...prev, portal: e.target.checked }))}
                        color='primary'
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: 'white'
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#35C0ED'
                          }
                        }}
                      />
                      <Typography variant='body2' sx={{ fontSize: '14px', color: '#6B7280' }}>
                        Get notification in Portal
                      </Typography>
                    </div>
                  </div>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ padding: 4, height: '100%' }}>
                  <Typography variant='h6' sx={{ color: '#1F4E8D', fontWeight: 600, marginBottom: 3 }}>
                    Reviews
                  </Typography>

                  <div className='mb-8'>
                    <div className='flex gap-8 items-center mb-4'>
                      <Typography variant='h6' sx={{ color: '#1F4E8D', fontWeight: 600 }}>
                        Google Reviews
                      </Typography>
                      <div className='flex items-center gap-1 text-sm font-normal'>
                        <span
                          onClick={handleGoogleHideClick}
                          className={`cursor-pointer font-medium  ${!googleShowOnShortlist ? 'text-[#35C0ED]' : 'text-[#696969]'}`}
                        >
                          Hide
                        </span>
                        <span className='text-[#696969]'>/</span>
                        <span
                          onClick={handleGoogleShowClick}
                          className={`cursor-pointer font-medium ${googleShowOnShortlist ? 'text-[#35C0ED] ' : 'text-[#696969]'}`}
                        >
                          Show on shortlist report
                        </span>
                      </div>
                    </div>

                    <p className='text-xs font-normal text-[#696969] mb-6 flex items-start'>
                      <span className='mr-1'>●</span>
                      <span>
                        These scores are only displayed to RMCs when you're shortlisted. If left blank, a dash (-) will
                        appear.
                      </span>
                    </p>

                    <div className='flex'>
                      <Switch
                        checked={googleAutoSync}
                        onChange={e => {
                          const checked = e.target.checked

                          setGoogleAutoSync(checked)

                          if (checked) {
                            const currentAvg = watch('googleAverageRating')
                            const currentReviews = watch('googleNumberOfReviews')

                            setPrevGoogleValues({ average: currentAvg, reviews: currentReviews })
                            setValue('googleAverageRating', '')
                            setValue('googleNumberOfReviews', '')
                          } else {
                            setValue('googleAverageRating', prevGoogleValues.average)
                            setValue('googleNumberOfReviews', prevGoogleValues.reviews)
                          }
                        }}
                        color='primary'
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: 'white'
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#35C0ED'
                          }
                        }}
                        className='mt-2'
                      />
                      <Typography variant='body2' className='text-[14px] text-[#6B7280] mt-[16px] w-[90px]'>
                        Auto Sync
                      </Typography>

                      {!googleAutoSync && (
                        <Grid container spacing={6}>
                          <Grid item xs={12} sm={6}>
                            <FormInput
                              name='googleAverageRating'
                              control={control}
                              label='Average Rating'
                              type='number'
                              placeholder='Average Rating (1-5)'
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormInput
                              name='googleNumberOfReviews'
                              control={control}
                              label='Number of Reviews'
                              type='number'
                              placeholder='Number of Reviews (1-900)'
                            />
                          </Grid>
                        </Grid>
                      )}
                    </div>
                  </div>

                  <div className='mb-8'>
                    <div className='flex gap-8 items-center mb-4'>
                      <Typography variant='h6' sx={{ color: '#1F4E8D', fontWeight: 600 }}>
                        Trustpilot Reviews
                      </Typography>{' '}
                      <div className='flex items-center gap-1 text-sm font-normal'>
                        <span
                          onClick={handleTrustpilotHideClick}
                          className={`cursor-pointer font-medium  ${!trustpilotShowOnShortlist ? 'text-[#35C0ED]' : 'text-[#696969]'}`}
                        >
                          Hide
                        </span>
                        <span className='text-[#696969]'>/</span>
                        <span
                          onClick={handleTrustpilotShowClick}
                          className={`cursor-pointer font-medium ${trustpilotShowOnShortlist ? 'text-[#35C0ED] ' : 'text-[#696969]'}`}
                        >
                          Show on shortlist report
                        </span>
                      </div>
                    </div>

                    <p className='text-xs font-normal text-[#696969] mb-6 flex items-start'>
                      <span className='mr-1'>●</span>
                      <span>
                        These scores are only displayed to RMCs when you're shortlisted. If left blank, a dash (-) will
                        appear.
                      </span>
                    </p>
                    <div className='flex'>
                      <Switch
                        checked={trustpilotAutoSync}
                        onChange={e => {
                          const checked = e.target.checked

                          setTrustpilotAutoSync(checked)

                          if (checked) {
                            const currentAvg = watch('trustpilotAverageRating')
                            const currentReviews = watch('trustpilotNumberOfReviews')

                            setPrevTrustpilotValues({ average: currentAvg, reviews: currentReviews })

                            setValue('trustpilotAverageRating', '')
                            setValue('trustpilotNumberOfReviews', '')
                          } else {
                            setValue('trustpilotAverageRating', prevTrustpilotValues.average)
                            setValue('trustpilotNumberOfReviews', prevTrustpilotValues.reviews)
                          }
                        }}
                        color='primary'
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: 'white'
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#35C0ED'
                          }
                        }}
                        className='mt-2'
                      />
                      <Typography variant='body2' className='text-[14px] text-[#6B7280] mt-[16px] w-[90px]'>
                        Auto Sync
                      </Typography>

                      {!trustpilotAutoSync && (
                        <Grid container spacing={6}>
                          <Grid item xs={12} sm={6}>
                            <FormInput
                              name='trustpilotAverageRating'
                              control={control}
                              label='Average Rating'
                              type='number'
                              placeholder='Average Rating (1-5)'
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormInput
                              name='trustpilotNumberOfReviews'
                              control={control}
                              label='Number of Reviews'
                              type='number'
                              placeholder='Number of Reviews (1-900)'
                            />
                          </Grid>
                        </Grid>
                      )}
                    </div>
                  </div>
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
                    <img src={filePreview} alt='preview' className='max-h-48 mx-auto' />
                  ) : selectedFile?.type === 'application/pdf' ? (
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
              <CustomButton variant='outlined' onClick={handleCancel} disabled={isLoading}>
                Cancel
              </CustomButton>
              <CustomButton variant='contained' type='submit' disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </CustomButton>
            </Box>
          </form>
        </Box>
      </Card>
    </>
  )
}

export default EditProfileView
