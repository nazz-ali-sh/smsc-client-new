'use client'

import { Box, Card, CardContent, Grid, Typography } from '@mui/material'

interface SummaryCardProps {
  title: string
  count: string
  iconClass: string
  color: string
  bgColor: string
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, count, iconClass, color, bgColor }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bgColor,
        color: color
      }}
    >
      <i className={iconClass} style={{ fontSize: 24 }} />
    </Box>
    <div>
      <Typography variant='body2' color='text.secondary' sx={{ mb: 0.5, fontSize: '0.875rem' }}>
        {title}
      </Typography>
      <Typography variant='h5' sx={{ fontWeight: 600, color: color }}>
        {count}
      </Typography>
    </div>
  </div>
)

const SummaryCards = () => {
  return (
    <Card sx={{ p: 2 }}>
      <div className='mb-8 px-[25px]'>
        <Typography variant='h3' sx={{ color: 'customColors.gray3' }} component='h1' className='font-bold mb-2'>
          Archived Tenders
        </Typography>
        <Typography variant='body1' color='text.secondary' className='max-w-2xl '>
          Lorem ipsum dolor sit amet consectetur. Nullam cursus dictum ultrices aenean leo.
        </Typography>
      </div>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={2.4}>
            <SummaryCard
              title='Total Archived'
              count='54 Tenders'
              iconClass='ri-macbook-line'
              color='customColors.purple2'
              bgColor='customColors.purple1'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <SummaryCard
              title='Expired'
              count='4 Tenders'
              iconClass='ri-lightbulb-flash-line'
              color='customColors.cyan2'
              bgColor='customColors.cyan1'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <SummaryCard
              title='Shortlisted'
              count='3 Tenders'
              iconClass='ri-list-check'
              color='customColors.orange2'
              bgColor='customColors.orange1'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <SummaryCard
              title='Won'
              count='3 Tenders'
              iconClass='ri-medal-line'
              color='customColors.green2'
              bgColor='customColors.green1'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <SummaryCard
              title='Not Shortlisted'
              count='3 Tenders'
              iconClass='ri-close-circle-line'
              color='customColors.gray2'
              bgColor='customColors.gray1'
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SummaryCards
