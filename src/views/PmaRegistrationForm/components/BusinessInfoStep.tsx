'use client'

import React, { useEffect, useRef } from 'react'

import { useForm, Controller } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Grid, TextField, Button, FormHelperText, Card, CardHeader, CardContent, Typography, Box } from '@mui/material'
import { ReCAPTCHA } from 'react-google-recaptcha'
import { useDispatch, useSelector } from 'react-redux'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import type { InferOutput } from 'valibot'

import {
  updateBusinessInfo,
  setIsVerified,
  setCoordinates,
  setShowMap
} from '@/redux-store/slices/pmaRegistrationSlice'

import type { RootState } from '@/redux-store'
import { businessInfoSchema } from '../PmaRegistrationSchema'

const DEFAULT_LAT = '51.5074'
const DEFAULT_LNG = '-0.1278'

type BusinessInfoData = InferOutput<typeof businessInfoSchema>

interface Props {
  defaultValues: BusinessInfoData
  onNext: (data: BusinessInfoData) => void
  onBack: () => void
}

const BusinessInfoStep = ({ defaultValues, onNext, onBack }: Props) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const dispatch = useDispatch()
  const { showMap, coordinates, isVerified } = useSelector((state: RootState) => state.pmaRegistration)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<BusinessInfoData>({
    resolver: valibotResolver(businessInfoSchema),
    defaultValues
  })

  useEffect(() => {
    if (!defaultValues.coordinates.lat || !defaultValues.coordinates.lng) {
      setValue('coordinates.lat', DEFAULT_LAT)
      setValue('coordinates.lng', DEFAULT_LNG)
      dispatch(setCoordinates({ lat: DEFAULT_LAT, lng: DEFAULT_LNG }))
    }
  }, [defaultValues.coordinates.lat, defaultValues.coordinates.lng, dispatch, setValue])

  const onSubmit = (data: BusinessInfoData) => {
    if (!isVerified) return
    dispatch(updateBusinessInfo(data))
    onNext(data)
  }

  const handleCaptchaChange = (token: string | null) => {
    dispatch(setIsVerified(!!token))
  }

  const handleMapClick = (lat: string, lng: string) => {
    dispatch(setCoordinates({ lat, lng }))
    setValue('coordinates.lat', lat)
    setValue('coordinates.lng', lng)
    dispatch(setShowMap(false))
  }

  const ReCAPTCHAFixed = ReCAPTCHA as unknown as React.FC<any>

  return (
    <Card elevation={0} sx={{ boxShadow: 'none' }}>
      <CardHeader title={<Typography variant='h6'>Business Information</Typography>} />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name='address'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Head Office Address'
                    error={!!errors.address}
                    helperText={errors.address?.message}
                    onBlur={() => dispatch(setShowMap(true))}
                  />
                )}
              />
            </Grid>

            {showMap && (
              <Grid item xs={12}>
                <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
                  <Map
                    zoom={14}
                    center={{
                      lat: parseFloat(coordinates.lat || DEFAULT_LAT),
                      lng: parseFloat(coordinates.lng || DEFAULT_LNG)
                    }}
                    onClick={e => {
                      const latLng = e.detail.latLng

                      if (latLng) {
                        handleMapClick(latLng.lat.toString(), latLng.lng.toString())
                      }
                    }}
                    style={{ height: 400, borderRadius: 8 }}
                  >
                    {coordinates.lat && coordinates.lng && (
                      <Marker position={{ lat: parseFloat(coordinates.lat), lng: parseFloat(coordinates.lng) }} />
                    )}
                  </Map>
                </APIProvider>
                {(errors.coordinates?.lat || errors.coordinates?.lng) && (
                  <FormHelperText error>
                    {errors.coordinates?.lat?.message || errors.coordinates?.lng?.message}
                  </FormHelperText>
                )}
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <Controller
                name='website'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Website'
                    error={!!errors.website}
                    helperText={errors.website?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name='landline'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Landline'
                    error={!!errors.landline}
                    helperText={errors.landline?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <ReCAPTCHAFixed
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                onChange={handleCaptchaChange}
                onExpired={() => dispatch(setIsVerified(false))}
              />
              {!isVerified && <FormHelperText error>Please complete the CAPTCHA verification</FormHelperText>}
            </Grid>

            <Grid item xs={12}>
              <Box display='flex' justifyContent='space-between' mt={4}>
                <Button variant='outlined' color='secondary' onClick={onBack}>
                  Back
                </Button>
                <Button type='submit' variant='contained' disabled={!isVerified}>
                  Next
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default BusinessInfoStep
