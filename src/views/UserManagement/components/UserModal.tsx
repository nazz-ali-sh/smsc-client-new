'use client'

import React, { useEffect } from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  Select
} from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'

import type { UserType } from '../types'
import { addUser, updateUser } from '@/redux-store/slices/userSlice'
import type { RootState } from '@/redux-store'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  user: UserType | null
}

const defaultValues: UserType = {
  id: 0,
  name: '',
  email: '',
  mobile_number: '',
  branch_name: '',
  status: '',
  tenderId: ''
}

const UserModal: React.FC<Props> = ({ open, setOpen, user }) => {
  const dispatch = useDispatch()
  const branches = useSelector((state: RootState) => state.branches.branches)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UserType>({
    defaultValues
  })

  useEffect(() => {
    if (user) {
      reset(user)
    } else {
      reset(defaultValues)
    }
  }, [user, reset])

  const onSubmit = (data: UserType) => {
    if (user) {
      dispatch(updateUser(data))
      toast.success('User updated successfully!')
    } else {
      dispatch(addUser({ ...data, id: Date.now() }))
      toast.success('User added successfully!')
    }

    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='sm'>
      <DialogTitle>{user ? 'Edit User' : 'Add New User'}</DialogTitle>
      <DialogContent>
        <form id='user-form' onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='name'
                control={control}
                rules={{ required: 'Full name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Full Name'
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='email'
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Email'
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='mobile_number'
                control={control}
                rules={{ required: 'Mobile number is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Mobile Number'
                    error={!!errors.mobile_number}
                    helperText={errors.mobile_number?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='branch_name'
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <Select
                      {...field}
                      displayEmpty
                      defaultValue=''
                      sx={{ height: 56 }}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 250
                          }
                        }
                      }}
                      renderValue={selected =>
                        selected ? selected : <span style={{ color: '#9e9e9e' }}>Branch (Optional)</span>
                      }
                    >
                      {branches.map(branch => (
                        <MenuItem key={branch.id} value={branch.branch_name}>
                          {branch.branch_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button type='submit' form='user-form' variant='contained'>
          Save
        </Button>
        <Button onClick={() => setOpen(false)} variant='outlined' color='secondary'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserModal
