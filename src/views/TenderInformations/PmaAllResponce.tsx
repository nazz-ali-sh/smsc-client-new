'use client'

import React from 'react'

import Image from 'next/image'

import { Card,  Divider, Typography,  Box } from '@mui/material'

import avatar from '../../../public/images/dashboardImages/Avartar3.png'
import DrawerWidget from './DrawerWidget'
import PainPoints from './PainPoints'
import ServiceChargeBudget from './ServiceChargeBudget'
import PmaCostbreakdown from './PmaCostbreakdown'
import ResponceandBio from './ResponceandBio'

interface pmaAllResponce {
  drawerData?: any
}

const PmaAllResponce: React.FC<pmaAllResponce> = ({ drawerData }) => {
  console.log(drawerData)
  const companyMetrics = drawerData?.data?.responses?.[0]?.company_metrics

  const cardsData = [
    {
      id: 0,

      state: companyMetrics?.total_units_managed | 0,
      icons: <i className='ri-customer-service-2-line'></i>,
      descrption: 'No. of Units Managed'
    },
    {
      id: 1,
      icons: <i className='ri-phone-line'></i>,
      state: companyMetrics?.avg_units_per_manager | 0,
      descrption: 'Quotation'
    },

    {
      id: 2,
      icons: <i className='ri-map-pin-2-line'></i>,
      state: companyMetrics?.trading_years | 0,
      descrption: 'Trading Years'
    }
  ]

  return (
    <>
      <Card>
        <Box sx={{ width: 830, p: 8 }} role='presentation'>
         
            return (
              <>
                <section  className='flex items-start justify-between mt-[34px]'>
                  <div className='flex items-center space-x-[14px]'>
                    <Image src={avatar} alt='avatar' className='size-[94px]' />
                    <div>
                      <Typography variant='h3' className='font-bold'>
                        PMA1xxxx
                      </Typography>
                      <Typography variant='h5' className=''>
                        PMA ID - xxxxxxxxxx
                      </Typography>
                    </div>
                  </div>
                </section>
              </>
            )
          

          <Divider sx={{ mt: 9 }} />

          <DrawerWidget cardsData={cardsData} />

          {drawerData?.data?.responses?.map((item: any, index: any) => {
            return (
              <React.Fragment key={index}>
                <section className='mt-[38px]'>
                  <PainPoints painPoints={drawerData?.data?.responses} />
                </section>
                <ServiceChargeBudget servicesbuget={item?.management_fees} />
                <PmaCostbreakdown pmaCostBreakDown={item?.management_fees} />
                <ResponceandBio boi={item?.company_bio?.bio} responce={item?.response_details?.message} />
              </React.Fragment>
            )
          })}
        </Box>
      </Card>
    </>
  )
}

export default PmaAllResponce
