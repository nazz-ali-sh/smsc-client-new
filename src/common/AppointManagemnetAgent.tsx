'use client'

import React, { useState } from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
  Grid,
  useTheme,
  Divider,
  FormControlLabel,
  Checkbox
} from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'

import { useSelector } from 'react-redux'

import { toast } from 'react-toastify'

import ConfirmationModal from './ConfirmationModal'
import { finalShortListedAgent, gettingRmcAppoint } from '@/services/tender_result-apis/tender-result-api'

interface SiteVisitsModalProps {
  open: boolean
  onClose: () => void
  finalShortListedResponce?: any | null
  pmaSelectedID?: any
  InviteCompletedCalls: any
  setpmaValue?: any
}

interface shortListedFinalAgent {
  data: any
  shortlist_id: number
  tender_id: number
  tender_name: string
  shortlisted_pma_count: number
  shortlisted_pma_users: {
    id: number
    pma_number: string
    full_name: string
    email: string
    mobile_number: string
    company_name: string
  }[]
  shortlisted_by: {
    id: number
    name: string | null
    email: string
  }
}

const AppointManagemnetModal: React.FC<SiteVisitsModalProps> = ({
  open,
  onClose,
  finalShortListedResponce,
  pmaSelectedID,
  InviteCompletedCalls,
  setpmaValue
}) => {
  const theme = useTheme()
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false)

  const [feedbacks, setFeedbacks] = useState<{ [key: number]: { feedback: string; noFeedback: boolean } }>({})

  const rmcData = useSelector((state: any) => state?.rmcOnboarding?.rmcData)
  const tender_id = rmcData?.tender_id

  const reschedual_pma_user_id = (InviteCompletedCalls ?? [])[0]?.pma_user_ids || '0'

  const { data: pmaShortlistedData } = useQuery<shortListedFinalAgent, Error>({
    queryKey: ['finalAgents', tender_id],
    queryFn: () => finalShortListedAgent(Number(tender_id)),
    enabled: !!tender_id,
    refetchOnWindowFocus: false
  })

  const { mutate: appointMutate } = useMutation({
    mutationFn: ({
      pma_user_id,
      appointment_message,
      other_pma_feedbacks,
      tender_id
    }: {
      pma_user_id: number
      appointment_message: string
      other_pma_feedbacks: { pma_user_id: number; feedback: string }[]
      tender_id: any
    }) => gettingRmcAppoint(pma_user_id, appointment_message, other_pma_feedbacks, tender_id),

    onSuccess: data => {
      toast.success(data?.message)
      setConfirmationModalOpen(true)
      setpmaValue('')
    },

    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to About Step'

      console.error('About API error:', errorMessage)
      toast.error(errorMessage)
      setpmaValue('')
      onClose()
    }
  })

  const handleFeedbackChange = (pmaId: number, value: string) => {
    setFeedbacks(prev => ({
      ...prev,
      [pmaId]: { ...prev[pmaId], feedback: value, noFeedback: false }
    }))
  }

  const handleCheckboxChange = (pmaId: number, checked: boolean) => {
    setFeedbacks(prev => ({
      ...prev,
      [pmaId]: { ...prev[pmaId], feedback: '', noFeedback: checked }
    }))
  }

  console.log(finalShortListedResponce)

  const handleSendInvites = () => {
    const appointmentMessage = 'Congratulations on your appointment as the managing agent!'

    const shortlistedPmas =
      finalShortListedResponce?.data?.shortlisted_pmas || pmaShortlistedData?.data?.shortlisted_pmas || []

    const otherPmaFeedbacks = shortlistedPmas
      .filter((pma: any) => pma?.pma_user?.id !== (pmaSelectedID || reschedual_pma_user_id))
      .map((pma: any) => ({
        pma_user_id: pma?.pma_user?.id,
        feedback: feedbacks[pma?.pma_user?.id]?.noFeedback
          ? 'Thank you for your proposal, but we have decided to go with another agent.'
          : feedbacks[pma?.pma_user?.id]?.feedback || ''
      }))

    appointMutate({
      pma_user_id: pmaSelectedID || reschedual_pma_user_id,
      appointment_message: appointmentMessage,
      other_pma_feedbacks: otherPmaFeedbacks,
      tender_id
    })
  }

  const type = 'appointAgent'

  const selectedPma =
    finalShortListedResponce?.data?.shortlisted_pmas?.find((pma: any) => pma.pma_user.id === pmaSelectedID)?.pma_user
      ?.full_name || 'PMA1xxxx'

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: '600px',
          paddingX: '24px'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1, px: 3, pt: 3 }}>
        <Box display='flex' justifyContent='space-between' alignItems='flex-start' sx={{ paddingTop: '32px' }}>
          <Box>
            <Typography
              variant='h4'
              sx={{
                color: theme.colorSchemes.light.palette.customColors.darkBlue,
                fontWeight: 'semibold',
                fontSize: '1.75rem'
              }}
            >
              Congratulations!
            </Typography>
            <Typography variant='body2' sx={{ paddingTop: '12px' }}>
              You’ve chosen to appoint {selectedPma} as your new managing agent. They will be thrilled to hear that
              they’ve been selected to manage your block
            </Typography>
          </Box>
          <IconButton onClick={onClose} size='small' sx={{ mt: -1 }}>
            <i className='ri-close-line' />
          </IconButton>
        </Box>
        <Box sx={{ paddingY: '12px' }}>
          <Divider
            sx={{
              height: '2px'
            }}
          />
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2, px: 3 }}>
        <Grid container spacing={3} className='mt-2'>
          <section className='border-1 border-black mt-[20px] ml-[14px]'>
            <Grid container spacing={2}>
              {(
                finalShortListedResponce?.data?.shortlisted_pmas ||
                pmaShortlistedData?.data?.shortlisted_pmas ||
                []
              ).map((pma: any, index: number) => (
                <React.Fragment key={pma.pma_user.id}>
                  <Typography sx={{ marginLeft: '8px', marginTop: index > 0 ? '20px' : '0' }}>
                    {pma.pma_user.id !== pmaSelectedID && <span> {pma.pma_user.full_name}</span>}
                  </Typography>
                  {pma.pma_user.id !== (pmaSelectedID || reschedual_pma_user_id) && (
                    <>
                      <Grid item xs={12} md={12} sx={{ marginTop: '19px' }}>
                        <TextField
                          fullWidth
                          type='text'
                          label='Feedback'
                          placeholder='write you feedback'
                          value={feedbacks[pma.pma_user.id]?.feedback || ''}
                          onChange={e => handleFeedbackChange(pma.pma_user.id, e.target.value)}
                          sx={{
                            '& .MuiInputBase-root': {
                              backgroundColor: 'white'
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={12} sx={{ marginTop: '10px' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={feedbacks[pma.pma_user.id]?.noFeedback || false}
                              onChange={e => handleCheckboxChange(pma.pma_user.id, e.target.checked)}
                            />
                          }
                          label='I would prefer not to leave any feedback'
                        />
                      </Grid>
                    </>
                  )}
                </React.Fragment>
              ))}
            </Grid>

            <Typography sx={{ marginTop: '20px' }}>
              <span className='font-bold'>{selectedPma}</span> will be in touch very soon to begin getting you set up as
              their new client. Thank you for using SMSC, and we look forward to supporting you through the transition
              process!
            </Typography>
          </section>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={onClose} sx={{ color: 'customColors.textGray' }}>
          Cancel
        </Button>
        <Button
          variant='contained'
          onClick={handleSendInvites}
          sx={{
            backgroundColor: 'customColors.ligthBlue',
            '&:hover': {
              backgroundColor: 'customColors.ligthBlue'
            }
          }}
        >
          Appoint Managing Agent
        </Button>
      </DialogActions>

      <ConfirmationModal
        type={type}
        open={confirmationModalOpen}
        onClose={() => {
          setConfirmationModalOpen(false)
          onClose()
        }}
        inviteData={[]}
      />
    </Dialog>
  )
}

export default AppointManagemnetModal
