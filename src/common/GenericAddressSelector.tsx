'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react'

import { Typography, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material'

import CustomButton from '@/common/CustomButton'
import GenericAddressMapSelector from '@/common/GenericAddressMapSelector'

interface PostcodeAddress {
  longitude: string
  latitude: string
  postcode: string
  country: string
  post_town: string
  line_1: string
  line_2: string
  udprn: string
  county: string
  line_3: string
}

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

interface GenericAddressSelectorProps {
  addresses?: PostcodeAddress[]
  currentPostcode?: string
  savedAddressData?: any
  onPostcodeLookup?: (postcode: string) => Promise<any>
  showManualEntry?: boolean
  showPostcodeSection?: boolean
  onAddressSelect?: (address: PostcodeAddress) => void
  onManualAddressData?: (data: MapAddressData) => void
  onSuccess?: (data?: any) => void
  onError?: (error: any) => void

  isSubmitting?: boolean
}

const GenericAddressSelector: React.FC<GenericAddressSelectorProps> = ({
  addresses = [],
  currentPostcode = '',
  savedAddressData = null,
  onPostcodeLookup,
  showManualEntry = true,
  showPostcodeSection = true,
  onAddressSelect,
  onManualAddressData
}) => {
  const [selectedAddressId, setSelectedAddressId] = useState('')
  const [mapSelectedAddress, setMapSelectedAddress] = useState<MapAddressData | null>(null)
  const [manualAddressData, setManualAddressData] = useState<MapAddressData | null>(null)
  const hasAttemptedFetch = useRef(false)
  const isDropdownSelectedRef = useRef(false)
  const onAddressSelectRef = useRef(onAddressSelect)
  const onManualAddressDataRef = useRef(onManualAddressData)
  const hasAutoSelectedRef = useRef(false)
  const previousAddressesLengthRef = useRef(0)

  useEffect(() => {
    onAddressSelectRef.current = onAddressSelect
    onManualAddressDataRef.current = onManualAddressData
  }, [onAddressSelect, onManualAddressData])

  useEffect(() => {
    if (addresses && addresses?.length > 0) {
      return
    }

    if (hasAttemptedFetch?.current) {
      return
    }

    const trimmedPostcode = currentPostcode?.trim()

    if (trimmedPostcode && onPostcodeLookup) {
      hasAttemptedFetch.current = true
      onPostcodeLookup(trimmedPostcode)
    }
  }, [addresses, currentPostcode, onPostcodeLookup])

  useEffect(() => {
    const addressesLength = addresses?.length || 0
    const isFreshLookup = previousAddressesLengthRef.current !== addressesLength && addressesLength > 0

    previousAddressesLengthRef.current = addressesLength

    if (savedAddressData && !hasAutoSelectedRef.current && !isFreshLookup) {
      let foundAddress = null

      if (addresses && addresses?.length > 0) {
        foundAddress = addresses?.find(
          (address: any) =>
            address?.line_1 === savedAddressData?.address && address?.postcode === savedAddressData?.postcode
        )
      }

      if (foundAddress) {
        const addressId = `${foundAddress.line_1 || ''}-${foundAddress?.postcode || ''}`
          ?.replace(/\s+/g, '-')
          ?.toLowerCase()

        setSelectedAddressId(addressId)
        onAddressSelectRef.current?.(foundAddress)

        const manualData: MapAddressData = {
          addressLine1: foundAddress.line_1 || '',
          addressLine2: savedAddressData?.address_line2 || foundAddress.line_2 || '',
          postcode: foundAddress.postcode || '',
          region: savedAddressData?.region || foundAddress.post_town || '',
          county: savedAddressData?.county || foundAddress.county || '',
          coordinates: {
            lat: parseFloat(savedAddressData?.lat) || parseFloat(foundAddress.latitude) || 0,
            lng: parseFloat(savedAddressData?.lng) || parseFloat(foundAddress.longitude) || 0
          }
        }

        setMapSelectedAddress(manualData)
        setManualAddressData(manualData)
        onManualAddressDataRef.current?.(manualData)
        hasAutoSelectedRef.current = true
      } else if (savedAddressData) {
        const manualData: MapAddressData = {
          addressLine1: savedAddressData?.address || '',
          addressLine2: savedAddressData?.address_line2 || '',
          postcode: savedAddressData?.postcode || '',
          region: savedAddressData?.region || '',
          county: savedAddressData?.county || '',
          coordinates: {
            lat: parseFloat(savedAddressData?.lat) || 0,
            lng: parseFloat(savedAddressData?.lng) || 0
          }
        }

        setMapSelectedAddress(manualData)
        setManualAddressData(manualData)
        onManualAddressDataRef.current?.(manualData)
        setSelectedAddressId('')
        onAddressSelectRef.current?.(null as any)
        hasAutoSelectedRef.current = true
      }
    }
  }, [savedAddressData, addresses])

  const handleAddressChange = (event: any) => {
    const addressId = event.target.value

    setSelectedAddressId(addressId)

    const address = addresses?.find((addr: any) => {
      const addrId = `${addr?.line_1 || ''}-${addr?.postcode || ''}`?.replace(/\s+/g, '-')?.toLowerCase()

      return addrId === addressId
    })

    if (address) {
      onAddressSelectRef.current?.(address)
      isDropdownSelectedRef.current = true

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
      onManualAddressDataRef.current?.(mapAddressData)
    }
  }

  const handleMapAddressSelect = useCallback((data: MapAddressData) => {
    setMapSelectedAddress(data)
    setSelectedAddressId('')
    onAddressSelectRef.current?.(null as any)
    isDropdownSelectedRef.current = false
  }, [])

  const handleManualAddressData = useCallback((data: MapAddressData) => {
    setManualAddressData(data)
    onManualAddressDataRef.current?.(data)
  }, [])

  const handleChangePostcode = () => {
    setSelectedAddressId('')
    setMapSelectedAddress(null)
    setManualAddressData(null)
    onAddressSelectRef.current?.(null as any)
  }

  return (
    <div className='bg-white pt-10 w-full mt-6'>
      {showPostcodeSection && (
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
      )}

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

      {showManualEntry && (
        <div className='mt-4'>
          <GenericAddressMapSelector
            key={`map-${mapSelectedAddress?.coordinates?.lat || 0}-${mapSelectedAddress?.coordinates?.lng || 0}-${mapSelectedAddress?.addressLine1 || 'no-location'}`}
            onLocationSelect={handleMapAddressSelect}
            onManualAddressData={handleManualAddressData}
            showManualEntry={true}
            initialData={mapSelectedAddress || manualAddressData || undefined}
          />
        </div>
      )}
    </div>
  )
}

export default GenericAddressSelector
