'use client'

import { useState } from 'react'

import Image from 'next/image'

import { Box, Card, CardContent, Typography, Grid, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import { useQuery } from '@tanstack/react-query'

import { archiveDetails } from '@/services/final_result_and_archeive_apis/final_results_apis'
import { iconMap, iconMaps } from '@/common/data'

// import { SummaryCards } from '@/common/SummaryCardsDetails'
import SummaryCards from '@/common/SummaryCardsDetails'

interface PageProps {
  params: {
    id: string
  }
}

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

const Page = ({ params }: PageProps) => {
  const param_id = Number(params?.id)
  const [selectedPma, setSelectedPma] = useState<number | ''>('')

  const {
    data: archiveDetailsData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['gettingVideoCallsDetails', param_id, selectedPma],
    queryFn: () => archiveDetails(param_id, selectedPma ? Number(selectedPma) : undefined),
    enabled: !!param_id
  })

  const blockDetailsConfig: Record<string, string> = {
    location: 'Location',
    units_count: 'Units Count',
    number_of_blocks: 'Number of Blocks',
    outdoor_space: 'Outdoor Space',
    year_built: 'Year Built',
    block_condition: 'Condition',
    building_height: 'Building Height',
    product_type: 'Product Type'
  }

  const handleChange = (event: any) => {
    setSelectedPma(event.target.value)
  }

  return (
    <>
      <SummaryCards />
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', marginTop: '35px' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant='h3' className='text-darkblue pt-[34px] text-[18px]'>
              Block Details
            </Typography>

            <section className='flex flex-wrap pt-[28px]'>
              {Object.entries(blockDetailsConfig).map(([key, label], index) => {
                const value = archiveDetailsData?.data?.block_details?.[key]
                const displayValue = value !== null && value !== '' ? String(value) : 'N/A'

                return (
                  <Grid item xs={12} sm={6} md={4} key={index} className='w-[240px]'>
                    <Box sx={{ marginBottom: 4, marginTop: 4 }}>
                      <Grid container spacing={3} className='w-[230px]'>
                        <Grid item xs={12}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            {/* Icon placeholder (optional) */}
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
                              {iconMaps[key] && <Image src={iconMaps[key]} alt={key} width={24} height={24} />}
                            </Box>

                            <Box>
                              <Typography variant='body2' sx={{ fontWeight: 500 }} className='w-[180px]'>
                                {label}
                              </Typography>

                              <Typography variant='caption' color={value ? '#262B43E5' : 'red'} className='text-[20px]'>
                                {displayValue}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                )
              })}
            </section>
          </Box>
        </CardContent>

        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ mb: 4 }}>
            {/* Header row */}
            <Box className='flex items-center justify-between pt-[34px]'>
              <Typography variant='h3' className='text-darkblue text-[18px]'>
                PMA Cost Breakdown
              </Typography>

              <FormControl className='w-[250px]'>
                <InputLabel id='pma-select-label'>Select PMA</InputLabel>
                <Select labelId='pma-select-label' value={selectedPma} onChange={handleChange}>
                  {archiveDetailsData?.data?.shortlisted_pmas?.map((pma: ShortlistedPma) => (
                    <MenuItem key={pma.id} value={pma.id}>
                      {pma.name}
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
      </Card>
    </>
  )
}

export default Page
