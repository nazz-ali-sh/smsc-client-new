'use client'

import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import type { InferOutput } from 'valibot'
import { Switch } from '@mui/material'

import { profileSchema } from '@/schemas/validation-schemas'
import FormInput from '@/components/form-components/FormInput'
import CustomButton from '@/common/CustomButton'
import CommonModal from '@/common/CommonModal'
import { updateMyAccount, type MyAccountPayload } from '@/services/auth-apis/auth-api'
import { useMyAccount } from '@/hooks/useMyAccount'
import AccountLayout from './AccountWrapper'

type ProfileFormData = InferOutput<typeof profileSchema>

const MyAccount: React.FC = () => {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [, setDragActive] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [pendingData, setPendingData] = useState<ProfileFormData | null>(null)
  const [changedFields, setChangedFields] = useState<Record<string, any>>({})
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null)

  const { data: accountData, invalidateCache } = useMyAccount()
  const user = accountData?.user
  const notificationPreferences = accountData?.notification_preferences

  const { control, handleSubmit, setValue, watch, reset } = useForm<ProfileFormData>({
    resolver: valibotResolver(profileSchema),
    defaultValues: {
      first_name: user?.name?.split(' ')[0] || '',
      last_name: user?.name?.split(' ').slice(1).join(' ') || '',
      email: user?.email || '',
      mobile_number: user?.mobile_number || '',
      notify_email: notificationPreferences?.notify_email ?? true,
      notify_message: notificationPreferences?.notify_message ?? true,
      notify_portal: notificationPreferences?.notify_portal ?? true
    }
  })

  useEffect(() => {
    if (user && notificationPreferences) {
      reset({
        first_name: user?.name?.split(' ')[0] || '',
        last_name: user?.name?.split(' ')?.slice(1)?.join(' ') || '',
        email: user.email || '',
        mobile_number: user.mobile_number || '',
        notify_email: notificationPreferences.notify_email ?? true,
        notify_message: notificationPreferences.notify_message ?? true,
        notify_portal: notificationPreferences.notify_portal ?? true
      })

      if (user.logo_url) {
        setImagePreview(user.logo_url)
        setOriginalImageUrl(user.logo_url)
      }
    }
  }, [user, notificationPreferences, reset])

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

  const getChangedFields = (data: ProfileFormData) => {
    const changes: Record<string, any> = {}
    const originalFirstName = user?.name?.split(' ')[0] || ''
    const originalLastName = user?.name?.split(' ')?.slice(1)?.join(' ') || ''

    if (data.first_name !== originalFirstName) {
      changes.first_name = { old: originalFirstName, new: data.first_name }
    }

    if (data.last_name !== originalLastName) {
      changes.last_name = { old: originalLastName, new: data.last_name }
    }

    if (data.email !== (user?.email || '')) {
      changes.email = { old: user?.email || '', new: data.email }
    }

    if (data.mobile_number !== (user?.mobile_number || '')) {
      changes.mobile_number = { old: user?.mobile_number || '', new: data.mobile_number }
    }

    if (data.notify_email !== (notificationPreferences?.notify_email ?? true)) {
      changes.notify_email = { old: notificationPreferences?.notify_email ?? true, new: data.notify_email }
    }

    if (data.notify_message !== (notificationPreferences?.notify_message ?? true)) {
      changes.notify_message = { old: notificationPreferences?.notify_message ?? true, new: data.notify_message }
    }

    if (data.notify_portal !== (notificationPreferences?.notify_portal ?? true)) {
      changes.notify_portal = { old: notificationPreferences?.notify_portal ?? true, new: data.notify_portal }
    }

    if (selectedFile) {
      changes.profile_picture = { old: 'Current Picture', new: selectedFile.name }
    }

    if (selectedFile) {
      changes.profile_picture = {
        old: originalImageUrl,
        new: imagePreview,
        fileName: selectedFile.name
      }
    }

    return changes
  }

  const getFieldLabel = (fieldName: string) => {
    const labels: Record<string, string> = {
      first_name: 'First Name',
      last_name: 'Last Name',
      email: 'Email',
      mobile_number: 'Mobile Number',
      notify_email: 'Email Notifications',
      notify_message: 'SMS Notifications',
      notify_portal: 'Portal Notifications',
      profile_picture: 'Profile Picture'
    }

    return labels[fieldName] || fieldName
  }

  const updateProfileMutation = useMutation({
    mutationFn: (data: MyAccountPayload) => updateMyAccount(data),
    onSuccess: response => {
      toast.success(response.message || 'Profile updated successfully!')
      invalidateCache()
      setIsConfirmModalOpen(false)
      router.push('/account')
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to update profile'

      toast.error(errorMessage)
    }
  })

  const onSubmit = async (data: ProfileFormData) => {
    const changes = getChangedFields(data)

    if (Object.keys(changes).length === 0 && !selectedFile) {
      toast.warning('No changes detected')

      return
    }

    setPendingData(data)
    setChangedFields(changes)
    setIsConfirmModalOpen(true)
  }

  const handleConfirmChanges = () => {
    if (!pendingData) return

    try {
      const fullName = `${pendingData.first_name} ${pendingData.last_name}`.trim()

      const payload: MyAccountPayload = {
        name: fullName,
        email: pendingData.email,
        mobile_number: pendingData.mobile_number,
        logo: selectedFile || undefined,
        notify_email: pendingData.notify_email,
        notify_message: pendingData.notify_message,
        notify_portal: pendingData.notify_portal
      }

      updateProfileMutation.mutate(payload)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false)
    setPendingData(null)
    setChangedFields({})
  }

  const handleFileChange = (file: File) => {
    if (handleFileValidation(file)) {
      setSelectedFile(file)
      const reader = new FileReader()

      reader.onload = e => setImagePreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true)
    else if (e.type === 'dragleave') setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFileChange(e.dataTransfer.files[0])
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) handleFileChange(e.target.files[0])
  }

  const handleBack = () => {
    router.push('/account')
  }

  const preferencesList = [
    { label: 'Receive Notifications by Email', field: 'notify_email', value: notifyEmail },
    { label: 'Receive Notifications by SMS', field: 'notify_message', value: notifyMessage },
    { label: 'Notifications in Portal', field: 'notify_portal', value: notifyPortal }
  ]

  return (
    <AccountLayout>
      <div className='min-h-[98vh] flex justify-center bg-white mt-3'>
        <div className='w-full rounded-xl shadow-md p-8 '>
          <div className='mb-8'>
            <h1 className='text-2xl font-semibold text-gray-800 mb-2'>Edit Profile</h1>
            <p className='text-sm text-gray-500'>
              Update your personal details and choose how you'd like to receive notifications about your block and
              tenders. These details help keep your account up to date.
            </p>
          </div>

          <div className='h-[2px] bg-[#E5E7EB] mb-6' />

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-8'>
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
                <FormInput name='first_name' control={control} label='First Name' placeholder='First Name' />
                <FormInput name='last_name' control={control} label='Last Name' placeholder='Last Name' />
                <FormInput name='email' control={control} label='Email' placeholder='Email' type='email' />
                <div className='sm:col-span-1'>
                  <FormInput name='mobile_number' control={control} label='Mobile Number' placeholder='Mobile Number' />
                </div>
              </div>
            </div>

            <div className='mb-8'>
              <h2 className='text-lg font-semibold text-gray-800 mb-4'>Notification Preferences</h2>

              <div className='flex flex-row justify-between items-center'>
                {preferencesList?.map(({ label, field, value }) => (
                  <div key={field} className='flex items-center py-3 gap-2'>
                    <Switch
                      checked={value}
                      onChange={(_, checked) => setValue(field as any, checked)}
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
                    <p className='text-[#777981] font-medium text-[14px]'>{label}</p>
                    <i className='ri-information-line cursor-pointer text-[#696969] transition-colors'></i>
                  </div>
                ))}
              </div>
            </div>

            <div className='mb-8'>
              <h2 className='text-lg font-semibold text-gray-800 mb-4'>Upload Profile Picture</h2>
              <p className='text-sm text-gray-500 mb-2'>
                Upload your profile picture here which will be shown on your profile.
              </p>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
                className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors bg-[#A8E8FD66]`}
              >
                <div className='flex flex-col items-center gap-3'>
                  {imagePreview ? (
                    <div className='w-28 h-28 rounded-lg overflow-hidden border-2 border-blue-500 flex items-center justify-center'>
                      <img src={imagePreview} alt='Preview' className='w-full h-full object-cover' />
                    </div>
                  ) : (
                    <>
                      <p className='text-2xl text-blue-500'>↑</p>
                      <p className='text-blue-500 font-medium'>Drag & Drop or Browse File</p>
                    </>
                  )}
                </div>
                <input
                  id='file-upload'
                  type='file'
                  onChange={handleFileInput}
                  accept='image/jpeg,image/png,image/jpg,image/webp,image/svg+xml'
                  className='hidden'
                />
              </div>
              <p className='text-red-500 text-xs mt-2 italic'>Logo Format : JPG,PNG Suggested Size: 600x600px</p>
              {fileError && <p className='text-red-500 text-xs mt-2'>{fileError}</p>}
            </div>

            <div className='flex justify-end gap-3 mt-8'>
              <CustomButton onClick={handleBack} variant='outlined'>
                Cancel
              </CustomButton>
              <CustomButton type='submit' variant='contained' disabled={updateProfileMutation.isPending}>
                {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
              </CustomButton>
            </div>
          </form>
        </div>
      </div>

      <CommonModal
        isOpen={isConfirmModalOpen}
        handleClose={handleCloseConfirmModal}
        header='Check Your New Contact Details'
        maxWidth='md'
        headerSx={{ color: '#1F4E8D', fontSize: '26px', fontWeight: 600, marginLeft: '20px' }}
        isBorder
      >
        <div className='p-4'>
          <p className='text-[14px] text-[#696969] mb-3'>
            You’ve updated your contact information. If you continue, these new details will be used for all SMSC
            notifications<br></br> and will be shared with managing agents once you shortlist them.<br></br>
            Please confirm the information below is correct before saving:<br></br>
            New Contact Details
          </p>

          <div className='p-4 rounded mb-3'>
            {'profile_picture' in changedFields && (
              <div className='mb-4 pb-2 border-b border-[#E5E7EB]'>
                <p className='text-[14px] font-semibold text-[#1F4E8D] mb-2'>Profile Picture</p>
                <div className='flex items-center gap-3'>
                  <div className='text-center'>
                    <p className='text-[12px] text-[#6B7280] mb-1'>Current</p>
                    {changedFields.profile_picture.old ? (
                      <img
                        src={changedFields.profile_picture.old}
                        alt='Current'
                        className='w-20 h-20 object-cover rounded border-2 border-[#E5E7EB]'
                      />
                    ) : (
                      <div className='w-20 h-20 bg-[#E5E7EB] rounded flex items-center justify-center text-[#9CA3AF] text-[12px]'>
                        No Image
                      </div>
                    )}
                  </div>

                  <i className='ri-arrow-right-line text-lg text-[#6B7280] mt-3'></i>

                  <div className='text-center'>
                    <p className='text-[12px] text-[#10B981] mb-1 font-medium'>New</p>
                    <img
                      src={changedFields.profile_picture.new}
                      alt='New'
                      className='w-20 h-20 object-cover rounded border-2 border-[#10B981]'
                    />
                  </div>
                </div>
              </div>
            )}

            {Object.keys(changedFields)
              .filter(fieldName => fieldName !== 'profile_picture')
              .map(fieldName => (
                <div key={fieldName} className='mb-3 pb-2 border-b border-[#E5E7EB]'>
                  <p className='text-[14px] font-semibold text-[#1F4E8D] mb-1'>{getFieldLabel(fieldName)}</p>
                  <div className='flex items-center gap-2'>
                    {fieldName.startsWith('notify_') ? (
                      <>
                        <p className='text-[14px] text-[#6B7280]'>
                          {changedFields[fieldName].old ? 'Enabled' : 'Disabled'}
                        </p>
                        <i className='ri-arrow-right-line text-sm text-[#6B7280]'></i>
                        <p className='text-[14px] text-[#10B981] font-medium'>
                          {changedFields[fieldName].new ? 'Enabled' : 'Disabled'}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className='text-[14px] text-[#6B7280]'>{changedFields[fieldName].old || 'None'}</p>
                        <i className='ri-arrow-right-line text-sm text-[#6B7280]'></i>
                        <p className='text-[14px] text-[#10B981] font-medium'>{changedFields[fieldName].new}</p>
                      </>
                    )}
                  </div>
                </div>
              ))}
          </div>

          <p className='text-[14px] text-[#696969] mb-3'>
            You can update your contact details again at any time in your Edit Profile page.
          </p>

          <div className='flex justify-between gap-2 mt-10'>
            <CustomButton
              variant='outlined'
              onClick={handleCloseConfirmModal}
              disabled={updateProfileMutation.isPending}
            >
              Cancel
            </CustomButton>
            <CustomButton variant='contained' onClick={handleConfirmChanges} disabled={updateProfileMutation.isPending}>
              {updateProfileMutation.isPending ? 'Saving...' : 'Confirm Changes'}
            </CustomButton>
          </div>
        </div>
      </CommonModal>
    </AccountLayout>
  )
}

export default MyAccount
