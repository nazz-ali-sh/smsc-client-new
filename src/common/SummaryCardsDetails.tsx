'use client'

import { Box, Card, CardContent, Grid, Typography } from '@mui/material'

interface SummaryCardProps {
  title: string
  count: string
  iconClass: string
  color: string
  bgColor: string
  tenderStatusdetails?: any
}

interface SummaryStatus {
  tenderStatusdetails?: any
}

const SummaryCardsDetails: React.FC<SummaryCardProps> = ({
  title,
  count,
  iconClass,
  color,
  bgColor,
}) => (
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
      <Typography variant='h5' sx={{ fontWeight: 700, color: color }}>
        {count}
      </Typography>
    </div>
  </div>
)

const SummaryCards: React.FC<SummaryStatus> = ({ tenderStatusdetails }) => {

  return (
    <Card sx={{ p: 2 }}>
      <div className='mb-3 px-[25px]'>
        <Typography
          variant='h3'
          sx={{ color: 'customColors.darkGray1', paddingTop: '25px', fontSize: '28px' }}
          component='h1'
          className='font-bold '
        >
          Archived Tenders
        </Typography>
        <Typography variant='body1' color='text.secondary' className='max-w-2xl pt-1'>
          Access a complete history of all your past tenders here
        </Typography>
      </div>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={2.4}>
            <SummaryCardsDetails
              title='Total Archived'
              count={`${tenderStatusdetails?.data?.totals?.total_archived | 0} Tenders`}
              iconClass='ri-macbook-line'
              color='customColors.purple2'
              bgColor='customColors.purple1'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <SummaryCardsDetails
              title='Expired'
              count={`${tenderStatusdetails?.data?.totals?.total_expired | 0} Tenders`}
              iconClass='ri-lightbulb-flash-line'
              color='customColors.red3'
              bgColor='customColors.red4'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <SummaryCardsDetails
              title='Shortlisted'
              count={`${tenderStatusdetails?.data?.totals?.total_shortlisted | 0} Tenders`}
              iconClass='ri-list-check'
              color='customColors.cyan2'
              bgColor='customColors.cyan1'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <SummaryCardsDetails
              title='Won'
              count='3 Tenders'
              iconClass='ri-medal-line'
              color='customColors.green2'
              bgColor='customColors.green1'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <SummaryCardsDetails
              title='Not Shortlisted'
              count='3 Tenders'
              iconClass='ri-close-circle-line'
              color='customColors.orange2'
              bgColor='customColors.orange1'
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SummaryCards
