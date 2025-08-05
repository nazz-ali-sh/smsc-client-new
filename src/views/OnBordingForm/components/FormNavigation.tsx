import React from 'react'

import Button from '@mui/material/Button'

const FormNavigation: React.FC<any> = ({
  currentStep,
  totalSteps,
  onBack,
  onReset,
  isSubmit = false,
  isDisabled = false
}) => {
  console.log('currentStep:', currentStep)

  return (
    <>
      <Button
        variant='outlined'
        disabled={currentStep === 0}
        onClick={onBack}
        color='secondary'
        style={{ marginRight: '10px' }}
      >
        Back
      </Button>

      {isSubmit && onReset ? (
        <Button variant='contained' onClick={onReset}>
          Start Over
        </Button>
      ) : (
        <Button
          variant='contained'
          type='submit'
          disabled={isDisabled}
          sx={{
            backgroundColor: 'customColors.ligthBlue',
            '&:hover': {
              backgroundColor: 'customColors.ligthBlue'
            }
          }}
        >
          {currentStep === totalSteps - 1 ? 'Submit' : 'Next'}
        </Button>
      )}
    </>
  )
}

export default FormNavigation
