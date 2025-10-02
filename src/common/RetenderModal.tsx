import React from 'react'

import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'

import { Box, Typography, Grid } from '@mui/material'

import FormSelect from '@/components/form-components/FormSelect'
import CustomButton from '@/common/CustomButton'
import CommonModal from '@/common/CommonModal'
import { setDaysOptions, setMilesOptions } from '@/constants'
import { retenderSchema } from '@/schemas/validation-schemas'

type RetenderFormData = {
  setDays: string
  setMiles: string
}

interface RetenderModalProps {
  isOpen: boolean
  handleClose: () => void
  tenderId?: string
}

const RetenderModal: React.FC<RetenderModalProps> = ({ isOpen, handleClose, tenderId = 'TND-xxxx' }) => {
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

  const onSubmit = async (data: RetenderFormData) => {
    try {
      console.log('Retender form data:', data)
      console.log('Tender ID:', tenderId)

      handleClose()
      reset()
    } catch (error) {
      console.error('Error submitting retender form:', error)
    }
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
                <CustomButton type='submit' variant='contained' disabled={isSubmitting} sx={{ minWidth: 100 }}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
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
