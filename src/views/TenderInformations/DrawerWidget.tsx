import type { Key } from 'react'

import Image from 'next/image'

import { Card, CardContent, Typography } from '@mui/material'

interface cardsData {
  cardsData?: any
}

const DrawerWidget: React.FC<cardsData> = ({ cardsData }) => {

  return (
    <>
      <div className='flex justify-between items-center mt-[34px]'>
        {cardsData.map((items: any, index: Key | null | undefined) => (
          <div className='w-[240px] !max-h-[86px]' key={index}>
            <Card color={'primary'}>
              <CardContent sx={{ paddingX: '10px', paddingTop: '13px' }} className='flex items-center gap-x-[16px]'>
                <div
                  className={`flex items-center gap-4 ${
                    index === 0 ? 'bg-[#E3F9D4]' : index === 1 ? 'bg-[#CBEFFB]' : index === 2 ? 'bg-[#666CFF3D]' : ''
                  } size-[40px] justify-center rounded-lg`}
                >
                  <Image src={items?.icons} alt = ''/>
                </div>
                <div className='flex flex-col'>
                  <Typography variant='body1' color='text.primary'>
                    {items?.descrption}
                  </Typography>
                  <Typography className='text-[17px] font-bold leading-28'>{items.state}</Typography>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </>
  )
}

export default DrawerWidget
