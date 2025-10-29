'use client'

import React from 'react'

import { Drawer, Box, Typography, Divider, Button } from '@mui/material'

import PainPoints from '@/views/TenderInformations/PainPoints'
import PrioritiesSection from '@/views/TenderInformationUpdated/components/PrioritiesSection'
import BlockDetailsInfoSection from '@/views/TenderInformationUpdated/components/BlockDetailsInfoSection'
import { usePmaTenderDetail } from '@/hooks/usePmaTenderDetail'

type Anchor = 'top' | 'left' | 'bottom' | 'right'

interface PmaTenderDrawerProps {
  open: boolean
  onClose: () => void
  tenderId: number | null
}

const dummyPriorities = [
  {
    id: 1,
    name: 'Saving Money',
    description: 'Want to reduce costs and get good value for money without cutting quality.'
  },
  {
    id: 2,
    name: 'Clearer Communication',
    description: 'Looking for regular updates and easier ways to stay in touch.'
  },
  {
    id: 3,
    name: 'Better Problem-Solving',
    description: 'Expect quicker responses and effective fixes when issues arise.'
  },
  {
    id: 4,
    name: 'Being Involved',
    description: 'Want to feel more included and listened to in decisions about the block.'
  },
  {
    id: 5,
    name: 'Higher Standards',
    description: 'Expect a consistently high level of service and attention to detail.'
  },
  {
    id: 6,
    name: 'Clearer Financial Reporting',
    description: 'Want transparency in financial matters and better understanding of costs.'
  },
  {
    id: 7,
    name: 'Being Involved',
    description: 'Want to feel more included and listened to in decisions about the block.'
  }
]

const dummyPainPoints = [
  {
    question_id: 1,
    question: 'What would you like to see done differently by a new managing agent?',
    answer:
      'Better communication and faster response times to maintenance issues. More transparency in financial reporting and regular updates on property matters.'
  },
  {
    question_id: 2,
    question:
      'Are there any systems, tools, or financial reporting features that would improve how you track & manage?',
    answer:
      'An online portal for real-time financial tracking, automated reporting systems, and a mobile app for quick updates and communication would be highly beneficial.'
  },
  {
    question_id: 3,
    question: 'What service challenges have you experienced with your current managing agent?',
    answer:
      'Slow response to urgent matters, lack of proactive maintenance, and inconsistent communication about important property issues.'
  }
]

const PmaTenderDrawer = ({ open, onClose, tenderId }: PmaTenderDrawerProps) => {
  const anchor: Anchor = 'right'

  const { tenderDetailData } = usePmaTenderDetail({ tenderId })

  const transformedBlockData: any = tenderDetailData?.data?.property_details && {
    region: tenderDetailData?.data?.property_details?.city || 'N/A',
    total_units: tenderDetailData?.data?.property_details?.total_units,
    number_of_blocks: tenderDetailData?.data?.property_details?.number_of_blocks,
    year_built: tenderDetailData?.data?.property_details?.year_built,
    block_condition: tenderDetailData?.data?.property_details?.block_condition,
    outdoor_space: tenderDetailData?.data?.property_details?.outdoor_space,
    leasehold_type: tenderDetailData?.data?.property_details?.leasehold_type,
    building_height: tenderDetailData?.data?.property_details?.building_height || null,
    address: tenderDetailData?.data?.property_details?.address,
    postcode: tenderDetailData?.data?.property_details?.postcode
  }

  const handleApply = () => {
    console.log('Apply to tender')
  }

  const drawerContent = (
    <Box sx={{ width: 830, p: 8 }} role='presentation'>
      <section className='flex items-start justify-between mt-[34px]'>
        <div className='flex items-center space-x-[14px]'>
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <span className='px-3 py-1 bg-[#E8F9FE] text-[#35C0ED] rounded-full text-xs font-semibold'>
                Live Tender
              </span>
            </div>
            <Typography variant='h3' className='font-bold text-[#262B43E5]'>
              RMC1XXXX
            </Typography>
            <Typography variant='h6' className='text-[#696969] mt-1'>
              Tender ID - 123
            </Typography>
          </div>
        </div>
        <div>
          <span onClick={onClose} className='cursor-pointer'>
            <i className='ri-close-large-line text-xl'></i>
          </span>
        </div>
      </section>
      <Divider sx={{ mt: 4 }} />
      <BlockDetailsInfoSection blockData={transformedBlockData} />
      <PrioritiesSection priorities={dummyPriorities} cardsPerRow={3} />
      <section className='mt-[38px]'>
        <PainPoints painPoints={dummyPainPoints} />
      </section>
      <section className='flex items-center justify-end py-[12px] space-x-[24px] mt-6'>
        <div>
          <Button variant='contained' className='!bg-[#35C0ED] w-[280px]' onClick={handleApply}>
            <i className='ri-send-plane-line bg-white size-[18px] pr-[5px]'></i>
            <span className='pl-[5px]'>Apply to Tender</span>
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

export default PmaTenderDrawer
