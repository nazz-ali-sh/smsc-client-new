'use client'

import React from 'react'

import { Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'

import CommonModal from '@/common/CommonModal'
import FormInput from '@/components/form-components/FormInput'

// import FormSelect from '@/components/form-components/FormSelect'
import CustomButton from '@/common/CustomButton'
import { branchSchema } from '@/schemas/validation-schemas'
import OnboardingAddresScreen from '@/common/OnboardingAddresScreen'

export interface BranchType {
  id: number
  branch_name: string
  address: string
  postcode: string
  contact_name: string
  contact_email: string
  contact_phone: string
  status?: 'active' | 'inactive'
}

export interface BranchFormData {
  branch_name: string
  address: string
  postcode: string
  contact_name: string
  contact_email: string
  contact_phone: string
}

interface BranchFormModalProps {
  isOpen: boolean
  onClose: () => void
  editingBranch: BranchType | null
  onSubmit: (data: BranchFormData) => void
}

const BranchFormModal: React.FC<BranchFormModalProps> = ({ isOpen, onClose, editingBranch, onSubmit }) => {
  const { control, handleSubmit, reset } = useForm<BranchFormData>({
    resolver: valibotResolver(branchSchema),
    defaultValues: {
      branch_name: '',
      address: '',
      postcode: '',
      contact_name: '',
      contact_email: '',
      contact_phone: ''
    },
    mode: 'onChange'
  })

  React.useEffect(() => {
    if (isOpen && editingBranch) {
      reset({
        branch_name: editingBranch.branch_name,
        address: editingBranch.address,
        postcode: editingBranch.postcode,
        contact_name: editingBranch.contact_name || '',
        contact_email: editingBranch.contact_email || '',
        contact_phone: editingBranch.contact_phone || ''
      })
    }
  }, [isOpen, editingBranch, reset])

  const handleFormSubmit = (data: BranchFormData) => {
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
      header={editingBranch ? 'Edit Branch' : 'Add New Branch'}
      maxWidth='md'
      headerSx={{
        color: '#0C4A6E',
        fontSize: '20px',
        fontWeight: 600
      }}
    >
      <OnboardingAddresScreen portal='pma_portal' hideHeader={true} hideDescription={true} />

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <FormInput name='branch_name' control={control} label='Branch Name' type='text' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput name='address' control={control} label='Address' type='text' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput name='postcode' control={control} label='Postcode' type='text' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput name='contact_name' control={control} label='Contact Name' type='text' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput name='contact_email' control={control} label='Contact Email' type='email' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput name='contact_phone' control={control} label='Contact Phone' type='tel' />
          </Grid>
        </Grid>

        <div className='flex justify-end gap-3 mt-6'>
          <CustomButton onClick={handleClose} variant='outlined'>
            Cancel
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
