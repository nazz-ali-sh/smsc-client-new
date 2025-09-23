'use client'
import React, { useState, useEffect, useMemo } from 'react'

import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

import { Typography, Box } from '@mui/material'

import CustomButton from '@/common/CustomButton'
import CommonModal from '@/common/CommonModal'
import RmcTooltip from '@/common/RmcTooltip'
import FormInput from '@/components/form-components/FormInput'
import FormSelect from '@/components/form-components/FormSelect'
import { blockDetailsSchema } from '@/schemas/validation-schemas'
import { submitRmcBlockDetails, type RmcBlockDetailsPayload } from '@/services/rmc-onboarding-apis/rmc-onboarding-api'
import { useRmcOnboardingData } from '@/hooks/useRmcOnboardingData'
import { blockOptions, tooltipContent, yearOptions } from '@/constants'

const OnboardingBlockDetails = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const [tooltipState, setTooltipState] = useState<{
    isOpen: boolean
    anchorEl: HTMLElement | null
    title: string
    content: string
  }>({
    isOpen: false,
    anchorEl: null,
    title: '',
    content: ''
  })

  const { rmcData } = useSelector((state: any) => state?.rmcOnboarding)
  const { selectedAddress } = useSelector((state: any) => state?.rmcOnboarding)

  const { data: onboardingData, invalidateCache } = useRmcOnboardingData()

  const existingBlockData = useMemo(() => {
    return onboardingData?.steps?.step_3 || {}
  }, [onboardingData])

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<any>({
    resolver: valibotResolver(blockDetailsSchema),
    mode: 'onBlur',
    defaultValues: {
      block_name: existingBlockData?.block_name || '',
      no_of_units: existingBlockData?.total_units?.toString() || '',
      current_managing_agent: existingBlockData?.current_managing_agent || '',
      number_of_blocks: existingBlockData?.number_of_blocks?.toString() || '',
      year_built: existingBlockData?.year_built || '',
      companies_house_search: undefined,
      confirm_identity: undefined
    }
  })

  useEffect(() => {
    if (onboardingData && existingBlockData) {
      reset({
        block_name: existingBlockData?.block_name || '',
        no_of_units: existingBlockData?.total_units?.toString() || '',
        current_managing_agent: existingBlockData?.current_managing_agent || '',
        number_of_blocks: existingBlockData?.number_of_blocks?.toString() || '',
        year_built: existingBlockData?.year_built || '',
        companies_house_search: undefined,
        confirm_identity: undefined
      })
    }
  }, [onboardingData, existingBlockData, reset])

  const mutation = useMutation({
    mutationFn: submitRmcBlockDetails,
    onSuccess: () => {
      invalidateCache()
      setOpen(false)
      router.push('/rmc-onboarding-budget')
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to submit block details. Please try again.'

      toast.error(errorMessage)
    }
  })

  const handleNavigate = () => {
    router.push('/rmc-onboarding-budget')
  }

  const handleModalOpen = () => {
    setOpen(true)
  }

  const handleFormSubmit = (data: BlockDetailsFormData) => {
    if (!rmcData?.tender_onboarding_id) {
      toast.error('Tender onboarding ID not found. Please try again.')

      return
    }

    if (!selectedAddress) {
      toast.error('Address not found. Please go back and select an address.')

      return
    }

    const payload: RmcBlockDetailsPayload = {
      tender_onboarding_id: rmcData?.tender_onboarding_id,
      number_of_blocks: parseInt(data?.number_of_blocks),
      total_units: parseInt(data?.no_of_units),
      year_built: data?.year_built,
      block_name: data?.block_name,
      current_managing_agent: data?.current_managing_agent,
      step: 3
    }

    mutation.mutate(payload)
  }

  const customStyles = {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#E5E7EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& i': {
      fontSize: '14px',
      color: '#6B7280',
      fontWeight: 'bold'
    }
  }

  const inputFields: Array<{
    name: keyof BlockDetailsFormData
    placeholder: string
    icon: React.ReactNode
  }> = [
    {
      name: 'block_name',
      placeholder: 'Block Name',
      icon: (
        <Box sx={customStyles}>
          <i className='ri-error-warning-line'></i>
        </Box>
      )
    },
    {
      name: 'no_of_units',
      placeholder: 'No of Units ',
      icon: (
        <Box sx={customStyles}>
          <i className='ri-error-warning-line'></i>
        </Box>
      )
    },
    {
      name: 'current_managing_agent',
      placeholder: 'Current Managing Agent ',
      icon: (
        <Box sx={customStyles}>
          <i className='ri-error-warning-line'></i>
        </Box>
      )
    }
  ]

  const handleBackStep = () => {
    router.push('/rmc-onboarding-address')
  }

  const handleIconHover = (fieldName: keyof typeof tooltipContent, event: React.MouseEvent<HTMLElement>) => {
    const content = tooltipContent[fieldName]

    setTooltipState({
      isOpen: true,
      anchorEl: event.currentTarget,
      title: content.title,
      content: content.content
    })
  }

  const handleIconLeave = () => {
    setTooltipState({
      isOpen: false,
      anchorEl: null,
      title: '',
      content: ''
    })
  }

  const handleTooltipClose = () => {
    setTooltipState({
      isOpen: false,
      anchorEl: null,
      title: '',
      content: ''
    })
  }

  return (
    <>
      <div className='flex flex-col items-center pt-10 mb-20'>
        <h1 className='text-[48px] font-bold text-[#262B43E5] '>RMC Onboarding</h1>
        <div className='bg-white p-8 pt-10 w-full max-w-7xl mt-6'>
          <Typography
            variant='h6'
            sx={{ fontSize: '24px', fontWeight: 500, color: 'customColors.darkGray1' }}
            className='mb-6'
          >
            Block Details
          </Typography>

          <div className='flex gap-3 items-center'>
            <Typography sx={{ color: 'customColors.textGray', fontSize: '20px', fontWeight: 500 }}>
              Postcode:
            </Typography>
            <Typography sx={{ color: 'customColors.textGray', fontSize: '20px', fontWeight: 300 }}>
              {selectedAddress?.postcode || 'No postcode selected'}
            </Typography>
          </div>
          <div className='flex justify-end'>
            <CustomButton onClick={handleBackStep} endIcon={<i className='ri-arrow-right-line'></i>}>
              Edit
            </CustomButton>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className='mt-10 grid xs:grid-cols-1 md:grid-cols-3 gap-4'>
              {inputFields?.map(field => (
                <FormInput
                  key={field?.name}
                  name={field?.name}
                  control={control}
                  placeholder={field?.placeholder}
                  icon={field?.icon}
                  onIconHover={(event: React.MouseEvent<HTMLElement>) =>
                    handleIconHover(field.name as keyof typeof tooltipContent, event)
                  }
                  onIconLeave={handleIconLeave}
                />
              ))}
            </div>

            <div className='grid xs:grid-col-1  md:grid-cols-2 gap-4 mt-8'>
              <FormSelect
                name='number_of_blocks'
                control={control}
                label='Number of Blocks'
                options={blockOptions}
                placeholder='Select number of blocks'
              />
              <FormSelect
                name='year_built'
                control={control}
                label='Year Built'
                options={yearOptions}
                placeholder='Select year built'
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: errors.year_built ? '#d32f2f' : '#D1D5DB'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: errors.year_built ? '#d32f2f' : '#35C0ED'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: errors.year_built ? '#d32f2f' : '#35C0ED'
                  }
                }}
              />
            </div>

            <div className='pb-9 mt-16 flex justify-end'>
              <CustomButton
                type='submit'
                disabled={mutation.isPending}
                sx={{ fontSize: '16px', fontWeight: 700 }}
                endIcon={<i className='ri-arrow-right-line'></i>}
              >
                {mutation.isPending ? 'Submitting...' : 'Next'}
              </CustomButton>
            </div>
          </form>
        </div>

        <CommonModal
          isOpen={open}
          handleClose={() => setOpen(false)}
          header='Confirm Your Blocks Details'
          maxWidth='sm'
          fullWidth
        >
          <div className='mt-6'>
            <FormInput name='companies_house_search' control={control} placeholder='Search Companies House' />
            <div className='mt-6'>
              <FormSelect
                name='confirm_identity'
                control={control}
                label='Confirm Identity'
                options={[
                  { label: 'Option 1', value: '1' },
                  { label: 'Option 2', value: '2' },
                  { label: 'Option 3', value: '3' }
                ]}
                placeholder='Confirm Identity'
              />
            </div>
          </div>
          <div onClick={handleModalOpen} className='mt-8 flex justify-end'>
            <CustomButton onClick={handleNavigate} sx={{ fontSize: '14px', fontWeight: 700 }}>
              Skip
            </CustomButton>
          </div>
        </CommonModal>

        <RmcTooltip
          isOpen={tooltipState.isOpen}
          onClose={handleTooltipClose}
          anchorEl={tooltipState.anchorEl}
          title={tooltipState?.title}
          content={tooltipState?.content}
        />
      </div>
    </>
  )
}

export default OnboardingBlockDetails
