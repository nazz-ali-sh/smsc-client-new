'use client'

import { Card, CardContent, Box, Skeleton } from '@mui/material'

interface CardSkeletonProps {
  height?: string
}

const CardSkeleton = ({ height = '370px' }: CardSkeletonProps) => {
  return (
    <Card elevation={0} sx={{ borderRadius: 1, height }} className='relative'>
      <div className='bg-[#c4edfa] mx-[22px] p-2 rounded-full flex items-center justify-center mt-[24px] size-[44px]'>
        <Skeleton variant='circular' width={24} height={24} />
      </div>

      <Skeleton
        variant='text'
        width='60%'
        height={36}
        sx={{
          marginTop: '8px',
          marginX: '22px',
          borderRadius: '4px'
        }}
      />

      <Skeleton
        variant='text'
        width='80%'
        height={16}
        sx={{
          marginTop: '8px',
          marginX: '22px',
          borderRadius: '4px'
        }}
      />

      <Box sx={{ marginTop: '14px', marginX: '22px' }}>
        <Skeleton variant='rectangular' width='100%' height={2} sx={{ borderRadius: '1px' }} />
      </Box>

      <CardContent sx={{ px: 2, pb: 2, paddingX: '22px', marginTop: '14px' }}>
        <Skeleton variant='text' width='90%' height={16} sx={{ marginBottom: '8px', borderRadius: '4px' }} />
        <Skeleton variant='text' width='85%' height={16} sx={{ marginBottom: '8px', borderRadius: '4px' }} />
        <Skeleton variant='text' width='75%' height={16} sx={{ marginBottom: '8px', borderRadius: '4px' }} />
        <Skeleton variant='text' width='80%' height={16} sx={{ borderRadius: '4px' }} />
      </CardContent>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingTop: '80px',
          position: 'absolute',
          bottom: '18px',
          right: '8px'
        }}
      >
        <Skeleton variant='rectangular' width={36} height={36} sx={{ borderRadius: '6px', marginX: '6px' }} />
        <Skeleton variant='rectangular' width={36} height={36} sx={{ borderRadius: '6px', marginX: '6px' }} />
      </Box>
    </Card>
  )
}

export default CardSkeleton
