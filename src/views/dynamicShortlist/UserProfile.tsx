// MUI Imports

'use client'

import Image from 'next/image'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import ActiveBrochers from '../../../public/images/TenderResults/activeBrochers.png'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import companyImage from '../../../public/images/customImages/company.png'

const UserProfile = ({ userData }: any) => {
  return (
    <>
      <Card>
        <CardContent className='flex flex-col  gap-y-6 '>
          <div className='flex flex-col gap-y-6'>
            <div className='flex flex-col items-center justify-center gap-y-4'>
              <Image alt='user-profile' src={companyImage} className='rounded-lg w-[190px] h-[190px]' />
              <Typography variant='h5' className='font-medium text-[46px] leading-[68px]'>
                {`${userData?.data?.pma_user?.name}`}
              </Typography>
              <Typography variant='h5' className='font-light text-[15px] leading-[18px] text-[#727585]'>
                {`${userData?.data?.pma_user?.pma_number}`}
              </Typography>
              <section>
                {/* Contact Informations */}
                <Typography variant='body2' className='flex items-start mt-3'>
                  <i className='ri-phone-line mr-[14px]'></i>
                  {userData?.data?.pma_user?.email}
                </Typography>

                <Typography variant='body2' className='flex items-start mt-3'>
                  <i className='ri-contacts-book-3-line mr-[14px]'></i>
                  {userData?.data?.pma_user?.mobile_number} (Primary)
                </Typography>

                <Typography variant='body2' className='flex items-center mt-3'>
                  <i className='ri-map-pin-2-line mr-[14px]'></i>
                  {userData?.data?.company_details?.address}
                </Typography>
              </section>
            </div>
          </div>

          <section className='flex flex-col items-center gap-4'>
            <div className='relative w-[130px] h-[180px]'>
              <Image src={ActiveBrochers} alt='pdf download' className='w-[130px] h-[180px]' />
              <Image
                src={companyImage}
                alt='overlay'
                className='absolute top-3 left-9 w-[60px] h-[60px] object-cover'
              />
            </div>
            <div className='w-full flex justify-center space-x-2.5 mt-2'>
              <i className='ri-download-2-fill text-[#26C6F9] mt-[2px]'></i>
              <Typography
                variant='body1'
                align='center'
                className='cursor-pointer text-[#26C6F9] hover:underline hover:underline-offset-4 flex items-center'
              >
                Download Brochure
              </Typography>
            </div>
          </section>
        </CardContent>
      </Card>
    </>
  )
}

export default UserProfile
