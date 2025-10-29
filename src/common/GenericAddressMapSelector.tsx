'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react'

import { useForm, Controller } from 'react-hook-form'
import { Map, Marker, useMapsLibrary } from '@vis.gl/react-google-maps'
import { Grid, TextField, Box } from '@mui/material'

import GoogleMapsProvider from './GoogleMapsProvider'
import { getAddressFieldStyles } from './AddressMapSelector'

interface MapAddressData {
  addressLine1: string
  addressLine2: string
  postcode: string
  region: string
  county: string
  coordinates: {
    lat: number
    lng: number
  }
}

interface GenericAddressMapSelectorProps {
  onLocationSelect?: (data: MapAddressData) => void
  onManualAddressData?: (data: MapAddressData) => void
  showManualEntry?: boolean
  initialData?: MapAddressData
  mapCenter?: { lat: number; lng: number }
  mapZoom?: number
}

const GenericAddressMapSelector: React.FC<GenericAddressMapSelectorProps> = ({
  onLocationSelect,
  onManualAddressData,
  showManualEntry = true,
  initialData,
  mapCenter = { lat: 51.5074, lng: -0.1278 },
  mapZoom = 13
}) => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(
    initialData?.coordinates || null
  )

  const [isManualEdit, setIsManualEdit] = useState(false)
  const geocodingLib = useMapsLibrary('geocoding')

  const defaultFormValues = React.useMemo(
    () => ({
      addressLine1: initialData?.addressLine1 || '',
      addressLine2: initialData?.addressLine2 || '',
      postcode: initialData?.postcode || '',
      region: initialData?.region || '',
      county: initialData?.county || '',
      coordinates: initialData?.coordinates || { lat: mapCenter.lat, lng: mapCenter.lng }
    }),
    [initialData, mapCenter]
  )

  const { control, watch, setValue, reset } = useForm<MapAddressData>({
    defaultValues: defaultFormValues
  })

  const addressLine1 = watch('addressLine1')
  const addressLine2 = watch('addressLine2')
  const postcode = watch('postcode')
  const region = watch('region')
  const county = watch('county')

  const isInitializedRef = useRef(false)

  useEffect(() => {
    if (initialData && !isInitializedRef.current) {
      setSelectedLocation(initialData.coordinates || null)
      reset({
        addressLine1: initialData.addressLine1 || '',
        addressLine2: initialData.addressLine2 || '',
        postcode: initialData.postcode || '',
        region: initialData.region || '',
        county: initialData.county || '',
        coordinates: initialData.coordinates || { lat: mapCenter.lat, lng: mapCenter.lng }
      })
      isInitializedRef.current = true
    }
  }, [initialData, reset, mapCenter])

  const handleMapClick = useCallback(
    (event: any) => {
      if (!geocodingLib || !event.detail.latLng) return

      const { lat, lng } = event.detail.latLng
      const geocoder = new geocodingLib.Geocoder()

      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const result = results[0]
          const addressComponents = result.address_components || []

          let addressLine1 = ''
          let addressLine2 = ''
          let postcode = ''
          let region = ''
          let county = ''

          addressComponents.forEach(component => {
            const types = component.types

            if (types.includes('street_number') || types.includes('route')) {
              addressLine1 += component.long_name + ' '
            }

            if (types.includes('sublocality') || types.includes('sublocality_level_1')) {
              addressLine2 = component.long_name
            }

            if (types.includes('postal_code')) {
              postcode = component.long_name
            }

            if (types.includes('locality') || types.includes('administrative_area_level_2')) {
              region = component.long_name
            }

            if (types.includes('administrative_area_level_1')) {
              county = component.long_name
            }
          })

          const addressData: MapAddressData = {
            addressLine1: addressLine1.trim(),
            addressLine2,
            postcode,
            region,
            county,
            coordinates: { lat, lng }
          }

          setSelectedLocation({ lat, lng })
          setValue('addressLine1', addressLine1.trim())
          setValue('addressLine2', addressLine2)
          setValue('postcode', postcode)
          setValue('region', region)
          setValue('county', county)
          setValue('coordinates', { lat, lng })

          if (onManualAddressData) {
            onManualAddressData(addressData)
          }

          if (onLocationSelect) {
            onLocationSelect(addressData)
          }
        }
      })
    },
    [geocodingLib, onLocationSelect, onManualAddressData, setValue]
  )

  useEffect(() => {
    if (!addressLine1?.trim() || !isManualEdit || !geocodingLib) return

    const timeoutId = setTimeout(() => {
      const geocoder = new geocodingLib.Geocoder()
      const addressParts = [addressLine1, addressLine2, county, region, postcode].filter(part => part && part.trim())
      const fullAddressString = addressParts.join(', ')

      geocoder.geocode({ address: fullAddressString }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const location = results[0].geometry.location
          const lat = location.lat()
          const lng = location.lng()

          setValue('coordinates.lat', lat)
          setValue('coordinates.lng', lng)
          setSelectedLocation({ lat, lng })

          const formData: MapAddressData = {
            addressLine1,
            addressLine2,
            postcode,
            region,
            county,
            coordinates: { lat, lng }
          }

          onManualAddressData?.(formData)
        } else {
          const fallbackAddress = `${addressLine1}, ${postcode}`

          geocoder.geocode({ address: fallbackAddress }, (fallbackResults, fallbackStatus) => {
            if (fallbackStatus === 'OK' && fallbackResults && fallbackResults[0]) {
              const location = fallbackResults[0].geometry.location
              const lat = location.lat()
              const lng = location.lng()

              setValue('coordinates.lat', lat)
              setValue('coordinates.lng', lng)
              setSelectedLocation({ lat, lng })

              const formData: MapAddressData = {
                addressLine1,
                addressLine2,
                postcode,
                region,
                county,
                coordinates: { lat, lng }
              }

              onManualAddressData?.(formData)
            }
          })
        }
      })
    }, 1000)

    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressLine1, addressLine2, postcode, region, county, isManualEdit, geocodingLib])

  return (
    <GoogleMapsProvider>
      <div className='space-y-3'>
        {showManualEntry && (
          <div>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='addressLine1'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label='Address Line 1'
                      placeholder='Address Line 1'
                      fullWidth
                      variant='outlined'
                      sx={getAddressFieldStyles(!!field.value)}
                      onChange={e => {
                        field.onChange(e)
                        setIsManualEdit(true)
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='addressLine2'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label='Address Line 2'
                      placeholder='Address Line 2'
                      fullWidth
                      variant='outlined'
                      sx={getAddressFieldStyles(!!field.value)}
                      onChange={e => {
                        field.onChange(e)
                        setIsManualEdit(true)
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4} sx={{ marginTop: 3 }}>
                <Controller
                  name='region'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label='Town'
                      placeholder='Town'
                      fullWidth
                      variant='outlined'
                      sx={getAddressFieldStyles(!!field.value)}
                      onChange={e => {
                        field.onChange(e)
                        setIsManualEdit(true)
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ marginTop: 3 }}>
                <Controller
                  name='county'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label='County'
                      placeholder='County'
                      fullWidth
                      variant='outlined'
                      sx={getAddressFieldStyles(!!field.value)}
                      onChange={e => {
                        field.onChange(e)
                        setIsManualEdit(true)
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ marginTop: 3 }}>
                <Controller
                  name='postcode'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label='Postcode'
                      placeholder='Postcode'
                      fullWidth
                      variant='outlined'
                      sx={getAddressFieldStyles(!!field.value)}
                      onChange={e => {
                        field.onChange(e)
                        setIsManualEdit(true)
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </div>
        )}

        <Box sx={{ width: '100%', height: '600px', borderRadius: 2, overflow: 'hidden' }}>
          <Map
            key={selectedLocation ? `${selectedLocation.lat}-${selectedLocation.lng}` : 'no-location'}
            zoom={selectedLocation ? mapZoom : 6}
            center={selectedLocation || mapCenter}
            gestureHandling='cooperative'
            disableDefaultUI={false}
            onClick={handleMapClick}
            style={{ width: '100%', height: '100%' }}
          >
            {selectedLocation && <Marker position={selectedLocation} title='Selected Location' />}
          </Map>
        </Box>
      </div>
    </GoogleMapsProvider>
  )
}

export default GenericAddressMapSelector
