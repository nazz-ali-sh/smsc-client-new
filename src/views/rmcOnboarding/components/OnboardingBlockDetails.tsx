'use client'
import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Box, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material'

import CustomButton from '@/common/CustomButton'
import CommonModal from '@/common/CommonModal'

const OnboardingBlockDetails = () => {
  const router = useRouter()
  const [address, setAddress] = useState('')
  const [postcode, setPostcode] = useState('')

  const [open, setOpen] = useState(false)

  const handleNavigate = () => {
    router.push('/rmc-onboarding-budget')
  }

  const addressOptions = ['123 Main Street', '456 Oak Avenue', '742 Evergreen Terrace']

  const handleModalOpen = () => {
    setOpen(true)
  }

  const fields = [{ placeholder: 'Name' }, { placeholder: 'No of Units' }, { placeholder: 'Current Managing Agent' }]

  return (
    <>
      <div className='flex flex-col items-center pt-20 px-4'>
        <h1 className='text-[48px] font-bold text-[#262B43E5] mb-8'>RMC Onboarding</h1>
        <div className='bg-white p-8 pt-10 w-full max-w-7xl mt-16'>
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
            <Typography sx={{ color: 'customColors.textGray', fontSize: '20px', fontWeight: 300 }}>SWA 1AA</Typography>
          </div>
          <div className='flex justify-end'>
            <CustomButton sx={{ fontSize: '16px', fontWeight: 700 }} endIcon={<i className='ri-arrow-right-line'></i>}>
              Edit
            </CustomButton>
          </div>

          <div className='mt-10 grid grid-cols-3 gap-4'>
            {fields.map((field, index) => (
              <Box key={index}>
                <TextField
                  fullWidth
                  placeholder={field.placeholder}
                  variant='outlined'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end' sx={{ mr: 0 }}>
                        <Box
                          sx={{
                            backgroundColor: '#f5f5f5',
                            borderRadius: '0 6px 6px 0',
                            width: '60px',
                            height: '54px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <i className='ri-error-warning-line'></i>
                        </Box>
                      </InputAdornment>
                    )
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '6px',
                      pr: 0,
                      '& fieldset': {
                        borderColor: '#d9d9d9'
                      },
                      '&:hover fieldset': {
                        borderColor: '#bfbfbf'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#35C0ED'
                      },
                      '& input::placeholder': {
                        color: '#666',
                        opacity: 1
                      }
                    },
                    '& .MuiInputBase-input': {
                      pr: 0
                    }
                  }}
                />
              </Box>
            ))}
          </div>

          <div className='grid grid-cols-3 gap-4 mt-8'>
            <Select
              fullWidth
              displayEmpty
              value={address}
              onChange={e => setAddress(e.target.value)}
              sx={{
                borderRadius: '6px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#D1D5DB'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#35C0ED'
                },
                '& .MuiSelect-select': {
                  color: address ? 'inherit' : 'customColors.textGray'
                }
              }}
            >
              <MenuItem value='' disabled>
                Select number of Blocks
              </MenuItem>
              {addressOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            <Select
              fullWidth
              displayEmpty
              value={address}
              onChange={e => setAddress(e.target.value)}
              sx={{
                borderRadius: '6px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#D1D5DB'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#35C0ED'
                },
                '& .MuiSelect-select': {
                  color: address ? 'inherit' : 'customColors.textGray'
                }
              }}
            >
              <MenuItem value='' disabled>
                Year Built
              </MenuItem>
              {addressOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className='pb-40 mt-16 flex justify-end'>
            <CustomButton
              onClick={handleModalOpen}
              sx={{ fontSize: '16px', fontWeight: 700 }}
              endIcon={<i className='ri-arrow-right-line'></i>}
            >
              Next
            </CustomButton>
          </div>
        </div>

        <CommonModal
          isOpen={open}
          handleClose={() => setOpen(false)}
          header='Confirm Your Blocks Details'
          maxWidth='sm'
          fullWidth
        >
          <div className='mt-6'>
            <TextField
              fullWidth
              placeholder='Search Companies House'
              value={postcode}
              onChange={e => setPostcode(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '6px',
                  '&.Mui-focused fieldset': {
                    borderColor: '#35C0ED'
                  }
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'customColors.textGray',
                  opacity: 1
                }
              }}
            />
            <div className='mt-6'>
              <Select
                fullWidth
                displayEmpty
                value={address}
                onChange={e => setAddress(e.target.value)}
                sx={{
                  borderRadius: '6px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#D1D5DB'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#35C0ED'
                  },
                  '& .MuiSelect-select': {
                    color: address ? 'inherit' : 'customColors.textGray'
                  }
                }}
              >
                <MenuItem value='' disabled>
                  Confirm Identity
                </MenuItem>
                {addressOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div className='mt-8 flex justify-end'>
            <CustomButton onClick={handleNavigate} sx={{ fontSize: '14px', fontWeight: 700 }}>
              Skip
            </CustomButton>
          </div>
        </CommonModal>
      </div>
    </>
  )
}

export default OnboardingBlockDetails
