'use client'

import React from 'react'

import { Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'

import CommonModal from '@/common/CommonModal'
import FormInput from '@/components/form-components/FormInput'
import FormSelect from '@/components/form-components/FormSelect'
import CustomButton from '@/common/CustomButton'
import { userSchema } from '@/schemas/validation-schemas'
import type { UserType, UserFormData } from '../types'

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
      name: '',
      email: '',
      mobile_number: '',
      branch_id: undefined
    },
    mode: 'onChange'
  })

  React.useEffect(() => {
    if (isOpen) {
      if (editingUser) {
        reset({
          name: editingUser.name,
          email: editingUser.email,
          mobile_number: editingUser.mobile_number,
          branch_id: editingUser.branch?.id
        })
      } else {
        reset({
          name: '',
          email: '',
          mobile_number: '',
          branch_id: undefined
        })
      }
    }
  }, [isOpen, editingUser, reset])

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
