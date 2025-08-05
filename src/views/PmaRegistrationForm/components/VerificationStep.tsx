'use client'

import React, { useState, useEffect, useRef } from 'react'

import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  useTheme,
  TextField,
  Link,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { resetPmaRegistration } from '@/redux-store/slices/pmaRegistrationSlice'

const VerificationStep = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'sms'>('email')
  const [code, setCode] = useState<string[]>(['', '', '', '', '', ''])
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const [countdown, setCountdown] = useState<number>(30)
  const [isResending, setIsResending] = useState<boolean>(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)

      return () => clearTimeout(timer)
    }
  }, [countdown])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationMethod(event.target.value as 'email' | 'sms')
  }

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
    if (index === 5 && numericValue) handleSubmit(newCode)
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (submittedCode?: string[]) => {
    const fullCode = (submittedCode || code).join('')

    if (fullCode.length === 6) {
      setIsVerified(true)
      setTimeout(() => {
        toast.success('Verification successful!')
      }, 100)
    }
  }

  const handleResendCode = () => {
    setIsResending(true)
    setTimeout(() => {
      setCountdown(30)
      setIsResending(false)
      toast.success(`New verification code sent via ${verificationMethod.toUpperCase()}!`)
      setCode(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    }, 1000)
  }

  const handleContinue = () => {
    dispatch(resetPmaRegistration())
    window.location.href = '/'
  }

  if (isVerified) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', my: 4, px: 2 }}>
        <Card elevation={0} sx={{ boxShadow: 'none' }}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant='h4' gutterBottom sx={{ fontWeight: 600 }}>
              Verification Complete
            </Typography>
            <Typography color='text.secondary'>Thank you, your identity has been verified.</Typography>
            <Box
              sx={{
                p: 3,
                backgroundColor: theme.palette.grey[100],
                borderRadius: 1,
                my: 4
              }}
            >
              <Typography>
                Your portal account is now active. You can now log in to complete your profile and begin receiving
                tenders.
              </Typography>
            </Box>
            <Button variant='contained' size='large' fullWidth onClick={handleContinue}>
              Continue to Home
            </Button>
          </CardContent>
        </Card>
      </Box>
    )
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', my: 4, px: 2 }}>
      <Card elevation={0} sx={{ boxShadow: 'none' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant='h4' gutterBottom sx={{ fontWeight: 600 }}>
            Verify Your Identity
          </Typography>
          <Typography color='text.secondary' sx={{ mb: 4 }}>
            Enter the 6-digit verification code we ve sent you.
          </Typography>

          <FormControl component='fieldset' sx={{ mb: 4 }}>
            <FormLabel component='legend' sx={{ mb: 2 }}>
              Verification Method
            </FormLabel>
            <RadioGroup row value={verificationMethod} onChange={handleMethodChange}>
              <FormControlLabel value='email' control={<Radio />} label='Email' sx={{ mr: 3 }} />
              <FormControlLabel value='sms' control={<Radio />} label='SMS' />
            </RadioGroup>
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
                  width: 50,
                  '& input': {
                    fontSize: '1.5rem',
                    padding: '10px',
                    textAlign: 'center'
                  }
                }}
              />
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant='body2' color='text.secondary'>
              Didn’t receive it?{' '}
              {countdown > 0 ? (
                <span>Resend in {countdown}s</span>
              ) : (
                <Link component='button' onClick={handleResendCode} disabled={isResending} sx={{ cursor: 'pointer' }}>
                  {isResending ? 'Sending...' : 'Resend code'}
                </Link>
              )}
            </Typography>
          </Box>

          <Button
            variant='contained'
            fullWidth
            size='large'
            disabled={code.join('').length !== 6}
            onClick={() => handleSubmit()}
          >
            Verify Account
          </Button>

          <Divider sx={{ my: 4 }} />

          <Typography variant='body2' color='text.secondary' sx={{ textAlign: 'center' }}>
            If you re having trouble receiving the code, please check your spam folder or contact support.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default VerificationStep
