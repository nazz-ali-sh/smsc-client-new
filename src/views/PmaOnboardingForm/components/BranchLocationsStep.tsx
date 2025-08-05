'use client'

import { useEffect, useState } from 'react'

import {
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import { useForm, Controller } from 'react-hook-form'

import type { BranchLocation } from '@/redux-store/slices/pmaOnboardingFormSlice'

interface Props {
  defaultValues?: BranchLocation
  onNext: (data: { branches: BranchLocation[] }) => void
  onBack: () => void
}

const BranchLocationsStep: React.FC<Props> = ({ defaultValues, onNext, onBack }) => {
  const [useHeadOfficeContact, setUseHeadOfficeContact] = useState(false)

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<BranchLocation>({
    defaultValues: {
      branchName: '',
      fullAddress: '',
      lat: 51.5074,
      lng: -0.1278,
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      tenderRecipient: 'Branch Contact',
      ...defaultValues
    }
  })

  const lat = watch('lat')
  const lng = watch('lng')

  useEffect(() => {
    if (useHeadOfficeContact) {
      setValue('contactName', 'Head Office Contact')
      setValue('contactEmail', '')
      setValue('contactPhone', '')
    }
  }, [useHeadOfficeContact, setValue])

  const onMapClick = (e: any) => {
    if (e.latLng) {
      setValue('lat', e.latLng.lat())
      setValue('lng', e.latLng.lng())
    }
  }

  const onSubmit = (data: BranchLocation) => {
    onNext({ branches: [data] })
  }

  return (
    <Card sx={{ boxShadow: 'none' }}>
      <CardHeader title='Branch Locations' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Branch Name (e.g. “Manchester – Deansgate”)'
                {...register('branchName', { required: 'Branch name is required' })}
                error={!!errors.branchName}
                helperText={errors.branchName?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Full Address (Postcode)'
                {...register('fullAddress', { required: 'Full address is required' })}
                error={!!errors.fullAddress}
                helperText={errors.fullAddress?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
                <Map center={{ lat, lng }} zoom={14} style={{ height: 300, borderRadius: 8 }} onClick={onMapClick}>
                  <Marker position={{ lat, lng }} />
                </Map>
              </APIProvider>
              <Typography variant='body2' color='text.secondary' mt={1}>
                Please confirm your branch location by clicking on the map.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox checked={useHeadOfficeContact} onChange={e => setUseHeadOfficeContact(e.target.checked)} />
                }
                label='Use Head Office Contact'
              />
            </Grid>

            {!useHeadOfficeContact && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Contact Name (shown in reports)'
                    {...register('contactName', { required: 'Contact name is required' })}
                    error={!!errors.contactName}
                    helperText={errors.contactName?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Contact Email'
                    {...register('contactEmail', { required: 'Contact email is required' })}
                    error={!!errors.contactEmail}
                    helperText={errors.contactEmail?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Contact Phone Number'
                    {...register('contactPhone', { required: 'Contact phone is required' })}
                    error={!!errors.contactPhone}
                    helperText={errors.contactPhone?.message}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='tenderRecipient'
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel>Tender Notification Recipient</InputLabel>
                        <Select {...field} label='Tender Notification Recipient'>
                          <MenuItem value='Branch Contact'>Branch Contact</MenuItem>
                          <MenuItem value='Primary/Secondary User'>Primary/Secondary User</MenuItem>
                          <MenuItem value='Both'>Both</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='body2' color='text.secondary'>
                You can manage branch user access and permissions from within your user settings. Adding branches
                ensures local tenders are routed to the correct contact.
              </Typography>
            </Grid>
          </Grid>

          <Grid container justifyContent='space-between' mt={4}>
            <Button variant='outlined' onClick={onBack}>
              Back
            </Button>
            <Button variant='contained' type='submit'>
              Complete
            </Button>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default BranchLocationsStep
