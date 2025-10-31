'use client'

import * as React from 'react'

import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

import type { StepIconProps } from '@mui/material/StepIcon'

import { useDashboardData } from '@/hooks/useDashboardData'

interface Stage {
  stage: string
  display_name: string
  stage_number: number
  is_completed: boolean
  is_current: boolean
  completed_at: string | null
}

function CustomStepIcon(props: StepIconProps & { stage: Stage }) {
  const { stage } = props

  const isCompleted = stage?.is_completed

  return (
    <div
      style={{
        backgroundColor: isCompleted ? '#26C6F9' : '#ffffff',
        borderRadius: '50%',
        width: 20,
        height: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '1rem',
        border: '2px solid #26C6F9',
        color: isCompleted ? '#ffffff' : '#666666'
      }}
    >
      {isCompleted && <i className='ri-check-line'></i>}
    </div>
  )
}

export default function HorizontalLinearStepper() {
  const { data: dashboardData } = useDashboardData()

  const stagesObject = dashboardData?.data?.tender_stage_progress?.stages

  const stages = stagesObject
    ? Object.values(stagesObject).sort((a: any, b: any) => a.stage_number - b.stage_number)
    : []

  const activeStep = stages?.findIndex((stage: any) => stage?.is_current) ?? -1

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        activeStep={activeStep}
        sx={{
          '& .MuiStepConnector-line': {
            borderColor: '#26C6F9',
            borderTopWidth: 4,
            borderRadius: '3px',
            marginX: 3
          },
          '& .MuiStepConnector-line.Mui-completed': {
            borderColor: '#35c0ed',
            borderTopWidth: 2
          },
          '& .MuiStepLabel-label': {
            fontSize: '0.875rem',
            fontWeight: 500,
            color: '#333',
            textAlign: 'center',
            marginTop: '8px'
          },
          '& .MuiStepLabel-label.Mui-completed': {
            color: '#35c0ed'
          }
        }}
      >
        {stages?.map((stage: any, index) => {
          const stepProps: { completed?: boolean } = {}

          if (stage.is_completed) {
            stepProps.completed = true
          }

          return (
            <Step key={index} {...stepProps}>
              <StepLabel StepIconComponent={props => <CustomStepIcon {...props} stage={stage} />}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 400,
                      color: '#262B43E5'
                    }}
                  >
                    {stage?.display_name}
                  </div>
                  <div
                    style={{
                      fontSize: '13px ',
                      color: '#262B4366',
                      fontWeight: 400
                    }}
                  >
                    {stage.completed_at ? new Date(stage?.completed_at)?.toLocaleDateString() : 'None'}
                  </div>
                </div>
              </StepLabel>
            </Step>
          )
        })}
      </Stepper>
    </Box>
  )
}
