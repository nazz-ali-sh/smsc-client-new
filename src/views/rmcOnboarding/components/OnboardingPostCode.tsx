'use client'
import React, { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useDispatch } from 'react-redux'

import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { Typography } from '@mui/material'

import CustomButton from '@/common/CustomButton'
import FormInput from '@/components/form-components/FormInput'
import { postcodeSchema } from '@/schemas/validation-schemas'
import { lookupPostcode, type PostcodeLookupPayload } from '@/services/postcode-apis/postcode-api'
import { setPostcodeAddresses, type PostcodeAddress } from '@/redux-store/slices/postcodeSlice'

const OnboardingPostCode = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { control, handleSubmit, setValue } = useForm<PostcodeFormData>({
    resolver: valibotResolver(postcodeSchema),
    defaultValues: {
      postcode: ''
    }
  })

  useEffect(() => {
    const savedPostcode = localStorage.getItem('rmc-onboarding-postcode')

    if (savedPostcode) {
      setValue('postcode', savedPostcode)
    }
  }, [setValue])

  const mutation = useMutation({
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
        router.push('/rmc-onboarding-address')
      } else {
        toast.error('No addresses found for this postcode.')
      }
    },
    onError: (error: any) => {
      let errorMessage = 'Failed to lookup postcode. Please try again.'

      if (error?.message === 'Postcode API key is not configured') {
        errorMessage = 'Postcode service is not configured. Please contact support.'
      } else if (error?.message === 'Postcode API base URL is not configured') {
        errorMessage = 'Postcode service configuration is missing. Please contact support.'
      } else if (error?.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error?.response?.status === 401) {
        errorMessage = 'Invalid API key. Please contact support.'
      } else if (error?.response?.status === 404) {
        errorMessage = 'Postcode not found. Please check and try again.'
      } else if (error?.response?.status === 400) {
        errorMessage = 'Invalid postcode format. Please check and try again.'
      }

      toast.error(errorMessage)
    }
  })

  const handleFormSubmit = (data: PostcodeFormData) => {
    const trimmedPostcode = data?.postcode?.trim()

    localStorage.setItem('rmc-onboarding-postcode', trimmedPostcode)

    const payload: PostcodeLookupPayload = {
      postcode: trimmedPostcode
    }

    mutation.mutate(payload)
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
          Postcode
        </Typography>

        <Typography sx={{ fontSize: '18px', fontWeight: 400, color: 'customColors.textGray' }} className=' mb-6'>
          Please enter your postcode below. This allows us to identify and connect you with qualified managing agents
          who are local to your area and have a strong understanding of the regional market and its specific needs.
        </Typography>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className='mt-20'>
            <div className='grid grid-cols-1 pb-20'>
              <FormInput name='postcode' control={control} label='Enter Postcode' />
            </div>
          </div>
          <div className='pb-20 flex  justify-end'>
            <CustomButton
              type='submit'
              isLoading={mutation.isPending}
              disabled={mutation.isPending}
              sx={{ fontSize: '16px', fontWeight: 700 }}
              endIcon={<i className='ri-arrow-right-line'></i>}
            >
              {mutation.isPending ? 'Finding Address...' : 'Find Address'}
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OnboardingPostCode
