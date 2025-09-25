'use client'

import Image from 'next/image'

import { Box, Card, CardContent, Grid, Typography } from '@mui/material'

interface CongratulationsSectionProps {
  startDate?: string
}

const CongratulationsSection = ({ startDate }: CongratulationsSectionProps) => {
  return (
    <>
      <Card>
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
                  Congratulations! 🎉
                </Typography>
                <Typography
                  variant='h5'
                  sx={{
                    fontWeight: 300,
                    fontSize: '20px',
                    color: 'customColors.gray8'
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
                    fontSize: '18px'
                  }}
                >
                  Start Date:
                  <span className='font-normal pl-1'>{startDate || 'TBD'}</span>
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
    </>
  )
}

export default CongratulationsSection
