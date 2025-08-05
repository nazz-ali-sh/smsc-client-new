import React from 'react'

import type { StepIconProps } from '@mui/material/StepIcon'
import { styled } from '@mui/material/styles'

import Box from '@mui/material/Box'

const StepperCustomDotRoot = styled(Box, {
  shouldForwardProp: prop => prop !== 'ownerState'
})<{ ownerState: { active: boolean | undefined; completed: boolean | undefined; error: boolean | undefined } }>(
  ({ theme, ownerState }) => ({
    width: 24,
    height: 24,
    borderRadius: '50%',
    backgroundColor: '#d1d1d1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',

    ...(ownerState.active && {
      backgroundColor: 'transparent',
      border: '2px solid #35c0ed',
      color: '#35c0ed'
    }),

    ...(ownerState.completed && {
      backgroundColor: '#35c0ed',
      color: '#fff'
    }),

    ...(ownerState.error && {
      backgroundColor: 'transparent',
      border: `2px solid ${theme.palette.error.main}`,
      color: theme.palette.error.main
    })
  })
)

const StepperCustomDot = (props: StepIconProps) => {
  const { active, completed, error, icon } = props
  const ownerState = { active, completed, error }

  const renderDotContent = () => {
    if (error) {
    } else if (completed) {
      return <i className='ri-check-line bg-white size-[18px]'></i>
    } else if (active) {
      return icon
    } else {
      return icon
    }
  }

  return <StepperCustomDotRoot ownerState={ownerState}>{renderDotContent()}</StepperCustomDotRoot>
}

export default StepperCustomDot
