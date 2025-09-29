// MUI Imports

'use client'


import Image from 'next/image'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'


import pdfImage from '../../../public/images/dashboardImages/demePdfImage.png'

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
              <Image alt='user-profile' src={companyImage} className='rounded-lg' />
              <Typography variant='h5'>{`${userData?.data?.company_details?.name}`}</Typography>

              <section className='flex items-center gap-x-[20px] '>
                <Typography variant='body2'>
                  <div className='flex items-center justify-center p-1 rounded-full bg-[#f4f4f4]'>
                    <i className='ri-phone-line'></i>
                  </div>
                </Typography>

                <Typography variant='body2'>
                  <div className='flex items-center justify-center p-1 rounded-full bg-[#f4f4f4]'>
                    <i className='ri-chat-4-line'></i>
                  </div>
                </Typography>

                <Typography variant='body2'>
                  <div className='flex items-center justify-center p-1 rounded-full bg-[#f4f4f4]'>
                    <i className='ri-chat-3-line'></i>
                  </div>
                </Typography>
                <Typography variant='body2'>
                  <div className='flex items-center justify-center p-1 rounded-full bg-[#f4f4f4]'>
                    <i className='ri-calendar-line'></i>
                  </div>
                </Typography>
                <Typography variant='body2'>
                  <div className='flex items-center justify-center p-1 rounded-full bg-[#f4f4f4]'>
                    <i className='ri-contacts-book-3-line'></i>
                  </div>
                </Typography>
              </section>

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
          
            <Image src={pdfImage} alt='pfd demo' />
            <Typography variant='body1' align='center'>
              <a
                href='data.pdf'
                download
                className='hover:underline hover:underline-offset-4'
                style={{ textDecorationColor: '#35C0ED' }}
              >
                View Managing Agents Prospectus
              </a>
            </Typography>

            <Typography variant='body1' align='center'>
              <a
                href='data.pdf'
                download
                className='hover:underline hover:underline-offset-4'
                style={{ textDecorationColor: '#35C0ED' }}
              >
                Download PDF
              </a>
            </Typography>

          </section>
        </CardContent>
      </Card>
    </>
  )
}

export default UserProfile
