import React, { useState } from 'react'

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
  Popover,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Divider,
  useTheme,
  Autocomplete,
  InputAdornment
} from '@mui/material'
import ReactDatepicker from 'react-datepicker'

import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import ConfirmationModal from './ConfirmationModal'

interface AvailabilitySlot {
  id: string
  date: string
  startTime: string
  endTime: string
}

interface Guest {
  id: string
  name: string
}

interface OnlineCallsModalProps {
  open: boolean
  onClose: () => void
}

const OnlineCallsModal: React.FC<OnlineCallsModalProps> = ({ open, onClose }) => {
  const theme = useTheme()

  const [dateTime, setDateTime] = useState('')
  const [startTime, setStartTime] = useState('9:00 AM')
  const [endTime, setEndTime] = useState('10:00 AM')
  const [additionalNotes, setAdditionalNotes] = useState('')
  const [selectedGuests, setSelectedGuests] = useState<Guest[]>([])

  const [datePickerAnchor, setDatePickerAnchor] = useState<HTMLElement | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const [timePickerAnchor, setTimePickerAnchor] = useState<HTMLElement | null>(null)
  const [timePickerType, setTimePickerType] = useState<'start' | 'end'>('start')
  const [tempTime, setTempTime] = useState({ hours: 9, minutes: 0, ampm: 'AM' })
  const [editingSlotId, setEditingSlotId] = useState<string | null>(null)
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false)

  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([])

  const availableGuests: Guest[] = [
    { id: '1', name: 'PMA1xxxx' },
    { id: '2', name: 'PMA2xxxx' },
    { id: '3', name: 'PMA3xxxx' },
    { id: '4', name: 'PMA4xxxx' },
    { id: '5', name: 'PMA5xxxx' }
  ]

  const handleAddSlot = () => {
    if (dateTime && startTime && endTime) {
      if (editingSlotId) {
        setAvailabilitySlots(
          availabilitySlots.map(slot =>
            slot.id === editingSlotId ? { ...slot, date: dateTime, startTime, endTime } : slot
          )
        )
        setEditingSlotId(null)

        setDateTime('')
        setStartTime('9:00 AM')
        setEndTime('10:00 AM')
        setSelectedDate(null)
      } else {
        const newSlot: AvailabilitySlot = {
          id: Date.now().toString(),
          date: dateTime,
          startTime,
          endTime
        }

        setAvailabilitySlots([...availabilitySlots, newSlot])
        setDateTime('')
        setStartTime('9:00 AM')
        setEndTime('10:00 AM')
        setSelectedDate(null)
      }
    }
  }

  const handleDeleteSlot = (id: string) => {
    setAvailabilitySlots(availabilitySlots.filter(slot => slot.id !== id))

    if (editingSlotId === id) {
      setEditingSlotId(null)
      setDateTime('')
      setStartTime('9:00 AM')
      setEndTime('10:00 AM')
      setSelectedDate(null)
    }
  }

  const handleEditSlot = (id: string) => {
    const slot = availabilitySlots.find(s => s.id === id)

    if (slot) {
      setDateTime(slot.date)
      setStartTime(slot.startTime)
      setEndTime(slot.endTime)
      setEditingSlotId(id)

      const [month, day, year] = slot.date.split(' ')
      const parsedDate = new Date(`${month} ${day} ${year}`)

      setSelectedDate(isNaN(parsedDate.getTime()) ? null : parsedDate)
    }
  }

  const handleDateClick = (event: React.MouseEvent<HTMLElement>) => {
    setDatePickerAnchor(event.currentTarget)
  }

  const handleDatePickerClose = () => {
    setDatePickerAnchor(null)
  }

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)

    if (date) {
      setDateTime(
        date.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      )
    } else {
      setDateTime('')
    }

    setDatePickerAnchor(null)
  }

  const handleTimeClick = (event: React.MouseEvent<HTMLElement>, type: 'start' | 'end') => {
    setTimePickerType(type)
    setTimePickerAnchor(event.currentTarget)

    const currentTime = type === 'start' ? startTime : endTime
    const timeMatch = currentTime.match(/(\d+):(\d+)\s*(AM|PM)/i)

    if (timeMatch) {
      setTempTime({
        hours: parseInt(timeMatch[1]),
        minutes: parseInt(timeMatch[2]),
        ampm: timeMatch[3].toUpperCase()
      })
    }
  }

  const handleTimePickerClose = () => {
    setTimePickerAnchor(null)
  }

  const handleTimeChange = (field: 'hours' | 'minutes' | 'ampm', value: number | string) => {
    setTempTime(prev => ({ ...prev, [field]: value }))
  }

  const handleTimeConfirm = () => {
    const formattedTime = `${tempTime.hours.toString().padStart(2, '0')}:${tempTime.minutes.toString().padStart(2, '0')} ${tempTime.ampm}`

    if (timePickerType === 'start') {
      setStartTime(formattedTime)
    } else {
      setEndTime(formattedTime)
    }

    setTimePickerAnchor(null)
  }

  const handleTimeCancel = () => {
    setTimePickerAnchor(null)
  }

  const handleSendInvites = () => {
    console.log('Sending invites to selected agents')
    setConfirmationModalOpen(true)
  }

  const lightBlue = theme.colorSchemes.light.palette.customColors.ligthBlue

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
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Date And Time'
              value={dateTime}
              onChange={e => setDateTime(e.target.value)}
              placeholder='Set Date And Time For'
              onClick={handleDateClick}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <i className='ri-calendar-line' style={{ color: 'customColors.textGray' }} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          {/* Start Time and End Time */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label='Start Time'
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
              onClick={e => handleTimeClick(e, 'start')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <i className='ri-time-line' style={{ color: 'customColors.textGray' }} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label='End Time'
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
              onClick={e => handleTimeClick(e, 'end')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <i className='ri-time-line' style={{ color: 'customColors.textGray' }} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          {/* Add Button */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant='contained'
                onClick={handleAddSlot}
                sx={{
                  px: 15,
                  backgroundColor: lightBlue,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: lightBlue
                  }
                }}
              >
                {editingSlotId ? 'Edit' : 'Add'}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ paddingY: '12px' }}>
              <Divider />
            </Box>

            <Typography variant='h6' sx={{ mb: 2, color: '#333', fontWeight: '600' }}>
              Availability Set for
            </Typography>

            <Grid container spacing={4} sx={{ mb: 2 }}>
              {availabilitySlots.map(slot => (
                <Grid item xs={12} sm={6} key={slot.id}>
                  <Chip
                    label={`${slot.date} from ${slot.startTime} to ${slot.endTime}`}
                    sx={{
                      backgroundColor: theme => theme.colorSchemes.light.palette.customColors.darkGray,
                      color: 'white',
                      '& .MuiChip-label': { px: 2 },
                      height: '32px',
                      borderRadius: '5px',
                      justifyContent: 'space-between',
                      width: '100%'
                    }}
                    deleteIcon={
                      <Box sx={{ display: 'flex', gap: 0.5, paddingLeft: '10px' }}>
                        <IconButton size='small' onClick={() => handleEditSlot(slot.id)} sx={{ color: 'white' }}>
                          <i className='ri-edit-line' />
                        </IconButton>
                        <IconButton size='small' onClick={() => handleDeleteSlot(slot.id)} sx={{ color: 'white' }}>
                          <i className='ri-delete-bin-line' />
                        </IconButton>
                      </Box>
                    }
                    onDelete={() => {}}
                  />
                </Grid>
              ))}
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
              options={availableGuests}
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

      <Popover
        open={Boolean(datePickerAnchor)}
        anchorEl={datePickerAnchor}
        onClose={handleDatePickerClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <AppReactDatepicker>
          <ReactDatepicker
            inline
            selected={selectedDate}
            onChange={handleDateChange}
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled
            }: {
              date: Date
              decreaseMonth: () => void
              increaseMonth: () => void
              prevMonthButtonDisabled: boolean
              nextMonthButtonDisabled: boolean
            }) => (
              <div className='flex justify-between items-center p-2'>
                <button
                  type='button'
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  className='p-1 hover:bg-gray-100 rounded'
                >
                  <i className='ri-arrow-left-s-line' />
                </button>
                <span className='font-semibold text-sm'>
                  {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <button
                  type='button'
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  className='p-1 hover:bg-gray-100 rounded'
                >
                  <i className='ri-arrow-right-s-line' />
                </button>
              </div>
            )}
          />
        </AppReactDatepicker>
      </Popover>

      <Popover
        open={Boolean(timePickerAnchor)}
        anchorEl={timePickerAnchor}
        onClose={handleTimePickerClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <Paper sx={{ p: 2, minWidth: 280 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Button
              variant='contained'
              size='small'
              sx={{
                minWidth: 'auto',
                px: 2,
                backgroundColor: lightBlue,
                '&:hover': { backgroundColor: lightBlue }
              }}
            >
              {tempTime.hours.toString().padStart(2, '0')}:{tempTime.minutes.toString().padStart(2, '0')}{' '}
              {tempTime.ampm}
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Box sx={{ width: 80, maxHeight: 200, overflow: 'auto' }}>
              <List dense>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(hour => (
                  <ListItem key={hour} disablePadding>
                    <ListItemButton
                      selected={tempTime.hours === hour}
                      onClick={() => handleTimeChange('hours', hour)}
                      sx={{
                        minHeight: 32,
                        '&.Mui-selected': {
                          backgroundColor: lightBlue,
                          color: 'white'
                        }
                      }}
                    >
                      {hour.toString().padStart(2, '0')}
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ width: 80, maxHeight: 200, overflow: 'auto' }}>
              <List dense>
                {Array.from({ length: 60 }, (_, i) => i).map(minute => (
                  <ListItem key={minute} disablePadding>
                    <ListItemButton
                      selected={tempTime.minutes === minute}
                      onClick={() => handleTimeChange('minutes', minute)}
                      sx={{
                        minHeight: 32,
                        '&.Mui-selected': {
                          backgroundColor: lightBlue,
                          color: 'white'
                        }
                      }}
                    >
                      {minute.toString().padStart(2, '0')}
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ width: 60, maxHeight: 200, overflow: 'auto' }}>
              <List dense>
                {['AM', 'PM'].map(ampm => (
                  <ListItem key={ampm} disablePadding>
                    <ListItemButton
                      selected={tempTime.ampm === ampm}
                      onClick={() => handleTimeChange('ampm', ampm)}
                      sx={{
                        minHeight: 32,
                        '&.Mui-selected': {
                          backgroundColor: lightBlue,
                          color: 'white'
                        }
                      }}
                    >
                      {ampm}
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button onClick={handleTimeCancel} sx={{ color: lightBlue }}>
              CANCEL
            </Button>
            <Button onClick={handleTimeConfirm} sx={{ color: lightBlue }}>
              OK
            </Button>
          </Box>
        </Paper>
      </Popover>

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

export default OnlineCallsModal
