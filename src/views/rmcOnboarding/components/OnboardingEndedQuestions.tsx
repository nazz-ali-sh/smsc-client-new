'use client'
import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Typography, TextField } from '@mui/material'

import CustomButton from '@/common/CustomButton'
import CommonModal from '@/common/CommonModal'

const questionsData = [
  {
    name: 'serviceChallenges',
    label: 'What service challenges have you experienced with your current managing agent?'
  },
  {
    name: 'newAgentExpectations',
    label: 'What would you like to see done differently by a new managing agent?'
  },
  {
    name: 'systemImprovements',
    label: 'Are there any systems, tools, or financial reporting features that would improve how your block is managed?'
  }
]

const OnboardingEndedQuestions = () => {
  const [open, setOpen] = useState(false)

  const router = useRouter()

  const [responses, setResponses] = useState<Record<string, string>>(
    questionsData.reduce((acc, q) => ({ ...acc, [q.name]: '' }), {})
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setResponses(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleBack = () => {
    router.push('/rmc-onboarding-priorities')
  }

  const buttonStyles = { fontSize: '14px', fontWeight: 700 }

  return (
    <>
      <div className='flex flex-col items-center pt-10 pb-32'>
        <h1 className='text-[48px] font-bold text-[#262B43E5] '>RMC Onboarding</h1>
        <div className='bg-white p-8 pt-10 w-full max-w-7xl mt-8 '>
          <Typography variant='h6' sx={{ fontSize: '24px', fontWeight: 500, color: '#333' }} className='mb-10'>
            Open- Ended Questions
          </Typography>

          {questionsData.map(q => (
            <div key={q.name} className='mb-8'>
              <p className=' font-medium mb-2 text-[#424242] text-lg'>{q.label}</p>
              <TextField
                name={q.name}
                placeholder='Response'
                multiline
                rows={4}
                fullWidth
                value={responses[q.name]}
                onChange={handleChange}
                inputProps={{ maxLength: 2000 }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '6px',
                    '&.Mui-focused fieldset': {
                      borderColor: '#35C0ED'
                    }
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'customColors.textGray',
                    opacity: 1
                  }
                }}
              />
              <div className='text-right text-gray-400 text-sm mt-1'>{responses[q.name].length}/2000 Characters</div>
            </div>
          ))}

          <div className='flex justify-end gap-3 mt-10'>
            <CustomButton sx={buttonStyles} onClick={handleBack} startIcon={<i className='ri-arrow-left-line'></i>}>
              Back
            </CustomButton>
            <CustomButton sx={buttonStyles} endIcon={<i className='ri-arrow-right-line'></i>} onClick={handleOpen}>
              Launch
            </CustomButton>
          </div>
        </div>
      </div>
      {open && (
        <CommonModal isOpen={open} handleClose={() => setOpen(false)} header='Thank You !' maxWidth='sm' fullWidth>
          <p className='text-[#696969] text-base font-normal'>
            Thanks! Your tender is now under review. You will be notified when it goes live and when the results are in.
            Tenders typically run for 5 days. Quotes will start arriving soon."
          </p>
          <div className='mt-8 flex justify-end'>
            <CustomButton sx={buttonStyles}>Ok</CustomButton>
          </div>
        </CommonModal>
      )}
    </>
  )
}

export default OnboardingEndedQuestions
