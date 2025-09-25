'use client'

import { Typography } from '@mui/material'

interface responceAndBoiProps {
  boi?: any
  responce?: any
}

const ResponceandBio: React.FC<responceAndBoiProps> = ({ boi, responce }) => {
  return (
    <>
      <section>
        <section>
          <Typography variant='h3' className='text-darkblue mt-[34px] text-[18px]'>
            Bio
          </Typography>
          <Typography variant='h5' className='text-[#AEAEAE] mt-[10px] text-[14px]'>
            {boi}
          </Typography>
        </section>

        <section className=' bg-white px-1 pb-[60px]'>
          <Typography variant='h3' className='text-darkblue  pt-[50px] text-[18px] '>
            Response
          </Typography>
          <Typography variant='h5' className='text-[#AEAEAE] mt-[20px] text-[14px] '>
            {responce}
          </Typography>
        </section>
      </section>
    </>
  )
}

export default ResponceandBio
