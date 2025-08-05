'use client'

import React, { useState } from 'react'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

import { submitRtmSetup } from '../../../services/on-boarding-apis/onboarding-api'

type AddressData = {
  name: string
  email: string
  phone_no: string
  address: string
}

type AddEditAddressProps = {
  modalOpen: boolean
  setModalOpen: (open: boolean) => void
}

const initialAddressData: AddressData = {
  name: '',
  email: '',
  phone_no: '',
  address: ''
}

const AddEditAddress = ({ modalOpen, setModalOpen }: AddEditAddressProps) => {
  const [addressData, setAddressData] = useState<AddressData>(initialAddressData)

  const { mutate: submitRtm, isPending } = useMutation({
    mutationFn: (payload: AddressData) => submitRtmSetup(payload),
    onSuccess: () => {
      toast.success('RTM setup submitted successfully')
      setAddressData(initialAddressData)
      setModalOpen(false)
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to submit RTM setup'

      toast.error(message)
    }
  })

  const handleSubmit = () => {
    submitRtm(addressData)
  }

  const handleClose = () => {
    setAddressData(initialAddressData)
    setModalOpen(false)
  }

  return (
    <Dialog open={modalOpen} maxWidth='md' scroll='body' onClose={handleClose}>
      <DialogTitle variant='h3' className='flex gap-2 font-semibold flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        RTM Form
      </DialogTitle>
      <form onSubmit={e => e.preventDefault()}>
        <DialogContent className='pbs-0 sm:pbe-6 sm:pli-16'>
          <IconButton onClick={handleClose} className='absolute block-start-4 inline-end-4'>
            <i className='ri-close-line text-textSecondary' />
          </IconButton>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Full Name'
                name='name'
                variant='outlined'
                placeholder='John Doe'
                value={addressData.name}
                onChange={e => setAddressData({ ...addressData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Email'
                name='email'
                variant='outlined'
                placeholder='john.doe@example.com'
                value={addressData.email}
                onChange={e => setAddressData({ ...addressData, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Phone Number'
                name='phone_no'
                variant='outlined'
                placeholder='+1234567890'
                value={addressData.phone_no}
                onChange={e => setAddressData({ ...addressData, phone_no: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Address'
                name='address'
                variant='outlined'
                placeholder='12, Business Park'
                value={addressData.address}
                onChange={e => setAddressData({ ...addressData, address: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' onClick={handleSubmit} disabled={isPending}>
            Add
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleClose} type='reset'>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddEditAddress
