'use client'

import React, { useEffect, useState } from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Button,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'

import type { BranchType, UserType } from '../types'
import { dummyUsers } from '../dummyData'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  branch: BranchType | null
  onSave: (branch: BranchType) => void
}

const BranchModal: React.FC<Props> = ({ open, setOpen, branch, onSave }) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<BranchType>()

  const [contactMode, setContactMode] = useState<'current' | 'headOffice' | 'secondary'>('current')

  const lat = watch('lat')
  const lng = watch('lng')

  useEffect(() => {
    if (branch) {
      reset(branch)

      if (branch.user_id) {
        setContactMode('secondary')
      } else if (branch.contact_name === 'Head Office Contact') {
        setContactMode('headOffice')
      } else {
        setContactMode('current')
      }
    } else {
      reset({
        company_id: 0,
        user_id: undefined,
        branch_name: '',
        address: '',
        postcode: '',
        lat: '',
        lng: '',
        contact_name: '',
        contact_email: '',
        contact_phone: '',
        tenderRecipient: 'Branch Contact',
        status: 'Active'
      })
      setContactMode('current')
    }
  }, [branch, reset])

  const onSubmit = (data: BranchType) => {
    let payload: BranchType = {
      ...data,
      id: branch?.id || Date.now(),
      status: branch?.status || 'Active'
    }

    if (contactMode === 'headOffice') {
      payload = {
        ...payload,
        contact_name: 'Head Office Contact',
        contact_email: '',
        contact_phone: '',
        user_id: undefined
      }
    }

    if (contactMode === 'secondary') {
      payload = {
        ...payload,
        contact_name: '',
        contact_email: '',
        contact_phone: ''
      }
    }

    onSave(payload)
    setOpen(false)
  }

  const handleMapClick = (e: any) => {
    if (e.latLng) {
      setValue('lat', e.latLng.lat().toString())
      setValue('lng', e.latLng.lng().toString())
    }
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='md'>
      <DialogTitle>{branch ? 'Edit Branch' : 'Add New Branch'}</DialogTitle>
      <DialogContent>
        <form id='branch-form' onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='branch_name'
                control={control}
                rules={{ required: 'Branch name required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Branch Name (e.g. “Manchester – Deansgate”)'
                    error={!!errors.branch_name}
                    helperText={errors.branch_name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='address'
                control={control}
                rules={{ required: 'Full address is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Full Address (Postcode)'
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
                <Map
                  zoom={14}
                  center={{ lat: parseFloat(lat || '51.5074'), lng: parseFloat(lng || '-0.1278') }}
                  onClick={handleMapClick}
                  style={{ height: 300, borderRadius: 8 }}
                >
                  {lat && lng && <Marker position={{ lat: parseFloat(lat), lng: parseFloat(lng) }} />}
                </Map>
              </APIProvider>
              {(errors.lat || errors.lng) && (
                <FormHelperText error sx={{ mt: 1 }}>
                  {errors.lat?.message || errors.lng?.message}
                </FormHelperText>
              )}
            </Grid>

            <Grid item xs={12}>
              <RadioGroup row value={contactMode} onChange={e => setContactMode(e.target.value as any)}>
                <FormControlLabel value='current' control={<Radio />} label='New Branch Contact' />
                <FormControlLabel value='headOffice' control={<Radio />} label='Head Office Contact' />
                <FormControlLabel value='secondary' control={<Radio />} label='Secondary Contact' />
              </RadioGroup>
            </Grid>

            {contactMode === 'secondary' && (
              <Grid item xs={12} sm={6}>
                <Controller
                  name='user_id'
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Select User</InputLabel>
                      <Select
                        {...field}
                        label='Select User'
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 300
                            }
                          }
                        }}
                      >
                        {dummyUsers.map((u: UserType) => (
                          <MenuItem key={u.id} value={u.id}>
                            {u.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
            )}

            {contactMode === 'current' && (
              <>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='contact_name'
                    control={control}
                    render={({ field }) => <TextField {...field} fullWidth label='Contact Name' />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='contact_email'
                    control={control}
                    render={({ field }) => <TextField {...field} fullWidth label='Contact Email' />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='contact_phone'
                    control={control}
                    render={({ field }) => <TextField {...field} fullWidth label='Contact Phone' />}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='tenderRecipient'
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel>Tender Notification Recipient</InputLabel>
                        <Select {...field} label='Tender Notification Recipient'>
                          <MenuItem value='Branch Contact'>Branch Contact</MenuItem>
                          <MenuItem value='Primary/Secondary User'>Primary/Secondary User</MenuItem>
                          <MenuItem value='Both'>Both</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={() => setOpen(false)} variant='outlined'>
          Cancel
        </Button>
        <Button type='submit' form='branch-form' variant='contained'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BranchModal
