import React from 'react'

import Image from 'next/image'

import appLogo from '../../public/images/customImages/appLogo.png'
import { contactInfo, navigationLinks, socialMedia } from '@/constants'

const CommonFooter = () => {
  return (
    <div className='w-full bg-white min-h-[200px]'>
      <div className='max-w-8xl mx-auto w-full py-6 flex flex-col md:flex-row justify-between items-start text-gray-600'>
        <div className='flex flex-col w-[30%]'>
          <div className='flex items-center mb-3'>
            <Image src={appLogo} alt={'Save My Service Charge Logo'} />
          </div>
          <p className='text-[#787878] font-normal text-sm max-w-sm pt-3'>
            The UK's first service charge comparison site, solely for leaseholders. We're experts in running tenders for
            blocks of flats and leasehold estates.
          </p>
        </div>

        <div className='hidden md:block w-[4px] h-44 bg-gray-200 mx-8 self-center'></div>

        <div className='flex flex-col gap-4 w-full ml-3'>
          <h4 className='font-bold text-gray-700 text-sm mb-1'>Contact Us</h4>
          <div className='flex flex-row gap-10'>
            {contactInfo.map((contact, index) => (
              <div key={index} className='flex items-center gap-2'>
                <div className='size-5 bg-[#35C0ED1F] rounded-sm flex justify-center items-center'>
                  <i className={`${contact.icon} text-[#35C0ED] text-sm`}></i>
                </div>
                <span className='text-sm text-gray-600'>{contact.text}</span>
              </div>
            ))}
          </div>

          <p className='text-xs text-gray-500 mt-3 leading-relaxed'>
            Save My Service Charge Ltd. Registered in England & Wales. Company No. 12969517. Registered office: 5 The
            Square, Bagshot, Surrey, GU19 5AX.
          </p>

          <div className='flex justify-between items-center w-full mt-5'>
            <div className='flex gap-6'>
              {navigationLinks.map((link, index) => (
                <span
                  key={index}
                  className='text-sm text-[#262B43E5] font-bold cursor-pointer hover:text-[#35C0ED] transition-colors'
                >
                  {link.text}
                </span>
              ))}
            </div>

            <div className='flex gap-4'>
              {socialMedia.map((social, index) => (
                <div
                  key={index}
                  className='size-9 rounded-full border-[2px] border-[#26C6F91F] flex justify-center items-center'
                >
                  <i className={`${social.icon} text-[#35C0ED] text-lg cursor-pointer hover:text-[#2BA8D1]`}></i>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommonFooter
