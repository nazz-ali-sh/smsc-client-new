'use client'

import Image from 'next/image'

import { useRouter } from 'next/navigation'

import { Card, CardContent, Divider, Typography, Switch } from '@mui/material'

import CustomButton from '@/common/CustomButton'
import successVisit from '../../../public/images/customImages/sucess.svg'
import tradingYear from '../../../public/images/dashboardImages/tradingYear.svg'

interface ProfileDetailProps {
  userData: any
}

const ProfileDetail = ({ userData }: ProfileDetailProps) => {
  const router = useRouter()

  const managementFee = {
    minimum: userData?.data?.management_fee?.min_management_fee
      ? `£${userData.data.management_fee.min_management_fee}`
      : '0',
    maximum: userData?.data?.management_fee?.max_management_fee
      ? `£${userData.data.management_fee.max_management_fee}`
      : '0'
  }

  const preferredContact = userData?.data?.preferred_contact ? `${userData.data.preferred_contact} (Primary)` : '-'

  const companyBio = userData?.data?.company_details?.bio

  const tabs = [
    {
      id: 1,
      state: 'Quotation',
      icons: <i className='ri-customer-service-2-line'></i>,
      description: `$ ${userData?.data?.quotation?.latest_quote}`
    },
    {
      id: 4,
      icons: <Image src={successVisit} alt='success Visit' />,
      state: 'No. of Units Managed',
      description: `${userData?.data?.company_details?.avg_units_per_manager} Properties`
    },
    {
      id: 2,
      icons: <Image src={tradingYear} alt='Trading Years' />,
      state: 'Trading Years',
      description: `${userData?.data?.company_details?.trading_years} Years`
    }
  ]

  return (
    <Card sx={{ paddingX: 6, height: '100%', width: '100%' }}>
      <div className='flex justify-between items-center py-8'>
        <Typography sx={{ color: '#1F4E8D', fontSize: '34px', fontWeight: 500 }}>PMA NAME</Typography>
        <CustomButton
          variant='contained'
          onClick={() => router.push('/profile/1')}
          startIcon={<i className='ri-edit-line' />}
        >
          Edit
        </CustomButton>
      </div>
      <Divider />

      <div className='flex gap-x-4 items-center pt-6'>
        {tabs.map((items, index) => (
          <div className='w-full' key={index}>
            <Card color={'primary'}>
              <CardContent className='flex items-center gap-x-[16px]'>
                <div
                  className={`flex items-center gap-4 ${
                    index === 0
                      ? 'bg-sky'
                      : index === 1
                        ? 'bg-[#e3f9d4]'
                        : index === 2
                          ? 'bg-[#e3f9d4]'
                          : index === 3
                            ? 'bg-[#72E12829]'
                            : ''
                  } size-[40px] justify-center rounded-lg`}
                >
                  {items.icons}
                </div>
                <div className='flex flex-col'>
                  <Typography className='text-[18px] font-bold leading-28'>{items.state}</Typography>
                  <Typography variant='body2' color='text.primary'>
                    {items.description}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <div className='mt-8'>
        <Typography sx={{ color: '#1F4E8D', fontSize: '20px', fontWeight: 600, marginBottom: 2 }}>
          Management fee
        </Typography>
        <div className='flex gap-x-8'>
          <div>
            <Typography variant='body2' sx={{ color: '#6B7280', fontSize: '14px' }}>
              Minimum Management Fee:
            </Typography>
            <Typography variant='body2' sx={{ fontSize: '14px', marginTop: 0.5 }}>
              {managementFee.minimum}
            </Typography>
          </div>
          <div>
            <Typography variant='body2' sx={{ color: '#6B7280', fontSize: '14px' }}>
              Maximum Management Fee:
            </Typography>
            <Typography variant='body2' sx={{ fontSize: '14px', marginTop: 0.5 }}>
              {managementFee.maximum}
            </Typography>
          </div>
        </div>
      </div>

      <div className='mt-6'>
        <Typography sx={{ color: '#1F4E8D', fontSize: '20px', fontWeight: 600, marginBottom: 2 }}>
          Preferred Contact
        </Typography>
        <Typography variant='body2' sx={{ fontSize: '14px' }}>
          {preferredContact}
        </Typography>
      </div>
      <div className='mt-6'>
        <Typography sx={{ color: '#1F4E8D', fontSize: '20px', fontWeight: 600, marginBottom: 2 }}>
          Notification Preferences
        </Typography>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <Switch
              checked={userData?.data?.notification_preferences?.notify_email || false}
              color='primary'
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: 'white'
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#35C0ED'
                }
              }}
            />
            <Typography variant='body2' sx={{ fontSize: '14px', color: '#6B7280' }}>
              Get notification through Email
            </Typography>
          </div>
          <div className='flex items-center'>
            <Switch
              checked={userData?.data?.notification_preferences?.notify_message || false}
              color='primary'
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: 'white'
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#35C0ED'
                }
              }}
            />
            <Typography variant='body2' sx={{ fontSize: '14px', color: '#6B7280' }}>
              Get notification through Message
            </Typography>
          </div>
          <div className='flex items-center'>
            <Switch
              checked={userData?.data?.notification_preferences?.notify_portal || false}
              color='primary'
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: 'white'
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#35C0ED'
                }
              }}
            />
            <Typography variant='body2' sx={{ fontSize: '14px', color: '#6B7280' }}>
              Get notification in Portal
            </Typography>
          </div>
        </div>
      </div>

      <div className='mt-6'>
        <Typography sx={{ color: '#1F4E8D', fontSize: '20px', fontWeight: 600, marginBottom: 2 }}>
          Company Bio
        </Typography>
        <Typography variant='body2' sx={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6 }}>
          {companyBio}
        </Typography>
      </div>

      <div className='mt-6 pb-6'>
        <Typography sx={{ color: '#1F4E8D', fontSize: '20px', fontWeight: 600, marginBottom: 2 }}>
          Upload Company Brochure
        </Typography>
        <Typography variant='body2' sx={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6 }}>
          Upload your brochure in PDF format to showcase your services. This PDF will be visible to RMCs when you are
          shortlisted.
        </Typography>
      </div>
    </Card>
  )
}

export default ProfileDetail
