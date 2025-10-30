'use client'

import React from 'react'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { Box, Grid, Typography } from '@mui/material'

const ResponseQuoteSection = () => {
  const pathname = usePathname()
  const isQuoteRoute = pathname?.includes('quote')

  return (
    <Box sx={{ marginTop: 8, marginBottom: 10, position: 'relative', maxWidth: '800px', marginX: 'auto' }}>
      <Box
        sx={{
          position: 'absolute',
          top: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '300px',
          height: '2px',
          backgroundColor: '#CAE9F6',
          zIndex: 1,
          display: { xs: 'none', md: 'block' }
        }}
      />

      <Grid container spacing={0} alignItems='center'>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative'
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 2,
                zIndex: 2,
                position: 'relative'
              }}
            >
              <Image src='/svgs/response.svg' alt='Written Response' width={50} height={50} />
            </Box>
            <Typography
              variant='h6'
              sx={{
                fontWeight: 400,
                color: '#262B43',
                marginBottom: 0.5,
                fontSize: '15px'
              }}
            >
              Written Response
            </Typography>
            <Typography
              variant='body2'
              sx={{
                color: '#9CA3AF',
                fontSize: '14px'
              }}
            >
              Details about stage
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative'
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 2,
                zIndex: 2,
                position: 'relative'
              }}
            >
              <Image
                src={isQuoteRoute ? '/svgs/fillQuote.svg' : '/svgs/quote.svg'}
                alt='Your Quote'
                width={47}
                height={47}
              />
            </Box>
            <Typography
              variant='h6'
              sx={{
                fontWeight: 400,
                color: '#262B43',
                marginBottom: 0.5,
                fontSize: '15px'
              }}
            >
              Your Quote
            </Typography>
            <Typography
              variant='body2'
              sx={{
                color: '#9CA3AF',
                fontSize: '14px'
              }}
            >
              Details about stage
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ResponseQuoteSection
