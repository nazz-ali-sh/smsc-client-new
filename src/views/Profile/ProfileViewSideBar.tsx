'use client'

import React, { useState } from 'react'

import Image from 'next/image'

import { usePathname } from 'next/navigation'

import { placeholderImage } from '@/constants'
import { useMyAccount } from '@/hooks/useMyAccount'
import { useTenderDetail } from '@/hooks/useTenderDetail'
import BlockDetailsInfoSection from '../TenderInformationUpdated/components/BlockDetailsInfoSection'

const ProfileViewSideBar: React.FC = () => {
  const { data: accountData } = useMyAccount()
  const user = accountData?.user
  const [imgSrc, setImgSrc] = useState(user?.logo_url || placeholderImage)

  const { data: tenderDetailData } = useTenderDetail()

  const pathname = usePathname()

  const cardsPerRow = pathname.includes('account-detail') ? 1 : pathname.includes('account') ? 2 : 1

  return (
    <div className='flex justify-center bg-[#F8FAFC] mt-3'>
      <div className='w-[374px] bg-white rounded-[12px] shadow-[0px_4px_10px_rgba(0,0,0,0.05)] p-8'>
        <div className='flex flex-col items-center gap-4 mb-2'>
          <div className='w-20 h-20 bg-[#1F2937] rounded-2xl flex items-center justify-center overflow-hidden'>
            {user?.logo_url ? (
              <Image
                src={imgSrc}
                alt='User Logo'
                width={60}
                height={60}
                className='w-full h-full object-cover'
                onError={() => setImgSrc(placeholderImage)}
              />
            ) : (
              <p className='text-white text-[20px] font-bold'>{user?.name?.charAt(0)}</p>
            )}
          </div>
          <h1 className='text-[#1F2937] font-bold text-[28px]'>{user?.name}</h1>
        </div>

        <div className='h-px bg-[#E5E7EB] mb-4' />

        <BlockDetailsInfoSection
          blockData={tenderDetailData?.block_details}
          cardsPerRow={cardsPerRow}
          visibleCardsCount={pathname.includes('account') && !pathname.includes('account-detail') ? 6 : undefined}
        />
      </div>
    </div>
  )
}

export default ProfileViewSideBar
