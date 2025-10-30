'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { Drawer, Box, Typography, Divider, Button } from '@mui/material'

import PainPoints from '@/views/TenderInformations/PainPoints'
import PrioritiesSection from '@/views/TenderInformationUpdated/components/PrioritiesSection'
import BlockDetailsInfoSection from '@/views/TenderInformationUpdated/components/BlockDetailsInfoSection'
import { usePmaTenderDetail } from '@/hooks/usePmaTenderDetail'
import { titleClass } from '@/constants/styles'
import ServiceChargeBudgetSection from '@/views/TenderInformationUpdated/components/ServiceChargeBudgetSection'

type Anchor = 'top' | 'left' | 'bottom' | 'right'

interface PmaTenderDrawerProps {
  open: boolean
  onClose: () => void
  tenderId: number | null
}

const PmaTenderDrawer = ({ open, onClose, tenderId }: PmaTenderDrawerProps) => {
  const anchor: Anchor = 'right'
  const router = useRouter()

  const { tenderDetailData } = usePmaTenderDetail({ tenderId })

  const handleApply = () => {
    if (tenderId) {
      router.push(`/tender-response/${tenderId}`)
    }
  }

  const transformedBudgetData = tenderDetailData?.data?.rmc_service_charge_budget && {
    managing_fee: String(tenderDetailData?.data?.rmc_service_charge_budget?.managing_fee || 0),
    accounting_fee: String(tenderDetailData?.data?.rmc_service_charge_budget?.accounting_fee || 0),
    cosec_fee: String(tenderDetailData?.data?.rmc_service_charge_budget?.cosec_fee || 0),
    out_of_hours_fee: String(tenderDetailData?.data?.rmc_service_charge_budget?.out_of_hours_fee || 0),
    emergency_fee: String(tenderDetailData?.data?.rmc_service_charge_budget?.emergency_fee || 0),
    fire_door_fee: String(tenderDetailData?.data?.rmc_service_charge_budget?.fire_door_fee || 0),
    anti_money_fee: String(tenderDetailData?.data?.rmc_service_charge_budget?.anti_money_fee || 0)
  }

  const drawerContent = (
    <Box sx={{ width: 830, p: 8 }}>
      <section className='flex items-start justify-between mt-3'>
        <div className='flex items-center space-x-[14px]'>
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <span className='px-6 py-3 text-[#E8F9FE] bg-[#35C0ED] rounded-full text-sm font-semibold'>
                Live Tender
              </span>
            </div>
            <Typography variant='h3' className='font-bold text-[#1F4E8D] text-3xl pt-5'>
              {tenderDetailData?.data?.rmc_data?.rmc_number}
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
      <BlockDetailsInfoSection
        blockData={tenderDetailData?.data?.tender_onboarding}
        cardsPerRow={3}
        showTitle={false}
      />
      <Divider sx={{ mt: 6 }} />
      <Box sx={{ marginTop: 4 }}>
        <ServiceChargeBudgetSection
          budgetData={transformedBudgetData}
          itemsPerRow={3}
          sx={titleClass}
          title='RMC Service Charge Budget'
        />
      </Box>
      <Divider sx={{ mt: 6 }} />

      <PrioritiesSection
        priorities={tenderDetailData?.data?.rmc_priorities ?? []}
        cardsPerRow={3}
        titleSx={titleClass}
      />
      <Divider sx={{ mt: 10 }} />

      <section className='mt-[38px]'>
        <PainPoints painPoints={tenderDetailData?.data?.pain_points ?? []} titleSx={titleClass} />
      </section>
      <section className='flex items-center justify-end py-[12px] space-x-[24px] mt-6'>
        <div>
          <Button variant='contained' className='!bg-[#35C0ED] w-[170px] h-10' onClick={handleApply}>
            <i className='ri-eye-line bg-white size-[18px] pr-[5px]'></i>
            <span className='pl-[5px]'>Apply</span>
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
