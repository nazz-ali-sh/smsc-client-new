'use client'

import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Grid, Typography } from '@mui/material'

import CustomButton from '@/common/CustomButton'
import CommonModal from '@/common/CommonModal'
import FormInput from '@/components/form-components/FormInput'
import FormSelect from '@/components/form-components/FormSelect'
import { businessProfileSchema } from '@/schemas/validation-schemas'
import {
  submitPmaBusinessProfile,
  deletePmaSecondaryUser,
  type PmaBusinessProfilePayload
} from '@/services/pma-onboarding-apis/pma-onboarding-api'
import { usePmaOnboardingData } from '@/hooks/usePmaOnboardingData'
import { PMA_ROUTES } from '@/constants'

type BusinessProfileData = {
  tradingYears: string
  unitsManaged: string
  unitsAccountManager: string
  preferredContactNumber: string
  secondaryFullName?: string
  secondaryEmail?: string
  secondaryPhone?: string
  secondaryMobile?: string
}

export default function PmaBusinessProfileView() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isSkipAction, setIsSkipAction] = useState(false)
  const { data: onboardingData, invalidateCache } = usePmaOnboardingData()

  const { control, handleSubmit, reset } = useForm<BusinessProfileData>({
    resolver: valibotResolver(businessProfileSchema),
    defaultValues: {
      tradingYears: '',
      unitsManaged: '',
      unitsAccountManager: '',
      preferredContactNumber: '',
      secondaryFullName: '',
      secondaryEmail: '',
      secondaryPhone: '',
      secondaryMobile: ''
    },
    mode: 'onChange'
  })

  const mutation = useMutation({
    mutationFn: submitPmaBusinessProfile,
    onSuccess: () => {
      router.push(PMA_ROUTES.GOOGLE_REVIEWS)
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to save business profile. Please try again.'

      toast.error(errorMessage)
      setIsSubmitting(false)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: deletePmaSecondaryUser,
    onSuccess: () => {
      toast.success('Secondary user deleted successfully')
      setIsDeleteModalOpen(false)
      invalidateCache()

      if (isSkipAction) {
        proceedWithSkip()
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to delete secondary user. Please try again.'

      toast.error(errorMessage)
      setIsSkipAction(false)
    }
  })

  const validateOptionalFields = (data: BusinessProfileData): boolean => {
    const hasSecondaryData =
      data.secondaryFullName || data.secondaryEmail || data.secondaryPhone || data.secondaryMobile

    if (!hasSecondaryData) {
      return true
    }

    if (data.secondaryFullName && !/^[a-zA-Z\s]+$/.test(data.secondaryFullName.trim())) {
      toast.error('Secondary contact full name should contain only letters and spaces')

      return false
    }

    if (data.secondaryEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.secondaryEmail.trim())) {
      toast.error('Please enter a valid email address for secondary contact')

      return false
    }

    if (data.secondaryPhone && !/^[\d\s\-\+\(\)]{10,15}$/.test(data.secondaryPhone.trim())) {
      toast.error('Please enter a valid phone number for secondary contact (10-15 digits)')

      return false
    }

    if (data.secondaryMobile && !/^[\d\s\-\+\(\)]{10,15}$/.test(data.secondaryMobile.trim())) {
      toast.error('Please enter a valid landline number for secondary contact (10-15 digits)')

      return false
    }

    return true
  }

  const onSubmit = (data: BusinessProfileData) => {
    if (isSubmitting || mutation.isPending) return

    if (!validateOptionalFields(data)) {
      return
    }

    setIsSubmitting(true)

    const payload: PmaBusinessProfilePayload = {
      step: 4,
      trading_years: data.tradingYears ? parseInt(data.tradingYears) : 0,
      units_managed_by_company: data.unitsManaged ? parseInt(data.unitsManaged) : 0,
      units_managed_by_account_manager: data.unitsAccountManager ? parseInt(data.unitsAccountManager) : 0,
      preferred_contact_number: data.preferredContactNumber || '',
      full_name: data.secondaryFullName?.trim() || '',
      email: data.secondaryEmail?.trim() || '',
      mobile_number: data.secondaryPhone?.trim() || '',
      landline_number: data.secondaryMobile?.trim() || ''
    }

    mutation.mutate(payload)
  }

  const handleNext = () => {
    handleSubmit(onSubmit)()
  }

  const handleBack = () => {
    router.push(PMA_ROUTES.PINLOCATION)
  }

  const proceedWithSkip = () => {
    if (isSubmitting || mutation.isPending) return
    setIsSubmitting(true)

    const payload: PmaBusinessProfilePayload = {
      step: 4,
      trading_years: 0,
      units_managed_by_company: 0,
      units_managed_by_account_manager: 0,
      preferred_contact_number: '',
      full_name: '',
      email: '',
      mobile_number: '',
      landline_number: ''
    }

    mutation.mutate(payload)
    setIsSkipAction(false)
  }

  const handleSkip = () => {
    const step4 = onboardingData?.data?.step_4
    const hasSecondaryData = step4?.secondary_user?.id

    if (hasSecondaryData) {
      setIsSkipAction(true)
      setIsDeleteModalOpen(true)
    } else {
      proceedWithSkip()
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleDelete = () => {
    const step4 = onboardingData?.data?.step_4
    const hasSecondaryData = step4?.secondary_user?.id

    if (hasSecondaryData) {
      setIsSkipAction(false)
      setIsDeleteModalOpen(true)
    } else {
      reset({
        tradingYears: step4?.trading_years != null ? String(step4.trading_years) : '',
        unitsManaged: step4?.units_managed_by_company != null ? String(step4.units_managed_by_company) : '',
        unitsAccountManager:
          step4?.units_managed_by_account_manager != null ? String(step4.units_managed_by_account_manager) : '',
        preferredContactNumber: step4?.preferred_contact_number ?? '',
        secondaryFullName: '',
        secondaryEmail: '',
        secondaryPhone: '',
        secondaryMobile: ''
      })
    }
  }

  const handleConfirmDelete = () => {
    const step4 = onboardingData?.data?.step_4
    const userId = step4?.secondary_user?.id

    if (userId) {
      deleteMutation.mutate(userId)
    }
  }

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false)
    setIsSkipAction(false)
  }

  React.useEffect(() => {
    const step4 = onboardingData?.data?.step_4

    if (!step4) return

    reset({
      tradingYears: step4.trading_years != null ? String(step4.trading_years) : '',
      unitsManaged: step4.units_managed_by_company != null ? String(step4.units_managed_by_company) : '',
      unitsAccountManager:
        step4.units_managed_by_account_manager != null ? String(step4.units_managed_by_account_manager) : '',
      preferredContactNumber: step4.preferred_contact_number ?? '',
      secondaryFullName: step4.secondary_user?.full_name ?? '',
      secondaryEmail: step4.secondary_user?.email ?? '',
      secondaryPhone: step4.secondary_user?.mobile_number ?? '',
      secondaryMobile: step4.secondary_user?.landline_number ?? ''
    })
  }, [onboardingData, reset])

  return (
    <>
      <h1 className='text-[48px] text-center font-bold text-[#262B43E5] mt-8'>PMA Sign Up</h1>

      <div className='flex items-center justify-center p-4 bg-white mt-4 mb-20'>
        <div className='p-4 rounded-lg w-full'>
          <form>
            <h2 className='text-2xl font-medium text-[#262B43E5]'>Business Profile</h2>

            <p className='mt-6 mb-12 font-normal text-base leading-6 text-[#696969]'>
              Share your business profile and contact details to help us create your company profile and connect you
              with the right opportunities.
            </p>

            <div className='mb-12'>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={4}>
                  <FormInput
                    name='tradingYears'
                    control={control}
                    label='Trading Years'
                    type='number'
                    placeholder='Trading Years'
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormInput
                    name='unitsManaged'
                    control={control}
                    label='Units Managed By Company'
                    type='number'
                    placeholder='Units Managed By Company'
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormInput
                    name='unitsAccountManager'
                    control={control}
                    label='Units Managed by account manager'
                    type='number'
                    placeholder='Units Managed by account manager'
                  />
                </Grid>
              </Grid>
            </div>

            <div className='mb-8'>
              <h3 className='text-xl font-medium text-[#262B43E5] mb-6'>Contact Preferences</h3>

              <div className='mb-8'>
                <Typography variant='body2' className='text-sm font-medium text-[#262B43E5] mb-4'>
                  Preferred Contact Number
                </Typography>
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={4}>
                    <FormSelect
                      name='preferredContactNumber'
                      control={control}
                      label='Mobile/Landline'
                      options={[
                        { value: 'mobile', label: 'Mobile' },
                        { value: 'landline', label: 'Landline' }
                      ]}
                      placeholder='Select Contact Type'
                    />
                  </Grid>
                </Grid>
              </div>

              <div className='mb-6'>
                <Typography variant='body2' className='text-sm font-medium text-[#262B43E5] mb-4'>
                  Secondary Contact (Optional)
                </Typography>
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={4}>
                    <FormInput
                      name='secondaryFullName'
                      control={control}
                      label='Full Name'
                      type='text'
                      placeholder='Full Name'
                      disabled={!isEditing && !!onboardingData?.data?.step_4?.secondary_user?.id}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormInput
                      name='secondaryEmail'
                      control={control}
                      label='Email'
                      type='email'
                      placeholder='Email'
                      disabled={!isEditing && !!onboardingData?.data?.step_4?.secondary_user?.id}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormInput
                      name='secondaryPhone'
                      control={control}
                      label='Phone Number'
                      type='text'
                      placeholder='Phone Number'
                      disabled={!isEditing && !!onboardingData?.data?.step_4?.secondary_user?.id}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormInput
                      name='secondaryMobile'
                      control={control}
                      label='Landline'
                      type='text'
                      placeholder='Landline'
                      disabled={!isEditing && !!onboardingData?.data?.step_4?.secondary_user?.id}
                    />
                  </Grid>
                </Grid>
              </div>

              <div className='flex items-start justify-between'>
                <p className='text-xs font-normal text-[#696969] flex items-start flex-1'>
                  <span className='mr-1'>●</span>
                  <span>
                    Secondary contacts will have full access to view and reply to tenders but cannot modify your account
                    or add other users. Only the Primary User can manage account settings.
                  </span>
                </p>
              </div>

              <div className=' flex justify-end mt-2'>
                {onboardingData?.data?.step_4?.secondary_user?.id && (
                  <div className='flex items-center gap-2 ml-4'>
                    <div
                      onClick={handleDelete}
                      className='p-1 text-[#35C0ED] cursor-pointer hover:text-[#2BA3C7] bg-[#E8F9FE] rounded-md flex justify-center items-center size-9'
                      title='Delete'
                    >
                      <i className='ri-delete-bin-line text-lg'></i>
                    </div>
                    <div
                      onClick={handleEdit}
                      className='p-1 text-[#35C0ED] cursor-pointer hover:text-[#2BA3C7] bg-[#E8F9FE] rounded-md flex justify-center items-center size-9'
                      title='Edit'
                    >
                      <i className='ri-edit-line text-lg'></i>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='flex justify-between mt-32 gap-2'>
              <CustomButton
                variant='outlined'
                onClick={handleBack}
                startIcon={<i className='ri-arrow-left-line'></i>}
                sx={{ fontSize: '14px', fontWeight: 700 }}
              >
                Back
              </CustomButton>

              <div className='flex gap-2'>
                <CustomButton variant='outlined' onClick={handleSkip} sx={{ fontSize: '14px', fontWeight: 700 }}>
                  Skip
                </CustomButton>
                <CustomButton
                  variant='contained'
                  onClick={handleNext}
                  endIcon={<i className='ri-arrow-right-line'></i>}
                  sx={{ fontSize: '14px', fontWeight: 700 }}
                  disabled={isSubmitting || mutation.isPending}
                  isLoading={mutation.isPending}
                >
                  {mutation.isPending ? 'Processing...' : 'Next'}
                </CustomButton>
              </div>
            </div>
          </form>
        </div>
      </div>

      <CommonModal isOpen={isDeleteModalOpen} handleClose={handleCancelDelete} header='' maxWidth='sm' fullWidth={true}>
        <div className='py-4'>
          <Typography variant='body1' className='text-base text-[#262B43E5] mb-4'>
            Are you sure you want to delete this secondary user?
          </Typography>
          <Typography variant='body2' className='text-sm text-[#696969] mb-6'>
            This action will permanently remove the secondary user from your account.
          </Typography>
          <div className='flex justify-end gap-3'>
            <CustomButton
              variant='outlined'
              onClick={handleCancelDelete}
              sx={{ fontSize: '14px', fontWeight: 700 }}
              disabled={deleteMutation.isPending}
            >
              Cancel
            </CustomButton>
            <CustomButton
              variant='contained'
              onClick={handleConfirmDelete}
              sx={{ fontSize: '14px', fontWeight: 700 }}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending
                ? isSkipAction
                  ? 'Skipping...'
                  : 'Deleting...'
                : isSkipAction
                  ? 'Skip'
                  : 'Delete'}
            </CustomButton>
          </div>
        </div>
      </CommonModal>
    </>
  )
}
