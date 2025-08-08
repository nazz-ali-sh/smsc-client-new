import Image from 'next/image'

import { Grid, Card, CardContent, Typography, Divider, Box } from '@mui/material'

import phone from '../../../public/images/dashboardImages/phone.svg'
import person from '../../../public/images/dashboardImages/person.svg'
import star from '../../../public/images/dashboardImages/star.svg'

const TenderCards = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6} md={4}>
        <Card elevation={0} sx={{ borderRadius: 1, p: 1, height: '380px' }} className='shadow-lg'>
          <div className='bg-[#c4edfa] mx-[22px]  p-2 rounded-full flex items-center justify-center mt-[24px] size-[44px]'>
            <i style={{ color: '#35c0ed' }} className='ri-eye-2-line size-[24px]' />
          </div>

          <Typography sx={{ fontSize: '30px', color: 'customColors.darkGray1', paddingTop: '8px', paddingX: '22px' }}>
            Tender Overview
          </Typography>
          <Typography
            sx={{
              paddingTop: '8px',
              color: 'customColors.textGray',
              paddingX: '22px',
              fontSize: '12px',
              fontWeight: 300
            }}
          >
            View and edit information on your tender
          </Typography>
          <Divider sx={{ height: '2px', backgroundColor: '#D9D9D9', my: 1, marginTop: '14px' }} />
          <CardContent sx={{ px: 2, pb: 2, paddingX: '22px' }}>
            <Typography
              sx={{
                color: 'customColors.textGray',
                fontSize: '13px',
                fontWeight: 400,
                lineHeight: '22px'
              }}
            >
              Reference Number: Reference Number :
            </Typography>
            <Typography
              sx={{
                color: 'customColors.textGray',
                fontSize: '13px',
                fontWeight: 400,
                lineHeight: '22px',
                paddingTop: '2px'
              }}
            >
              Tender Type: Tender Type :
            </Typography>
            <Typography
              sx={{
                color: 'customColors.textGray',
                fontSize: '13px',
                fontWeight: 400,
                lineHeight: '22px',
                paddingTop: '2px'
              }}
            >
              Submitted On: Submitted On
            </Typography>
            <Typography
              sx={{
                color: 'customColors.textGray',
                fontSize: '13px',
                fontWeight: 400,
                lineHeight: '22px',
                paddingTop: '2px'
              }}
            >
              Deadline: Deadline
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '30px' }}>
            <Box
              sx={{
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'customColors.cyan3',
                marginX: '22px'
              }}
            >
              <i className='ri-eye-line w-[14px] h-[14px] text-[#26C6F9]'></i>
            </Box>
          </Box>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card elevation={0} sx={{ borderRadius: 1, p: 1, height: '380px' }} className='shadow-lg'>
          <div className='bg-[#c4edfa] mx-[22px]  p-2 rounded-full flex items-center justify-center mt-[24px] size-[44px]'>
            <i style={{ color: '#35c0ed' }} className='ri-database-line size-[24px]' />{' '}
          </div>

          <Typography sx={{ fontSize: '30px', color: 'customColors.darkGray1', paddingTop: '8px', paddingX: '22px' }}>
            Tender Results
          </Typography>
          <Typography
            sx={{
              paddingTop: '8px',
              color: 'customColors.green5',
              paddingX: '22px',
              fontSize: '12px',
              fontWeight: 300
            }}
          >
            Your tender was sent to 120 PMCs. You have received 8 responses.{' '}
          </Typography>
          <Divider sx={{ height: '2px', backgroundColor: '#D9D9D9', my: 1, marginTop: '14px' }} />
          <CardContent sx={{ px: 2, pb: 2, paddingX: '22px' }}>
            <Typography
              sx={{
                color: 'customColors.textGray',
                fontSize: '13px',
                fontWeight: 400,
                lineHeight: '22px'
              }}
            >
              Tender ended on : 24 / 04 / 2025
            </Typography>
            <Typography
              sx={{
                color: 'customColors.textGray',
                fontSize: '13px',
                fontWeight: 400,
                lineHeight: '22px',
                paddingTop: '2px'
              }}
            >
              Results received on : 24 / 04 / 2025
            </Typography>
            <Typography
              sx={{
                color: 'customColors.textGray',
                fontSize: '13px',
                fontWeight: 400,
                lineHeight: '22px',
                paddingTop: '2px'
              }}
            >
              Tender sent to : 120PMCs
            </Typography>
            <Typography
              sx={{
                color: 'customColors.textGray',
                fontSize: '13px',
                fontWeight: 400,
                lineHeight: '22px',
                paddingTop: '2px'
              }}
            >
              Total results received : 120PMCs
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '30px' }}>
            <Box
              sx={{
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'customColors.cyan3',
                marginX: '22px'
              }}
            >
              <i className='ri-eye-line w-[14px] h-[14px] text-[#26C6F9]'></i>
            </Box>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card elevation={0} sx={{ borderRadius: 1, p: 1, height: '380px' }} className='shadow-lg'>
          <div className='bg-[#c4edfa] mx-[22px]  p-2 rounded-full flex items-center justify-center mt-[24px] size-[44px]'>
            <i style={{ color: '#35c0ed' }} className='ri-list-check-2 size-[24px]' />{' '}
          </div>

          <Typography sx={{ fontSize: '30px', color: 'customColors.darkGray1', paddingTop: '8px', paddingX: '22px' }}>
            Shortlisted{' '}
          </Typography>
          <Typography
            sx={{
              paddingTop: '8px',
              color: 'customColors.green5',
              paddingX: '22px',
              fontSize: '12px',
              fontWeight: 300
            }}
          >
            You have short listed 5 agents{' '}
          </Typography>
          <Divider sx={{ height: '2px', backgroundColor: '#D9D9D9', my: 1, marginTop: '14px' }} />
          <CardContent sx={{ px: 2, pb: 2, paddingX: '22px' }}>
            <Typography
              sx={{
                color: 'customColors.textGray',
                fontSize: '13px',
                fontWeight: 400,
                lineHeight: '22px'
              }}
            >
              View Company Information On The Managing Agents You Have Shortlisted{' '}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '80px', marginX: '22px', gap: '7px' }}>
            <Box
              sx={{
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'customColors.cyan3'
              }}
            >
              <i className='ri-eye-line w-[14px] h-[14px] text-[#26C6F9]'></i>
            </Box>
            <Box
              sx={{
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'customColors.cyan3'
              }}
            >
              <i className='ri-group-fill w-[14px] h-[14px] text-[#26C6F9]'></i>
            </Box>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card elevation={0} sx={{ borderRadius: 1, p: 1, height: '380px' }} className='shadow-lg'>
          <div className='bg-[#c4edfa] mx-[22px]  p-2 rounded-full flex items-center justify-center mt-[24px] size-[44px]'>
            <Image src={phone} className='' alt='phone-image' />
          </div>

          <Typography sx={{ fontSize: '30px', color: 'customColors.darkGray1', paddingTop: '8px', paddingX: '22px' }}>
            Video Calls
          </Typography>
          <Typography
            sx={{
              paddingTop: '8px',
              color: 'customColors.textGray',
              paddingX: '22px',
              fontSize: '12px',
              fontWeight: 300
            }}
          >
            You’ve invited 3 agents to video calls.{' '}
          </Typography>
          <Divider sx={{ height: '2px', backgroundColor: '#D9D9D9', my: 1, marginTop: '14px' }} />
          <CardContent sx={{ px: 2, pb: 2, paddingX: '22px' }}>
            <Typography
              sx={{
                color: 'customColors.textGray',
                fontSize: '13px',
                fontWeight: 400,
                lineHeight: '22px'
              }}
            >
              Next Scheduled Call :
            </Typography>
            <Typography
              sx={{
                color: 'customColors.textGray',
                fontSize: '13px',
                fontWeight: 400,
                lineHeight: '22px'
              }}
            >
              Last Completed Call :
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '80px', marginX: '22px', gap: '7px' }}>
            <Box
              sx={{
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'customColors.cyan3'
              }}
            >
              <i className='ri-eye-line w-[14px] h-[14px] text-[#26C6F9]'></i>
            </Box>
            <Box
              sx={{
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'customColors.cyan3'
              }}
            >
              <i className='ri-group-fill w-[14px] h-[14px] text-[#26C6F9]'></i>
            </Box>
          </Box>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card elevation={0} sx={{ borderRadius: 1, p: 1, height: '380px' }} className='shadow-lg'>
          <div className='bg-[#c4edfa] mx-[22px]  p-2 rounded-full flex items-center justify-center mt-[24px] size-[44px]'>
            <Image src={person} className='' alt='phone-image' />
          </div>

          <Typography sx={{ fontSize: '30px', color: 'customColors.darkGray1', paddingTop: '8px', paddingX: '22px' }}>
            Site Visits
          </Typography>
          <Typography
            sx={{
              paddingTop: '8px',
              color: 'customColors.textGray',
              paddingX: '22px',
              fontSize: '12px',
              fontWeight: 300
            }}
          >
            You’ve invited 3 agents to video calls.{' '}
          </Typography>
          <Divider sx={{ height: '2px', backgroundColor: '#D9D9D9', my: 1, marginTop: '14px' }} />
          <CardContent sx={{ px: 2, pb: 2, paddingX: '22px' }}>
            <Typography
              sx={{
                color: 'customColors.textGray',
                fontSize: '13px',
                fontWeight: 400,
                lineHeight: '22px'
              }}
            >
              Next Scheduled Call :
            </Typography>
            <Typography
              sx={{
                color: 'customColors.textGray',
                fontSize: '13px',
                fontWeight: 400,
                lineHeight: '22px'
              }}
            >
              Last Completed Call :
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '80px', marginX: '22px', gap: '7px' }}>
            <Box
              sx={{
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'customColors.cyan3'
              }}
            >
              <i className='ri-eye-line w-[14px] h-[14px] text-[#26C6F9]'></i>
            </Box>
            <Box
              sx={{
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'customColors.cyan3'
              }}
            >
              <i className='ri-user-forbid-fill w-[14px] h-[14px] text-[#26C6F9]'></i>
            </Box>
            <Box
              sx={{
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'customColors.cyan3'
              }}
            >
              <i className='ri-group-fill w-[14px] h-[14px] text-[#26C6F9]'></i>
            </Box>
          </Box>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card elevation={0} sx={{ borderRadius: 1, p: 1, height: '380px' }} className='shadow-lg'>
          <div className='bg-[#c4edfa] mx-[22px]  p-2 rounded-full flex items-center justify-center mt-[24px] size-[44px]'>
            <Image src={star} className='' alt='phone-image' />
          </div>

          <Typography sx={{ fontSize: '30px', color: 'customColors.darkGray1', paddingTop: '8px', paddingX: '22px' }}>
            Appoint Your Agent
          </Typography>
          <Typography
            sx={{
              paddingTop: '8px',
              color: 'customColors.textGray',
              paddingX: '22px',
              fontSize: '12px',
              fontWeight: 300
            }}
          >
            Agent Name : PMC1XXXXX - Date of Appointment{' '}
          </Typography>
          <Divider sx={{ height: '2px', backgroundColor: '#D9D9D9', my: 1, marginTop: '14px' }} />
          <CardContent sx={{ px: 2, pb: 2, paddingX: '22px' }}>
            <Typography
              sx={{
                color: 'customColors.textGray',
                fontSize: '13px',
                fontWeight: 400,
                lineHeight: '22px'
              }}
            >
              Congratulations, you’ve appointed a new managing agent.We ll now archive this tender in X Days
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '80px', marginX: '22px', gap: '7px' }}>
            <Box
              sx={{
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'customColors.cyan3'
              }}
            >
              <i className='ri-eye-line w-[14px] h-[14px] text-[#26C6F9]'></i>
            </Box>
            <Box
              sx={{
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'customColors.cyan3'
              }}
            >
              <i className='ri-group-fill w-[14px] h-[14px] text-[#26C6F9]'></i>
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

export { TenderCards }
