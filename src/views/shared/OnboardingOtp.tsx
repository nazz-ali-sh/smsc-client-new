'use client'
import { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { TextField, Typography } from '@mui/material'

import CustomButton from '@/common/CustomButton'
import {
  verifyRmcOtp,
  resendRmcCode,
  type RmcOtpVerificationPayload,
  type verificationPayload
} from '@/services/rmc-onboarding-apis/rmc-onboarding-api'
import { setOtpVerificationData } from '@/redux-store/slices/rmcOnboardingSlice'
import type { RootState } from '@/redux-store'
import { PMA_ROUTES, RMC_ROUTES } from '@/constants'
import { storeToken } from '@/utils/tokenSync'

export default function OnboardingOtp({ portal }: OnboardingPortalProps) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [countdown, setCountdown] = useState(30)
  const [isResendDisabled, setIsResendDisabled] = useState(true)
  const [showProcessing, setShowProcessing] = useState(false)

  const rmcData = useSelector((state: any) => state?.rmcOnboarding?.rmcData)
  const verificationMethod = useSelector((state: any) => state?.rmcOnboarding?.verificationMethod)
  const userId = rmcData?.user_id
  const pmaUserId = useSelector((state: RootState) => state.pmaOnboarding.pmaUserId)

  const savedFormData =
    typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem('directorFormData') || '{}') : {}

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    } else {
      setIsResendDisabled(false)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [countdown])

  const mutation = useMutation({
    mutationFn: verifyRmcOtp,
    onSuccess: (response: any) => {
      if (portal === 'pma_portal') {
        if (response?.data?.token) {
          storeToken(response?.data?.token, response?.data?.user_type)
        }
      } else {
        if (response?.data?.token && response?.data?.tender_onboarding_id) {
          storeToken(response?.data?.token, response?.data?.user_type)
          dispatch(
            setOtpVerificationData({
              tender_onboarding_id: response?.data?.tender_onboarding_id,
              verified: response?.data?.verified
            })
          )
        }
      }

      setShowProcessing(true)

      if (portal === 'pma_portal') {
        router.push(PMA_ROUTES.LOCATIONCODE)
      } else {
        router.push(RMC_ROUTES.POSTCODE)
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Invalid OTP. Please try again.'

      toast.error(errorMessage)
    }
  })

  const resendMutation = useMutation({
    mutationFn: resendRmcCode,
    onSuccess: () => {
      setCountdown(30)
      setIsResendDisabled(true)
    },
    onError: (error: any) => {
      const method = verificationMethod === 'sms' ? 'SMS' : 'Email'
      const errorMessage = error?.response?.data?.message || `Failed to resend ${method} code. Please try again.`

      toast.error(errorMessage)
    }
  })

  const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCode = [...code]
    const value = e.target.value?.slice(0, 1)

    if (value === '' || /^\d$/.test(value)) {
      newCode[index] = value
      setCode(newCode)

      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`)

        nextInput?.focus()
      }

      const updatedCode = [...newCode]

      if (updatedCode?.every(digit => digit !== '') && updatedCode?.length === 6) {
        handleVerifyOtp(updatedCode?.join(''))
      }
    }
  }

  const handleKeyDown = (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      const newCode = [...code]

      if (newCode[index]) {
        newCode[index] = ''
        setCode(newCode)
      } else if (index > 0) {
        newCode[index - 1] = ''
        setCode(newCode)
        const prevInput = document.getElementById(`code-${index - 1}`)

        prevInput?.focus()
      }
    }

    if (!/^\d$/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter']?.includes(e.key)) {
      e.preventDefault()
    }
  }

  const handlePaste = (index: number) => (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '')?.slice(0, 6)

    if (!pastedData) return

    const newCode = [...code]

    for (let i = 0; i < pastedData?.length && index + i < 6; i++) {
      newCode[index + i] = pastedData[i]
    }

    setCode(newCode)

    if (newCode?.every(digit => digit !== '')) {
      handleVerifyOtp(newCode?.join(''))
    } else {
      const nextEmptyIndex = newCode?.findIndex(digit => digit === '')

      if (nextEmptyIndex !== -1) {
        const nextInput = document.getElementById(`code-${nextEmptyIndex}`)

        nextInput?.focus()
      }
    }
  }

  const handleVerifyOtp = (otpCode?: string) => {
    const currentUserId = portal === 'pma_portal' ? pmaUserId : userId

    if (!currentUserId) {
      toast.error('User ID not found. Please try again.')

      return
    }

    const otp = otpCode || code.join('')

    if (otp.length !== 6) {
      toast.error('Please enter a complete 6-digit OTP.')

      return
    }

    const payload: RmcOtpVerificationPayload = {
      user_id: currentUserId,
      otp: otp
    }

    mutation.mutate(payload)
  }

  const handleResendCode = () => {
    const currentUserId = portal === 'pma_portal' ? pmaUserId : userId

    if (!currentUserId || !verificationMethod) {
      toast.error('User ID or verification method not found. Please try again.')

      return
    }

    const payload: verificationPayload = {
      user_id: currentUserId,
      verification_method: verificationMethod
    }

    resendMutation.mutate(payload)
  }

  const handleBack = () => {
    if (portal === 'pma_portal') {
      router.push(PMA_ROUTES.OTP_VERIFICATION)
    } else {
      router.push(RMC_ROUTES.VERIFICATION)
    }
  }

  const portalTitle = portal === 'pma_portal' ? 'PMA Sign Up' : 'RMC Sign Up'

  return (
    <>
      <h1 className='text-[48px] font-bold text-[#262B43E5] text-center mt-6 mb-4'>{portalTitle}</h1>
      <div className=' bg-white flex items-center justify-center p-2 mb-20'>
        <div className='px-3 rounded-lg w-full  pb-12'>
          <Typography
            variant='h6'
            sx={{ fontSize: '24px', fontWeight: 500, color: 'customColors.darkGray1' }}
            className='mt-10 mb-6'
          >
            Verification
          </Typography>{' '}
          <div className=' mb-6 mt-20'>
            <Typography variant='body1' color='textSecondary' className='mb-2'>
              Verify Your Identity, <strong>{savedFormData.fullName}</strong>
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              Enter 6-digit verification code we've sent you on <strong>{savedFormData.email}</strong>
            </Typography>
          </div>
          <div className='flex justify-center gap-1 mb-6'>
            {code?.map((digit, index) => (
              <TextField
                key={index}
                id={`code-${index}`}
                name={`code-${index}`}
                value={digit}
                onChange={handleChange(index)}
                onKeyDown={handleKeyDown(index)}
                variant='outlined'
                disabled={mutation.isPending || showProcessing}
                inputProps={{
                  maxLength: 1,
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  onPaste: handlePaste(index),
                  style: {
                    textAlign: 'center',
                    fontSize: '18px',
                    color: '#262B43E5'
                  }
                }}
                sx={{
                  width: '36px',
                  '& .MuiOutlinedInput-root': {
                    height: '48px',
                    '& fieldset': {
                      borderColor: '#DCDCDC',
                      borderRadius: '5px',
                      border: '1px solid #CBCBCB'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#35C0ED',
                      border: '1px solid #35C0ED'
                    },
                    '& input': {
                      padding: '12px 8px',
                      textAlign: 'center',
                      fontSize: '18px',
                      color: '#262B43E5',
                      WebkitTextFillColor: '#262B43E5'
                    }
                  }
                }}
                required
              />
            ))}
          </div>
          {showProcessing && (
            <div className='flex flex-col items-center gap-4 mb-6'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#26C6F9]'></div>
              <Typography variant='h6' sx={{ fontSize: '16px', fontWeight: 500, color: 'customColors.darkGray1' }}>
                Processing...
              </Typography>
            </div>
          )}
          <div className=' mb-4'>
            <Typography variant='body2' color='textSecondary'>
              {isResendDisabled ? (
                <>
                  Didn&apos;t receive it? You can resend in
                  <span style={{ fontWeight: 'bold', paddingLeft: '2px' }}>{countdown}s</span> or switch verification
                  method.
                </>
              ) : (
                "Didn't receive it? You can resend now or switch verification method."
              )}
            </Typography>
          </div>
          <div className='text-center mb-6 mt-10'>
            <CustomButton
              sx={{ width: '300px', fontSize: '14px', borderRadius: '4px' }}
              onClick={handleResendCode}
              isLoading={resendMutation?.isPending}
              disabled={mutation?.isPending || resendMutation?.isPending || isResendDisabled}
            >
              {resendMutation.isPending ? 'Resending...' : 'Resend Code'}
            </CustomButton>
          </div>
          <Typography variant='body2' color='textSecondary' className='text-center'>
            If you're having trouble receiving the code, please check your spam folder or contact support.
          </Typography>
          <div className='flex justify-start mt-10 '>
            <CustomButton
              variant='outlined'
              disabled={mutation?.isPending || resendMutation?.isPending}
              onClick={handleBack}
              startIcon={<i className='ri-arrow-left-line'></i>}
            >
              Back
            </CustomButton>
          </div>
        </div>
      </div>
    </>
  )
}
