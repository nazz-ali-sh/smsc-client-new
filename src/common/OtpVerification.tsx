'use client'

import React, { useState, useEffect, useRef } from 'react'

import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Link,
  Divider,
  FormControl,
  FormLabel
} from '@mui/material'

import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { Verification } from '@/services/on-boarding-apis/onboarding-api'
import type { RootState } from '../redux-store/index'
import SuccessModal from './SucessModal'

const OtpVerification = () => {
  const router = useRouter()
  const user_id = useSelector((state: RootState) => state.form.steps.tenderDetails.user_id)

  const [code, setCode] = useState<string[]>(['', '', '', '', '', ''])
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const [countdown, setCountdown] = useState<number>(30)
  const [isResending, setIsResending] = useState<boolean>(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  console.log(isVerified, 'isVerified')

  const [successOpen, setSuccessOpen] = useState(false)

  const { mutate: verifyOtp, isPending: isVerifying } = useMutation({
    mutationFn: Verification,
    onSuccess: data => {
      console.log(data, 'data')
      setIsVerified(true)
      setSuccessOpen(true)
      toast.success('Verification successful!')
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Something went wrong'

      console.error('Something went wrong', errorMessage)
      toast.error(errorMessage)
    }
  })

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)

      return () => clearTimeout(timer)
    }
  }, [countdown])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleCodeChange = (index: number, value: string) => {
    const newCode = [...code]
    const numericValue = value.replace(/\D/g, '')

    if (numericValue.length > 1) {
      const pastedValues = numericValue.split('').slice(0, 6 - index)

      pastedValues.forEach((val, i) => {
        if (index + i < 6) newCode[index + i] = val
      })
    } else {
      newCode[index] = numericValue
    }

    setCode(newCode)
    if (numericValue && index < 5) inputRefs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = () => {
    const fullCode = code.join('')

    if (fullCode.length === 6 && user_id) {
      verifyOtp({
        user_id: user_id,
        otp: fullCode
      })
    } else if (!user_id) {
      toast.error('User ID not found. Please try again.')
    }
  }

  const handleResendCode = () => {
    setIsResending(true)
    setTimeout(() => {
      setCountdown(30)
      setIsResending(false)
      setCode(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    }, 1000)
  }

  return (
    <div className=''>
      <Box
        sx={{
          maxWidth: 800,
          mx: 'auto',
          px: 2,
          background: '#ffffff',
          boxShadow: 1,
          mt: 40,
          borderRadius: '12px'
        }}
      >
        <Card elevation={0} sx={{ boxShadow: 'none' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant='h2' gutterBottom sx={{ fontWeight: 700 }}>
              Verify Your Identity
            </Typography>
            <Typography color='text.secondary' sx={{ mb: 6, pt: 4 }}>
              Enter the 6-digit verification code we have sent you.
            </Typography>

            <FormControl component='fieldset' sx={{ mb: 4 }}>
              <FormLabel component='legend' sx={{ mb: 6 }}>
                Verification Method
              </FormLabel>
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
              {code.map((digit, index) => (
                <TextField
                  key={index}
                  inputRef={el => (inputRefs.current[index] = el)}
                  value={digit}
                  onChange={e => handleCodeChange(index, e.target.value)}
                  onKeyDown={e => handleKeyDown(index, e)}
                  inputProps={{
                    maxLength: 1,
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    style: { textAlign: 'center' }
                  }}
                  sx={{
                    width: 70,
                    '& input': {
                      fontSize: '1.5rem',
                      padding: '10px',
                      textAlign: 'center'
                    }
                  }}
                  disabled={isVerifying}
                />
              ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, mt: 1 }}>
              <Typography variant='body2' color='text.secondary'>
                Did not receive it?{' '}
                {countdown > 0 ? (
                  <span>Resend in {countdown}s</span>
                ) : (
                  <Link component='button' onClick={handleResendCode} disabled={isResending} sx={{ cursor: 'pointer' }}>
                    {isResending ? 'Sending...' : 'Resend code'}
                  </Link>
                )}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex ', justifyContent: 'center' }}>
              <Button
                variant='contained'
                className='w-[300px]'
                size='large'
                disabled={code.join('').length !== 6 || isVerifying || !user_id}
                onClick={handleSubmit}
              >
                {isVerifying ? 'Verifying...' : 'Verify Account'}
              </Button>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Typography variant='body2' color='text.secondary' sx={{ textAlign: 'center' }}>
              If you are having trouble receiving the code, please check your spam folder or contact support.
            </Typography>
          </CardContent>
        </Card>

        <SuccessModal
          open={successOpen}
          onClose={() => {
            setSuccessOpen(false)
          }}
          onConfirm={() => {
            setSuccessOpen(false)
            router.push('/tender-creation')
          }}
          message='Your identity has been verified. Your portal account is now active. You can now log in to complete your profile and begin receiving tenders.'
          title='Verification Successful'
          confirmButtonText='Ok'
        />
      </Box>
    </div>
  )
}

export default OtpVerification
