'use client'
import React, { useEffect, useState } from 'react'

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
import { setPmaPostcodeAddresses, type PmaPostcodeAddress } from '@/redux-store/slices/pmaPostcodeSlice'
import { useRmcOnboardingData } from '@/hooks/useRmcOnboardingData'
import { usePmaOnboardingData } from '@/hooks/usePmaOnboardingData'

const OnbaordingPostcodeScreen = ({ portal }: OnboardingPortalProps) => {
  const { data } = useRmcOnboardingData()

  const { data: pmaOnboardingData } = usePmaOnboardingData()

  const router = useRouter()
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { control, handleSubmit, setValue } = useForm<PostcodeFormData>({
    resolver: valibotResolver(postcodeSchema),
    defaultValues: {
      postcode: ''
    }
  })

  useEffect(() => {
    if (portal === 'pma_portal') {
      router.prefetch('/pinlocation')
    } else {
      router.prefetch('/address')
    }
  }, [portal, router])

  useEffect(() => {
    let savedPostcode = ''

    if (portal === 'rmc_portal') {
      savedPostcode = data?.steps?.step3?.postcode ?? localStorage.getItem('rmc-onboarding-postcode')
    } else if (portal === 'pma_portal') {
      savedPostcode = pmaOnboardingData?.data?.step_3?.postcode ?? localStorage.getItem('pma-onboarding-postcode')
    }

    if (savedPostcode) {
      setValue('postcode', savedPostcode)
    }
  }, [data?.steps?.step3?.postcode, pmaOnboardingData?.data?.step_3?.postcode, setValue, portal])

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

        if (portal === 'pma_portal') {
          router.push('/pinlocation')
        } else {
          router.push('/address')
        }

        if (portal === 'pma_portal') {
          dispatch(
            setPmaPostcodeAddresses({
              addresses: mappedAddresses as PmaPostcodeAddress[],
              postcode: variables?.postcode
            })
          )
        } else {
          dispatch(
            setPostcodeAddresses({
              addresses: mappedAddresses,
              postcode: variables?.postcode
            })
          )
        }
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
      setIsSubmitting(false)
    }
  })

  const handleFormSubmit = (data: PostcodeFormData) => {
    if (isSubmitting || mutation.isPending) return

    setIsSubmitting(true)
    const trimmedPostcode = data?.postcode?.trim()

    if (portal === 'pma_portal') {
      localStorage.setItem('pma-onboarding-postcode', trimmedPostcode)
    } else {
      localStorage.setItem('rmc-onboarding-postcode', trimmedPostcode)
    }

    const payload: PostcodeLookupPayload = { postcode: trimmedPostcode }

    mutation.mutate(payload)
  }

  const onbaordingType = portal === 'pma_portal' ? 'PMA Onbaording' : 'RMC Sign Up'

  return (
    <div className='flex flex-col items-center pt-10 mb-20'>
      <h1 className='text-[48px] font-bold text-[#262B43E5]'>{onbaordingType}</h1>
      <div className='bg-white p-8 pt-10 w-full  mt-6'>
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
              isLoading={isSubmitting || mutation.isPending}
              disabled={isSubmitting || mutation.isPending}
              sx={{ fontSize: '16px', fontWeight: 700 }}
              endIcon={<i className='ri-arrow-right-line'></i>}
            >
              {isSubmitting || mutation.isPending ? 'Finding Address...' : 'Find Address'}
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OnbaordingPostcodeScreen
