'use client'
import React, { useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Typography } from '@mui/material'

import CustomButton from '@/common/CustomButton'
import DataModal from '@/common/DataModal'
import {
  submitPmaTendersNotification,
  type PmaTendersNotificationPayload
} from '@/services/pma-onboarding-apis/pma-onboarding-api'
import { usePmaOnboardingData } from '@/hooks/usePmaOnboardingData'
import { PMA_ROUTES } from '@/constants'

const PmaTendersNotificationView = () => {
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState<'primarySecondary' | 'branchUsers' | 'everyone' | null>(null)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  const { data: onboardingData } = usePmaOnboardingData()

  React.useEffect(() => {
    const step10 = onboardingData?.data?.step_10

    if (step10?.received_tender_notification) {
      const methodMap = {
        primary_secondary: 'primarySecondary',
        branch_users: 'branchUsers',
        everyone: 'everyone'
      } as const

      const mappedMethod = methodMap[step10?.received_tender_notification as keyof typeof methodMap]

      if (mappedMethod) {
        setSelectedMethod(mappedMethod)
      }
    }
  }, [onboardingData])

  const mutation = useMutation({
    mutationFn: submitPmaTendersNotification,
    onSuccess: () => {
      setShowConfirmationModal(true)
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to save preferences. Please try again.'

      toast.error(errorMessage)
    }
  })

  const handleNotificationMethod = (method: 'primarySecondary' | 'branchUsers' | 'everyone') => {
    if (mutation?.isPending) return

    setSelectedMethod(method)

    const payload: PmaTendersNotificationPayload = {
      step: 10,
      received_tender_notification:
        method === 'primarySecondary' ? 'primary_secondary' : method === 'branchUsers' ? 'branch_users' : 'everyone'
    }

    mutation.mutate(payload)
  }

  const notificationOptions = [
    {
      key: 'primarySecondary' as const,
      label: 'Primary/ Secondary User',
      icon: '/svgs/bothUsers.svg'
    },
    {
      key: 'branchUsers' as const,
      label: 'Branch Users',
      icon: '/svgs/branchUsers.svg'
    },
    {
      key: 'everyone' as const,
      label: 'Everyone',
      icon: '/svgs/everyone.svg'
    }
  ]

  const handleSkip = () => {
    setShowConfirmationModal(true)
  }

  const handleModalClose = () => {
    setShowConfirmationModal(false)

    router.push('/dashboard')
  }

  const handleBack = () => {
    router.push(PMA_ROUTES.LOCATION_FORM)
  }

  return (
    <div className='flex flex-col items-center pt-10 mb-20'>
      <h1 className='text-[48px] font-bold text-[#262B43E5] '>PMA Onboarding</h1>
      <div className='bg-white p-8 pt-10 w-full mt-6'>
        <Typography
          variant='h6'
          sx={{ fontSize: '24px', fontWeight: 500, color: 'customColors.darkGray1' }}
          className='mb-6'
        >
          Who Receives Notifications For Tenders In This Area
        </Typography>

        <Typography variant='body2' sx={{ fontSize: '18px', fontWeight: 400, color: '#696969', marginBottom: '24px' }}>
          Individual Branch Settings Can Be Edited Within Your Portal
        </Typography>

        <div className='flex justify-center py-6'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-16 pb-6'>
            {notificationOptions.map(option => {
              const isSelected = selectedMethod === option.key

              return (
                <div
                  key={option.key}
                  onClick={() => handleNotificationMethod(option.key)}
                  className={`group flex flex-col items-center p-6 shadow-sm rounded-md w-[280px] h-[318px] justify-between transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#F3FCFE] border-[1px] border-[#35C0ED] shadow-lg'
                      : 'bg-[#F3FCFE] hover:bg-[#D7F2FB] border border-blue-100'
                  } ${mutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className='flex items-center justify-center flex-grow'>
                    <div className='transition-transform duration-300 group-hover:scale-125'>
                      <Image src={option.icon} alt={option.label} width={150} height={150} className='mb-4' />
                    </div>
                  </div>
                  <Typography
                    variant='body1'
                    sx={{
                      color: 'customColors.gray10',
                      fontSize: '15px',
                      fontWeight: 500,
                      paddingTop: '14px'
                    }}
                    className='text-center'
                  >
                    {option.label}
                  </Typography>
                </div>
              )
            })}
          </div>
        </div>
        <div className='flex justify-between items-center mt-6'>
          <CustomButton
            onClick={handleBack}
            startIcon={<i className='ri-arrow-left-line'></i>}
            variant='outlined'
            sx={{ fontSize: '14px', fontWeight: 700 }}
          >
            Back
          </CustomButton>
          <CustomButton
            onClick={handleSkip}
            variant='outlined'
            endIcon={<i className='ri-arrow-right-line'></i>}
            sx={{ fontSize: '14px', fontWeight: 700 }}
            disabled={mutation.isPending}
          >
            Skip
          </CustomButton>
        </div>
      </div>

      <DataModal
        open={showConfirmationModal}
        onClose={handleModalClose}
        onConfirm={handleModalClose}
        title='Confirmation!'
        description='Your profile is complete and your account is now active. You will start receiving tender invitations based on your region and profile settings.'
        confirmText='OK'
        cancelText=''
        confirmColor='primary'
      />
    </div>
  )
}

export default PmaTendersNotificationView
