'use client'

import { useState } from 'react'

import Image from 'next/image'

import { Box, Card, CardContent, Typography, Grid } from '@mui/material'

import { iconMap } from '@/common/data'
import ServiceChargeBudgetSection from '@/views/TenderInformationUpdated/components/ServiceChargeBudgetSection'
import { useTenderDetail } from '@/hooks/useTenderDetail'
import successVisit from '../../../../public/images/customImages/sucess.svg'
import { currencySymbol } from '@/constants'
import CommonModal from '@/common/CommonModal'

interface FinalSelectionResponse {
  finalSelection?: any
}

const ProjectMetrics: React.FC<FinalSelectionResponse> = ({ finalSelection }) => {
  const { data: tenderDetailData } = useTenderDetail()
  const [openPmatooltip, setOpenPmaTooltip] = useState(false)

  const metrics: Array<{
    title: string
    value: string
    icon: string | React.ReactNode
    backgroundColor: string
    iconColor: string
  }> = [
    {
      title: 'No. of Units Managed',
      value: finalSelection?.data?.company_details?.avg_units_per_manager
        ? `${finalSelection.data.company_details.avg_units_per_manager} Properties`
        : '0 Properties',
      icon: <Image src={successVisit} alt='success Visit' />,
      backgroundColor: '#E3F9D4',
      iconColor: '#4CAF50'
    },
    {
      title: 'Quotation',
      value: finalSelection?.data?.company_details?.avg_units_per_manager
        ? `£ ${finalSelection.data.company_details.avg_units_per_manager}`
        : '£ 0',
      icon: 'ri-money-dollar-circle-line',
      backgroundColor: '#CBEFFB',
      iconColor: '#5BCCF0'
    },
    {
      title: 'Years Trading',
      value: finalSelection?.data?.company_details?.trading_years
        ? `${finalSelection.data.company_details.trading_years} Years`
        : '0 Years',
      icon: 'ri-calendar-check-fill',
      backgroundColor: '#666CFF3D',
      iconColor: '#666CFF'
    }
  ]

  const totalFee =
    finalSelection?.data?.management_fees?.find((f: any) => f.management_fee_slug === 'total')?.fee_amount || 0

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box>
          <Box sx={{ paddingTop: '10px' }}>
            <Grid container spacing={4}>
              {metrics.map((metric, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Card>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: metric.backgroundColor,
                            border: `1px solid ${metric.iconColor}30`
                          }}
                        >
                          {typeof metric.icon === 'string' ? (
                            <i
                              className={metric.icon}
                              style={{
                                fontSize: 24,
                                color: metric.iconColor
                              }}
                            />
                          ) : (
                            metric.icon
                          )}
                        </Box>
                        <Box>
                          <Typography
                            variant='body2'
                            sx={{ mb: 1, fontSize: '18px', color: '#262B43E5', fontWeight: 500 }}
                          >
                            {metric.title}
                          </Typography>
                          <Typography variant='h5' sx={{ fontWeight: 400, fontSize: '15px', color: '#262B43B2' }}>
                            {metric.value ?? 0}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </CardContent>

      <Box sx={{ marginX: 6 }}>
        <ServiceChargeBudgetSection budgetData={tenderDetailData?.service_charge_budget} itemsPerRow={3} />
      </Box>

      <CardContent sx={{ flexGrow: 1, pt: 0 }}>
        <Box sx={{ mb: 4 }}>
         <div className="flex">
           <Typography sx={{ fontWeight: 700, fontSize: '24px', color: 'customColors.darkGray1' }}>
            Fixed Cost Quote from Managing Agent: {currencySymbol}
            {totalFee}
          </Typography>
          <Box>
            <i
              className='ri-information-line cursor-pointer text-black transition-colors ml-2 mt-1'
              onClick={() => setOpenPmaTooltip(true)}
            ></i>
          </Box>
         </div>
          <section className='flex flex-wrap pt-[28px]'>
            {finalSelection?.data?.management_fees
              ?.filter((fee: any) => fee.management_fee_slug !== 'total')
              .map((feeItem: any, feeIndex: any) => (
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
                                {currencySymbol}
                                {feeItem?.fee_amount}
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
        </Box>
      </CardContent>

      <CommonModal
        isOpen={openPmatooltip}
        handleClose={() => setOpenPmaTooltip(false)}
        header='About this   quote'
        maxWidth='sm'
      >
        <div className='space-y-4'>
          <Typography variant='body1' className='text-[#696969] text-xs mt-3 leading-[22px]'>
            This quote covers the fixed-cost elements of your service charge (for example: management, accounting/CoSec,
            out-of- hours, AML checks, fire-door inspection). It’s valid based on the accuracy of the information your
            RMC supplied during onboarding.
          </Typography>

          <div>
            <Typography variant='body2' className='text-[#696969] mb-3 leading-[22px]'>
              Variable costs (such as window cleaning, gardening, energy, general repairs) can be carried over to your
              new managing agent unchanged, or you can ask them (after appointment) to re-tender or review suppliers to
              reduce costs.
            </Typography>
          </div>
        </div>
      </CommonModal>
    </Card>
  )
}

export default ProjectMetrics
