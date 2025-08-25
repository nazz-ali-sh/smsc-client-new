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
import type { FieldChangeHandlerContext } from '@mui/x-date-pickers/internals'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useForm, Controller } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, string, optional, any } from 'valibot'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import ConfirmationModal from './ConfirmationModal'
import { getSlotsAndDay, videoCallsInvite } from '@/services/tender_result-apis/tender-result-api'

interface Guest {
  id: string
  name?: string
  pma_number?: string
}

interface OnlineCallsModalProps {
  open: boolean
  onClose: () => void
  shorlistedPmas: any
}

interface Slot {
  id: number | string
  slot_name: string
  start_time: string
  end_time: string
}

export const videoCallSchema = object({
  selectedDay: string('Please select a day'),
  availableSlots: string('Please select an available slot'),
  pmaGuest: optional(any()),
  additionalNotes: optional(string())
})

const VideosCallsModal: React.FC<OnlineCallsModalProps> = ({ open, onClose, shorlistedPmas }) => {
  const theme = useTheme()
  const [dayId, setDayId] = useState('')
  const [finalSelectedSlots, setFinalSelectedSlots] = useState<Slot[]>([])
  const [inviteData, setInviteData] = useState<[]>([])

  const [userSelectedSlots, setUserSelectedSlots] = useState<{ selectedIds: string; slotName: string | null }>({
    selectedIds: '',
    slotName: ''
  })

  const [value, setValue] = useState<Dayjs | null>(dayjs())
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false)

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: valibotResolver(videoCallSchema),
    defaultValues: {
      selectedDay: '',
      availableSlots: '',
      pmaGuest: [],
      additionalNotes: ''
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDateChange = (newValue: Date | Dayjs | null, _context: FieldChangeHandlerContext<any>) => {
    if (!newValue) return

    const d = dayjs(newValue)

    if (d.day() === 0 || d.day() === 6) {
      toast.error('Saturday and Sunday are not available')

      return
    }

    if (d.isBefore(dayjs(), 'day')) {
      toast.error('Previous dates are not allowed')

      return
    }

    setValue(d)
  }

  const shouldDisableDate = (date: Date | Dayjs) => {
    const d = dayjs(date)

    const isWeekend = d.day() === 0 || d.day() === 6
    const isPastDate = d.isBefore(dayjs(), 'day')

    return isWeekend || isPastDate
  }

  const defaultSelection =
    shorlistedPmas?.length > 0
      ? [{ id: shorlistedPmas[0].pma_user.id, pma_number: shorlistedPmas[0].pma_user.pma_number }]
      : []

  const handleSlotSelection = (selectedId: string) => {
    const found = finalSelectedSlots.find(s => String(s.id) === String(selectedId)) ?? null

    setUserSelectedSlots({ selectedIds: String(selectedId), slotName: found?.slot_name || '' })
  }

  interface SlotsApiResponse {
    success: boolean
    message: string
    data: { day_id: string; slots: Slot[] }
  }

  const {
    data: gettingSlotsAndDays,
    isError,
    error
  } = useQuery<SlotsApiResponse, Error>({
    queryKey: ['AvailableSlotsAndDays', value?.format('YYYY-MM-DD')],
    queryFn: () => getSlotsAndDay(value!.format('YYYY-MM-DD'))
  })

  // Handle dayId and slots updates
  useEffect(() => {
    if (gettingSlotsAndDays?.data) {
      setDayId(gettingSlotsAndDays.data.day_id)
      setFinalSelectedSlots(gettingSlotsAndDays.data.slots || [])
    } else {
      setDayId('')
      setFinalSelectedSlots([])
    }
  }, [gettingSlotsAndDays])

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message)
    }
  }, [isError, error])

  const videoCallInviteMutation = useMutation({
    mutationFn: ({
      value,
      day_id,
      slot_ids,
      pma_user_ids,
      message
    }: {
      value: any | string
      day_id: number
      slot_ids: number
      pma_user_ids: number[] | number
      message: string
    }) => videoCallsInvite(value, day_id, slot_ids, pma_user_ids, message),
    onSuccess: (data: any) => {
      debugger
      setInviteData(data?.data?.invites)
      toast.success(data?.message || 'Invite sent successfully!')
      reset()
      setConfirmationModalOpen(true)
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to send invite'

      toast.error(errorMessage)
      console.error('Failed to send invite:', error)
    }
  })

  const handleSendVideoCall = (formData: any) => {
    videoCallInviteMutation.mutate({
      value: value!.format('YYYY-MM-DD'),
      day_id: Number(dayId),
      slot_ids: Number(formData.availableSlots),
      pma_user_ids: formData.pmaGuest.map((g: Guest) => g.id),
      message: formData.additionalNotes
    })
  }

  const type = 'siteVisit'

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
        <Grid container spacing={6} className='mt-[40px]'>
          <Grid item xs={12} sm={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Select date'
                value={value}
                onChange={handleDateChange}
                shouldDisableDate={shouldDisableDate}
                slotProps={{
                  textField: { fullWidth: true }
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name='availableSlots'
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.availableSlots}>
                  <InputLabel>Available Slots</InputLabel>
                  <Select
                    {...field}
                    value={field.value || ''}
                    onChange={e => {
                      const value = e.target.value

                      field.onChange(value)
                      handleSlotSelection(value)
                    }}
                  >
                    {finalSelectedSlots.map((item, index) => (
                      <MenuItem key={index} value={String(item.id)}>
                        {item.slot_name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.availableSlots && (
                    <Typography variant='caption' color='error'>
                      {errors.availableSlots.message as string}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ paddingY: '12px' }}>
              <Divider />
            </Box>

            <Typography variant='h6' sx={{ mb: 2, color: '#333', fontWeight: '600' }}>
              Availability Set for
            </Typography>

            <Grid container spacing={2} alignItems='center' sx={{ mb: 2 }}>
              {/* Chip */}
              <Grid item xs={12} sm={6} sx={{ overflowY: 'auto', width: '100%' }}>
                <Chip
                  label={
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        paddingTop: '20',
                        height: '200px',
                        overflowY: 'auto'
                      }}
                    >
                      {gettingSlotsAndDays?.data?.slots?.map(item => (
                        <span
                          className={`pt-[10px] ${userSelectedSlots?.selectedIds == item?.id ? 'bg-buttonPrimary' : ''} `}
                          key={item?.id}
                        >
                          {item.slot_name}
                        </span>
                      ))}
                    </Box>
                  }
                  sx={{
                    backgroundColor: theme => theme.colorSchemes.light.palette.customColors.darkGray,
                    color: 'white',
                    '& .MuiChip-label': {
                      px: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      paddingTop: '20'
                    },
                    height: 'auto',
                    borderRadius: '5px',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingY: '8px'
                  }}
                />
              </Grid>

              {/* Button */}
              <Grid item>
                <Button
                  variant='contained'
                  onClick={handleSubmit(handleSendVideoCall)}
                  sx={{
                    backgroundColor: 'customColors.ligthBlue',
                    '&:hover': { backgroundColor: 'customColors.ligthBlue' }
                  }}
                >
                  Update Slots Slots
                </Button>
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
            <Controller
              name='pmaGuest'
              control={control}
              defaultValue={defaultSelection}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  options={shorlistedPmas || []}
                  getOptionLabel={option => option.pma_user?.pma_number || ''}
                  isOptionEqualToValue={(option, value) => String(option.pma_user?.id) === String((value as any)?.id)}
                  getOptionDisabled={option =>
                    (field.value || []).some((guest: any) => String(guest.id) === String(option.pma_user?.id))
                  }
                  value={field.value || []}
                  onChange={(_, newValue) => {
                    const mapped = newValue.map((item: any) => ({
                      id: item.pma_user.id,
                      pma_number: item.pma_user.pma_number
                    }))

                    field.onChange(mapped)
                  }}
                  renderInput={params => <TextField {...params} placeholder='Select guests...' variant='outlined' />}
                  renderTags={(value: any[], getTagProps) =>
                    value.map((option, index) => {
                      const { key, ...tagProps } = getTagProps({ index }) // 👈 strip key

                      return (
                        <Chip
                          key={option.id ?? key}
                          {...tagProps}
                          label={option.pma_number}
                          sx={{
                            backgroundColor: 'customColors.darkGray',
                            color: 'white',
                            '& .MuiChip-deleteIcon': { color: 'white' }
                          }}
                        />
                      )
                    })
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='additionalNotes'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Add Additional Notes'
                  multiline
                  rows={4}
                  placeholder='Enter additional notes...'
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 8, mt: 5 }}>
        <Button
          variant='contained'
          onClick={handleSubmit(handleSendVideoCall)}
          sx={{
            backgroundColor: 'customColors.ligthBlue',
            '&:hover': { backgroundColor: 'customColors.ligthBlue' }
          }}
        >
          Send To All Shortlisted Agents
        </Button>
        <Button
          variant='contained'
          onClick={handleSubmit(handleSendVideoCall)}
          sx={{
            backgroundColor: 'customColors.ligthBlue',
            '&:hover': { backgroundColor: 'customColors.ligthBlue' }
          }}
        >
          Send To Selected Agents
        </Button>
      </DialogActions>

      <ConfirmationModal
        type={type}
        inviteData={inviteData}
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
