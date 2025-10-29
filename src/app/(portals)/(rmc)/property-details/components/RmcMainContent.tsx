'use client'

import React from 'react'

import Image from 'next/image'

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Tabs,
  Tab,
  Divider,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'

import type { RmcData } from '../types/data'

import calander from '../../../../../../public/images/customImages/calander.svg'
import timeLine from '../../../../../../public/images/customImages/timeLine.svg'
import map from '../../../../../../public/images/customImages/map.svg'

const siteVisits = [
  {
    id: 1,
    day: 'Monday',
    date: '25th June 2025',
    image: calander,
    alt: 'calendar'
  },
  {
    id: 2,
    day: 'Tuesday',
    date: '26th June 2025',
    image: timeLine,
    alt: 'timeline'
  },
  {
    id: 3,
    day: 'Wednesday',
    date: '27th June 2025',
    image: map,
    alt: 'map'
  }
]

interface RmcMainContentProps {
  rmcData: RmcData
  activeTab: string
  onTabChange: (tab: string) => void
}

const RmcMainContent: React.FC<RmcMainContentProps> = ({ rmcData, activeTab, onTabChange }) => {
  const tabs = ['Site Visits', 'Calls', 'Chats', 'Documents', 'Notes']

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Card sx={{ borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }} className='px-8 '>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ marginBottom: 4 }}>
            <Typography color='#1F4E8D' sx={{ fontWeight: 600, marginBottom: 1, fontSize: '34px' }}>
              {rmcData.name}
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              {rmcData.id}
            </Typography>
          </Box>
          <Box sx={{ paddingY: '10px' }}>
            <Divider />
          </Box>

          <Box sx={{ marginBottom: 4, marginTop: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      backgroundColor: '#E3F2FD',
                      borderRadius: '8px'
                    }}
                  >
                    <i className='ri-map-pin-line' style={{ fontSize: '1.5rem', color: '#1976D2' }} />
                  </Box>
                  <Box>
                    <Typography variant='caption' color='text.secondary'>
                      Region
                    </Typography>
                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                      {rmcData.propertyDetails.region}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      backgroundColor: '#E3F2FD',
                      borderRadius: '8px'
                    }}
                  >
                    <i className='ri-building-line' style={{ fontSize: '1.5rem', color: '#1976D2' }} />
                  </Box>
                  <Box>
                    <Typography variant='caption' color='text.secondary'>
                      Unit Count
                    </Typography>
                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                      {rmcData.propertyDetails.unitCount} Units
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      backgroundColor: '#E3F2FD',
                      borderRadius: '8px'
                    }}
                  >
                    <i className='ri-grid-line' style={{ fontSize: '1.5rem', color: '#1976D2' }} />
                  </Box>
                  <Box>
                    <Typography variant='caption' color='text.secondary'>
                      Number of Blocks
                    </Typography>
                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                      {rmcData.propertyDetails.blockCount.toString().padStart(2, '0')}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      backgroundColor: '#E3F2FD',
                      borderRadius: '8px'
                    }}
                  >
                    <i className='ri-calendar-line' style={{ fontSize: '1.5rem', color: '#1976D2' }} />
                  </Box>
                  <Box>
                    <Typography variant='caption' color='text.secondary'>
                      Year Built
                    </Typography>
                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                      {rmcData.propertyDetails.yearBuilt}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      backgroundColor: '#E3F2FD',
                      borderRadius: '8px'
                    }}
                  >
                    <i className='ri-shield-line' style={{ fontSize: '1.5rem', color: '#1976D2' }} />
                  </Box>
                  <Box>
                    <Typography variant='caption' color='text.secondary'>
                      Block Condition
                    </Typography>
                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                      {rmcData.propertyDetails.blockCondition}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      backgroundColor: '#E3F2FD',
                      borderRadius: '8px'
                    }}
                  >
                    <i className='ri-plant-line' style={{ fontSize: '1.5rem', color: '#1976D2' }} />
                  </Box>
                  <Box>
                    <Typography variant='caption' color='text.secondary'>
                      Outdoor Space
                    </Typography>
                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                      {rmcData.propertyDetails.outdoorSpace ? 'Yes' : 'No'}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      backgroundColor: '#E3F2FD',
                      borderRadius: '8px'
                    }}
                  >
                    <i className='ri-settings-3-line' style={{ fontSize: '1.5rem', color: '#1976D2' }} />
                  </Box>
                  <Box>
                    <Typography variant='caption' color='text.secondary'>
                      Product Type
                    </Typography>
                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                      {rmcData.propertyDetails.productType}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ marginTop: '34px' }}>
            <Divider />
          </Box>
          <Box sx={{ marginBottom: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 3, marginTop: '34px' }}>
              <Typography
                color='#1F4E8D'
                sx={{
                  fontWeight: 500,
                  fontSize: '18px'
                }}
              >
                RMC Priorities
              </Typography>
              <i className='ri-information-line' style={{ fontSize: '1rem', color: 'text.secondary' }} />
            </Box>
            <Grid container spacing={4} sx={{ marginTop: '34px' }}>
              {rmcData.priorities.map(priority => (
                <Grid item xs={12} sm={6} md={4} key={priority.id}>
                  <Card sx={{ height: '100px' }} className='border-l-4 border-l-[#35C0ED] border-l'>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, height: '100%' }}>
                      <Box
                        sx={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          paddingX: '12px',
                          paddingY: '9px'
                        }}
                      >
                        <Typography
                          variant='subtitle2'
                          sx={{
                            fontWeight: 600,
                            marginBottom: 1,
                            color: '#1F4E8D'
                          }}
                        >
                          {priority.id}. {priority.title}
                        </Typography>
                        <Typography variant='body2' color='text.secondary' sx={{ lineHeight: 1.4 }}>
                          {priority.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box sx={{ marginTop: '34px' }}>
            <Divider />
          </Box>
          <Box sx={{ marginBottom: 4, marginTop: '34px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 3 }}>
              <Typography
                color='#1F4E8D'
                sx={{
                  fontWeight: 500,
                  fontSize: '18px'
                }}
              >
                RMC Pain Points
              </Typography>
              <i className='ri-information-line' style={{ fontSize: '1rem', color: 'text.secondary' }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: '18px' }}>
              <Accordion
                sx={{
                  border: '2px solid #E4A324 !important',
                  borderRadius: '8px',
                  '&:before': { display: 'none !important' },
                  boxShadow: 'none !important',
                  '& .MuiAccordion-root': {
                    border: '2px solid #E4A324 !important'
                  },
                  '& .MuiAccordionDetails-root': {
                    borderTop: '1px solid #E4A324 !important'
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={<i className='ri-arrow-down-s-line' style={{ color: '#E4A324' }} />}
                  sx={{
                    backgroundColor: '#FFF7ED',
                    padding: '12px 16px',
                    '& .MuiAccordionSummary-content': {
                      margin: 0
                    }
                  }}
                >
                  <Typography sx={{ color: '#696969', fontSize: '14px' }}>
                    What would you like to see done differently by a new managing agent?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ backgroundColor: 'white', padding: '16px' }}>
                  <Typography variant='body2' color='text.secondary'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                sx={{
                  border: '2px solid #E4A324 !important',
                  borderRadius: '8px',
                  '&:before': { display: 'none !important' },
                  boxShadow: 'none !important',
                  '& .MuiAccordion-root': {
                    border: '2px solid #E4A324 !important'
                  },
                  '& .MuiAccordionDetails-root': {
                    borderTop: '1px solid #E4A324 !important'
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={<i className='ri-arrow-down-s-line' style={{ color: '#E4A324' }} />}
                  sx={{
                    backgroundColor: '#FFF7ED',
                    padding: '12px 16px',
                    '& .MuiAccordionSummary-content': {
                      margin: 0
                    }
                  }}
                >
                  <Typography variant='body1' sx={{ color: '#696969' }}>
                    Are there any systems, tools, or financial reporting features that would improve how your block is
                    managed?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ backgroundColor: 'white', padding: '16px' }}>
                  <Typography variant='body2' color='text.secondary'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                sx={{
                  border: '2px solid #E4A324 !important',
                  borderRadius: '8px',
                  '&:before': { display: 'none !important' },
                  boxShadow: 'none !important',
                  '& .MuiAccordion-root': {
                    border: '2px solid #E4A324 !important'
                  },
                  '& .MuiAccordionDetails-root': {
                    borderTop: '1px solid #E4A324 !important'
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={<i className='ri-arrow-down-s-line' style={{ color: '#E4A324' }} />}
                  sx={{
                    backgroundColor: '#FFF7ED',
                    padding: '12px 16px',
                    '& .MuiAccordionSummary-content': {
                      margin: 0
                    }
                  }}
                >
                  <Typography variant='body1' sx={{ color: '#696969' }}>
                    What service challenges have you experienced with your current managing agent?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ backgroundColor: 'white', padding: '16px' }}>
                  <Typography variant='body2' color='text.secondary'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>

          <Box sx={{ marginBottom: 4, marginTop: 10 }}>
            <Tabs
              value={activeTab}
              onChange={(_, newValue) => onTabChange(newValue)}
              sx={{
                width: '100%',
                '& .MuiTab-root': {
                  minHeight: 60,
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  color: '#666',
                  flex: 1,
                  padding: '8px 16px',
                  '&.Mui-selected': {
                    color: '#35C0ED'
                  }
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#35C0ED',
                  height: 3
                }
              }}
            >
              {tabs.map(tab => (
                <Tab
                  key={tab}
                  value={tab}
                  label={
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 1,
                        width: '100%'
                      }}
                    >
                      <i
                        className={
                          tab === 'Site Visits'
                            ? 'ri-building-line'
                            : tab === 'Calls'
                              ? 'ri-phone-line'
                              : tab === 'Chats'
                                ? 'ri-chat-1-line'
                                : tab === 'Documents'
                                  ? 'ri-file-text-line'
                                  : 'ri-sticky-note-line'
                        }
                        style={{
                          fontSize: '1.25rem',
                          color: activeTab === tab ? '#35C0ED' : '#666'
                        }}
                      />
                      <Typography
                        variant='caption'
                        sx={{
                          color: activeTab === tab ? '#35C0ED' : '#666',
                          fontWeight: activeTab === tab ? 600 : 400,
                          fontSize: '0.875rem'
                        }}
                      >
                        {tab}
                      </Typography>
                    </Box>
                  }
                />
              ))}
            </Tabs>
          </Box>
          <Box>
            <Typography variant='h4' className='mt-[20px]'>
              Upcoming Site Visit
            </Typography>
            <Typography variant='body2' className='max-w-[65%] mt-[20px]'>
              Meeting with PMA - 12315566 on Monday 25th June 2025 at 11:00 AM. Location Address 123 Main Street Apt 48
              Anytown, State 12345, London
            </Typography>

            <div className='mt-5 flex flex-row justify-between'>
              {siteVisits.map(visit => (
                <section key={visit.id} className='flex flex-col items-center mb-2 px-4'>
                  <Image src={visit.image} alt={visit.alt} className='size-[28px]' />
                  <p className='text-center mt-3'>{visit.day}</p>
                  <p className='text-center'>{visit.date}</p>
                  <div
                    className={`h-[10px] ${
                      visit.id === 1
                        ? 'bg-[#E1F3D7]'
                        : visit.id === 2
                          ? 'bg-[#5e728d]'
                          : visit.id === 3
                            ? 'bg-[#D5EFF9]'
                            : ''
                    } w-[200px] rounded-xl mt-7`}
                  ></div>
                </section>
              ))}
            </div>
          </Box>

          <Box sx={{ marginTop: '34px' }}>
            <Divider />
          </Box>

          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '54px', marginBottom: '71px' }}
          >
            <Button variant='contained' className='bg-buttonPrimary gap-x-3'>
              <i className='ri-arrow-down-line size-[22px]'></i> Download Profile
            </Button>
            <Button variant='contained' className='bg-buttonPrimary gap-x-3'>
              <i className='ri-eye-line size-[22px]'></i> View Questionnaire
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default RmcMainContent
