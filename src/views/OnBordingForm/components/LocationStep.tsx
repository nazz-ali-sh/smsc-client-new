import React, { useCallback, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import type { MapMouseEvent } from '@vis.gl/react-google-maps'
import { AdvancedMarker, Map, useMapsLibrary } from '@vis.gl/react-google-maps'
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

import { updateLocation, setCurrentStep } from '@/redux-store/slices/multiStepForm'
import { useAutocompleteSuggestions } from './use-autocomplete-suggestions'
import { locationSchema } from './PreFunnelSchema'
import FormNavigation from './FormNavigation'
import type { AutocompleteSuggestion, LocationStepProps } from '../types'
import { steps } from '../data'
import type { RootState } from '../../../redux-store/index'
import { onBoardingFlow } from '@/services/on-boarding-apis/onboarding-api'

const LocationStep: React.FC<LocationStepProps> = ({
  formData,
  currentStep,
  selectedLocation,
  setSelectedLocation,
  onBack
}) => {
  const dispatch = useDispatch()
  const places = useMapsLibrary('places')

  const {
    control: locationControl,
    handleSubmit: handleLocationSubmit,
    setValue: setLocationValue
  } = useForm({
    resolver: valibotResolver(locationSchema),
    defaultValues: {
      address: formData.location.address || '',
      postcode: formData.location.postcode || '',
      coordinates: {
        lat: formData.location.coordinates?.lat?.toString() || '0',
        lng: formData.location.coordinates?.lng?.toString() || '0'
      }
    }
  })

  const googleMapId = process.env.NEXT_PUBLIC_Maps_Id || ''
  const session_id = useSelector((state: RootState) => state.form.steps.aboutYou.session_id)

  // mutation function
  const { mutate } = useMutation({
    mutationFn: (payload: any) => onBoardingFlow(2, payload), // step 2
    onSuccess: (responseData: any) => {
      const locationSessionID = responseData?.data?.session_id

      if (responseData?.data?.session_id) {
        dispatch(updateLocation({ session_id: locationSessionID }))
      }

      if (responseData?.status === 'success' && responseData?.data?.payload) {
        dispatch(updateLocation(responseData.payload))
      }

      dispatch(setCurrentStep(currentStep + 1))
      toast.success('Location submitted to API and saved')
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Some Thing Went Wrong '

      console.error('Location API error:', errorMessage)
      toast.error(errorMessage)
    }
  })

  const [inputValue, setInputValue] = useState<string>(formData.location.address || '')
  const { suggestions, resetSession } = useAutocompleteSuggestions(inputValue)

  const handleInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value

      setInputValue(newValue)
      setLocationValue('address', newValue)
    },
    [setLocationValue]
  )

  const handleSuggestionClick = useCallback(
    async (suggestion: AutocompleteSuggestion) => {
      if (!places || !suggestion) return

      // Handle placePrediction (specific places)
      if (suggestion.placePrediction) {
        const placeId = suggestion.placePrediction.placeId || suggestion.placePrediction.place

        if (!placeId) {
          console.error('No placeId found in placePrediction')

          return
        }

        const service = new places.PlacesService(document.createElement('div'))

        service.getDetails(
          {
            placeId,
            fields: ['formatted_address', 'geometry.location', 'address_components', 'name']
          },
          (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place) {
              const address = place.formatted_address || place.name || ''

              const location = place.geometry?.location
                ? { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }
                : null

              console.log('ADDRESS', address)
              console.log('LOCATION', location)

              setInputValue(address)
              setLocationValue('address', address)

              if (location) {
                setLocationValue('coordinates.lat', location.lat.toString())
                setLocationValue('coordinates.lng', location.lng.toString())
                setSelectedLocation(location)
              }

              let postcode = ''
              let city = ''
              let state = ''

              if (place.address_components) {
                for (const component of place.address_components) {
                  if (component.types.includes('postal_code')) {
                    postcode = component.long_name
                  }

                  if (component.types.includes('locality')) {
                    city = component.long_name
                  }

                  if (component.types.includes('administrative_area_level_1')) {
                    state = component.long_name
                  }
                }
              }

              setLocationValue('postcode', postcode)
              setLocationValue('city', city)
              setLocationValue('state', state)

              resetSession()
            } else {
              console.error('Places service error:', status)
              toast.error('Failed to get place details')
            }
          }
        )
      } else if (suggestion.queryPrediction) {
        const queryText = suggestion.queryPrediction.text.text

        setInputValue(queryText)
        setLocationValue('address', queryText)

        // Try to geocode the query
        if (places) {
          const geocoder = new google.maps.Geocoder()

          geocoder.geocode({ address: queryText }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
              const result = results[0]
              const location = result.geometry.location
              const address = result.formatted_address

              setInputValue(address)
              setLocationValue('address', address)
              setLocationValue('coordinates.lat', location.lat().toString())
              setLocationValue('coordinates.lng', location.lng().toString())
              setSelectedLocation({ lat: location.lat(), lng: location.lng() })

              // Extract postcode from geocoding result
              let postcode = ''
              let city = ''
              let state = ''

              if (result.address_components) {
                for (const component of result.address_components) {
                  if (component.types.includes('postal_code')) {
                    postcode = component.long_name
                  }

                  if (component.types.includes('locality')) {
                    city = component.long_name
                  }

                  if (component.types.includes('administrative_area_level_1')) {
                    state = component.long_name
                  }
                }
              }

              setLocationValue('postcode', postcode)
              setLocationValue('city', city)
              setLocationValue('state', state)
            }
          })
        }

        resetSession()
      }
    },
    [places, setLocationValue, setSelectedLocation, resetSession]
  )

  const handleMapClick = useCallback(
    (event: MapMouseEvent) => {
      if (event.detail && event.detail.latLng) {
        const lat = event.detail.latLng.lat
        const lng = event.detail.latLng.lng

        setSelectedLocation({ lat, lng })
        setLocationValue('coordinates.lat', lat.toString())
        setLocationValue('coordinates.lng', lng.toString())

        console.log('----> PLACES', places)

        // Reverse geocode to get address
        if (places) {
          const geocoder = new google.maps.Geocoder()

          geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            console.log(results, 'results>>>')

            if (status === 'OK' && results && results[0]) {
              const result = results[0] // Get the most relevant result
              const address = result.formatted_address

              // --- Extract Postal Code here ---
              let postcode = ''
              let city = ''
              let state = ''

              console.log('------> RESULT', result)

              if (result.address_components) {
                for (const component of result.address_components) {
                  if (component.types.includes('postal_code')) {
                    postcode = component.long_name
                    console.log(postcode, 'postcode>>>>>>')
                  }

                  if (component.types.includes('locality')) {
                    // City
                    city = component.long_name
                  }

                  if (component.types.includes('administrative_area_level_1')) {
                    // State/Province
                    state = component.long_name
                  }
                }
              }

              setInputValue(address)
              setLocationValue('address', address)
              setLocationValue('postcode', postcode)
              setLocationValue('city', city)
              setLocationValue('state', state)
            } else {
              console.error('Geocoder failed due to: ' + status)
              toast.error('Failed to get address details for map click')
            }
          })
        }
      }
    },
    [setSelectedLocation, setLocationValue, places]
  )

  const handleMapRightClick = useCallback(
    (event: MapMouseEvent) => {
      if (event.domEvent) {
        const domEvent = event.domEvent as MouseEvent

        if (domEvent.button === 2) {
          domEvent.preventDefault()

          if (event.detail.latLng) {
            const lat = event.detail.latLng.lat
            const lng = event.detail.latLng.lng

            setSelectedLocation({ lat, lng })
            setLocationValue('coordinates.lat', lat.toString())
            setLocationValue('coordinates.lng', lng.toString())

            // Reverse geocode for right-click as well
            if (places) {
              const geocoder = new google.maps.Geocoder()

              geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                if (status === 'OK' && results && results[0]) {
                  const result = results[0] // Get the most relevant result
                  const address = results[0].formatted_address

                  // --- Extract Postal Code here ---
                  let postcode = ''
                  let city = ''
                  let state = ''

                  if (result.address_components) {
                    for (const component of result.address_components) {
                      if (component.types.includes('postal_code')) {
                        postcode = component.long_name
                      }

                      if (component.types.includes('locality')) {
                        // City
                        city = component.long_name
                      }

                      if (component.types.includes('administrative_area_level_1')) {
                        // State/Province
                        state = component.long_name
                      }
                    }
                  }

                  setInputValue(address)
                  setLocationValue('address', address)
                  setLocationValue('postcode', postcode) // Set the extracted postcode
                  setLocationValue('city', city)
                  setLocationValue('state', state) // Set the extracted state

                  console.log('Reverse Geocode (Right-Click) Address:', address)
                  console.log('Reverse Geocode (Right-Click) Postcode:', postcode)
                  console.log('Reverse Geocode (Right-Click) City:', city)
                  console.log('Reverse Geocode (Right-Click) State:', state)
                } else {
                  console.error('Geocoder failed due to: ' + status)
                  toast.error('Failed to get address details for map right-click')
                }
              })
            }
          }
        }
      }
    },
    [setSelectedLocation, setLocationValue, places]
  )

  const onSubmit = (data: any) => {
    console.log(`Submitting data for step 1:`, data)

    try {
      const lat = parseFloat(data.coordinates.lat) || 0
      const lng = parseFloat(data.coordinates.lng) || 0

      if (lat === 0 && lng === 0) {
        toast.error('Please select a valid location')

        return
      }

      if (!data.postcode || String(data.postcode).trim() === '') {
        toast.error('Postcode is required.')

        return
      }

      dispatch(
        updateLocation({
          address: data.address,
          coordinates: { lat, lng }
        })
      )

      if (session_id) {
        const payload = {
          session_id,
          postcode: data.postcode,
          lat,
          lng,
          city: data.city || '',
          state: data.state || '',
          address: data.address || ''
        }

        mutate(payload)
      } else {
        toast.error('Session ID not found in Redux')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Failed to save form data')
    }
  }

  const getSuggestionText = (suggestion: AutocompleteSuggestion): string => {
    if (suggestion.placePrediction) {
      return (
        suggestion.placePrediction.text?.text ||
        suggestion.placePrediction.structuredFormat?.mainText?.text ||
        'Unknown location'
      )
    } else if (suggestion.queryPrediction) {
      return suggestion.queryPrediction.text?.text || 'Unknown query'
    }

    return 'Unknown suggestion'
  }

  const getSuggestionMainText = (suggestion: AutocompleteSuggestion): string => {
    if (suggestion.placePrediction?.structuredFormat?.mainText?.text) {
      return suggestion.placePrediction.structuredFormat.mainText.text
    }

    return getSuggestionText(suggestion)
  }

  const getSuggestionSecondaryText = (suggestion: AutocompleteSuggestion): string | null => {
    if (suggestion.placePrediction?.structuredFormat?.secondaryText?.text) {
      return suggestion.placePrediction.structuredFormat.secondaryText.text
    }

    return null
  }

  return (
    <form key={1} onSubmit={handleLocationSubmit(data => onSubmit(data))}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography className='font-medium' color='text.primary'>
            {steps[1].title}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name='address'
            control={locationControl}
            render={({ fieldState: { error } }) => (
              <div className='autocomplete-container' style={{ position: 'relative' }}>
                <TextField
                  fullWidth
                  label='Address'
                  value={inputValue}
                  onChange={handleInput}
                  placeholder='Search for a place'
                  error={!!error}
                  helperText={error?.message}
                />
                {suggestions.length > 0 && (
                  <ul
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      background: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      margin: 0,
                      padding: 0,
                      listStyle: 'none',
                      zIndex: 1000,
                      maxHeight: '200px',
                      overflowY: 'auto',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    {suggestions.map((suggestion, index) => {
                      const key =
                        suggestion.placePrediction?.placeId ||
                        suggestion.placePrediction?.place ||
                        suggestion.queryPrediction?.text?.text ||
                        index

                      return (
                        <li
                          key={key}
                          onClick={() => handleSuggestionClick(suggestion)}
                          style={{
                            padding: '12px 16px',
                            cursor: 'pointer',
                            borderBottom: index < suggestions.length - 1 ? '1px solid #eee' : 'none'
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = '#f5f5f5'
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = 'transparent'
                          }}
                        >
                          <div style={{ fontWeight: 500 }}>{getSuggestionMainText(suggestion)}</div>
                          {getSuggestionSecondaryText(suggestion) && (
                            <div style={{ fontSize: '0.875rem', color: '#666', marginTop: '2px' }}>
                              {getSuggestionSecondaryText(suggestion)}
                            </div>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name='postcode'
            control={locationControl}
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                label='Postcode'
                {...field}
                placeholder='Enter postcode'
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <section className='w-[90%] my-[60px] mx-auto'>
          <div className='w-full h-[600px]'>
            <Map
              mapId={googleMapId}
              defaultZoom={2}
              defaultCenter={{ lat: 20, lng: 0 }}
              gestureHandling='cooperative'
              disableDefaultUI={false}
              onClick={handleMapClick}
              onContextmenu={handleMapRightClick}
              style={{ width: '100%', height: '100%' }}
            >
              {selectedLocation && <AdvancedMarker position={selectedLocation} title='Selected Location' />}
            </Map>
          </div>
        </section>
        <Grid item xs={12} className='flex justify-between'>
          <FormNavigation currentStep={currentStep} totalSteps={4} onBack={onBack} isSubmit={false} />
        </Grid>
      </Grid>
    </form>
  )
}

export default LocationStep
