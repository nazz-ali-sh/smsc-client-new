import { steps } from '@/constants'
import React from 'react'

const EvaluationInstructions = () => {
  return (
    <>
      <div className='font-normal space-y-8 text-xs mt-4'>
        {steps.map((step, index) => (
          <div key={index}>
            <h3 className='font-bold text-[#696969] text-[12px] leading-[22px]'>
              {index + 1}. {step.title}
            </h3>
            <p className='pt-1 text-[#828282] text-[12px] leading-[22px]'>{step.description}</p>
            <p className='pt-1 text-[#828282] text-[12px] leading-[22px]'>{step.newDescription}</p>
            <p className='pt-1 text-[#828282] text-[12px] leading-[22px]'>{step.secondDescription}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default EvaluationInstructions
