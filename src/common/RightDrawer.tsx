import * as React from 'react'

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
  Box
} from '@mui/material'

import avatar3 from '../../public/images/dashboardImages/Avartar3.png'

type Anchor = 'top' | 'left' | 'bottom' | 'right'

export default function AnchorTemporaryDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const anchor: Anchor = 'right'

  const cardsData = [
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
        {cardsData.map((items, index) => (
          <div className='w-[227px]' key={index}>
            <Card color={'primary'}>
              <CardContent className='flex items-center gap-x-[16px]'>
                <div
                  className={`flex items-center gap-4 ${
                    index === 0 ? 'bg-sky' : index === 1 ? 'bg-[#e3f9d4]' : index === 2 ? 'bg-purple1' : ''
                  } size-[40px] justify-center rounded-lg`}
                >
                  {items.icons}
                </div>
                <div className='flex flex-col'>
                  <Typography className='text-[17px] font-bold leading-28'>{items.state}</Typography>
                  <Typography variant='body1' color='text.primary'>
                    {items.descrption}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <section className='mt-[34px]'>
        <Typography variant='h3' className='text-darkblue'>
          RMC Pain points
        </Typography>

        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<i className='ri-arrow-down-s-line'></i>}
            aria-controls='panel1-content'
            id='panel1-header'
          >
            <Typography component='span'>What counts towards the 100 responses limit?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam eros in elit.
              Pellentesque convallis laoreet laoreet.Donec placerat, lectus sed mattis semper, neque lectus feugiat
              lectus, varius pulvinar diam eros in elit. Pellentesque convallis laoreet laoreet.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<i className='ri-arrow-down-s-line'></i>}
            aria-controls='panel1-content'
            id='panel1-header'
          >
            <Typography component='span'>What counts towards the 100 responses limit?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam eros in elit.
              Pellentesque convallis laoreet laoreet.Donec placerat, lectus sed mattis semper, neque lectus feugiat
              lectus, varius pulvinar diam eros in elit. Pellentesque convallis laoreet laoreet.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<i className='ri-arrow-down-s-line'></i>}
            aria-controls='panel1-content'
            id='panel1-header'
          >
            <Typography component='span'>What counts towards the 100 responses limit?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam eros in elit.
              Pellentesque convallis laoreet laoreet.Donec placerat, lectus sed mattis semper, neque lectus feugiat
              lectus, varius pulvinar diam eros in elit. Pellentesque convallis laoreet laoreet.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </section>

      <section>
        <Typography variant='h3' className='text-darkblue mt-[100px]'>
          Bio
        </Typography>
        <Typography variant='h5' className='text-[#AEAEAE]'>
          Lorem ipsum dolor sit amet consectetur. Massa aliquet sagittis tristique dui nisl tempor eu. Mattis vel tellus
          gravida egestas vel pellentesque. Lorem ac volutpat in cras vitae. Lectus tempor adipiscing tellus lacinia
          diam nunc netus. Sed pharetra cras mauris sem nibh elementum. Tortor nulla faucibus fermentum faucibus tellus
          gravida. In cras nulla nec sagittis. Sagittis ut faucibus id auctor nibh enim. Pretium vestibulum sed sed nisl
          sapien massa tristique eget.
        </Typography>
      </section>

      <section className='shadow-inner bg-white px-4 pb-[60px]'>
        <Typography variant='h3' className='text-darkblue mt-[100px] pt-[50px]'>
          Response
        </Typography>
        <Typography variant='h5' className='text-[#AEAEAE] mt-[43px] '>
          Lorem ipsum dolor sit amet consectetur. Massa aliquet sagittis tristique dui nisl tempor eu. Mattis vel tellus
          gravida egestas vel pellentesque. Lorem ac volutpat in cras vitae. Lectus tempor adipiscing tellus lacinia
          diam nunc netus. Sed pharetra cras mauris sem nibh elementum. Tortor nulla faucibus fermentum faucibus tellus
          gravida. In cras nulla nec sagittis. Sagittis ut faucibus id auctor nibh enim. Pretium vestibulum sed sed nisl
          sapien massa t
        </Typography>
      </section>
    </Box>
  )

  return (
    <Drawer anchor={anchor} open={open} onClose={onClose}>
      {drawerContent}
    </Drawer>
  )
}
