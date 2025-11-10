'use client'

import { useRouter } from 'next/navigation'

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useSelector } from 'react-redux'

import { toast } from 'react-toastify'

import { rmcExtendThreeDays } from '@/services/tender_result-apis/tender-result-api'
import CustomButton from './CustomButton'

type ShortListAgentProps = {
  open: boolean
  onClose: () => void
  onConfirm?: () => void
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  confirmColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  pmaSelectedID?: any
  fianlExpireDate?: any
  navigateOnClose?: boolean
  disabledChecks?: boolean
}

const ShortListAgent = ({
  open,
  onClose,
  onConfirm,
  pmaSelectedID,
  fianlExpireDate,
  navigateOnClose = false,
  disabledChecks
}: ShortListAgentProps) => {
  const router = useRouter()

  const rmcTenderId = useSelector((state: any) => state?.rmcOnboarding?.tenderId)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => rmcExtendThreeDays(Number(rmcTenderId), pmaSelectedID),
    onSuccess: data => {
      toast.success('Tender extended successfully!')
      toast.success(data?.message)
      if (onConfirm) onConfirm()

      queryClient.invalidateQueries({
        queryKey: ['finalAgents', rmcTenderId]
      })
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to Extend Tender'

      console.error('About API error:', errorMessage)
      toast.error(errorMessage)
    }
  })

  const handleClose = () => {
    if (navigateOnClose) {
      router.push('/shortlist-agent')
    }

    onClose()
  }

  return (
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
        Your Shortlist Request Has Been Sent
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ marginTop: '15px' }}>
          You now have full access to this agent’s details so you can review their company and services. <br></br><br></br>Your contact
          details will remain hidden for 3 working days, giving you time to initiate video calls, site visits, or
          in-portal messages before the agent can contact you directly.<br></br>
        </DialogContentText>
      </DialogContent>
      <section className='px-[20px] text-[#1F4E8D] text-[18px] leading-[33px]'>
        <p style={{ fontWeight: 'bold' }}>
          {fianlExpireDate ? (
            <span>
             Countdown: <span style={{fontStyle: 'italic'}}>{fianlExpireDate.days} days {fianlExpireDate.hours} hour {fianlExpireDate.minutes} minutes</span> remaining
            </span>
          ) : (
            ''
          )}
        </p>
      </section>
      <DialogActions className='flex justify-between'>
        <CustomButton variant='outlined' onClick={handleClose}>
          Close
        </CustomButton>

        <CustomButton variant='contained' onClick={() => mutation.mutate()} disabled={disabledChecks === true}>
          {mutation.isPending ? 'Extending...' : 'Extend by 3 days'}
        </CustomButton>
      </DialogActions>
    </Dialog>
  )
}

export default ShortListAgent
