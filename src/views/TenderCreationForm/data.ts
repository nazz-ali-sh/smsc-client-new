import MuiStepper from '@mui/material/Stepper'
import { styled } from '@mui/material/styles'
import type { StepperProps } from '@mui/material/Stepper'

export const steps = [
  {
    title: 'Review Your Details'
  },
  {
    title: 'Select Your Priorities'
  },
  {
    title: 'Open-Ended Questions'
  }
]

// Styled Components
export const Stepper = styled(MuiStepper)<StepperProps>(({ theme }) => ({
  justifyContent: 'center',
  '& .MuiStep-root': {
    '&:first-of-type': {
      paddingInlineStart: 0
    },
    '&:last-of-type': {
      paddingInlineEnd: 0
    },
    [theme.breakpoints.down('md')]: {
      paddingInline: 0
    }
  }
}))
