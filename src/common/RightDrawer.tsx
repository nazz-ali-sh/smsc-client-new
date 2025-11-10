'use client'
import * as React from 'react'

import type { Dispatch, SetStateAction } from 'react'

import Image from 'next/image'

import { Divider, Typography, Drawer, Box, Button } from '@mui/material'

import avatar3 from '../../public/images/dashboardImages/Avartar3.png'
import dollarSign from '../../public/images/TenderResults/dollarSign.svg'
import properties from '../../public/images/TenderResults/properties.svg'
import calander from '../../public/images/TenderResults/calander.svg'

import PainPoints from '@/views/TenderInformations/PainPoints'
import PmaCostbreakdown from '@/views/TenderInformations/PmaCostbreakdown'
import DrawerWidget from '@/views/TenderInformations/DrawerWidget'
import ResponceandBio from '@/views/TenderInformations/ResponceandBio'
import ServiceChargeBudgetSection from '@/views/TenderInformationUpdated/components/ServiceChargeBudgetSection'

type Anchor = 'top' | 'left' | 'bottom' | 'right'

interface AnchorTemporaryDrawerProps {
  open: boolean
  onClose: () => void
  drawerData: any
  successModalOpen: boolean
  setSuccessModalOpen: Dispatch<SetStateAction<boolean>>
  handleConfirmSelected: () => void
  DrawerStats?: any
}

export default function AnchorTemporaryDrawer({
  open,
  onClose,
  drawerData,
  setSuccessModalOpen,
  DrawerStats
}: AnchorTemporaryDrawerProps) {
  const anchor: Anchor = 'right'

  const cardsData = [
    {
      id: 0,

      state: DrawerStats?.company_metrics?.total_units_managed | 0,
      icons: properties,
      descrption: 'No. of Units Managed'
    },
    {
      id: 1,
      icons: dollarSign,
      state: DrawerStats?.quotation?.total_management_fees | 0,
      descrption: 'Quotation'
    },

    {
      id: 2,
      icons: calander,
      state: DrawerStats?.company_metrics?.trading_years | 0,
      descrption: 'Years Trading'
    }
  ]

  const handleUpdateID = () => {
    setSuccessModalOpen(true)
  }

  const response = drawerData?.responses?.[0]

  const drawerContent = (
    <Box sx={{ width: 830, p: 8 }} role='presentation' onKeyDown={onClose}>
      <section className='flex items-start justify-between mt-[34px]'>
        <div className='flex items-center space-x-[14px]'>
          <Image src={avatar3} alt='avatar' className='size-[94px]' />
          <div>
            <Typography variant='h3' className='font-bold'>
              {response?.pma_number}
            </Typography>
            <Typography variant='h5' className=''>
              PMA ID - {response?.pma_user_id}
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

      <DrawerWidget cardsData={cardsData} />

      {response && (
        <React.Fragment>
          <section className='mt-[38px]'>
            <PainPoints painPoints={response?.onboarding_answers?.pain_points} />
          </section>

          <ServiceChargeBudgetSection
            budgetData={drawerData?.service_charge_budget}
            sx={{
              fontWeight: 700,
              fontSize: '18px',
              color: '#262B43E5',
              paddingTop: '8px'
            }}
          />

          <PmaCostbreakdown pmaCostBreakDown={response?.managment_fees} />

          <ResponceandBio
            boi={response?.company_bio?.bio}
            responce={response?.response_details?.message}
            pmaNumber={response?.pma_number}
          />
        </React.Fragment>
      )}

      <section className='flex items-center justify-end py-[12px] space-x-[24px]'>
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
