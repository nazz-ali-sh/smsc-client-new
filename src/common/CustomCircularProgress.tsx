'use client'

import { Box, Typography } from '@mui/material'

export interface CustomCircularProgressProps {
  progress?: number
  size?: number
  strokeWidth?: number
  backgroundColor?: string
  progressColor?: string
  label?: string
}

const CustomCircularProgress = ({
  progress = 10,
  size = 100,
  strokeWidth = 20,
  backgroundColor = '#C7F3A9',
  progressColor = '#5BB420',
  label = 'Progress'
}: CustomCircularProgressProps) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const progressOffset = circumference - (progress / 100) * circumference

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size
      }}
    >
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill='none' stroke={backgroundColor} strokeWidth={strokeWidth} />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='none'
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          strokeLinecap='butt'
          style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
        />
      </svg>

      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'text.primary',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: size,
          height: size
        }}
      >
        <Typography
          variant='body2'
          sx={{
            fontSize: `12px`,
            fontWeight: 400,
            color: 'text.black',
            lineHeight: 1,
            marginBottom: '2px'
          }}
        >
          {label}
        </Typography>
        <Typography
          variant='h4'
          sx={{
            fontSize: `15px`,
            fontWeight: 400,
            color: 'text.secondary',
            lineHeight: 1,
            paddingTop: '3px'
          }}
        >
          {progress}%
        </Typography>
      </Box>
    </Box>
  )
}

export default CustomCircularProgress
