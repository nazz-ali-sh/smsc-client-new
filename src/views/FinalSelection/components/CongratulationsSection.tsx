'use client'

import Image from 'next/image'

import { Box, Card, CardContent, Grid, Typography } from '@mui/material'

import { finalSelectionData } from '../data'

const CongratulationsSection = () => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Grid container alignItems='center' spacing={4}>
          <Grid item xs={12} md={8}>
            <Box>
              <Typography
                variant='h3'
                sx={{
                  fontWeight: 700,
                  fontSize: 34,
                  color: 'customColors.darkGray1',
                  fontStyle: 'normal',
                  mb: 1
                }}
              >
                Congratulations!
              </Typography>
              <Typography
                variant='h5'
                sx={{
                  fontWeight: 500,
                  fontSize: 20
                }}
              >
                You’ve appointed a new managing agent
              </Typography>
              <Typography
                variant='h6'
                sx={{
                  color: 'customColors.darkBlue',
                  fontWeight: 600,
                  mt: 2,
                  fontSize: 18
                }}
              >
                Start Date: {finalSelectionData.startDate}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Image src='/svgs/celebarations.svg' alt='Celebration Trophy' width={250} height={195} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CongratulationsSection
