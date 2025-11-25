'use client'

import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Grid, Typography, Checkbox, FormControlLabel } from '@mui/material'
import { toast } from 'react-toastify'

import { useMutation } from '@tanstack/react-query'

import CustomButton from '@/common/CustomButton'
import FormInput from '@/components/form-components/FormInput'
import GenericAddressSelector from '@/common/GenericAddressSelector'
import { usePmaOnboardingData } from '@/hooks/usePmaOnboardingData'
import { submitPmaAddress, type PmaAddressPayload } from '@/services/pma-onboarding-apis/pma-onboarding-api'
import { lookupPostcode, type PostcodeLookupPayload } from '@/services/postcode-apis/postcode-api'
import { branchLocationSchema } from '@/schemas/validation-schemas'
import { PMA_ROUTES } from '@/constants'

type BranchLocationFormData = {
  contactName: string
  contactEmail: string
  contactPhoneNumber: string
  branchName: string
  postcode: string
  useHeadOfficeAddress?: boolean
}

export default function PmaBranchLocationFormView() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [addressData, setAddressData] = useState<any>(null)
  const [addresses, setAddresses] = useState<any[]>([])
  const [currentPostcode, setCurrentPostcode] = useState('')
  const [selectedAddressFromDropdown, setSelectedAddressFromDropdown] = useState<any>(null)
  const [useHeadOfficeContact, setUseHeadOfficeContact] = useState(true)
  const { data: onboardingData } = usePmaOnboardingData()

  const savedData = onboardingData?.data?.step_9

  const { control, handleSubmit, watch, reset } = useForm<BranchLocationFormData>({
    resolver: valibotResolver(branchLocationSchema as any),
    defaultValues: {
      contactName: savedData?.contact_name || '',
      contactEmail: savedData?.contact_email || '',
      contactPhoneNumber: savedData?.contact_phone || '',
      branchName: savedData?.branch_name || '',
      postcode: savedData?.postcode || ''
    },
    mode: 'onChange'
  })

  const postcodeValue = watch('postcode')
  const hasAttemptedFetch = React.useRef(false)

  React.useEffect(() => {
    if (addresses && addresses?.length > 0) {
      return
    }

    if (hasAttemptedFetch?.current) {
      return
    }

    const savedPostcode = savedData?.postcode
    const trimmedPostcode = savedPostcode?.trim()

    if (trimmedPostcode) {
      hasAttemptedFetch.current = true

      const payload: PostcodeLookupPayload = {
        postcode: trimmedPostcode
      }

      lookupPostcode(payload)
        .then(data => {
          if (data?.result && data?.result?.length > 0) {
            const mappedAddresses = data?.result?.map(address => ({
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

            setAddresses(mappedAddresses)
            setCurrentPostcode(payload?.postcode)
          } else {
            toast.error('No addresses found for this postcode.')
          }
        })
        .catch(error => {
          console.error('Error fetching postcode data:', error)
        })
    }
  }, [addresses, savedData?.postcode])

  React.useEffect(() => {
    if (savedData) {
      reset({
        contactName: savedData?.contact_name || '',
        contactEmail: savedData?.contact_email || '',
        contactPhoneNumber: savedData?.contact_phone || '',
        branchName: savedData?.branch_name || '',
        postcode: savedData?.postcode || ''
      })

      if (savedData?.use_head_office_contact !== undefined) {
        setUseHeadOfficeContact(savedData.use_head_office_contact)
      }

      if (savedData?.postcode) {
        setCurrentPostcode(savedData.postcode)
      }

      if (savedData?.address) {
        const savedAddressData = {
          address: savedData?.address,
          postcode: savedData?.postcode,
          lat: savedData?.lat,
          lng: savedData?.lng,
          region: savedData?.region,
          county: savedData?.county,
          address_line2: savedData?.address_line2 || '',
          address_line3: savedData?.address_line3 || '',
          address_type: savedData?.address_type || 'manual',

          addressLine1: savedData?.address,
          addressLine2: savedData?.address_line2 || '',
          coordinates: {
            lat: parseFloat(savedData?.lat) || 0,
            lng: parseFloat(savedData?.lng) || 0
          }
        }

        setAddressData(savedAddressData)
      }
    }
  }, [savedData, reset])

  const postcodeMutation = useMutation({
    mutationFn: lookupPostcode,
    onSuccess: (data, variables) => {
      if (data?.result && data?.result?.length > 0) {
        const mappedAddresses = data?.result?.map(address => ({
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

        setAddresses(mappedAddresses)
        setCurrentPostcode(variables?.postcode)
      } else {
        toast.error('No addresses found for this postcode.')
      }
    },
    onError: () => {
      toast.error('Failed to lookup postcode. Please try again.')
    }
  })

  const onSubmit = () => {
    router.push(PMA_ROUTES.TENDERS_NOTIFICATION)
  }

  const handleNext = async (data: BranchLocationFormData) => {
    const hasDropdownAddress = selectedAddressFromDropdown
    const hasManualAddress = addressData && addressData?.addressLine1

    if (!hasDropdownAddress && !hasManualAddress) {
      toast.error('Please select an address first')

      return
    }

    try {
      setIsSubmitting(true)

      let payload: PmaAddressPayload

      if (hasDropdownAddress) {
        payload = {
          step: 9,
          postcode: selectedAddressFromDropdown?.postcode || '',
          address: selectedAddressFromDropdown?.line_1 || '',
          address_line2: selectedAddressFromDropdown?.line_2 || '',
          address_line3: selectedAddressFromDropdown?.line_3 || '',
          address_type: 'api',
          county: selectedAddressFromDropdown?.county || '',
          region: selectedAddressFromDropdown?.post_town || '',
          state: '',
          lat: parseFloat(selectedAddressFromDropdown?.latitude) || 0,
          lng: parseFloat(selectedAddressFromDropdown?.longitude) || 0,
          branch_name: data.branchName || '',
          contact_name: data.contactName || '',
          contact_email: data.contactEmail || '',
          contact_phone: data.contactPhoneNumber || '',
          use_head_office_contact: useHeadOfficeContact
        }
      } else {
        payload = {
          step: 9,
          postcode: addressData.postcode || '',
          address: addressData.addressLine1 || '',
          address_line2: addressData.addressLine2 || '',
          address_line3: '',
          address_type: 'manual',
          county: addressData.county || '',
          region: addressData.region || '',
          state: '',
          lat: addressData.coordinates?.lat || 0,
          lng: addressData.coordinates?.lng || 0,
          branch_name: data.branchName || '',
          contact_name: data.contactName || '',
          contact_email: data.contactEmail || '',
          contact_phone: data.contactPhoneNumber || '',
          use_head_office_contact: useHeadOfficeContact
        }
      }

      if (!payload.lat || !payload.lng || payload.lat === 0 || payload.lng === 0) {
        toast.error('Location coordinates are missing. Please select a location on the map.')
        setIsSubmitting(false)

        return
      }

      await submitPmaAddress(payload)

      handleSubmit(onSubmit)()
    } catch (error) {
      toast.error('Failed to submit address details. Please try again.')
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    router.push(PMA_ROUTES.COMPANY_DETAILS)
  }

  const handleSkip = () => {
    router.push(PMA_ROUTES.TENDERS_NOTIFICATION)
  }

  const handleAddressSelect = (address: any) => {
    if (address) {
      setSelectedAddressFromDropdown(address)
      setAddressData({ ...address, address_type: 'api' })
    } else {
      setSelectedAddressFromDropdown(null)
    }
  }

  const handleManualAddressChange = (data: any) => {
    setAddressData({ ...data, address_type: 'manual' })
    setSelectedAddressFromDropdown(null)
  }

  const handleAddressSuccess = () => {
    // Address selection successful
  }

  const handleAddressError = () => {
    toast.error('Failed to process address selection')
  }

  const handlePostcodeLookup = async (postcode: string) => {
    const payload: PostcodeLookupPayload = {
      postcode: postcode.trim()
    }

    return postcodeMutation.mutateAsync(payload)
  }

  const handlePostcodeLookupFromForm = async () => {
    const postcode = postcodeValue?.trim() || ''

    if (!postcode) {
      toast.error('Please enter a postcode')

      return
    }

    try {
      setAddressData(null)
      setSelectedAddressFromDropdown(null)
      await handlePostcodeLookup(postcode)
    } catch (error) {
      toast.error('Failed to lookup postcode. Please try again.')
    }
  }

  return (
    <>
      <h1 className='text-[48px] text-center font-bold text-[#262B43E5] mt-8'>PMA Sign Up</h1>

      <div className='flex items-center justify-center p-4 bg-white mt-4 mb-20'>
        <div className='p-4 rounded-lg w-full'>
          <form>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-2xl font-medium text-[#262B43E5]'>Branch Location (Optional)</h2>
            </div>

            <p className='mt-6 mb-12 font-normal text-base leading-6 text-[#696969]'>
              Tell us about your branch locations. This helps us match your company with the most suitable tenders in
              your service areas.
            </p>

            <div className='mb-8'>
              <Typography variant='body2' className='text-sm font-medium text-[#262B43E5] mb-4'>
                Contact Information
              </Typography>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={4}>
                  <FormInput
                    name='contactName'
                    control={control}
                    label='Contact Name'
                    type='text'
                    placeholder='Contact Name'
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormInput
                    name='contactEmail'
                    control={control}
                    label='Contact Email'
                    type='email'
                    placeholder='Contact Email'
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormInput
                    name='contactPhoneNumber'
                    control={control}
                    label='Contact Phone Number'
                    type='tel'
                    placeholder='Contact Phone Number'
                  />
                </Grid>
              </Grid>
            </div>

            <div className='mb-8'>
              <Typography variant='body2' className='text-sm font-medium text-[#262B43E5] mb-4'>
                Branch Name
              </Typography>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={4}>
                  <FormInput
                    name='branchName'
                    control={control}
                    label='Branch Name'
                    type='text'
                    placeholder='Branch Name'
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} sx={{ marginTop: 8 }}>
                <div className='flex gap-3 items-center'>
                  <div className='flex-1'>
                    <FormInput
                      name='postcode'
                      control={control}
                      label='Enter Postcode'
                      type='text'
                      placeholder='Enter Postcode'
                    />
                  </div>
                </div>
                <CustomButton
                  onClick={handlePostcodeLookupFromForm}
                  disabled={postcodeMutation.isPending}
                  sx={{ fontSize: '14px', fontWeight: 700, backgroundColor: '#26C6F9', marginTop: 6 }}
                >
                  {postcodeMutation.isPending ? 'Finding...' : 'Find Address'}
                </CustomButton>
              </Grid>
            </div>

            <GenericAddressSelector
              addresses={addresses}
              currentPostcode={currentPostcode || savedData?.postcode || 'SWA 1AA'}
              savedAddressData={savedData}
              showManualEntry={true}
              showPostcodeSection={false}
              onAddressSelect={handleAddressSelect}
              onManualAddressData={handleManualAddressChange}
              onSuccess={handleAddressSuccess}
              onError={handleAddressError}
              isSubmitting={isSubmitting || postcodeMutation.isPending}
            />

            <div className='mb-6 mt-10'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={useHeadOfficeContact}
                    onChange={e => setUseHeadOfficeContact(e.target.checked)}
                    sx={{
                      color: '#d9d9d9',
                      '&.Mui-checked': {
                        color: '#26C6F9'
                      }
                    }}
                  />
                }
                label={
                  <Typography variant='body2' className='text-sm font-normal text-[#696969]'>
                    Use Head Office Address As Main Contact For This Branch
                  </Typography>
                }
              />
            </div>

            <div className='mb-8 flex flex-col gap-2'>
              {!useHeadOfficeContact && (
                <div className='flex items-start'>
                  <span className='text-[#696969] text-xs mr-1'>●</span>
                  <Typography variant='body2' className='text-xs font-normal text-[#696969]'>
                    New User will be created based on the above contact information.
                  </Typography>
                </div>
              )}
              <div className='flex items-start'>
                <span className='text-[#696969] text-xs mr-1'>●</span>
                <Typography variant='body2' className='text-xs font-normal text-[#696969]'>
                  You can manage branch user access and permissions from within your user settings. Adding branches
                  ensures local tenders are routed to the correct contact.
                </Typography>
              </div>
            </div>

            <div className='flex justify-between mt-8 gap-2'>
              <CustomButton
                variant='outlined'
                onClick={handleBack}
                startIcon={<i className='ri-arrow-left-line'></i>}
                sx={{ fontSize: '14px', fontWeight: 700 }}
              >
                Back
              </CustomButton>

              <div className='flex gap-2'>
                <CustomButton variant='outlined' onClick={handleSkip} sx={{ fontSize: '14px', fontWeight: 700 }}>
                  Skip
                </CustomButton>
                <CustomButton
                  variant='contained'
                  onClick={handleSubmit(handleNext)}
                  endIcon={<i className='ri-arrow-right-line'></i>}
                  sx={{ fontSize: '14px', fontWeight: 700 }}
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Next'}
                </CustomButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
