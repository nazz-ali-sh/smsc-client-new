import React, { useState, useEffect } from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Chip,
  IconButton,
  Divider,
  useTheme,
  Autocomplete,
  FormControl,
  MenuItem,
  Select,
  InputLabel
} from '@mui/material'

import { useForm, Controller } from 'react-hook-form'

import { useQuery } from '@tanstack/react-query'

import ConfirmationModal from './ConfirmationModal'
import { getSlots, pmaAvailableGuest } from '@/services/tender_result-apis/tender-result-api'
import { daysWithSlots } from './data'

interface Guest {
  id: string
  name: string
}

interface OnlineCallsModalProps {
  open: boolean
  onClose: () => void
}

interface Slot {
  id: number | string
  slot_name: string
  start_time: string
  end_time: string
}

const VideosCallsModal: React.FC<OnlineCallsModalProps> = ({ open, onClose }) => {
  const theme = useTheme()

  const [additionalNotes, setAdditionalNotes] = useState('')
  const [selectedGuests, setSelectedGuests] = useState<Guest[]>([])
  const [fianlSelectedSlots, setFianlSelectedSlots] = useState<Slot[]>([])
  const [userSelectedSlots, setUserSelectedSlots] = useState<any>({ selectedIds: '', slotName: '' })


  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false)
  

  const { control, watch, setValue } = useForm({
    defaultValues: {
      selectedDay: '',
      availableSlots: '',
      pmaGuest: ''
    }
  })

  const selectedDay = watch('selectedDay')

  useEffect(() => {
    setValue('availableSlots', '')
  }, [selectedDay, setValue, userSelectedSlots])

  const handleSlotSelection = (selectedId: string) => {

    const found = fianlSelectedSlots.find(s => String(s.id ) === String(selectedId)) ?? null

    setUserSelectedSlots({ selectedIds: String(selectedId), slotName: found })
  }

  const { data: AvailableSlotsData } = useQuery<any, Error>({
    queryKey: ['AvailabeSlots'],
    queryFn: () => getSlots()
  })


  const { data: AvailableGuest } = useQuery<any, Error>({
    queryKey: ['guestAvailable'],
    queryFn: () => pmaAvailableGuest()
  })


  useEffect(() => {
    if (AvailableSlotsData?.data && selectedDay) {
      const daySlots = AvailableSlotsData.data.find((day: { day_name: string }) => day.day_name === selectedDay)

      if (daySlots) {
        setFianlSelectedSlots(daySlots.slots)
      } else {
        setFianlSelectedSlots([])
      }
    } else {
      setFianlSelectedSlots([])
    }
  }, [AvailableSlotsData, selectedDay])

  const handleSendInvites = () => {
    console.log('Sending invites to selected agents')
    setConfirmationModalOpen(true)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: '600px',
          paddingX: '24px'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1, px: 3, pt: 3 }}>
        <Box display='flex' justifyContent='space-between' alignItems='flex-start' sx={{ paddingTop: '32px' }}>
          <Box>
            <Typography
              variant='h4'
              sx={{
                color: theme.colorSchemes.light.palette.customColors.darkBlue,
                fontWeight: 'semibold',
                fontSize: '1.75rem'
              }}
            >
              Video Call Invites
            </Typography>
            <Typography variant='body2' sx={{ paddingY: '12px' }}>
              Use this section to invite PMAs to meeting
            </Typography>
          </Box>
          <IconButton onClick={onClose} sx={{ color: 'customColors.textGray' }}>
            <i className='ri-close-line' />
          </IconButton>
        </Box>
        <Box sx={{ paddingTop: '12px' }}>
          <Divider />
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 2 }} className='mt-10'>
        <Grid container spacing={6}>
          {/* Add Button */}

          <Grid container spacing={6} className='mt-[40px]'>
            {/* Select Day dropdown */}
            <Grid item xs={12} sm={6}>
              <Controller
                name='selectedDay'
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Select Day</InputLabel>
                    <Select label='Select Day' {...field}>
                      {daysWithSlots.map(day => (
                        <MenuItem key={day.day} value={day.day}>
                          {day.day}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='availableSlots'
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Available Slots</InputLabel>
                    <Select
                      label='Available Slots'
                      value={field.value || ''} 
                      onChange={e => {
                        const value = e.target.value as string

                        field.onChange(value) 
                        handleSlotSelection(value) 
                      }}
                      disabled={!selectedDay}
                    >
                      {fianlSelectedSlots?.map((item, index) => (
                        <MenuItem key={index} value={String(item?.id)}>
                          {item?.slot_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>

          

          <Grid item xs={12}>
            <Box sx={{ paddingY: '12px' }}>
              <Divider />
            </Box>

            <Typography variant='h6' sx={{ mb: 2, color: '#333', fontWeight: '600' }}>
              Availability Set for
            </Typography>

            <Grid container spacing={4} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <Chip
                  label={`${userSelectedSlots?.slotName?.slot_name}`}
                  sx={{
                    backgroundColor: theme => theme.colorSchemes.light.palette.customColors.darkGray,
                    color: 'white',
                    '& .MuiChip-label': { px: 2 },
                    height: '32px',
                    borderRadius: '5px',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}
                  onDelete={() => {}}
                />
              </Grid>
            </Grid>
            <Box sx={{ paddingY: '12px' }}>
              <Divider />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h6' sx={{ mb: 2, color: '#333', fontWeight: '600' }}>
              Add Guests
            </Typography>
            <Autocomplete
              multiple
              options={AvailableGuest?.data}
              getOptionLabel={option => option.name}
              getOptionDisabled={option => selectedGuests.some(guest => guest.id === option.id)}
              value={selectedGuests}
              onChange={(event, newValue) => setSelectedGuests(newValue)}
              renderInput={params => <TextField {...params} placeholder='Select guests...' variant='outlined' />}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <Chip
                    label={option.name}
                    {...getTagProps({ index })}
                    sx={{
                      backgroundColor: 'customColors.darkGray',
                      color: 'white',
                      '& .MuiChip-deleteIcon': {
                        color: 'white'
                      }
                    }}
                  />
                ))
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Add Additional Notes'
              multiline
              rows={4}
              value={additionalNotes}
              onChange={e => setAdditionalNotes(e.target.value)}
              placeholder='Enter additional notes...'
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 8, mt: 5 }}>
        <Button
          variant='contained'
          onClick={handleSendInvites}
          sx={{
            backgroundColor: 'customColors.ligthBlue',
            '&:hover': {
              backgroundColor: 'customColors.ligthBlue'
            }
          }}
        >
          Send To All Shortlisted Agents
        </Button>
        <Button
          variant='contained'
          onClick={handleSendInvites}
          sx={{
            backgroundColor: 'customColors.ligthBlue',
            '&:hover': {
              backgroundColor: 'customColors.ligthBlue'
            }
          }}
        >
          Send To Selected Agents
        </Button>
      </DialogActions>

      <ConfirmationModal
        open={confirmationModalOpen}
        onClose={() => {
          setConfirmationModalOpen(false)
          onClose()
        }}
      />
    </Dialog>
  )
}

export default VideosCallsModal
