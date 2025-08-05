import { Typography } from '@mui/material'

import PreFunnelForm from '@/views/OnBordingForm/PreFunnelForm'

export default function Page() {
  return (
    <>
      <Typography variant='h3' className='font-semibold text-center'>
        Tender Onboarding
      </Typography>

      <div className='mt-[50px]'>
        <PreFunnelForm />
      </div>
    </>
  )
}
