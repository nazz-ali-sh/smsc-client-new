'use client'

import { useState } from 'react'

import { Typography } from '@mui/material'

import CommonModal from '@/common/CommonModal'

interface responceAndBoiProps {
  boi?: any
  responce?: any
  pmaNumber?: any
}

const ResponceandBio: React.FC<responceAndBoiProps> = ({ boi, responce, pmaNumber }) => {
  const [bioModelOpen, setBioModelOpen] = useState(false)
  const [responseModelOpen, setResponseModelOpen] = useState(false)

  
return (
    <>
      <section>
        <section>
          <Typography className='flex text-[#262B43E5] font-bold mt-[34px] text-[18px]'>
            {pmaNumber} Company Bio 
            <i
              className='ri-information-line cursor-pointer text-black transition-colors ml-2'
              onClick={() => setBioModelOpen(true)}
            ></i>
          </Typography>

          {boi ? (
            <Typography variant='h5' className='text-[#AEAEAE] mt-[18px] text-[14px]'>
              {boi}
            </Typography>
          ) : (
            <Typography variant='h5' className='text-[#AEAEAE] mt-[20px] text-[14px] text-center'>
              No Data
            </Typography>
          )}
        </section>

        <section className=' bg-white px-1 pb-[60px]'>
          <Typography className='text-[#262B43E5] font-bold  pt-[50px] text-[18px] flex'>
            {pmaNumber} Personal Response To You{' '}
            <i
              className='ri-information-line cursor-pointer text-black transition-colors ml-2'
              onClick={() => setResponseModelOpen(true)}
            ></i>
          </Typography>
          <Typography variant='h5' className='text-[#AEAEAE] mt-[20px] text-[14px] '>
            {responce}
          </Typography>
        </section>
      </section>

      <CommonModal
        isOpen={bioModelOpen}
        handleClose={() => setBioModelOpen(false)}
        header='About Managing Agent Bios'
        maxWidth='md'
      >
        <div className='space-y-4'>
          <Typography variant='body1' className='text-[#696969] text-xs mt-3 leading-[22px]'>
            This section contains the managing agent’s company bio. Managing agents are {' '}
            <span style={{ fontWeight: 600 }}>not permitted </span>to include any personal names, company names, or
            contact details here.
          </Typography>

          <div>
            <Typography variant='body2' className='text-[#696969] mb-3 leading-[22px]'>
              The bio is designed to give you an insight into the agent’s approach, values, and beliefs - without the
              influence of marketing material or sales techniques.
            </Typography>
          </div>

          <div>
            <Typography variant='body2' className='text-[#696969] mb-3 leading-[22px]'>
              Save My Service Charge runs every tender as a <span style={{ fontWeight: 600 }}>blind tender </span>to
              begin with, meaning all agent responses are anonymised until you choose to shortlist. This ensures that
              your decisions are based on the substance of each agent’s reply and their company ethos, rather than
              presentation or sales style.
            </Typography>
          </div>

          <div>
            <Typography variant='body2' className='text-[#696969] mb-3 leading-[22px]'>
              Blind tenders work best because they allow Resident Management Company (RMC) directors to focus on what
              truly matters; service quality, transparency, and alignment with your block’s values - rather than who
              delivers the slickest pitch.
            </Typography>
          </div>
        </div>
      </CommonModal>

      <CommonModal
        isOpen={responseModelOpen}
        handleClose={() => setResponseModelOpen(false)}
        header='About This Response'
        maxWidth='md'
      >
        <div className='space-y-4'>
          <Typography variant='body1' className='text-[#696969] text-xs mt-3 leading-[22px]'>
            This is the personal response the managing agent has prepared specifically for your block. Take your time to
            read it carefully and assess how well the agent has addressed the priorities, challenges, and feedback you
            shared in your tender.
          </Typography>

          <div>
            <Typography variant='body2' className='text-[#696969] mb-3 leading-[22px]'>
              A managing agent who takes the time to respond thoughtfully and directly to your needs is demonstrating
              that they listen and engage, rather than relying on a generic, copy-and-paste reply.
            </Typography>
          </div>

          <div>
            <Typography variant='body2' className='text-[#696969] mb-3 leading-[22px]'>
              When shortlisting, give priority to agents who clearly understand your block’s requirements and provide
              detailed, relevant responses — this is a strong indication of how they’ll communicate and manage your
              block if appointed.
            </Typography>
          </div>

          <div>
            <Typography variant='body2' className='text-[#696969] mb-3 leading-[22px]'>
              Blind tenders work best because they allow Resident Management Company (RMC) directors to focus on what
              truly matters; service quality, transparency, and alignment with your block’s values - rather than who
              delivers the slickest pitch.
            </Typography>
          </div>
        </div>
      </CommonModal>
    </>
  )
}

export default ResponceandBio
