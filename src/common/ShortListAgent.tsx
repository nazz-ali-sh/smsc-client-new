'use client'
import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'

type ShortListAgentProps = {
  open: boolean
  onClose: () => void
  onConfirm?: () => void
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  confirmColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
}

const ShortListAgent = ({ open, onClose, onConfirm, confirmColor = 'primary' }: ShortListAgentProps) => {
  const [seconds, setSeconds] = useState(24 * 60 * 60) // Initialize with 24 hours in seconds
  const router = useRouter()

  useEffect(() => {
    let timerId: NodeJS.Timeout

    if (open) {
      timerId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1)
      }, 1000)
    }

    return () => clearInterval(timerId)
  }, [open])

  // Function to format seconds into HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const remainingSeconds = totalSeconds % 60

    const pad = (num: number) => num.toString().padStart(2, '0')

    return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`
  }

  const handleCloseAndNavigate = () => {
    router.push('/shortlist-agent')
  }

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle
          sx={{
            color: '#1F4E8D',
            fontSize: '26px',
            lineHeight: '33px',
            fontWeight: 600,
            borderBottom: '2px solid #efefef'
          }}
        >
          An Agent is Shortlisted!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your contact details will be hidden for 3 working days to allow you to initiate video calls.
          </DialogContentText>
        </DialogContent>
        <section className='px-[20px] text-[#1F4E8D] text-[18px] leading-[33px]'>
          <p style={{ fontWeight: 'bold' }}>{formatTime(seconds)}</p>
        </section>
        <DialogActions className='flex justify-between'>
          <Button
            sx={{
              backgroundColor: 'customColors.ligthBlue',
              '&:hover': { backgroundColor: 'customColors.ligthBlue' }
            }}
            variant='contained'
            color={confirmColor}
            onClick={onConfirm}
          >
            Extend by 3 days
          </Button>

          <Button
            sx={{
              color: '#35C0ED8C',
              borderColor: 'customColors.ligthBlue',
              '&:hover': {
                backgroundColor: 'customColors.ligthBlue',
                borderColor: 'customColors.ligthBlue'
              }
            }}
            variant='outlined'
            onClick={handleCloseAndNavigate}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ShortListAgent
