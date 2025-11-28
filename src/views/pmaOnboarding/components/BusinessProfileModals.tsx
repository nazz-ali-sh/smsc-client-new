'use client'

import React from 'react'

import { Typography } from '@mui/material'

import CustomButton from '@/common/CustomButton'
import CommonModal from '@/common/CommonModal'
import type { BusinessProfileModalsProps } from '../../UserManagement/types'

const BusinessProfileModals: React.FC<BusinessProfileModalsProps> = ({
  isDeleteModalOpen,
  isTotalUnitModalOpen,
  isUnitsAccountManagerModalOpen,
  isContactPreferencesModalOpen,
  isSecondaryContactModalOpen,
  isSkipAction,
  deleteMutationPending,
  handleCancelDelete,
  handleConfirmDelete,
  handleModalClose
}) => {
  const deleteButtonText = deleteMutationPending
    ? isSkipAction
      ? 'Skipping...'
      : 'Deleting...'
    : isSkipAction
      ? 'Skip'
      : 'Delete'

  return (
    <>
      <CommonModal isOpen={isDeleteModalOpen} handleClose={handleCancelDelete} header='' maxWidth='sm' fullWidth>
        <div className='py-4'>
          <Typography variant='body1' className='text-base text-[#262B43E5] mb-4'>
            Are you sure you want to delete this secondary user?
          </Typography>
          <Typography variant='body2' className='text-sm text-[#696969] mb-6'>
            This action will permanently remove the secondary user from your account.
          </Typography>
          <div className='flex justify-end gap-3'>
            <CustomButton
              variant='outlined'
              onClick={handleCancelDelete}
              sx={{ fontSize: '14px', fontWeight: 700 }}
              disabled={deleteMutationPending}
            >
              Cancel
            </CustomButton>
            <CustomButton
              variant='contained'
              onClick={handleConfirmDelete}
              sx={{ fontSize: '14px', fontWeight: 700 }}
              disabled={deleteMutationPending}
            >
              {deleteButtonText}
            </CustomButton>
          </div>
        </div>
      </CommonModal>

      <CommonModal
        isOpen={isTotalUnitModalOpen}
        headerSx={{ color: '#1F4E8D', fontSize: '20px', fontWeight: 600, marginLeft: '14px' }}
        isBorder
        maxWidth='sm'
        handleClose={handleModalClose}
        header='Total Units Managed By Company'
      >
        <div className='py-4'>
          <Typography variant='body2' className='text-sm text-[#696969] mb-6'>
            This is the total number of units your company manages across all sites. A unit is an individual home (flat
            or house), not a block.
          </Typography>
          <Typography variant='body2' className='text-sm text-[#696969] mb-6'>
            For example, a block of 56 flats = 56 units.
          </Typography>
          <Typography variant='body2' className='text-sm text-[#696969] mb-6'>
            It doesn’t need to be exact - the purpose is to give RMCs a clear sense of your company’s size. Some RMCs
            prefer working with smaller, more hands-on agents, while others prefer larger agents with more resources.
          </Typography>
        </div>
      </CommonModal>

      <CommonModal
        isOpen={isUnitsAccountManagerModalOpen}
        headerSx={{ color: '#1F4E8D', fontSize: '20px', fontWeight: 600, marginLeft: '14px' }}
        isBorder
        maxWidth='sm'
        handleClose={handleModalClose}
        header='Units Managed Per Account Manager'
      >
        <div className='py-4'>
          <Typography variant='body2' className='text-sm text-[#696969] mb-6'>
            This is the average number of units each of your account managers is responsible for. It doesn’t need to be
            exact — an approximate figure is perfectly acceptable.
          </Typography>
          <Typography variant='body2' className='text-sm text-[#696969] mb-6'>
            RMCs use this information to understand how your workload is spread. If account managers look after fewer
            units, it generally suggests more time available per block (and may mean a higher management fee). If they
            manage more units, fees may be lower but time availability may vary.
          </Typography>
          <Typography variant='body2' className='text-sm text-[#696969] mb-6'>
            This helps RMCs choose an agent whose operating style matches their expectations.
          </Typography>
        </div>
      </CommonModal>

      <CommonModal
        isOpen={isContactPreferencesModalOpen}
        headerSx={{ color: '#1F4E8D', fontSize: '20px', fontWeight: 600, marginLeft: '14px' }}
        isBorder
        maxWidth='sm'
        handleClose={handleModalClose}
        header='Contact Preferences'
      >
        <div className='py-4'>
          <Typography variant='body2' className='text-sm text-[#696969] mb-6'>
            Choose whether you’d like your mobile number or office landline to be used as your primary contact number.
            This will be the number shared with RMCs when they shortlist your company, so please select the option that
            best represents your preferred and most reliable point of contact.
          </Typography>
        </div>
      </CommonModal>

      <CommonModal
        isOpen={isSecondaryContactModalOpen}
        headerSx={{ color: '#1F4E8D', fontSize: '20px', fontWeight: 600, marginLeft: '14px' }}
        isBorder
        maxWidth='sm'
        handleClose={handleModalClose}
        header='Secondary Contacts'
      >
        <div className='py-4'>
          <Typography variant='body2' className='text-sm text-[#696969] mb-6'>
            Secondary contacts have full access to view and reply to tenders but cannot change your account settings or
            add other users. Only the Primary User can manage your company’s account information.
          </Typography>
          <Typography variant='body2' className='text-sm text-[#696969] mb-6'>
            Secondary contacts are optional and can be added at any time. They’re useful for ensuring your company can
            still reply to tenders if the primary contact is unavailable, on holiday, or out of office.
          </Typography>
        </div>
      </CommonModal>
    </>
  )
}

export default BusinessProfileModals
