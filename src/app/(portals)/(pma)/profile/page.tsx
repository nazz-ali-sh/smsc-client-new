'use client'

import { Grid } from '@mui/material'

import UserProfile from '@/views/Profile/UserProfile'
import ProfileDetail from '@/views/Profile/ProfileDetail'
import { useMyAccount } from '@/hooks/useMyAccount'

export default function ProfilePage() {
  const { data: accountData, isLoading } = useMyAccount()

  if (isLoading) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
            Loading profile data...
          </div>
        </Grid>
      </Grid>
    )
  }

  const user = accountData?.user as any

  const transformedData = accountData
    ? {
        success: true,
        message: 'Company details retrieved successfully',
        data: {
          pma_user: {
            id: user?.id || 1,
            name: user?.primary_details?.contact_name || '',
            email: user?.primary_details?.email || '',
            pma_number: 'PMA-2024-001',
            mobile_number: user?.primary_details?.mobile || ''
          },
          company_details: {
            id: 1,
            name: 'Company Name',
            website: user?.primary_details?.website || '',
            address: user?.primary_details?.address || '',
            postcode: '',
            landline: user?.primary_details?.landline || '',
            trading_years: 15,
            total_units: 500,
            avg_units_per_manager: 50,
            bio: user?.company_bio || '',
            logo_url: user?.logo_url || '/images/customImages/company.png'
          },
          ratings_and_reviews: {
            five_star_count: 120,
            four_star_count: 30,
            three_star_count: 10,
            two_star_count: 5,
            one_star_count: 2,
            google_rating: user?.reviews?.google_reviews || '4.89',
            google_review_count: parseInt(user?.reviews?.google_reviews || '167'),
            trustpilot_rating: user?.reviews?.trustpilot_reviews || '4.8',
            trustpilot_review_count: parseInt(user?.reviews?.trustpilot_reviews || '95')
          },
          quotation: {
            min_fee_per_unit: user?.management_fee?.min_management_fee || '50.00',
            max_fee_per_unit: user?.management_fee?.max_management_fee || '150.00',
            latest_quote: '1,234.56',
            latest_quote_date: '2024-11-01'
          },
          upcoming_video_call: null,
          upcoming_site_visit: null,
          completed_video_calls: [],
          completed_site_visits: [],

          management_fee: user?.management_fee,
          preferred_contact: user?.management_fee?.management_phone,
          secondary_contact: user?.secondary_details,
          notification_preferences: accountData.notification_preferences
        }
      }
    : null

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={3} md={5}>
          <UserProfile userData={transformedData} />
        </Grid>
        <Grid item xs={12} lg={9} md={7}>
          <ProfileDetail userData={transformedData} />
        </Grid>
      </Grid>
    </>
  )
}
