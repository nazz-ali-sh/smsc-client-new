import React from 'react'

import Image from 'next/image'

import { Box, Typography } from '@mui/material'

const CommonFooter = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'flex-start' },
        padding: '24px 16px',
        backgroundColor: '#fff',
        color: '#333',
        borderTop: '1px solid #e0e0e0',
        borderBottom: '1px solid #e0e0e0',
        gap: { xs: 3, md: 4 }
      }}
    >
      {/* Left Section - Logo and Description */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '400px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <Image src={'/svgs/rmcLogo.svg'} alt={'Save My Service Charge Logo'} width={60} height={60} />
          <Typography
            variant='h6'
            sx={{
              fontWeight: 'bold',
              color: '#1e3a8a',
              fontSize: '18px',
              marginLeft: 2,
              lineHeight: 1.2
            }}
          >
            SAVE MY SERVICE CHARGE.
          </Typography>
        </Box>
        
        <Typography
          variant='body2'
          sx={{
            color: '#666',
            fontSize: '14px',
            lineHeight: 1.5,
            maxWidth: '350px'
          }}
        >
          The UK's first service charge comparison site, solely for leaseholders. We're experts in running tenders for blocks of flats and leasehold estates.
        </Typography>
      </Box>

      {/* Right Section - Contact Information */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 2,
          minWidth: '300px'
        }}
      >
        <Typography
          variant='h6'
          sx={{
            fontWeight: 'bold',
            color: '#333',
            fontSize: '16px',
            marginBottom: 1
          }}
        >
          Contact Us
        </Typography>

        {/* Phone */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 20,
              height: 20,
              backgroundColor: '#35C0ED',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <i className='ri-phone-line' style={{ color: 'white', fontSize: '12px' }}></i>
          </Box>
          <Typography variant='body2' sx={{ fontSize: '14px', color: '#333' }}>
            0800 690 6300
          </Typography>
        </Box>

        {/* Address */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          <Box
            sx={{
              width: 20,
              height: 20,
              backgroundColor: '#35C0ED',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 0.5
            }}
          >
            <i className='ri-map-pin-line' style={{ color: 'white', fontSize: '12px' }}></i>
          </Box>
          <Typography variant='body2' sx={{ fontSize: '14px', color: '#333', lineHeight: 1.4 }}>
            5, The Square, Bagshot, Surrey, GU19 5AX
          </Typography>
        </Box>

        {/* Email */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 20,
              height: 20,
              backgroundColor: '#35C0ED',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <i className='ri-mail-line' style={{ color: 'white', fontSize: '12px' }}></i>
          </Box>
          <Typography variant='body2' sx={{ fontSize: '14px', color: '#333' }}>
            info@savemyservicecharge.co.uk
          </Typography>
        </Box>

        {/* Hours */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 20,
              height: 20,
              backgroundColor: '#35C0ED',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <i className='ri-time-line' style={{ color: 'white', fontSize: '12px' }}></i>
          </Box>
          <Typography variant='body2' sx={{ fontSize: '14px', color: '#333' }}>
            Mon - Fri 10:00 - 20:00
          </Typography>
        </Box>

        {/* Company Registration Info */}
        <Typography
          variant='body2'
          sx={{
            fontSize: '12px',
            color: '#666',
            marginTop: 2,
            lineHeight: 1.4
          }}
        >
          Save My Service Charge Ltd. Registered in England & Wales. Company No. 12969517. Registered office: 5 The Square, Bagshot, Surrey, GU19 5AX.
        </Typography>

        {/* Navigation Links and Social Media */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginTop: 3
          }}
        >
          {/* Navigation Links */}
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Typography
              variant='body2'
              sx={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                cursor: 'pointer',
                '&:hover': { color: '#35C0ED' }
              }}
            >
              Terms
            </Typography>
            <Typography
              variant='body2'
              sx={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                cursor: 'pointer',
                '&:hover': { color: '#35C0ED' }
              }}
            >
              Privacy
            </Typography>
            <Typography
              variant='body2'
              sx={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                cursor: 'pointer',
                '&:hover': { color: '#35C0ED' }
              }}
            >
              Cookies
            </Typography>
          </Box>

          {/* Social Media Icons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                backgroundColor: '#35C0ED',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                '&:hover': { backgroundColor: '#2BA8D1' }
              }}
            >
              <i className='ri-linkedin-fill' style={{ color: 'white', fontSize: '16px' }}></i>
            </Box>
            <Box
              sx={{
                width: 32,
                height: 32,
                backgroundColor: '#35C0ED',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                '&:hover': { backgroundColor: '#2BA8D1' }
              }}
            >
              <i className='ri-facebook-fill' style={{ color: 'white', fontSize: '16px' }}></i>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default CommonFooter
