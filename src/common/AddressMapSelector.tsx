'use client'

import React, { useCallback, useState, useEffect, useRef } from 'react'

import { useForm, Controller } from 'react-hook-form'
import { Grid, TextField, Box } from '@mui/material'
import { Map, Marker, useMapsLibrary } from '@vis.gl/react-google-maps'
import { toast } from 'react-toastify'

import GoogleMapsProvider from './GoogleMapsProvider'

export const getAddressFieldStyles = (hasValue: boolean) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: hasValue ? '#26C6F9' : '#D1D5DB'
    },
    '&:hover fieldset': {
      borderColor: '#26C6F9'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#26C6F9',
      borderWidth: '1px'
    }
  },
  '& .MuiInputLabel-root': {
    color: '#9CA3AF',
    fontSize: '16px'
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#26C6F9'
  },
  '& .MuiInputLabel-shrink': {
    color: hasValue ? '#26C6F9' : '#9CA3AF'
  }
})

interface AddressFormData {
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

interface AddressMapSelectorProps {
  onLocationSelect?: (data: AddressFormData) => void
  onManualAddressChange?: () => void
  onManualAddressData?: (data: AddressFormData) => void
  initialData?: Partial<AddressFormData>
  showManualEntry?: boolean
}

const AddressMapSelector: React.FC<AddressMapSelectorProps> = ({
  onLocationSelect,
  onManualAddressChange,
  onManualAddressData,
  initialData = {},
  showManualEntry = true
}) => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(
    initialData.coordinates ? { lat: initialData.coordinates.lat, lng: initialData.coordinates.lng } : null
  )

  const [isManualEdit, setIsManualEdit] = useState(false)

  const places = useMapsLibrary('places')

  const { control, handleSubmit, setValue, watch, getValues } = useForm<AddressFormData>({
    defaultValues: {
      addressLine1: initialData?.addressLine1 || '',
      addressLine2: initialData?.addressLine2 || '',
      postcode: initialData?.postcode || '',
      region: initialData?.region || '',
      county: initialData?.county || '',
      coordinates: initialData?.coordinates || { lat: 0, lng: 0 }
    }
  })

  const addressLine1 = watch('addressLine1')
  const addressLine2 = watch('addressLine2')
  const postcode = watch('postcode')
  const region = watch('region')
  const county = watch('county')

  const onManualAddressDataRef = useRef(onManualAddressData)

  useEffect(() => {
    onManualAddressDataRef.current = onManualAddressData
  }, [onManualAddressData])

  const handleManualAddressData = useCallback((formData: AddressFormData) => {
    if (onManualAddressDataRef.current) {
      onManualAddressDataRef.current(formData)
    }
  }, [])

  useEffect(() => {
    if (!addressLine1?.trim() || !postcode?.trim()) return
    if (!places) return

    if (!isManualEdit) {
      return
    }

    const timeoutId = setTimeout(() => {
      const geocoder = new google.maps.Geocoder()
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

          if (onManualAddressChange) {
            onManualAddressChange()
          }

          const formData = {
            addressLine1,
            addressLine2,
            postcode,
            region,
            county,
            coordinates: { lat, lng }
          }

          handleManualAddressData(formData)
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

              if (onManualAddressChange) {
                onManualAddressChange()
              }

              const formData = {
                addressLine1,
                addressLine2,
                postcode,
                region,
                county,
                coordinates: { lat, lng }
              }

              handleManualAddressData(formData)
            } else {
              toast.warning('Could not find exact location. Please click on the map to set the location manually.')
            }
          })
        }
      })
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [
    addressLine1,
    addressLine2,
    postcode,
    region,
    county,
    places,
    isManualEdit,
    setValue,
    onManualAddressChange,
    handleManualAddressData
  ])

  useEffect(() => {
    if (!addressLine1?.trim()) return

    const timeoutId = setTimeout(() => {
      const hasValidData = addressLine1?.trim() && (postcode?.trim() || region?.trim() || county?.trim())

      if (hasValidData) {
        const currentCoordinates = getValues('coordinates')

        const formData = {
          addressLine1,
          addressLine2,
          postcode,
          region,
          county,
          coordinates: currentCoordinates
        }

        handleManualAddressData(formData)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [addressLine1, addressLine2, postcode, region, county, handleManualAddressData, getValues])

  const hasInitialDataLoaded = useRef(false)

  useEffect(() => {
    if (initialData && Object.keys(initialData)?.length > 0) {
      const isFirstLoad = !hasInitialDataLoaded.current

      setValue('addressLine1', initialData?.addressLine1 || '')
      setValue('addressLine2', initialData?.addressLine2 || '')
      setValue('postcode', initialData?.postcode || '')
      setValue('region', initialData?.region || '')
      setValue('county', initialData?.county || '')
      setValue('coordinates', initialData?.coordinates || { lat: 0, lng: 0 })

      if (initialData.coordinates) {
        setSelectedLocation({
          lat: initialData?.coordinates?.lat,
          lng: initialData?.coordinates?.lng
        })
      }

      if (isFirstLoad) {
        setIsManualEdit(false)
        hasInitialDataLoaded.current = true
      }
    }
  }, [initialData, setValue])

  const handleMapClick = useCallback(
    (event: any) => {
      if (event.detail && event.detail.latLng) {
        const lat = event.detail.latLng.lat
        const lng = event.detail.latLng.lng

        setSelectedLocation({ lat, lng })
        setValue('coordinates.lat', lat)
        setValue('coordinates.lng', lng)
        setIsManualEdit(false)

        if (onManualAddressChange) {
          onManualAddressChange()
        }

        if (places) {
          const geocoder = new google.maps.Geocoder()

          geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
              const result = results[0]
              const address = result?.formatted_address

              let postcode = ''
              let city = ''
              let state = ''
              let country = ''

              if (result.address_components) {
                for (const component of result?.address_components) {
                  if (component.types.includes('postal_code')) {
                    postcode = component.long_name
                  }

                  if (component.types.includes('locality')) {
                    city = component.long_name
                  }

                  if (component.types.includes('administrative_area_level_1')) {
                    state = component?.long_name
                  }

                  if (component.types.includes('country')) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    country = component?.long_name
                  }
                }
              }

              setValue('addressLine1', address)
              setValue('postcode', postcode)
              setValue('region', state)
              setValue('county', city)

              const mapData = {
                addressLine1: address,
                addressLine2: '',
                postcode: postcode,
                region: state,
                county: city,
                coordinates: { lat, lng }
              }

              if (onLocationSelect) {
                onLocationSelect(mapData)
              }
            } else {
              console.error('Geocoder failed due to: ' + status)
              toast.error('Failed to get address details')
            }
          })
        }
      }
    },
    [places, setValue, onManualAddressChange, onLocationSelect]
  )

  const onSubmit = (data: AddressFormData) => {
    if (onLocationSelect) {
      onLocationSelect(data)
    }

    if (onManualAddressChange) {
      onManualAddressChange()
    }

    if (onManualAddressData) {
      onManualAddressData(data)
    }
  }

  return (
    <GoogleMapsProvider>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {showManualEntry && (
              <>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='addressLine1'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Address Line 1'
                        placeholder='Enter address line 1'
                        error={!!error}
                        helperText={error?.message}
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
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Address Line 2'
                        placeholder='Enter address line 2'
                        error={!!error}
                        helperText={error?.message}
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
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Town'
                        placeholder='Enter region'
                        error={!!error}
                        helperText={error?.message}
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
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='County'
                        placeholder='Enter county'
                        error={!!error}
                        helperText={error?.message}
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
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Postcode'
                        placeholder='Enter postcode'
                        error={!!error}
                        helperText={error?.message}
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
              </>
            )}

            <Grid item xs={12}>
              <Box sx={{ width: '100%', height: '600px', borderRadius: 2, overflow: 'hidden' }}>
                <Map
                  key={selectedLocation ? `${selectedLocation.lat}-${selectedLocation.lng}` : 'no-location'}
                  zoom={selectedLocation ? 15 : 6}
                  center={selectedLocation || { lat: 54.5, lng: -3.5 }}
                  gestureHandling='cooperative'
                  disableDefaultUI={false}
                  onClick={handleMapClick}
                  style={{ width: '100%', height: '100%' }}
                >
                  {selectedLocation && <Marker position={selectedLocation} title='Selected Location' />}
                </Map>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </GoogleMapsProvider>
  )
}

export default AddressMapSelector
