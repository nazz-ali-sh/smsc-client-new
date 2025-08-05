'use client'

import * as React from 'react'

import Image from 'next/image'

import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

import type { StepIconProps } from '@mui/material/StepIcon'

import mark from '../../../public/images/customImages/mark.png'

// Define the structure of the stage and response
interface Stage {
  stage: string
  display_name: string
  stage_number: number
  is_completed: boolean
  is_current: boolean
  completed_at: string | null
}

interface DashboardResponse {
  success: boolean
  message: string
  tender_id: number
  data: {
    tender_stage_progress?: {
      stages: Stage[]
    }
  }
}

// Custom Step Icon
function CustomStepIcon(props: StepIconProps & { stage: Stage }) {
  const { active, completed, stage } = props

  return (
    <div
      style={{
        backgroundColor:
          completed || (stage.is_completed && stage.is_current) ? '#35c0ed' : active ? '#90caf9' : '#e0e0e0',
        borderRadius: '50%',
        width: 32,
        height: 32,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '1rem',
        border: '2px solid #ccc'
      }}
    >
      {stage.is_completed && stage.is_current ? (
        <Image src={mark} alt='mark' width={24} height={24} />
      ) : (
        stage.stage_number
      )}
    </div>
  )
}

export default function HorizontalLinearStepper({ dashboardResponce }: { dashboardResponce?: DashboardResponse }) {
  // Extract stages and find the active step
  const stages = dashboardResponce?.data?.tender_stage_progress?.stages
  const activeStep = stages?.findIndex(stage => stage?.is_current) ?? -1

  // If no stages data, don't render the stepper
  if (!stages || stages.length === 0) {
    return null
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {stages?.map((stage, index) => {
          const stepProps: { completed?: boolean } = {}

          if (stage.is_completed) {
            stepProps.completed = true
          }

          return (
            <Step key={index} {...stepProps}>
              <StepLabel StepIconComponent={props => <CustomStepIcon {...props} stage={stage} />}>
                <div>{stage?.display_name}</div>

                <div style={{ fontSize: '0.75rem', color: '#666' }}>
                  {stage.completed_at ? new Date(stage?.completed_at)?.toLocaleDateString() : 'None'}
                </div>
              </StepLabel>
            </Step>
          )
        })}
      </Stepper>
    </Box>
  )
}
