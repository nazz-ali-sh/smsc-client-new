'use client'

import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import type { InferOutput } from 'valibot'

import { profileSchema } from '@/schemas/validation-schemas'
import FormInput from '@/components/form-components/FormInput'
import CustomButton from '@/common/CustomButton'
import { updateMyAccount, type MyAccountPayload } from '@/services/auth-apis/auth-api'
import { useMyAccount } from '@/hooks/useMyAccount'

type ProfileFormData = InferOutput<typeof profileSchema>

const MyAccount: React.FC = () => {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)

  const { data: accountData, invalidateCache } = useMyAccount()
  const user = accountData?.user
  const notificationPreferences = accountData?.notification_preferences
  console.log(dragActive)

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

  const updateProfileMutation = useMutation({
    mutationFn: (data: MyAccountPayload) => updateMyAccount(data),
    onSuccess: response => {
      toast.success(response.message || 'Profile updated successfully!')
      invalidateCache()
      router.push('/account')
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to update profile'

      toast.error(errorMessage)
    }
  })

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const fullName = `${data.first_name} ${data.last_name}`.trim()

      const payload: MyAccountPayload = {
        name: fullName,
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
    { label: 'Receive Notifications in the SMSC Portal', field: 'notify_portal', value: notifyPortal }
  ]

  return (
    <div className='min-h-screen flex justify-center bg-white mt-3'>
      <div className='w-full rounded-xl shadow-md p-8 '>
        <div className='mb-8'>
          <h1 className='text-2xl font-semibold text-gray-800 mb-2'>Edit Profile</h1>
          <p className='text-sm text-gray-500'>
            Update your personal details and choose how you’d like to receive notifications from Save My Service Charge.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-8'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <FormInput name='first_name' control={control} label='First Name' placeholder='First Name' />
              <FormInput name='last_name' control={control} label='Last Name' placeholder='Last Name' />
              <FormInput name='email' control={control} label='Email' placeholder='Email' type='email' />
              <FormInput name='mobile_number' control={control} label='Mobile Number' placeholder='Mobile Number' />
            </div>
          </div>

          <div className='mb-8'>
            <h2 className='text-lg font-semibold text-gray-800 mb-4'>Notification Preferences</h2>

            {preferencesList?.map(({ label, field, value }) => (
              <div key={field} className='flex justify-between items-center py-3 '>
                <p className='text-[#777981] font-medium text-[15px]'>{label}</p>
                <div className='flex gap-1 items-center'>
                  <span
                    onClick={() => setValue(field as any, false)}
                    className={`text-sm cursor-pointer ${!value ? 'text-[#35C0ED]' : 'text-gray-400'}`}
                  >
                    No
                  </span>
                  <span className='text-gray-400'>/</span>
                  <span
                    onClick={() => setValue(field as any, true)}
                    className={`text-sm cursor-pointer ${value ? 'text-[#35C0ED]' : 'text-gray-400'}`}
                  >
                    Yes
                  </span>
                </div>
              </div>
            ))}
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
              className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors bg-[#A8E8FD66]
              }`}
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
  )
}

export default MyAccount
