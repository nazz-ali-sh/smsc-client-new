import React from 'react'

import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'

import { Box, Typography, Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import FormSelect from '@/components/form-components/FormSelect'
import CustomButton from '@/common/CustomButton'
import CommonModal from '@/common/CommonModal'
import { setDaysOptions, setMilesOptions } from '@/constants'
import { rmcRetender } from '@/services/dashboard-apis/dashboard-api'
import { retenderSchema } from '@/schemas/validation-schemas'

type RetenderFormData = {
  setDays: string
  setMiles: string
}

interface RetenderModalProps {
  isOpen: boolean
  handleClose: () => void
  tenderId?: any
}

const RetenderModal: React.FC<RetenderModalProps> = ({ isOpen, handleClose, tenderId}) => {
  const numericTenderId = useSelector((state: any) => state?.rmcOnboarding?.tenderId) as number | null

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = useForm<RetenderFormData>({
    resolver: valibotResolver(retenderSchema),
    defaultValues: {
      setDays: '',
      setMiles: ''
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: { tender_id: number; days: number; miles: number }) => rmcRetender(payload),
    onSuccess: (res: any) => {
      const message = res?.message || 'Retender submitted successfully'

      toast.success(message)
      handleClose()
      reset()
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to submit retender. Please try again.'

      toast.error(message)
    }
  })

  const onSubmit = async (data: RetenderFormData) => {
    if (!numericTenderId) {
      toast.error('Tender ID not found')

      return
    }

    mutate({ tender_id: Number(numericTenderId), days: Number(data.setDays), miles: Number(data.setMiles) })
  }

  const handleModalClose = () => {
    reset()
    handleClose()
  }

  return (
    <CommonModal
      isOpen={isOpen}
      handleClose={handleModalClose}
      header={`Retender ${tenderId}`}
      maxWidth='md'
      fullWidth
      headerSx={{ color: '#1F4E8D', fontSize: '26px', fontWeight: 600 }}
      isBorder
    >
      <Box sx={{ p: 2 }}>
        <Typography variant='body2' color='#696969' sx={{ mb: 3, my: 4, fontSize: '15px' }}>
          Use this section for retendering of tender.
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={8} sx={{ mt: 6 }}>
            <Grid item xs={12}>
              <FormSelect
                name='setDays'
                control={control}
                label='Set Days'
                options={setDaysOptions}
                placeholder='Select days'
              />
            </Grid>

            <Grid item xs={12}>
              <FormSelect
                name='setMiles'
                control={control}
                label='Set Miles'
                options={setMilesOptions}
                placeholder='Select miles'
              />
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 2,
                  mt: 3
                }}
              >
                <CustomButton variant='outlined' onClick={handleModalClose} sx={{ minWidth: 100 }}>
                  Cancel
                </CustomButton>
                <CustomButton
                  type='submit'
                  variant='contained'
                  disabled={isSubmitting || isPending}
                  sx={{ minWidth: 100 }}
                >
                  {isSubmitting || isPending ? 'Submitting...' : 'Submit'}
                </CustomButton>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </CommonModal>
  )
}

export default RetenderModal
