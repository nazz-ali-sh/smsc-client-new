'use client'
import React, { useState, useEffect, useRef } from 'react'

import { useRouter } from 'next/navigation'

import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

import { Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material'

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
import { lookupPostcode, type PostcodeLookupPayload } from '@/services/postcode-apis/postcode-api'
import { useRmcOnboardingData } from '@/hooks/useRmcOnboardingData'
import type { RootState } from '@/redux-store'

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

const OnboardingAddress = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [selectedAddressId, setSelectedAddressId] = useState('')
  const [mapSelectedAddress, setMapSelectedAddress] = useState<MapAddressData | null>(null)
  const [manualAddressData, setManualAddressData] = useState<MapAddressData | null>(null)
  const [resetMapTrigger, setResetMapTrigger] = useState(0)
  const hasAttemptedFetch = useRef(false)

  const { addresses, currentPostcode } = useSelector((state: RootState) => state.postcode)
  const { selectedAddress, rmcData } = useSelector((state: RootState) => state.rmcOnboarding)
  const { data: onboardingData, invalidateCache } = useRmcOnboardingData()

  const mutation = useMutation({
    mutationFn: submitRmcBlockDetails,
    onSuccess: () => {
      invalidateCache()
      router.push('/rmc-onboarding-details')
    },
    onError: (error: any) => {
      console.error('Error submitting address details:', error)
      toast.error('Failed to submit address details. Please try again.')
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

    const savedPostcode = localStorage.getItem('rmc-onboarding-postcode')

    if (savedPostcode && savedPostcode?.trim()) {
      hasAttemptedFetch.current = true

      const payload: PostcodeLookupPayload = {
        postcode: savedPostcode?.trim()
      }

      postcodeMutation.mutate(payload)
    }
  }, [addresses, postcodeMutation])

  useEffect(() => {
    if (onboardingData?.steps?.step_3 && addresses && addresses?.length > 0) {
      const savedData = onboardingData?.steps.step_3

      const foundAddress = addresses.find(
        address =>
          address?.line_1 === savedData?.address &&
          address?.line_2 === savedData?.address_line2 &&
          (address as any).line_3 === savedData?.address_line3 &&
          address?.postcode === savedData?.postcode
      )

      if (foundAddress) {
        const addressId =
          `${foundAddress.line_1 || ''}-${foundAddress?.line_2 || ''}-${(foundAddress as any)?.line_3 || ''}-${foundAddress?.postcode || ''}`
            ?.replace(/\s+/g, '-')
            ?.toLowerCase()

        setSelectedAddressId(addressId)
        dispatch(setPostcodeSelectedAddress(foundAddress))
        dispatch(setSelectedAddress(foundAddress))
      }
    }
  }, [onboardingData, addresses, dispatch])

  const handleAddressChange = (event: any) => {
    const addressId = event.target.value

    setSelectedAddressId(addressId)

    setMapSelectedAddress(null)

    setManualAddressData(null)

    setResetMapTrigger(prev => prev + 1)

    const address = addresses?.find(addr => {
      const addrId =
        `${addr?.line_1 || ''}-${addr?.line_2 || ''}-${(addr as any)?.line_3 || ''}-${addr?.postcode || ''}`
          ?.replace(/\s+/g, '-')
          ?.toLowerCase()

      return addrId === addressId
    })

    if (address) {
      dispatch(setPostcodeSelectedAddress(address))
      dispatch(setSelectedAddress(address))
    }
  }

  const handleMapAddressSelect = (data: MapAddressData) => {
    setMapSelectedAddress(data)
    setSelectedAddressId('')

    setManualAddressData(null)

    dispatch(setPostcodeSelectedAddress(null as any))
    dispatch(setSelectedAddress(null as any))
  }

  const handleManualAddressChange = () => {
    if (selectedAddressId) {
      setSelectedAddressId('')
      dispatch(setPostcodeSelectedAddress(null as any))
      dispatch(setSelectedAddress(null as any))
    }
  }

  const handleManualAddressData = (data: MapAddressData) => {
    console.log('Manual address data received:', data)
    setManualAddressData(data)
  }

  const handleNavigate = () => {
    const hasDropdownAddress = selectedAddressId && selectedAddress
    const hasMapOrManualAddress = mapSelectedAddress || (manualAddressData && manualAddressData.addressLine1)

    if (!hasDropdownAddress && !hasMapOrManualAddress) {
      toast.error('Please select an address from the dropdown or use the map to select a location')

      return
    }

    if (!rmcData?.tender_onboarding_id) {
      toast.error('Tender onboarding ID not found. Please try again.')

      return
    }

    let payload: RmcBlockDetailsPayload

    if (hasDropdownAddress) {
      payload = {
        tender_onboarding_id: rmcData?.tender_onboarding_id,
        postcode: selectedAddress?.postcode || '',
        address: selectedAddress?.line_1,
        lat: selectedAddress?.latitude || 0,
        lng: selectedAddress?.longitude || 0,
        region: selectedAddress?.post_town || '',
        county: selectedAddress?.county || '',
        address_line2: selectedAddress?.line_2 || '',
        address_line3: selectedAddress?.line_3 || '',
        step: 3,
        state: ''
      }
    } else {
      const addressData = mapSelectedAddress || manualAddressData

      payload = {
        tender_onboarding_id: rmcData?.tender_onboarding_id,
        postcode: addressData?.postcode || '',
        address: addressData?.addressLine1,
        lat: addressData?.coordinates.lat || 0,
        lng: addressData?.coordinates.lng || 0,
        region: addressData?.region || '',
        county: addressData?.county || '',
        address_line2: addressData?.addressLine2 || '',
        address_line3: '',
        step: 3,
        state: ''
      }
    }

    mutation.mutate(payload)
  }

  const handleChangePostcode = () => {
    dispatch(clearPostcodeData())
    router.push('/rmc-onboarding-postcode')
  }

  return (
    <div className='flex flex-col items-center pt-10 mb-20'>
      <h1 className='text-[48px] font-bold text-[#262B43E5]'>RMC Onboarding</h1>
      <div className='bg-white p-8 pt-10 w-full max-w-7xl mt-6'>
        <Typography
          variant='h6'
          sx={{ fontSize: '24px', fontWeight: 500, color: 'customColors.darkGray1' }}
          className='mb-6'
        >
          Address
        </Typography>

        <Typography sx={{ fontSize: '18px', fontWeight: 400, color: 'customColors.textGray' }} className=' mb-6'>
          Please Select your address below. This allows us to identify and connect you with qualified managing agents
          who are local to your area and have a strong understanding of the regional market and its specific needs.
        </Typography>

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
                      overflow: 'scroll'
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
                {addresses?.map(address => {
                  const addressId =
                    `${address.line_1 || ''}-${address.line_2 || ''}-${(address as any).line_3 || ''}-${address.postcode || ''}`
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
          </div>
        </div>

        <div className='mt-4'>
          <Typography
            variant='h6'
            sx={{
              fontSize: '20px',
              fontWeight: 500,
              color: mapSelectedAddress ? '#26C6F9' : 'customColors.darkGray1',
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            {mapSelectedAddress && <i className='ri-check-line' style={{ color: '#26C6F9' }}></i>}
            Or Select Location on Map
            {mapSelectedAddress && <span style={{ fontSize: '14px', color: '#26C6F9' }}>(Selected)</span>}
          </Typography>
          <AddressMapSelector
            onLocationSelect={handleMapAddressSelect}
            onManualAddressChange={handleManualAddressChange}
            onManualAddressData={handleManualAddressData}
            showManualEntry={true}
            resetTrigger={resetMapTrigger}
          />
        </div>

        <div className='pb-3 flex justify-end mt-6'>
          <CustomButton
            onClick={handleNavigate}
            isLoading={mutation.isPending}
            disabled={mutation.isPending}
            sx={{ fontSize: '16px', fontWeight: 700 }}
            endIcon={<i className='ri-arrow-right-line'></i>}
          >
            {mutation.isPending ? 'Submitting...' : 'Continue with Selected Address'}
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default OnboardingAddress
