'use client'

import { Grid } from '@mui/material'

import UserProfile from '@/views/Profile/UserProfile'
import ProfileDetail from '@/views/Profile/ProfileDetail'

const dummyProfileData = {
  success: true,
  message: 'Company details retrieved successfully',
  data: {
    pma_user: {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@propertymanagement.com',
      pma_number: 'PMA-2024-001',
      mobile_number: '+447123456789'
    },
    company_details: {
      id: 1,
      name: 'Company Name',
      website: 'https://www.premiumpm.co.uk',
      address: '123 High Street, London, SW1A 1AA',
      postcode: 'SW1A 1AA',
      landline: '+442071234567',
      trading_years: 15,
      total_units: 500,
      avg_units_per_manager: 50,
      bio: 'Premium Property Management Ltd is a leading property management company in London with over 15 years of experience. We specialize in residential and commercial property management, providing comprehensive services to property owners and residents.',
      logo_url: '/images/customImages/company.png'
    },
    ratings_and_reviews: {
      five_star_count: 120,
      four_star_count: 30,
      three_star_count: 10,
      two_star_count: 5,
      one_star_count: 2,
      google_rating: '4.89',
      google_review_count: 167,
      trustpilot_rating: '4.8',
      trustpilot_review_count: 95
    },
    quotation: {
      min_fee_per_unit: '50.00',
      max_fee_per_unit: '150.00',
      latest_quote: '1,234.56',
      latest_quote_date: '2024-11-01'
    },
    upcoming_video_call: null,
    upcoming_site_visit: null,
    completed_video_calls: [],
    completed_site_visits: []
  }
}

export default function ProfilePage() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={3} md={5}>
          <UserProfile userData={dummyProfileData} />
        </Grid>
        <Grid item xs={12} lg={9} md={7}>
          <ProfileDetail userData={dummyProfileData} />
        </Grid>
      </Grid>
    </>
  )
}
