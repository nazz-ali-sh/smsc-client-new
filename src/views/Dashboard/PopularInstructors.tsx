import Image from 'next/image'

import { Grid, Card, CardContent, CardHeader, Typography, Divider } from '@mui/material'

import phone from '../../../public/images/dashboardImages/phone.svg'
import person from '../../../public/images/dashboardImages/person.svg'
import star from '../../../public/images/dashboardImages/star.svg'

const tenderData = [
  {
    image: <i style={{ color: '#35c0ed' }} className='ri-eye-2-line w-[48px] h-[48px]' />,
    tenderTitle: 'Tender Overview',
    tenderDetails1: 'Reference Number : ',
    tenderDetails2: 'Tender Type : ',
    tenderDetails3: 'Submitted On',
    tenderDetails4: 'Deadline',
    active: false,
    completed: true
  },
  {
    image: <i style={{ color: '#35c0ed' }} className='ri-database-line w-[48px] h-[48px]' />,
    tenderTitle: 'Results',
    tenderDetails1: 'Your Tender was sent to :',
    tenderDetails2: 'You have Received :',
    tenderDetails3: 'Submitted On',
    tenderDetails4: 'Deadline',
    active: true,
    completed: false
  },
  {
    image: <i style={{ color: '#35c0ed' }} className='ri-list-check-2 w-[48px] h-[48px]' />,
    tenderTitle: 'Shortlisted',
    tenderDetails1: 'Reference Number : ',
    tenderDetails2: 'Tender Type : ',
    tenderDetails3: 'Submitted On',
    tenderDetails4: 'Deadline',
    active: false,
    completed: false
  },
  {
    image: <Image src={phone} alt='jhdag' style={{ color: '#dbdbdb' }} className=' w-[48px] h-[48px]' />,
    tenderTitle: 'Video Calls',
    tenderDetails1: 'Reference Number : ',
    tenderDetails2: 'Tender Type : ',
    tenderDetails3: 'Submitted On',
    tenderDetails4: 'Deadline',
    active: false,
    completed: false
  },
  {
    image: <Image src={person} alt='jhdag' style={{ color: '#dbdbdb' }} className=' w-[48px] h-[48px]' />,
    tenderTitle: 'Site Visits',
    tenderDetails1: 'Reference Number : ',
    tenderDetails2: 'Tender Type : ',
    tenderDetails3: 'Submitted On',
    tenderDetails4: 'Deadline',
    active: false,
    completed: false
  },
  {
    image: <Image src={star} alt='star' style={{ color: '#dbdbdb' }} className=' w-[48px] h-[48px]' />,
    tenderTitle: 'Final Selection',
    tenderDetails1: 'Reference Number : ',
    tenderDetails2: 'Tender Type : ',
    tenderDetails3: 'Submitted On',
    tenderDetails4: 'Deadline',
    active: false,
    completed: false
  }
]

const TenderCard = ({ item, index }: { item: any; index: number }) => (
  <Card
    key={index}
    elevation={0}
    sx={{ borderRadius: 1, p: 1 }}
    className={`${item?.completed == true && 'shadow-lg'} ${item?.active ? 'border-2 border-bordercolor1' : ''}   `}
  >
    <CardHeader
      title={
        <Typography variant='h3' color='text.primary' className='flex items-center justify-between gap-x-[10px]'>
          <div className='flex items-center gap-x-[12px]'>
            <div className={`${item?.completed ? 'bg-[#c4edfa] ' : 'bg-[#dbdbdb]'} p-2 rounded-full flex items-center`}>
              {item?.image}
            </div>{' '}
            {item?.tenderTitle}
          </div>

          {<i className='ri-arrow-right-line w-[48px] h-[48px]'></i>}
        </Typography>
      }
      sx={{ py: 4 }}
    />
    <Typography variant='body1' align='center'>
      View and edit information on your tender
    </Typography>
    <Divider sx={{ height: '2px', backgroundColor: '#D9D9D9', my: 1 }} />
    <CardContent sx={{ px: 2, pb: 2, pt: 5 }}>
      <Typography variant='body2' color='text.secondary'>
        1: Reference Number: {item.tenderDetails1}
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        2: Tender Type: {item.tenderDetails2}
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        3: Submitted On: {item.tenderDetails3}
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        4: Deadline: {item.tenderDetails4}
      </Typography>
    </CardContent>
  </Card>
)

const TenderCards = () => {
  return (
    <Grid container spacing={10}>
      {tenderData.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <TenderCard item={item} index={index} />
        </Grid>
      ))}
    </Grid>
  )
}

export default TenderCards
