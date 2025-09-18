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

import { useSelector } from 'react-redux'

import ConfirmationModal from './ConfirmationModal'
import {
  AllShortlistedPmas,
  sideVisitCalendarSlots,
  SideVisitInvite
} from '@/services/tender_result-apis/tender-result-api'
import { rmcReSchedualAgain, rmcSideVisitInvites } from '@/services/site_visit_apis/site_visit_api'
import type { RootState } from '@/redux-store'
import SuccessModal from './SucessModal'
import type { ShortlistedPmaResponse } from './type'

interface Guest {
  id: string
  name?: string
  pma_number?: string
}

interface OnlineCallsModalProps {
  open: boolean
  onClose: () => void
  shorlistedPmas?: any
  types: any | null
  Reschedual?: any
  siteVisitDate?: any
  SideVisitsSchedualInviteId?: any
  VideoCallInviteId?: any
  completedShorlistedPmas?: any
  setSiteVisitsModalOpen?: any
  defaultmultiselect?: any
  item?: any
  calanderReschedualData?: any
}

interface Slot {
  [x: string]: any
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

const VideosCallsModal: React.FC<OnlineCallsModalProps> = ({
  open,
  onClose,
  shorlistedPmas,
  types,
  SideVisitsSchedualInviteId,
  VideoCallInviteId,
  completedShorlistedPmas,
  setSiteVisitsModalOpen,
  defaultmultiselect,
  calanderReschedualData
}) => {
  const theme = useTheme()
  const [dayId, setDayId] = useState('')
  const [finalSelectedSlots, setFinalSelectedSlots] = useState<Slot[]>([])
  const [inviteData, setInviteData] = useState<[]>([])
  const [SuccessOpen, setSuccessOpen] = useState(false)
  const [value, setValues] = useState<Dayjs | null>(dayjs())
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false)
  const [allPmaids, setAllPmaIds] = useState<[]>([])
  const [showSlotError, setShowSlotError] = useState(false) // New state to track slot selection error

  const [userSelectedSlots, setUserSelectedSlots] = useState<{ selectedIds: string; slotName: string | null }>({
    selectedIds: '',
    slotName: ''
  })

  const tender_id = useSelector((state: RootState) => state?.tenderForm?.tender_id)

  const {
    control,
    reset,
    handleSubmit,
    setValue,
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

  const { data: allshortlsitedPmaData } = useQuery<ShortlistedPmaResponse, Error>({
    queryKey: ['shortlisted', tender_id],
    queryFn: () => AllShortlistedPmas(tender_id),
    enabled: types === 'fromDashboard' || types == 'fromCalender' || types == 'sitevVisitFromCalender'
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

    setValues(d)
    setShowSlotError(false) // Reset error when date changes
  }

  const shouldDisableDate = (date: Date | Dayjs) => {
    const d = dayjs(date)
    const isWeekend = d.day() === 0 || d.day() === 6
    const isPastDate = d.isBefore(dayjs(), 'day')

    return isWeekend || isPastDate
  }

  const handleSlotSelection = (selectedId: string) => {
    const found = finalSelectedSlots.find(s => String(s.id) === String(selectedId)) ?? null

    setUserSelectedSlots({ selectedIds: String(selectedId), slotName: found?.slot_name || '' })
    setShowSlotError(false) // Reset error when a slot is selected
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
    queryFn: () => sideVisitCalendarSlots(value!.format('YYYY-MM-DD'))
  })

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

  const rechedualRmcAgain = useMutation({
    mutationFn: ({
      invite_id,
      rmctender_id,
      date,
      day_id,
      rmcslot_id,
      message
    }: {
      invite_id: number
      rmctender_id: number
      date: string
      day_id: number
      rmcslot_id: number
      message: string
    }) => rmcReSchedualAgain(invite_id, rmctender_id, date, day_id, rmcslot_id, message),
    onSuccess: (data: any) => {
      setInviteData(data?.data?.invites)
      toast.success(data?.message || 'Invite sent successfully!')
      reset()
      setSuccessOpen(true)
      setSiteVisitsModalOpen(false)
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to send invite'

      setSiteVisitsModalOpen(false)
      toast.error(errorMessage)
      console.error('Failed to send invite:', error)
    }
  })

  const handleAgainReschedual = (formData: any) => {
    if (!formData.availableSlots) {
      setShowSlotError(true)

      return
    }

    rechedualRmcAgain.mutate({
      invite_id: VideoCallInviteId || SideVisitsSchedualInviteId,
      rmctender_id: tender_id,
      date: value!.format('YYYY-MM-DD'),
      day_id: Number(dayId),
      rmcslot_id: Number(formData.availableSlots),
      message: formData.additionalNotes
    })
  }

  //  site visit
  const sideVisitrechedualRmcAgain = useMutation({
    mutationFn: ({
      invite_id,
      rmctender_id,
      date,
      day_id,
      rmcslot_id,
      message
    }: {
      invite_id: number
      rmctender_id: number
      date: string
      day_id: number
      rmcslot_id: number
      message: any
    }) => rmcSideVisitInvites(invite_id, rmctender_id, date, day_id, rmcslot_id, message),
    onSuccess: (data: any) => {
      setInviteData(data?.data?.invites)
      toast.success(data?.message || 'Invite sent successfully!')
      reset()
      setSuccessOpen(true)
      setSiteVisitsModalOpen(false)
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to send invite'

      setSiteVisitsModalOpen(false)
      toast.error(errorMessage)
      console.error('Failed to send invite:', error)
    }
  })

  const handleSiteVisitReschedual = (formData: any) => {
    if (!formData.availableSlots) {
      setShowSlotError(true)

      return
    }

    const invite_id = SideVisitsSchedualInviteId || calanderReschedualData?.invite_Id

    if (!invite_id) {
      console.error('Invite ID is required')
      setShowSlotError(true)

      return
    }

    sideVisitrechedualRmcAgain.mutate({
      invite_id,
      rmctender_id: tender_id,
      date: value!.format('YYYY-MM-DD'),
      day_id: Number(dayId),
      rmcslot_id: Number(formData.availableSlots),
      message: formData.additionalNotes
    })
  }

  const location = '123 Property Lane, London, SW1A 1AA'

  const videoCallInviteMutation = useMutation({
    mutationFn: ({
      value,
      day_id,
      slot_ids,
      pma_user_ids,
      message,
      rmctender_id,
      location
    }: {
      value: any | string
      day_id: number
      slot_ids: number
      pma_user_ids: number[] | number
      message: string
      rmctender_id: number
      location: string
    }) => SideVisitInvite(value, day_id, slot_ids, pma_user_ids, message, rmctender_id, location),
    onSuccess: (data: any) => {
      setInviteData(data?.data?.invites)
      toast.success(data?.message || 'Invite sent successfully!')
      reset()
      setConfirmationModalOpen(true)
      setSiteVisitsModalOpen(false)
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to send invite'

      setSiteVisitsModalOpen(false)
      toast.error(errorMessage)
      console.error('Failed to send invite:', error)
    }
  })

  useEffect(() => {
    const pmaIds = shorlistedPmas?.map((item: { pma_user: { id: any } }) => item.pma_user.id)

    setAllPmaIds(pmaIds)
  }, [shorlistedPmas])

  const handleSendVideoCall = (formData: any) => {
    if (!formData.availableSlots) {
      setShowSlotError(true)

      return
    }

    videoCallInviteMutation.mutate({
      value: value!.format('YYYY-MM-DD'),
      day_id: Number(dayId),
      slot_ids: Number(formData.availableSlots),
      pma_user_ids: formData.pmaGuest.map((g: Guest) => g.id),
      message: formData.additionalNotes,
      rmctender_id: tender_id,
      location
    })
  }

  const handleSendVideoCalls = (formData: any) => {
    if (!formData.availableSlots) {
      setShowSlotError(true)

      return
    }

    videoCallInviteMutation.mutate({
      value: value!.format('YYYY-MM-DD'),
      day_id: Number(dayId),
      slot_ids: Number(formData.availableSlots),
      pma_user_ids: allPmaids,
      message: formData.additionalNotes,
      rmctender_id: tender_id,
      location
    })
  }

  const type = 'siteVisit'

  const normalizedOptionsRaw = [
    ...(shorlistedPmas || []).map((item: any) => ({
      id: item.pma_user.id,
      pma_number: item.pma_user.pma_number
    })),
    ...(completedShorlistedPmas || []).map((item: any) => ({
      id: item.pma_user_ids,
      pma_number: item.pmaId
    })),
    ...(allshortlsitedPmaData?.data?.shortlisted_pma_users || []).map((pma: any) => ({
      id: pma.id,
      pma_number: pma.pma_number
    })),
    ...(defaultmultiselect ? [defaultmultiselect] : [])
  ]

  const normalizedOptions = Array.from(new Map(normalizedOptionsRaw.map(item => [String(item.id), item])).values())

  useEffect(() => {
    if (calanderReschedualData) {
      const normalizedSelection = {
        id: calanderReschedualData.pma_user_id,
        pma_number: calanderReschedualData.pma_username
      }

      setValue('pmaGuest', [normalizedSelection], { shouldValidate: true })
    } else if (defaultmultiselect) {
      setValue('pmaGuest', [defaultmultiselect], { shouldValidate: true })
    }
  }, [calanderReschedualData, defaultmultiselect, setValue])

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
              {types == 'Reschedual'
                ? 'Reschedule Site Visit Invites'
                : types == 'SiteVisits'
                  ? 'Reschedule Site Visit'
                  : '  Reschedule Site Visit'}
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
                    {showSlotError && (
                      <MenuItem value='' disabled sx={{ color: 'error.main' }}>
                        Please select a slot
                      </MenuItem>
                    )}
                    {finalSelectedSlots.map((item, index) => (
                      <MenuItem
                        key={index}
                        value={String(item.id)}
                        disabled={item?.booked}
                        className={`${item?.booked ? 'bg-gray-400' : ''} my-2 `}
                      >
                        {item.slot_name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.availableSlots && (
                    <Typography variant='caption' color='error'>
                      {errors.availableSlots.message as string}
                    </Typography>
                  )}
                  {
                    <MenuItem value='' disabled className='text-red-500'>
                      {showSlotError || errors.availableSlots ? 'Select the slot' : ''}
                    </MenuItem>
                  }
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

              <Grid item>
                <Button
                  variant='contained'
                  onClick={handleSubmit(handleSendVideoCall)}
                  sx={{
                    backgroundColor: 'customColors.ligthBlue',
                    '&:hover': { backgroundColor: 'customColors.ligthBlue' }
                  }}
                >
                  Update Slots
                </Button>
              </Grid>
            </Grid>

            <Box sx={{ paddingY: '12px' }}>
              <Divider />
            </Box>
          </Grid>

          {types == 'Reschedual' || types == 'SiteVisits' ? (
            ''
          ) : (
            <Grid item xs={12}>
              <Typography variant='h6' sx={{ mb: 2, color: '#333', fontWeight: '600' }}>
                Add Guests
              </Typography>
              <Controller
                name='pmaGuest'
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <Autocomplete
                    multiple
                    options={normalizedOptions}
                    getOptionLabel={(option: any) => option.pma_number || ''}
                    isOptionEqualToValue={(option, value) => String(option.id) === String((value as any)?.id)}
                    getOptionDisabled={option =>
                      (field.value || []).some((guest: any) => String(guest.id) === String(option.id))
                    }
                    value={field.value || []}
                    onChange={(_, newValue) => field.onChange(newValue)}
                    renderInput={params => <TextField {...params} placeholder='Select guests...' variant='outlined' />}
                    renderTags={(value: any[], getTagProps) =>
                      value.map((option, index) => {
                        const { key, ...tagProps } = getTagProps({ index })

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
          )}

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

      {types == 'Reschedual' ? (
        <>
          <DialogActions sx={{ px: 3, pb: 8, mt: 5 }}>
            <Button
              variant='contained'
              onClick={handleSubmit(handleAgainReschedual)}
              sx={{
                backgroundColor: 'customColors.ligthBlue',
                '&:hover': { backgroundColor: 'customColors.ligthBlue' }
              }}
            >
              Reschedual
            </Button>
          </DialogActions>
        </>
      ) : types == 'SiteVisits' || types == 'siteVisistfromCalander' ? (
        <DialogActions sx={{ px: 3, pb: 8, mt: 5 }}>
          <Button
            variant='contained'
            onClick={handleSubmit(handleSiteVisitReschedual)}
            sx={{
              backgroundColor: 'customColors.ligthBlue',
              '&:hover': { backgroundColor: 'customColors.ligthBlue' }
            }}
          >
            Reschedual
          </Button>
        </DialogActions>
      ) : (
        <>
          <DialogActions sx={{ px: 3, pb: 8, mt: 5 }}>
            <Button
              variant='contained'
              onClick={handleSubmit(handleSendVideoCalls)}
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
        </>
      )}

      {types == 'Reschedual' ? (
        <>
          <SuccessModal
            open={SuccessOpen}
            onClose={() => {
              setSuccessOpen(false)
            }}
            onConfirm={() => {
              setSuccessOpen(false)
            }}
            cancelButton='Cancel'
            message='Success! You have Sent the new meeting time. '
            title='Reschedule Request Sent!'
            confirmButtonText='Confirm'
          />
        </>
      ) : (
        <>
          <ConfirmationModal
            type={type}
            inviteData={inviteData}
            open={confirmationModalOpen}
            onClose={() => {
              setConfirmationModalOpen(false)
              onClose()
            }}
          />
        </>
      )}
    </Dialog>
  )
}

export default VideosCallsModal
