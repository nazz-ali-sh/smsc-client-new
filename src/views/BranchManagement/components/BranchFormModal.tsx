'use client'

import React, { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material'
import { toast } from 'react-toastify'

import CommonModal from '@/common/CommonModal'
import CustomButton from '@/common/CustomButton'
import PmaBranchLocationFormView from '@/views/pmaOnboarding/components/PmaBranchLocationFormView'
import { getPmaSubUserNames } from '@/services/pma-branch-management-apis/pma-branch-management-apis'
import type { BranchFormModalProps } from '../types'
import { getBranchApiPayload } from '../types'

const BranchFormModal: React.FC<BranchFormModalProps> = ({ isOpen, onClose, editingBranch, onSubmit }) => {
  const [branchFormData, setBranchFormData] = useState<any>(null)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  const { data: usersData, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['pmaSubUserNames'],
    queryFn: getPmaSubUserNames,
    enabled: isOpen
  })

  React.useEffect(() => {
    if (isOpen && !editingBranch) {
      setBranchFormData(null)
      setSelectedUserId(null)
    }
  }, [isOpen, editingBranch])

  const users = usersData?.data?.users || []

  React.useEffect(() => {
    if (isOpen && editingBranch) {
      const matchingUser = users.find((user: any) => user.email === editingBranch.contact_email)

      if (matchingUser) {
        setSelectedUserId(matchingUser.user_id)
      }
    }
  }, [isOpen, editingBranch, users])

  const getInitialBranchData = (editingBranch: any) => {
    if (!editingBranch) return undefined

    return {
      branchName: editingBranch.branch_name,
      postcode: editingBranch.postcode,
      addressData: {
        addressLine1: editingBranch.address || editingBranch.address_line_1 || '',
        addressLine2: editingBranch.address_line2 || editingBranch.address_line_2 || '',
        postcode: editingBranch.postcode || '',
        region: editingBranch.region || '',
        county: editingBranch.county || '',
        coordinates: {
          lat: Number(editingBranch.lat) || 0,
          lng: Number(editingBranch.lng) || 0
        },
        address_type: 'manual'
      }
    }
  }

  const handleSubmitForm = () => {
    if (!branchFormData) {
      toast.error('Please fill in the branch location form')

      return
    }

    if (!selectedUserId) {
      toast.error('Please select a branch contact')

      return
    }

    const selectedUser = users.find((user: any) => user.user_id === selectedUserId)

    if (!selectedUser) {
      toast.error('Selected user not found')

      return
    }

    const payload = getBranchApiPayload(branchFormData, selectedUser)

    onSubmit(payload)

    setSelectedUserId(null)
    setBranchFormData(null)
    onClose()
  }

  const handleClose = () => {
    setSelectedUserId(null)
    setBranchFormData(null)
    onClose()
  }

  const handleUserChange = (event: any) => {
    setSelectedUserId(event.target.value)
  }

  return (
    <CommonModal
      isOpen={isOpen}
      handleClose={handleClose}
      header={editingBranch ? 'Edit Branch' : 'Add New Branch'}
      maxWidth='md'
      headerSx={{
        color: '#0C4A6E',
        fontSize: '20px',
        fontWeight: 600
      }}
    >
      {isLoadingUsers && <p className='text-sm text-gray-500'>Loading users...</p>}

      <PmaBranchLocationFormView
        key={editingBranch?.id || 'new'}
        hideHeader={true}
        onDataChange={setBranchFormData}
        loadSavedData={false}
        initialBranchData={getInitialBranchData(editingBranch)}
      />

      <div className='mb-4'>
        <Typography variant='subtitle1' className='text-[14px] text-[#696969] mb-4 font-normal'>
          To add a new user, please add them in user management. To edit users assigned to a branch, please click edit
          button in branch management.
        </Typography>
        <FormControl fullWidth>
          <InputLabel
            id='user-select-label'
            sx={{
              '&.Mui-focused': {
                color: '#35C0ED !important'
              },
              '&.MuiInputLabel-shrink': {
                color: '#35C0ED !important'
              }
            }}
          >
            Add A Branch Contact
          </InputLabel>
          <Select
            labelId='user-select-label'
            id='user-select'
            value={selectedUserId || ''}
            label='Add A Branch Contact'
            onChange={handleUserChange}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d9d9d9'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#26C6F9'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#26C6F9'
              }
            }}
          >
            <MenuItem value='' disabled>
              <em>Select a user</em>
            </MenuItem>
            {users.map((user: any) => (
              <MenuItem key={user.user_id} value={user.user_id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <form
        onSubmit={e => {
          e.preventDefault()
          handleSubmitForm()
        }}
      >
        <div className='flex justify-end gap-3 mt-6'>
          <CustomButton onClick={handleClose} variant='outlined'>
            Back
          </CustomButton>
          <CustomButton type='submit' variant='contained'>
            {editingBranch ? 'Update' : 'Add'}
          </CustomButton>
        </div>
      </form>
    </CommonModal>
  )
}

export default BranchFormModal
