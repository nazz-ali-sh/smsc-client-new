'use client'

import { useRouter } from 'next/navigation'

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { useMutation } from '@tanstack/react-query'

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
}

const ShortListAgent = ({
  open,
  onClose,
  onConfirm,
  pmaSelectedID,
  fianlExpireDate
}: ShortListAgentProps) => {
  const router = useRouter()

  const rmcTenderId = useSelector((state: any) => state?.rmcOnboarding?.tenderId)

  const mutation = useMutation({
    mutationFn: () => rmcExtendThreeDays(Number(rmcTenderId), pmaSelectedID),
    onSuccess: data => {
      toast.success('Tender extended successfully!')
      toast.success(data?.message)
      if (onConfirm) onConfirm()
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to Extend Tender'

      console.error('About API error:', errorMessage)
      toast.error(errorMessage)
    }
  })

  const handleCloseAndNavigate = () => {
    router.push('/shortlist-agent')
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
        An Agent is Shortlisted!
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Your contact details will be hidden for 3 working days to allow you to initiate video calls.
        </DialogContentText>
      </DialogContent>
      <section className='px-[20px] text-[#1F4E8D] text-[18px] leading-[33px]'>
        <p style={{ fontWeight: 'bold' }}>
          {fianlExpireDate ? (
            <span>
              {fianlExpireDate.days} days {fianlExpireDate.hours} hour {fianlExpireDate.minutes} minutes
            </span>
          ) : (
            ''
          )}
        </p>
      </section>
      <DialogActions className='flex justify-between'>
        <CustomButton variant='outlined' onClick={handleCloseAndNavigate}>
          Close
        </CustomButton>

        <CustomButton variant='contained' onClick={() => mutation.mutate()} disabled={mutation.isPending}>
          {mutation.isPending ? 'Extending...' : 'Extend by 3 days'}
        </CustomButton>
      </DialogActions>
    </Dialog>
  )
}

export default ShortListAgent
