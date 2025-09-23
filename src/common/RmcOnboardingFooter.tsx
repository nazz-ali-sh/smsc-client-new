import React from 'react'

import Image from 'next/image'

import { Box, Typography, TextField, Button } from '@mui/material'

const RmcOnboardingFooter = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'center' },
        padding: '16px',
        backgroundColor: '#fff',
        color: '#333',
        fontSize: '12px',
        gap: 4,
        marginTop: 2
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '300px' }}>
        <Image src={'/svgs/rmcLogo.svg'} alt={'image'} width={100} height={100} />

        <Box className='px-8 py-4 bg-[#F4F5F9]'>
          <Typography variant='body2' sx={{ marginBottom: '8px', fontWeight: 700, color: '#262B43E5' }}>
            Subscribe
          </Typography>

          <Box sx={{ position: 'relative', width: '200px' }}>
            <TextField
              variant='outlined'
              placeholder='Email address'
              size='small'
              sx={{
                width: '100%',
                fontSize: '14px',
                background: 'white',
                borderRadius: '10px',
                '& .MuiOutlinedInput-root': {
                  paddingRight: '50px',
                  '& fieldset': { borderColor: '#e0e0e0' },
                  '&:hover fieldset': { borderColor: '#35C0ED', border: '1px solid #35C0ED' },
                  '&.Mui-focused fieldset': { borderColor: '#35C0ED', border: '1px solid #35C0ED' },
                  '& input::placeholder': { fontSize: '12px', color: '#0A142F' }
                }
              }}
            />
            <Button
              variant='contained'
              sx={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: '#35C0ED',
                minWidth: '40px',
                height: '40px',
                padding: 0,
                borderRadius: '0 4px 4px 0',
                border: 'none',
                boxShadow: 'none',
                fontSize: '18px',
                fontWeight: 'bold',
                '&:hover': { backgroundColor: '#2BA8D1', boxShadow: 'none' }
              }}
            >
              <i className='ri-arrow-right-line'></i>
            </Button>
          </Box>

          <Typography variant='body2' sx={{ marginBottom: '16px', textAlign: 'left', marginTop: 1, color: '#424242' }}>
            The UK’s first service charge comparison site, solely for leaseholders. We’re experts in helping owners’
            associations and leaseholders estimate.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginTop: { xs: 3, md: '10px' },
          justifyContent: 'center',
          gap: 2
        }}
      >
        <Typography variant='body2' sx={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '16px' }}>
          Contact us
        </Typography>

        <Typography variant='body2' className='flex items-center gap-2' sx={{ paddingTop: '10px' }}>
          <i className='ri-phone-line'></i>
          <span className='text-base'> 0800 690 6300</span>
        </Typography>
        <Typography variant='body2' className='flex items-center gap-2'>
          <i className='ri-map-pin-line'></i> <span>5, The Square, Bagshot, Surrey GU19 5AX</span>
        </Typography>
        <Typography variant='body2' className='flex items-center gap-2'>
          <i className='ri-mail-line'></i> <span>info@saveservicecharge.co.uk</span>
        </Typography>
        <Typography variant='body2' className='flex items-center gap-2'>
          <i className='ri-time-line'></i> <span>Mon - Fri 10:00 - 20:00</span>
        </Typography>

        <Typography variant='body2' sx={{ marginBottom: '8px', fontSize: '14px', marginTop: '8px' }}>
          Save My Service Charge Ltd. Registered in England & Wales, Company No. 12969517. Registered office: 5 The
          Square, Bagshot, Surrey GU19 5AX
        </Typography>

        <div className='flex justify-between w-full items-center'>
          <div className='flex gap-6 items-center'>
            <p className='text-[#262B43E5] text-[14px] font-bold'>Terms</p>
            <p className='text-[#262B43E5] text-[14px] font-bold'>Privacy</p>
            <p className='text-[#262B43E5] text-[14px] font-bold'>Cookies</p>
          </div>
        </div>
      </Box>
    </Box>
  )
}

export default RmcOnboardingFooter
