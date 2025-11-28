'use client'

import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useForm, Controller } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { TextField, Typography } from '@mui/material'
import { object, string, optional } from 'valibot'

import CustomButton from '@/common/CustomButton'
import CommonModal from '@/common/CommonModal'
import { bioDetails, companyBioPlaceholder, PMA_ROUTES } from '@/constants'
import { submitPmaManagementFee, type PmaManagementFeePayload } from '@/services/pma-onboarding-apis/pma-onboarding-api'
import { usePmaOnboardingData } from '@/hooks/usePmaOnboardingData'

const companyDetailsSchema = object({
  companyBio: optional(string())
})

type CompanyDetailsData = {
  companyBio?: string
}

export default function PmaCompanyDetailsView() {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [fileError, setFileError] = useState<string | null>(null)
  const [isBioModalOpen, setIsBioModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBioViolationModalOpen, setIsBioViolationModalOpen] = useState(false)
  const [highlightedBio, setHighlightedBio] = useState<string>('')
  const { data: onboardingData } = usePmaOnboardingData()

  const { control, handleSubmit, reset } = useForm<CompanyDetailsData>({
    resolver: valibotResolver(companyDetailsSchema),
    defaultValues: {
      companyBio: ''
    },
    mode: 'onChange'
  })

  const mutation = useMutation({
    mutationFn: submitPmaManagementFee,
    onSuccess: (response: any) => {
      if (response?.data?.success === false && response?.data?.data?.has_bio_violations === true) {
        setHighlightedBio(response.data.data.highlighted_bio || '')
        setIsBioViolationModalOpen(true)
        setIsSubmitting(false)

        return
      }

      router.push(PMA_ROUTES.LOCATION_FORM)
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to save company details. Please try again.'

      toast.error(errorMessage)
      setIsSubmitting(false)
    }
  })

  const handleFileValidation = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
    const maxSize = 2 * 1024 * 1024
    const errorMessage = 'Logo Format: JPG/PNG Suggested Filesize: 600x600'

    if (!allowedTypes.includes(file.type)) {
      setFileError(errorMessage)

      return false
    }

    if (file.size > maxSize) {
      setFileError(errorMessage)

      return false
    }

    setFileError(null)

    return true
  }

  const handleFileChange = (file: File) => {
    if (handleFileValidation(file)) {
      setSelectedFile(file)
      const reader = new FileReader()

      reader.onload = e => setImagePreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true)
    else if (e.type === 'dragleave') setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0])
    }
  }

  const createPayload = (bio: string, logo: File | null): PmaManagementFeePayload => {
    return {
      step: 8,
      bio: bio,
      company_logo: logo
    }
  }

  const onSubmit = (data: CompanyDetailsData) => {
    if (isSubmitting || mutation.isPending) return

    if (!data.companyBio?.trim()) {
      toast.error('Company bio is required. Please provide a bio.')

      return
    }

    if (!selectedFile && !imagePreview) {
      toast.error('Company logo is required. Please upload a logo.')

      return
    }

    setIsSubmitting(true)

    const payload = createPayload(data.companyBio || '', selectedFile)

    mutation.mutate(payload)
  }

  const handleNext = () => {
    handleSubmit(onSubmit)()
  }

  const handleBack = () => {
    router.push(PMA_ROUTES.MANAGEMENT)
  }

  const handleSkip = () => {
    if (isSubmitting || mutation.isPending) return
    setIsSubmitting(true)

    const payload = createPayload('', null)

    mutation.mutate(payload)
  }

  const handleOpenBioModal = () => {
    setIsBioModalOpen(true)
  }

  const handleCloseBioModal = () => {
    setIsBioModalOpen(false)
  }

  const handleCloseBioViolationModal = () => {
    setIsBioViolationModalOpen(false)
    setHighlightedBio('')
  }

  React.useEffect(() => {
    const step8 = onboardingData?.data?.step_8

    if (step8) {
      reset({
        companyBio: step8?.bio || ''
      })

      if (step8?.logo_url) {
        setImagePreview(`${process.env.NEXT_PUBLIC_IMAGE_URL}${step8?.logo_url}`)
      }
    }
  }, [onboardingData, reset])

  return (
    <>
      <h1 className='text-[48px] text-center font-bold text-[#262B43E5] mt-8'>PMA Sign Up</h1>
      <div className='flex items-center justify-center p-4 bg-white mt-8 mb-20'>
        <div className='p-4 rounded-lg w-full'>
          <form>
            <h2 className='text-2xl font-medium text-[#262B43E5]'>Company Details</h2>

            <p className='mt-6 mb-12 font-normal text-base leading-6 text-[#696969]'>
              Provide some basic company details to help us create your profile. This information will be used to
              connect you with the right opportunities
            </p>

            <div className='mb-8'>
              <Typography variant='body1' className='text-base font-medium text-[#262B43E5] mb-2'>
                Company Logo
              </Typography>
              <Typography variant='body2' className='text-xs font-normal text-red-500 mb-4'>
                Logo Format: JPG/PNG Suggested Filesize: 600x600
              </Typography>

              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
                className={`border-2 border-dashed rounded-lg p-16 text-center cursor-pointer transition-colors ${
                  dragActive ? 'bg-[#E0F7FC] border-[#35C0ED]' : 'bg-[#E0F7FC] border-[#35C0ED]'
                }`}
              >
                <div className='flex flex-col items-center gap-3'>
                  {imagePreview ? (
                    <div className='w-32 h-32 rounded-lg overflow-hidden border-2 border-[#35C0ED] flex items-center justify-center'>
                      <img src={imagePreview} alt='Preview' className='w-full h-full object-cover' />
                    </div>
                  ) : (
                    <>
                      <div className='text-5xl text-[#35C0ED] mb-2'>↑</div>
                      <p className='text-[#35C0ED] font-medium text-base'>Drag & Drop or Browse Image</p>
                    </>
                  )}
                </div>
                <input
                  id='file-upload'
                  type='file'
                  onChange={handleFileInput}
                  accept='image/jpeg,image/png,image/jpg'
                  className='hidden'
                />
              </div>
              {fileError && <p className='text-red-500 text-xs mt-2'>{fileError}</p>}
            </div>

            <div className='mb-8'>
              <div className='flex items-center gap-2 mb-2'>
                <Typography variant='body1' className='text-base font-medium text-[#262B43E5]'>
                  Company Bio
                </Typography>
                <div
                  className='w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs cursor-pointer'
                  onClick={handleOpenBioModal}
                >
                  i
                </div>
              </div>

              <Typography variant='body2' className='text-xs font-normal text-red-500 mb-4'>
                Please do not include your company name, email address, phone number or website. Breaching this may
                result in account suspension.
              </Typography>

              <Controller
                name='companyBio'
                control={control}
                render={({ field }) => {
                  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const text = e.target.value

                    if (text.length <= 1800) {
                      field.onChange(text)
                    }
                  }

                  const charCount = field.value?.length || 0

                  return (
                    <>
                      <TextField
                        {...field}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={6}
                        placeholder={companyBioPlaceholder}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '6px',
                            backgroundColor: '#FAFAFA',
                            '& fieldset': {
                              borderColor: '#d9d9d9'
                            },
                            '&:hover fieldset': {
                              borderColor: '#35C0ED'
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#35C0ED',
                              border: '1px solid #35C0ED'
                            }
                          },
                          '& .MuiInputBase-input::placeholder': {
                            color: '#969696',
                            opacity: 1,
                            fontSize: '14px'
                          }
                        }}
                      />
                      <div className='text-right text-gray-500 text-sm mt-2'>{charCount}/1800 Characters</div>
                    </>
                  )
                }}
              />
            </div>

            <div className='flex justify-between mt-32 gap-2'>
              <CustomButton
                variant='outlined'
                onClick={handleBack}
                startIcon={<i className='ri-arrow-left-line'></i>}
                sx={{ fontSize: '14px', fontWeight: 700 }}
              >
                Back
              </CustomButton>

              <div className='flex gap-2'>
                <CustomButton
                  variant='outlined'
                  onClick={handleSkip}
                  sx={{ fontSize: '14px', fontWeight: 700 }}
                  disabled={isSubmitting || mutation.isPending}
                >
                  Skip
                </CustomButton>
                <CustomButton
                  variant='contained'
                  onClick={handleNext}
                  endIcon={<i className='ri-arrow-right-line'></i>}
                  sx={{ fontSize: '14px', fontWeight: 700 }}
                  disabled={isSubmitting || mutation.isPending}
                  isLoading={isSubmitting || mutation.isPending}
                >
                  {isSubmitting || mutation.isPending ? 'Processing...' : 'Next'}
                </CustomButton>
              </div>
            </div>
          </form>
        </div>
      </div>

      <CommonModal
        isOpen={isBioModalOpen}
        handleClose={handleCloseBioModal}
        header='Bio'
        maxWidth='md'
        fullWidth={true}
      >
        <div className='py-2'>
          <Typography variant='body2' className='text-sm text-[#696969] leading-relaxed'>
            {bioDetails}
          </Typography>
          <div className='flex justify-end mt-6'>
            <CustomButton
              variant='outlined'
              onClick={handleCloseBioModal}
              sx={{ fontSize: '14px', fontWeight: 700, minWidth: '80px' }}
            >
              OK
            </CustomButton>
          </div>
        </div>
      </CommonModal>

      <CommonModal
        isOpen={isBioViolationModalOpen}
        handleClose={handleCloseBioViolationModal}
        header='Prohibited Information Detected'
        maxWidth='lg'
        headerSx={{ color: '#1F4E8D', fontSize: '26px', fontWeight: 600 }}
        fullWidth={true}
      >
        <div className='py-4'>
          <p className='text-base text-[#262B43E5] mb-4'>
            Our system has detected that your bio contains information that isn’t allowed under SMSC’s service. This may
            include your company name, your location, an email address, or a phone number. Please remove or correct any
            prohibited details before saving your bio.
          </p>
          <p className='text-base text-[#262B43E5] mb-6'>
            If you believe this detection is incorrect and you have not included any restricted information, please
            email the SMSC Admin Team at admin@savemyservicecharge.co.uk with your bio text. We will review it and
            manually add it to your profile if appropriate.
          </p>
          <div className='bg-gray-50 p-4 rounded-lg mb-6'>
            <Typography variant='body2' className='text-sm font-medium text-[#262B43E5] mb-2'>
              Highlighted Violations:
            </Typography>
            <div
              className='text-sm text-[#696969] leading-relaxed [&_.bio-violation]:text-red-500 [&_.bio-violation]:font-semibold'
              dangerouslySetInnerHTML={{ __html: highlightedBio }}
            />
          </div>
          <div className='flex justify-end'>
            <CustomButton
              variant='contained'
              onClick={handleCloseBioViolationModal}
              sx={{ fontSize: '14px', fontWeight: 700, minWidth: '80px' }}
            >
              OK
            </CustomButton>
          </div>
        </div>
      </CommonModal>
    </>
  )
}
