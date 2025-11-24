'use client'

import React from 'react'

import { Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, string, pipe, nonEmpty, email, check, number } from 'valibot'

import CommonModal from '@/common/CommonModal'
import FormInput from '@/components/form-components/FormInput'
import FormSelect from '@/components/form-components/FormSelect'
import CustomButton from '@/common/CustomButton'

const validateUKPhoneNumber = (value: string): boolean => {
  if (!/^\+?\d+$/.test(value)) {
    return false
  }

  const cleanNumber = value.replace(/\s+/g, '')

  if (/^\+44\d{9,10}$/.test(cleanNumber)) {
    return true
  }

  if (/^\d{7,10}$/.test(cleanNumber)) {
    return true
  }

  if (/^07\d{9}$/.test(cleanNumber)) {
    return true
  }

  if (/^0[123]\d{8,9}$/.test(cleanNumber)) {
    return true
  }

  return false
}

const userSchema = object({
  name: pipe(
    string(),
    nonEmpty('Full name is required'),
    check((value: string) => value.trim().length >= 2, 'Full name must be at least 2 characters')
  ),
  email: pipe(string(), nonEmpty('Email is required'), email('Please enter a valid email address')),
  mobile_number: pipe(
    string(),
    nonEmpty('Mobile number is required'),
    check(validateUKPhoneNumber, 'Please enter a valid UK mobile number')
  ),
  branch_id: pipe(
    number(),
    check((value) => value > 0, 'Branch is required and must be a valid number')
  )
})

interface UserType {
  id: number
  name: string
  email: string
  mobile_number: string
  branch_id: number
  status: 'active' | 'inactive'
}

type UserFormData = {
  name: string
  email: string
  mobile_number: string
  branch_id: number
}

interface UserFormModalProps {
  isOpen: boolean
  onClose: () => void
  editingUser: UserType | null
  onSubmit: (data: UserFormData) => void
  branchOptions: Array<{ value: number; label: string }>
}

const UserFormModal: React.FC<UserFormModalProps> = ({ isOpen, onClose, editingUser, onSubmit, branchOptions }) => {
  const { control, handleSubmit, reset } = useForm<UserFormData>({
    resolver: valibotResolver(userSchema),
    defaultValues: {
      name: editingUser?.name || '',
      email: editingUser?.email || '',
      mobile_number: editingUser?.mobile_number || '',
      branch_id: editingUser?.branch_id || 0
    },
    mode: 'onChange'
  })

  React.useEffect(() => {
    if (editingUser) {
      reset({
        name: editingUser.name,
        email: editingUser.email,
        mobile_number: editingUser.mobile_number,
        branch_id: editingUser.branch_id
      })
    } else {
      reset({
        name: '',
        email: '',
        mobile_number: '',
        branch_id: 0
      })
    }
  }, [editingUser, reset])

  const handleFormSubmit = (data: UserFormData) => {
    onSubmit(data)
    reset()
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <CommonModal
      isOpen={isOpen}
      handleClose={handleClose}
      header={editingUser ? 'Edit User' : 'Add New User'}
      maxWidth='md'
      headerSx={{
        color: '#0C4A6E',
        fontSize: '20px',
        fontWeight: 600
      }}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <FormInput name='name' control={control} label='Full Name' type='text' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput name='email' control={control} label='Email' type='email' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput name='mobile_number' control={control} label='Mobile' type='tel' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormSelect name='branch_id' control={control} label='Branch' options={branchOptions} />
          </Grid>
        </Grid>

        <div className='flex justify-end gap-3 mt-6'>
          <CustomButton onClick={handleClose} variant='outlined'>
            Cancel
          </CustomButton>
          <CustomButton type='submit' variant='contained'>
            {editingUser ? 'Update' : 'Add'}
          </CustomButton>
        </div>
      </form>
    </CommonModal>
  )
}

export default UserFormModal
export type { UserType, UserFormData }
