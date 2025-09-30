'use client'

import React from 'react'

import Image from 'next/image'

import { Box, CardContent, Typography, Grid, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import { iconMap } from '@/common/data'

interface PmaUser {
  id?: number
  name?: string
  full_name?: string
  pma_number?: string
  email?: string
}

interface ShortlistedPma {
  id?: any
  name?: any
  pma_user: PmaUser
}

interface PmaCostBreakdownProps {
  archiveDetailsData?: {
    data?: {
      shortlisted_pmas?: ShortlistedPma[]
      management_fees?: any[]
    }
  }
  selectedPma: number | ''
  handleChange: (event: any) => void
  isLoading: boolean
  isError: boolean
}

const PmaCostBreakdown = ({
  archiveDetailsData,
  selectedPma,
  handleChange,
  isLoading,
  isError
}: PmaCostBreakdownProps) => {
  React.useEffect(() => {
    if (
      archiveDetailsData?.data?.shortlisted_pmas &&
      archiveDetailsData?.data?.shortlisted_pmas?.length > 0 &&
      (selectedPma === '' || selectedPma === null || selectedPma === undefined)
    ) {
      const firstPmaId = archiveDetailsData?.data?.shortlisted_pmas[0]?.id

      if (firstPmaId) {
        handleChange({ target: { value: firstPmaId } })
      }
    }
  }, [archiveDetailsData?.data?.shortlisted_pmas, selectedPma, handleChange])

  return (
    <CardContent sx={{ flexGrow: 1, pt: 0 }}>
      <Box sx={{ mb: 4 }}>
        <Box className='flex items-center justify-between '>
          <Typography sx={{ fontWeight: 700, fontSize: '24px', color: 'customColors.darkGray1' }}>
            PMA Cost Breakdown
          </Typography>

          <FormControl className='w-[320px]'>
            <InputLabel
              id='pma-select-label'
              sx={{
                color: '#26C6F9',
                '&.Mui-focused': {
                  color: '#26C6F9'
                }
              }}
            >
              Select PMA
            </InputLabel>
            <Select
              labelId='pma-select-label'
              id='pma-select'
              value={selectedPma}
              onChange={handleChange}
              label='Select PMA'
              sx={{
                color: '#26C6F9 !important',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#26C6F9 !important'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#26C6F9 !important'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#26C6F9 !important'
                },
                '& .MuiSelect-select': {
                  color: '#26C6F9 !important'
                },
                '& .MuiSelect-icon': {
                  color: '#26C6F9 !important'
                },
                '& .MuiInputBase-input': {
                  color: '#26C6F9 !important'
                },
                '& .MuiOutlinedInput-root': {
                  color: '#26C6F9 !important'
                },
                '& .MuiSvgIcon-root': {
                  color: '#26C6F9 !important'
                },
                '& .MuiSelect-iconOpen': {
                  color: '#26C6F9 !important'
                }
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    '& .MuiMenuItem-root': {
                      color: '#26C6F9 !important',
                      '&:hover': {
                        backgroundColor: '#26C6F93D !important',
                        color: '#26C6F9 !important'
                      },
                      '&.Mui-selected': {
                        backgroundColor: '#26C6F93D !important',
                        color: '#26C6F9 !important',
                        '&:hover': {
                          backgroundColor: '#26C6F93D !important',
                          color: '#26C6F9 !important'
                        }
                      }
                    }
                  }
                }
              }}
            >
              {archiveDetailsData?.data?.shortlisted_pmas?.map((pma: ShortlistedPma) => (
                <MenuItem key={pma?.id} value={pma?.id}>
                  {pma?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {isLoading ? (
          <Box className='flex justify-center items-center h-[300px]'>
            <Typography variant='body1'>Loading...</Typography>
          </Box>
        ) : isError || !archiveDetailsData?.data?.management_fees?.length ? (
          <Box className='flex justify-center items-center h-[300px]'>
            <Typography variant='body1'>No data found</Typography>
          </Box>
        ) : (
          <section className='flex flex-wrap pt-[28px]'>
            {archiveDetailsData?.data?.management_fees?.map((feeItem: any, feeIndex: any) => (
              <Grid item xs={12} sm={6} md={4} key={feeIndex} className='w-[240px]'>
                <Box sx={{ marginBottom: 4, marginTop: 4 }}>
                  <Grid container spacing={3} className='w-[230px]'>
                    <Grid item xs={12} sm={6} md={12}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 40,
                            height: 40,
                            backgroundColor: '#E3F2FD',
                            borderRadius: '8px',
                            flexShrink: 0
                          }}
                        >
                          <Image src={iconMap[feeItem?.management_fee_slug]} alt='images' />
                        </Box>
                        <Box>
                          <Typography variant='body2' sx={{ fontWeight: 500 }} className='w-[180px]'>
                            {feeItem?.management_fee_title}
                          </Typography>
                          <Typography variant='caption' color='#262B43E5' className='text-[20px]'>
                            €{feeItem?.fee_amount}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            ))}
          </section>
        )}
      </Box>
    </CardContent>
  )
}

export default PmaCostBreakdown
