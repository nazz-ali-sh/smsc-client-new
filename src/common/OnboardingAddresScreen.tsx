'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

import { Typography, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material'

import CustomButton from '@/common/CustomButton'
import AddressMapSelector from '@/common/AddressMapSelector'
import {
  setSelectedAddress as setPostcodeSelectedAddress,
  clearPostcodeData,
  setPostcodeAddresses,
  type PostcodeAddress
} from '@/redux-store/slices/postcodeSlice'
import { setSelectedAddress } from '@/redux-store/slices/rmcOnboardingSlice'
import { submitRmcBlockDetails, type RmcBlockDetailsPayload } from '@/services/rmc-onboarding-apis/rmc-onboarding-api'
import { submitPmaAddress, type PmaAddressPayload } from '@/services/pma-onboarding-apis/pma-onboarding-api'
import { lookupPostcode, type PostcodeLookupPayload } from '@/services/postcode-apis/postcode-api'
import { useRmcOnboardingData } from '@/hooks/useRmcOnboardingData'
import type { RootState } from '@/redux-store'
import { usePmaOnboardingData } from '@/hooks/usePmaOnboardingData'

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

const OnboardingAddresScreen = ({ portal, hideHeader = false, hideDescription = false }: OnboardingPortalProps) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [selectedAddressId, setSelectedAddressId] = useState('')
  const [mapSelectedAddress, setMapSelectedAddress] = useState<MapAddressData | null>(null)
  const [manualAddressData, setManualAddressData] = useState<MapAddressData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const hasAttemptedFetch = useRef(false)

  const { addresses, currentPostcode } = useSelector((state: any) => state.postcode)
  const { selectedAddress, rmcData } = useSelector((state: RootState) => state.rmcOnboarding)
  const { data: onboardingData, invalidateCache } = useRmcOnboardingData()
  const { data: pmaOnboardingData } = usePmaOnboardingData()

  const rmcMutation = useMutation({
    mutationFn: submitRmcBlockDetails,
    onSuccess: () => {
      router.push('/details')
      invalidateCache()
    },
    onError: (error: any) => {
      console.error('Error submitting address details:', error)
      toast.error('Failed to submit address details. Please try again.')
      setIsSubmitting(false)
    }
  })

  const pmaMutation = useMutation({
    mutationFn: submitPmaAddress,
    onSuccess: () => {
      router.push('/business-profile')
    },
    onError: (error: any) => {
      console.error('Error submitting address details:', error)
      toast.error('Failed to submit address details. Please try again.')
      setIsSubmitting(false)
    }
  })

  const postcodeMutation = useMutation({
    mutationFn: lookupPostcode,
    onSuccess: (data, variables) => {
      if (data?.result && data?.result?.length > 0) {
        const mappedAddresses: PostcodeAddress[] = data?.result?.map(address => ({
          longitude: address?.longitude,
          latitude: address?.latitude,
          postcode: address?.postcode,
          country: address?.country,
          post_town: address?.post_town,
          line_1: address?.line_1,
          line_2: address?.line_2,
          udprn: address?.udprn,
          county: address?.county,
          line_3: address.line_3
        }))

        dispatch(
          setPostcodeAddresses({
            addresses: mappedAddresses,
            postcode: variables?.postcode
          })
        )
      } else {
        toast.error('No addresses found for this postcode.')
      }
    },
    onError: (error: any) => {
      console.error('Error fetching postcode data:', error)
    }
  })

  useEffect(() => {
    if (addresses && addresses?.length > 0) {
      return
    }

    if (hasAttemptedFetch?.current) {
      return
    }

    let savedPostcode = ''

    if (portal === 'rmc_portal') {
      savedPostcode =
        (typeof onboardingData?.steps?.step_3?.postcode === 'string' && onboardingData?.steps?.step_3?.postcode) ||
        localStorage.getItem('rmc-onboarding-postcode') ||
        ''
    } else if (portal === 'pma_portal') {
      savedPostcode = pmaOnboardingData?.data?.step_3?.postcode ?? localStorage.getItem('pma-onboarding-postcode') ?? ''
    }

    const trimmedPostcode = savedPostcode?.trim()

    if (trimmedPostcode) {
      hasAttemptedFetch.current = true

      const payload: PostcodeLookupPayload = {
        postcode: trimmedPostcode
      }

      postcodeMutation.mutate(payload)
    }
  }, [addresses, onboardingData?.steps?.step_3?.postcode, pmaOnboardingData?.data?.step_3?.postcode, portal])

  useEffect(() => {
    if (portal === 'rmc_portal' && onboardingData?.steps?.step_3) {
      // this is for rmc onbaording
      const savedData = onboardingData?.steps.step_3

      let foundAddress = null

      if (addresses && addresses?.length > 0) {
        foundAddress = addresses?.find(
          (address: any) => address?.line_1 === savedData?.address && address?.postcode === savedData?.postcode
        )
      }

      if (foundAddress) {
        const addressId = `${foundAddress.line_1 || ''}-${foundAddress?.postcode || ''}`
          ?.replace(/\s+/g, '-')
          ?.toLowerCase()

        setSelectedAddressId(addressId)
        dispatch(setPostcodeSelectedAddress(foundAddress))
        dispatch(setSelectedAddress(foundAddress))

        const manualData: MapAddressData = {
          addressLine1: foundAddress.line_1 || '',
          addressLine2: savedData?.address_line2 || foundAddress.line_2 || '',
          postcode: foundAddress.postcode || '',
          region: savedData?.region || foundAddress.post_town || '',
          county: savedData?.county || foundAddress.county || '',
          coordinates: {
            lat: parseFloat(savedData?.lat) || parseFloat(foundAddress.latitude) || 0,
            lng: parseFloat(savedData?.lng) || parseFloat(foundAddress.longitude) || 0
          }
        }

        setManualAddressData(manualData)
      } else {
        const manualData: MapAddressData = {
          addressLine1: savedData?.address || '',
          addressLine2: savedData?.address_line2 || '',
          postcode: savedData?.postcode || '',
          region: savedData?.region || '',
          county: savedData?.county || '',
          coordinates: {
            lat: parseFloat(savedData?.lat) || 0,
            lng: parseFloat(savedData?.lng) || 0
          }
        }

        setManualAddressData(manualData)
        setSelectedAddressId('')
        dispatch(setPostcodeSelectedAddress(null as any))
        dispatch(setSelectedAddress(null as any))
      }
    } else if (portal === 'pma_portal' && pmaOnboardingData?.data?.step_3) {
      //  for PMA Sign Up
      const savedData = pmaOnboardingData?.data?.step_3

      let foundAddress = null

      if (addresses && addresses?.length > 0) {
        foundAddress = addresses?.find(
          (address: any) => address?.line_1 === savedData?.address && address?.postcode === savedData?.postcode
        )
      }

      if (foundAddress) {
        const addressId = `${foundAddress.line_1 || ''}-${foundAddress?.postcode || ''}`
          ?.replace(/\s+/g, '-')
          ?.toLowerCase()

        setSelectedAddressId(addressId)
        dispatch(setPostcodeSelectedAddress(foundAddress))
        dispatch(setSelectedAddress(foundAddress))

        const manualData: MapAddressData = {
          addressLine1: foundAddress.line_1 || '',
          addressLine2: savedData?.address_line2 || foundAddress.line_2 || '',
          postcode: foundAddress.postcode || '',
          region: savedData?.region || foundAddress.post_town || '',
          county: savedData?.county || foundAddress.county || '',
          coordinates: {
            lat: parseFloat(savedData?.lat) || parseFloat(foundAddress.latitude) || 0,
            lng: parseFloat(savedData?.lng) || parseFloat(foundAddress.longitude) || 0
          }
        }

        setManualAddressData(manualData)
      } else {
        const manualData: MapAddressData = {
          addressLine1: savedData?.address || '',
          addressLine2: savedData?.address_line2 || '',
          postcode: savedData?.postcode || '',
          region: savedData?.region || '',
          county: savedData?.county || '',
          coordinates: {
            lat: parseFloat(savedData?.lat) || 0,
            lng: parseFloat(savedData?.lng) || 0
          }
        }

        setManualAddressData(manualData)
        setSelectedAddressId('')
        dispatch(setPostcodeSelectedAddress(null as any))
        dispatch(setSelectedAddress(null as any))
      }
    }
  }, [onboardingData, pmaOnboardingData, addresses, dispatch, portal])

  const handleAddressChange = (event: any) => {
    const addressId = event.target.value

    setSelectedAddressId(addressId)
    setManualAddressData(null)

    const address = addresses?.find((addr: any) => {
      const addrId = `${addr?.line_1 || ''}-${addr?.postcode || ''}`?.replace(/\s+/g, '-')?.toLowerCase()

      return addrId === addressId
    })

    if (address) {
      dispatch(setPostcodeSelectedAddress(address))
      dispatch(setSelectedAddress(address))

      const mapAddressData: MapAddressData = {
        addressLine1: address.line_1 || '',
        addressLine2: address.line_2 || '',
        postcode: address.postcode || '',
        region: address.post_town || '',
        county: address.county || '',
        coordinates: {
          lat: parseFloat(address.latitude) || 0,
          lng: parseFloat(address.longitude) || 0
        }
      }

      setMapSelectedAddress(mapAddressData)

      setManualAddressData(mapAddressData)
    }
  }

  const handleMapAddressSelect = useCallback(
    (data: MapAddressData) => {
      setMapSelectedAddress(data)
      setSelectedAddressId('')
      setManualAddressData(data)

      dispatch(setPostcodeSelectedAddress(null as any))
      dispatch(setSelectedAddress(null as any))
    },
    [dispatch]
  )

  const handleManualAddressChange = useCallback(() => {
    // Do nothing - we want to keep the dropdown selection when manually editing fields
  }, [])

  const handleManualAddressData = useCallback((data: MapAddressData) => {
    setManualAddressData(data)
  }, [])

  const handleNavigate = () => {
    if (isSubmitting || rmcMutation.isPending || pmaMutation.isPending) return

    const hasDropdownAddress = selectedAddressId && selectedAddress
    const hasMapOrManualAddress = mapSelectedAddress || (manualAddressData && manualAddressData?.addressLine1)

    if (!hasDropdownAddress && !hasMapOrManualAddress) {
      toast.error('Please select an address from the dropdown or use the map to select a location')
      setIsSubmitting(false)

      return
    }

    setIsSubmitting(true)

    if (manualAddressData && manualAddressData.addressLine1) {
      const { addressLine1, postcode, region, county } = manualAddressData

      if (!addressLine1?.trim()) {
        toast.error('Address Line 1 is required')
        setIsSubmitting(false)

        return
      }

      if (!postcode?.trim()) {
        toast.error('Postcode is required')
        setIsSubmitting(false)

        return
      }

      if (!region?.trim()) {
        toast.error('Town is required')
        setIsSubmitting(false)

        return
      }

      if (!county?.trim()) {
        toast.error('County is required')
        setIsSubmitting(false)

        return
      }
    }

    if (portal === 'rmc_portal') {
      if (!onboardingData?.onboarding_id && !rmcData?.tender_onboarding_id) {
        toast.error('Tender onboarding ID not found. Please try again.')
        setIsSubmitting(false)

        return
      }

      let payload: RmcBlockDetailsPayload

      const hasManualData = manualAddressData && manualAddressData.addressLine1

      if (hasManualData) {
        payload = {
          tender_onboarding_id: onboardingData?.onboarding_id ?? rmcData?.tender_onboarding_id,
          postcode: manualAddressData.postcode || '',
          address: manualAddressData.addressLine1,
          lat: manualAddressData.coordinates.lat || 0,
          lng: manualAddressData.coordinates.lng || 0,
          region: manualAddressData.region || '',
          county: manualAddressData.county || '',
          address_line2: manualAddressData.addressLine2 || '',
          address_line3: '',
          step: 3,
          state: '',
          address_type: hasDropdownAddress ? 'api' : 'manual'
        }
      } else if (hasDropdownAddress) {
        payload = {
          tender_onboarding_id: onboardingData?.onboarding_id ?? rmcData?.tender_onboarding_id,
          postcode: selectedAddress?.postcode || '',
          address: selectedAddress?.line_1,
          lat: selectedAddress?.latitude || 0,
          lng: selectedAddress?.longitude || 0,
          region: selectedAddress?.post_town || '',
          county: selectedAddress?.county || '',
          address_line2: selectedAddress?.line_2 || '',
          address_line3: selectedAddress?.line_3 || '',
          step: 3,
          state: '',
          address_type: 'api'
        }
      } else {
        const addressData = mapSelectedAddress

        payload = {
          tender_onboarding_id: onboardingData?.onboarding_id ?? rmcData?.tender_onboarding_id,
          postcode: addressData?.postcode || '',
          address: addressData?.addressLine1,
          lat: addressData?.coordinates.lat || 0,
          lng: addressData?.coordinates.lng || 0,
          region: addressData?.region || '',
          county: addressData?.county || '',
          address_line2: addressData?.addressLine2 || '',
          address_line3: '',
          step: 3,
          state: '',
          address_type: 'manual'
        }
      }

      if (!payload.lat || !payload.lng || payload.lat === 0 || payload.lng === 0) {
        toast.error('Location coordinates are missing. Please select a location on the map.')
        setIsSubmitting(false)

        return
      }

      rmcMutation.mutate(payload)
    } else if (portal === 'pma_portal') {
      let payload: PmaAddressPayload

      const hasManualData = manualAddressData && manualAddressData.addressLine1

      if (hasManualData) {
        payload = {
          step: 3,
          postcode: manualAddressData.postcode || '',
          address: manualAddressData.addressLine1,
          address_line2: manualAddressData.addressLine2 || '',
          address_line3: '',
          address_type: hasDropdownAddress ? 'api' : 'manual',
          county: manualAddressData.county || '',
          region: manualAddressData.region || '',
          state: '',
          lat: manualAddressData.coordinates.lat || 0,
          lng: manualAddressData.coordinates.lng || 0
        }
      } else if (hasDropdownAddress) {
        payload = {
          step: 3,
          postcode: selectedAddress?.postcode || '',
          address: selectedAddress?.line_1,
          address_line2: selectedAddress?.line_2 || '',
          address_line3: selectedAddress?.line_3 || '',
          address_type: 'api',
          county: selectedAddress?.county || '',
          region: selectedAddress?.post_town || '',
          state: '',
          lat: selectedAddress?.latitude || 0,
          lng: selectedAddress?.longitude || 0
        }
      } else {
        const addressData = mapSelectedAddress

        payload = {
          step: 3,
          postcode: addressData?.postcode || '',
          address: addressData?.addressLine1 || '',
          address_line2: addressData?.addressLine2 || '',
          address_line3: '',
          address_type: 'manual',
          county: addressData?.county || '',
          region: addressData?.region || '',
          state: '',
          lat: addressData?.coordinates.lat || 0,
          lng: addressData?.coordinates.lng || 0
        }
      }

      if (!payload.lat || !payload.lng || payload.lat === 0 || payload.lng === 0) {
        toast.error('Location coordinates are missing. Please select a location on the map.')
        setIsSubmitting(false)

        return
      }

      pmaMutation.mutate(payload)
    }
  }

  const handleChangePostcode = () => {
    dispatch(clearPostcodeData())
    setSelectedAddressId('')
    setMapSelectedAddress(null)
    setManualAddressData(null)
    dispatch(setPostcodeSelectedAddress(null as any))
    dispatch(setSelectedAddress(null as any))

    if (portal === 'pma_portal') {
      router.push('/locationcode')
    } else {
      router.push('/postcode')
    }
  }

  const onbaordingType = portal === 'pma_portal' ? 'PMA Sign Up' : 'RMC Sign Up'

  return (
    <div className='flex flex-col items-center pt-10 mb-20'>
      {!hideHeader && <h1 className='text-[48px] font-bold text-[#262B43E5]'>{onbaordingType}</h1>}
      <div className='bg-white p-8 pt-10 w-full mt-6'>
        {!hideDescription && (
          <>
            <Typography
              variant='h6'
              sx={{ fontSize: '24px', fontWeight: 500, color: 'customColors.darkGray1' }}
              className='mb-6'
            >
              Address
            </Typography>
            {portal === 'pma_portal' ? (
              <Typography sx={{ fontSize: '18px', fontWeight: 400, color: 'customColors.textGray' }} className=' mb-6'>
                Select the address of your primary office. This helps us match you with verified Resident Management
                Company directors who are actively seeking a managing agent in your area. Your office location is used
                as the central point for allocating tenders to you.
              </Typography>
            ) : (
              <Typography sx={{ fontSize: '18px', fontWeight: 400, color: 'customColors.textGray' }} className=' mb-6'>
                Please enter your address below. This allows us to identify and connect you with qualified managing
                agents who are local to your area and have a strong understanding of the regional market and its
                specific needs.
              </Typography>
            )}
          </>
        )}

        <div className='pb-14 mt-14'>
          <div className='flex gap-3 items-center'>
            <Typography sx={{ color: 'customColors.textGray', fontSize: '18px', fontWeight: 500 }}>
              Postcode:
            </Typography>
            <Typography sx={{ color: 'customColors.textGray', fontSize: '14px', fontWeight: 300 }}>
              {currentPostcode || 'No postcode selected'}
            </Typography>
          </div>
          <CustomButton
            onClick={handleChangePostcode}
            sx={{ fontSize: '16px', marginTop: '16px', fontWeight: 700 }}
            endIcon={<i className='ri-arrow-right-line'></i>}
          >
            Change Postcode
          </CustomButton>
        </div>

        <div className=''>
          <div className='grid grid-cols-1 pb-10 relative'>
            <FormControl
              fullWidth
              variant='outlined'
              sx={{
                borderRadius: '6px',
                width: '100%',
                maxWidth: '100%',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: selectedAddressId ? '#26C6F9' : '#D1D5DB'
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
                  color: selectedAddressId ? '#26C6F9' : '#9CA3AF'
                }
              }}
            >
              <InputLabel id='address-label'>Select Address</InputLabel>
              <Select
                labelId='address-label'
                label='Select Address'
                fullWidth
                variant='outlined'
                value={selectedAddressId}
                onChange={handleAddressChange}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                      overflowY: 'auto',
                      overflowX: 'hidden'
                    }
                  },
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left'
                  },
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left'
                  },
                  disableAutoFocusItem: true,
                  variant: 'menu'
                }}
                sx={{
                  '& .MuiSelect-select': {
                    color: selectedAddressId ? 'inherit' : 'customColors.textGray'
                  }
                }}
              >
                {addresses?.map((address: any) => {
                  const addressId = `${address?.line_1 || ''}-${address?.postcode || ''}`
                    ?.replace(/\s+/g, '-')
                    ?.toLowerCase()

                  return (
                    <MenuItem
                      key={addressId}
                      value={addressId}
                      sx={{
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                        padding: '12px 16px',
                        borderBottom: '1px solid #f0f0f0',
                        '&:last-child': {
                          borderBottom: 'none'
                        },
                        '&.Mui-selected': {
                          backgroundColor: '#26C6F93D !important'
                        },
                        '&.Mui-selected:hover': {
                          backgroundColor: '#26C6F93D !important'
                        },
                        '&:hover': {
                          backgroundColor: '#f8f9fa'
                        }
                      }}
                    >
                      <div className='flex flex-row items-center'>
                        <span className='font-medium text-gray-900'>
                          {address.line_1}
                          {address.line_2 ? `, ${address.line_2}` : ''}
                        </span>
                        <span className='text-sm text-gray-500 pl-2'>
                          {address.post_town}, {address.postcode}
                        </span>
                      </div>
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <Grid item xs={12}>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 2, mt: 2 }}>
                Can't find your address or is it incorrect? You can enter the full address manually below.
              </Typography>
            </Grid>
          </div>
        </div>

        <div className='mt-4'>
          <AddressMapSelector
            key={`map-${mapSelectedAddress?.coordinates?.lat}-${mapSelectedAddress?.coordinates?.lng}`}
            onLocationSelect={handleMapAddressSelect}
            onManualAddressChange={handleManualAddressChange}
            onManualAddressData={handleManualAddressData}
            showManualEntry={true}
            initialData={mapSelectedAddress || manualAddressData || undefined}
          />
        </div>

        <div className='pb-3 flex justify-end mt-6'>
          <CustomButton
            onClick={handleNavigate}
            isLoading={isSubmitting || rmcMutation.isPending || pmaMutation.isPending}
            disabled={isSubmitting || rmcMutation.isPending || pmaMutation.isPending}
            sx={{ fontSize: '16px', fontWeight: 700 }}
            endIcon={<i className='ri-arrow-right-line'></i>}
          >
            {isSubmitting || rmcMutation.isPending || pmaMutation.isPending
              ? 'Submitting...'
              : 'Continue with Selected Address'}
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default OnboardingAddresScreen
