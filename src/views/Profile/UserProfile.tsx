'use client'

import Image from 'next/image'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import companyImage from '../../../public/images/customImages/company.png'

interface UserProfileProps {
  userData: any
}

const UserProfile = ({ userData }: UserProfileProps) => {
  const reviewsData = {
    google: {
      rating: 4.2,
      count: 18
    },
    trustpilot: {
      rating: 4.2,
      count: 18
    }
  }

  const primaryContactInfo = {
    name: 'David Jon',
    email: 'Debra.holt@example.com',
    website: 'Debraholt.com',
    primaryPhone: '(219) 555-0114',
    landline: '(219) 555-0114',
    address: '417 Washington Ave. Manchester, Kentucky 39495'
  }

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className='flex items-center gap-0.5'>
        {[...Array(fullStars)].map((_, i) => (
          <i key={`full-${i}`} className='ri-star-fill text-yellow-400 text-sm'></i>
        ))}
        {hasHalfStar && <i className='ri-star-half-fill text-yellow-400 text-sm'></i>}
        {[...Array(emptyStars)].map((_, i) => (
          <i key={`empty-${i}`} className='ri-star-line text-yellow-400 text-sm'></i>
        ))}
      </div>
    )
  }

  return (
    <Card sx={{ height: '100%', width: '100%' }}>
      <CardContent className='flex flex-col gap-y-6'>
        <div className='flex flex-col gap-y-6'>
          <div className='flex flex-col items-center justify-center gap-y-4'>
              <Image alt='user-profile' src={companyImage} className='rounded-lg' />
              <Typography variant='h3'>{`${userData?.data?.company_details?.name}`}</Typography>
              <div className='w-full space-y-2 px-4 pt-10'>
                <div className='flex items-center justify-between'>
                  <Typography variant='body2' className='text-gray-600'>
                    Google Reviews
                  </Typography>
                  <div className='flex items-center gap-2'>
                    <Typography variant='body2' className='font-medium'>
                      {reviewsData.google.rating} ({reviewsData.google.count})
                    </Typography>
                    {renderStars(reviewsData.google.rating)}
                  </div>
                </div>

                <div className='flex items-center justify-between'>
                  <Typography variant='body2' className='text-gray-600'>
                    Trustpilot Reviews
                  </Typography>
                  <div className='flex items-center gap-2'>
                    <Typography variant='body2' className='font-medium'>
                      {reviewsData.trustpilot.rating} ({reviewsData.trustpilot.count})
                    </Typography>
                    {renderStars(reviewsData.trustpilot.rating)}
                  </div>
                </div>
              </div>
              <div className='w-full px-4 mt-4'>
                <Typography variant='body1' className='font-semibold mb-3 text-gray-700'>
                  Primary Contact Info
                </Typography>

                <div className='space-y-3 pt-4 pb-32'>
                  <div className='flex items-center gap-3'>
                    <i className='ri-user-line text-gray-600'></i>
                    <Typography variant='body2' className='text-gray-700'>
                      {primaryContactInfo.name}
                    </Typography>
                  </div>

                  <div className='flex items-center gap-3'>
                    <i className='ri-mail-line text-gray-600'></i>
                    <Typography variant='body2' className='text-gray-700'>
                      {primaryContactInfo.email}
                    </Typography>
                  </div>

                  <div className='flex items-center gap-3'>
                    <i className='ri-global-line text-gray-600'></i>
                    <Typography variant='body2' className='text-gray-700'>
                      {primaryContactInfo.website}
                    </Typography>
                  </div>

                  <div className='flex items-center gap-3'>
                    <i className='ri-phone-line text-gray-600'></i>
                    <Typography variant='body2' className='text-gray-700'>
                      {primaryContactInfo.primaryPhone} (Primary)
                    </Typography>
                  </div>

                  <div className='flex items-center gap-3'>
                    <i className='ri-phone-line text-gray-600'></i>
                    <Typography variant='body2' className='text-gray-700'>
                      {primaryContactInfo.landline} (Landline)
                    </Typography>
                  </div>

                  <div className='flex items-start gap-3'>
                    <i className='ri-map-pin-line text-gray-600 mt-0.5'></i>
                    <Typography variant='body2' className='text-gray-700'>
                      {primaryContactInfo.address}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
    </Card>
  )
}

export default UserProfile
