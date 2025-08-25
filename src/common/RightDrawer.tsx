import * as React from 'react'

import type { Dispatch, SetStateAction } from 'react'

import Image from 'next/image'

import {
  Card,
  CardContent,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Divider,
  Typography,
  Drawer,
  Box,
  Grid,
  Button
} from '@mui/material'

import avatar3 from '../../public/images/dashboardImages/Avartar3.png'

import managementFee from '../../public/images/tenderShortlisted/managemnetFees.svg'
import acountingFee from '../../public/images/tenderShortlisted/acountingFee.svg'
import coFee from '../../public/images/tenderShortlisted/coFee.svg'
import clock from '../../public/images/tenderShortlisted/clock.svg'
import emergency from '../../public/images/tenderShortlisted/emergencyfee.svg'
import fireDoor from '../../public/images/tenderShortlisted/fireDoor.svg'
import amlcheck from '../../public/images/tenderShortlisted/amlChecks.svg'
import total from '../../public/images/tenderShortlisted/total.svg'

type Anchor = 'top' | 'left' | 'bottom' | 'right'

const iconMap: any = {
  management_fee: managementFee,
  accounting_fee: acountingFee,
  cosec_fee: coFee,
  out_of_hours_fee: clock,
  emergency_lighting_fee: emergency,
  fire_door_inspection: fireDoor,
  aml_checks: amlcheck,
  total: total
}

interface AnchorTemporaryDrawerProps {
  open: boolean
  onClose: () => void
  drawerData: any
  successModalOpen: boolean
  setSuccessModalOpen: Dispatch<SetStateAction<boolean>>
  handleConfirmSelected: () => void
}

export default function AnchorTemporaryDrawer({
  open,
  onClose,
  drawerData,
  setSuccessModalOpen
}: AnchorTemporaryDrawerProps) {
  const anchor: Anchor = 'right'

  const cardsData = [
    ,
    {
      id: 0,
      state: '27',
      icons: <i className='ri-customer-service-2-line'></i>,
      descrption: 'Schedule Calls'
    },
    {
      id: 1,
      icons: <i className='ri-phone-line'></i>,
      state: '3',
      descrption: 'Complete Calls'
    },

    {
      id: 2,
      icons: <i className='ri-map-pin-2-line'></i>,
      state: '6',
      descrption: 'Schedule Visits'
    }
  ]

  const handleUpdateID = () => {
    setSuccessModalOpen(true)
  }

  const drawerContent = (
    <Box sx={{ width: 786, p: 8 }} role='presentation' onKeyDown={onClose}>
      <section className='flex items-start justify-between mt-[34px]'>
        <div className='flex items-center space-x-[14px]'>
          <Image src={avatar3} alt='avatar' className='size-[94px]' />
          <div>
            <Typography variant='h3' className='font-bold'>
              PMA1xxxx
            </Typography>
            <Typography variant='h5' className=''>
              PMA ID - xxxxxxxxxx
            </Typography>
          </div>
        </div>
        <div>
          <span onClick={onClose} className='mt-2'>
            <i className='ri-close-large-line'></i>
          </span>
        </div>
      </section>

      <Divider sx={{ mt: 9 }} />

      <div className='flex justify-between items-center mt-[34px]'>
        {cardsData.map((items: any, index) => (
          <div className='w-[227px]' key={index}>
            <Card color={'primary'}>
              <CardContent className='flex items-center gap-x-[16px]'>
                <div
                  className={`flex items-center gap-4 ${
                    index === 0 ? 'bg-sky' : index === 1 ? 'bg-[#e3f9d4]' : index === 2 ? 'bg-purple1' : ''
                  } size-[40px] justify-center rounded-lg`}
                >
                  {items?.icons}
                </div>
                <div className='flex flex-col'>
                  <Typography className='text-[17px] font-bold leading-28'>{items.state}</Typography>
                  <Typography variant='body1' color='text.primary'>
                    {items?.descrption}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {drawerData?.responses?.map((item: any, index: any) => {
        return (
          <React.Fragment key={index}>
            <section className='mt-[38px]'>
              <Typography variant='h3' className='text-darkblue text-[18px]'>
                RMC Pain points
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: '34px' }}>
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat.
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat.
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </section>

            <Box sx={{ display: 'flex', alignItems: 'center', rowGap: '20px' }}>
              <Typography variant='h3' className='text-darkblue pt-[34px] text-[18px]'>
                Building Height:
              </Typography>

              <Typography variant='h3' className=' pt-[34px] text-[18px] text-[#696969] pl-[20px]'>
                11
              </Typography>
            </Box>

            <Typography variant='h3' className='text-darkblue pt-[34px] text-[18px]'>
              RMC Service Charge Budget
            </Typography>
            <section className='flex flex-wrap pt-[28px]'>
              {item.management_fees?.map((feeItem: any, feeIndex: any) => (
                <Grid item xs={12} sm={6} md={4} key={feeIndex} className='w-[240px]'>
                  <>
                    <Box sx={{ marginBottom: 4, marginTop: 4 }}>
                      <Grid container spacing={3} className='w-[230px]'>
                        <Grid item xs={12} sm={6} md={12}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                  </>
                </Grid>
              ))}
            </section>

            <Typography variant='h3' className='text-darkblue pt-[34px] text-[18px]'>
              Cost breakdown
            </Typography>
            <section className='flex flex-wrap pt-[28px]'>
              {item.management_fees?.map((feeItem: any, feeIndex: any) => (
                <Grid item xs={12} sm={6} md={4} key={feeIndex} className='w-[240px]'>
                  <>
                    <Box sx={{ marginBottom: 4, marginTop: 4 }}>
                      <Grid container spacing={3} className='w-[230px]'>
                        <Grid item xs={12} sm={6} md={12}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                  </>
                </Grid>
              ))}
            </section>

            <section>
              <section>
                <Typography variant='h3' className='text-darkblue mt-[34px] text-[18px]'>
                  Bio
                </Typography>
                <Typography variant='h5' className='text-[#AEAEAE] mt-[10px] text-[14px]'>
                  {item?.company_bio?.bio}
                </Typography>
              </section>

              <section className=' bg-white px-1 pb-[60px]'>
                <Typography variant='h3' className='text-darkblue  pt-[50px] text-[18px] '>
                  Response
                </Typography>
                <Typography variant='h5' className='text-[#AEAEAE] mt-[20px] text-[14px] '>
                  {item?.response_details?.message}
                </Typography>
              </section>
            </section>
          </React.Fragment>
        )
      })}
      <section className='flex items-center justify-end py-[12px] space-x-[24px]'>
        <div>
          <Button variant='contained' className='!bg-[#35C0ED] w-[280px]'>
            <i className='ri-user-line bg-white size-[18px] pr-[5px]'></i> View Full profile
          </Button>
        </div>
        <div>
          <Button variant='contained' className='!bg-[#35C0ED] w-[280px]' onClick={handleUpdateID}>
            <i className='ri-user-line bg-white size-[18px] pr-[5px]'></i>
            <span className='pl-[5px]'>Shortlist Agent</span>
          </Button>
        </div>
      </section>
    </Box>
  )

  return (
    <Drawer anchor={anchor} open={open} onClose={onClose}>
      {drawerContent}
    </Drawer>
  )
}
