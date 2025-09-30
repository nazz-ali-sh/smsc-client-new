'use client'

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
  InputLabel,
  FormHelperText
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
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { useSelector } from 'react-redux'

import ConfirmationModal from './ConfirmationModal'
import { getSlotsAndDay, shortlistedPmas, videoCallsInvite } from '@/services/tender_result-apis/tender-result-api'
import type { ShortlistedPmaResponse } from './type'
import { rmcReSchedualAgain } from '@/services/site_visit_apis/site_visit_api'
import { useDashboardData } from '@/hooks/useDashboardData'
import CustomButton from './CustomButton'

interface Guest {
  id: string
  name?: string
  pma_number?: string
}

interface OnlineCallsModalProps {
  open: boolean
  onClose: () => void
  shorlistedPmas?: any
  siteVisitshorlistedPmas?: any
  mainSiteVisitVideoCalls: any
  defaultmultiselect?: any
  types?: any
  componentTypes?: any
  calanderReschedualData?: any
  setOnlineCallsModalOpen?: any
}

interface Slot {
  booked: any
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

interface SlotsApiResponse {
  success: boolean
  message: string
  data: { day_id: string; slots: Slot[] }
}

const VideosCallsModal: React.FC<OnlineCallsModalProps> = ({
  open,
  onClose,
  shorlistedPmas,
  siteVisitshorlistedPmas,
  mainSiteVisitVideoCalls,
  defaultmultiselect,
  types,
  componentTypes,
  calanderReschedualData
}) => {
  const theme = useTheme()
  const [dayId, setDayId] = useState('')
  const [finalSelectedSlots, setFinalSelectedSlots] = useState<Slot[]>([])
  const [inviteData, setInviteData] = useState<[]>([])
  const [allPmaids, setAllPmaIds] = useState<[]>([])
  const [slotError, setSlotError] = useState('')

  const [userSelectedSlots, setUserSelectedSlots] = useState<{ selectedIds: string; slotName: string | null }>({
    selectedIds: '',
    slotName: ''
  })

  const { invalidateCache } = useDashboardData()

  const [value, setValues] = useState<Dayjs | null>(dayjs())
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false)
  const tender_id = useSelector((state: any) => state?.rmcOnboarding?.tenderId)
  const queryClient = useQueryClient()

  const {
    control,
    reset,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
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

    setValues(d)
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
    setSlotError('')
    clearErrors('availableSlots')
  }

  const { data: allshortlsitedPmaData } = useQuery<ShortlistedPmaResponse, Error>({
    queryKey: ['shortlisted', tender_id],
    queryFn: () => shortlistedPmas(tender_id),
    enabled: types === 'fromDashboard' || componentTypes == 'fromCalender'
  })

  const {
    data: gettingSlotsAndDays,
    isError,
    error
  } = useQuery<SlotsApiResponse, Error>({
    queryKey: ['AvailableSlotsAndDays', value?.format('YYYY-MM-DD')],
    queryFn: () => getSlotsAndDay(value!.format('YYYY-MM-DD')),
    enabled: open && !!value
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

  const videoCallInviteMutation = useMutation({
    mutationFn: ({
      value,
      day_id,
      slot_ids,
      pma_user_ids,
      message,
      tender_id
    }: {
      value: any | string
      day_id: number
      slot_ids: number
      pma_user_ids: number[] | number
      message: string
      tender_id: number
    }) => videoCallsInvite(value, day_id, slot_ids, pma_user_ids, message, tender_id),
    onSuccess: (data: any) => {
      setInviteData(data?.data?.invites)
      toast.success(data?.message || 'Invite sent successfully!')
      reset()

      queryClient.invalidateQueries({
        queryKey: ['shortlistData', tender_id]
      })
      queryClient.invalidateQueries({
        queryKey: ['dashboardDatas']
      })
      queryClient.invalidateQueries({
        queryKey: ['finalAgents']
      })
      invalidateCache()
      setConfirmationModalOpen(true)

      setSlotError('')
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to send invite'

      toast.error(errorMessage)
      console.error('Failed to send invite:', error)
      setSlotError('')
    }
  })

  useEffect(() => {
    const pmaIds = shorlistedPmas?.map((item: { pma_user: { id: any } }) => item.pma_user.id)

    setAllPmaIds(pmaIds)
  }, [shorlistedPmas])

  const handleSendVideoCalls = async (formData: any) => {
    if (!formData.availableSlots) {
      setSlotError('Select the slots')
      setError('availableSlots', { message: 'Select the slots' })

      return
    }

    try {
      await videoCallInviteMutation.mutateAsync({
        value: value!.format('YYYY-MM-DD'),
        day_id: Number(dayId),
        slot_ids: Number(formData.availableSlots),
        pma_user_ids: allPmaids,
        message: formData.additionalNotes,
        tender_id: tender_id
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleSendVideoCall = async (formData: any) => {
    if (!formData.availableSlots) {
      setSlotError('Select the slots')
      setError('availableSlots', { message: 'Select the slots' })

      return
    }

    try {
      await videoCallInviteMutation.mutateAsync({
        value: value!.format('YYYY-MM-DD'),
        day_id: Number(dayId),
        slot_ids: Number(formData.availableSlots),
        pma_user_ids: formData.pmaGuest.map((g: Guest) => g.id),
        message: formData.additionalNotes,
        tender_id: tender_id
      })
    } catch (error) {
      console.error(error)
    }
  }

  const type = 'videoCall'

  const normalizedOptionsRaw = [
    ...(shorlistedPmas || []).map((item: any) => ({
      id: item.pma_user.id,
      pma_number: item.pma_user.pma_number
    })),

    ...(siteVisitshorlistedPmas || []).flatMap(
      (item: any) =>
        item?.siteCompleted?.data?.invites?.map((invite: any) => ({
          id: invite.pma_user_id,
          pma_number: invite.pma_name
        })) || []
    ),

    ...(mainSiteVisitVideoCalls?.data?.invites || [])?.map((invite: any) => ({
      id: invite.pma_user_id,
      pma_number: invite.pma_name
    })),

    // ...(mainSiteVisitVideoCalls || [])?.map((item: any) => ({
    //   id: item?.id,
    //   pma_number: item?.pma_number
    // })),

    ...(Array.isArray(mainSiteVisitVideoCalls)
      ? mainSiteVisitVideoCalls.map((item: any) => ({
          id: item?.id,
          pma_number: item?.pma_number
        }))
      : []),

    ...(allshortlsitedPmaData?.data?.shortlisted_pma_users || [])?.map((pma: any) => {
      return {
        id: pma.id,
        pma_number: pma.pma_number
      }
    }),

    ...(defaultmultiselect ? [defaultmultiselect] : [])
  ]

  const rmcVideoCallSchedual = useMutation({
    mutationFn: ({
      invite_id,
      tender_id,
      value,
      day_id,
      slot_ids,
      message
    }: {
      invite_id: number
      tender_id: number
      value: any | string
      day_id: number
      slot_ids: number
      message: string
    }) => rmcReSchedualAgain(invite_id, tender_id, value, day_id, slot_ids, message),
    onSuccess: (data: any) => {
      toast.success(data?.message || 'Invite sent successfully!')
      reset()
      setConfirmationModalOpen(true)
      setSlotError('')
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to send invite'

      toast.error(errorMessage)
      console.error('Failed to send invite:', error)
      setSlotError('')
    }
  })

  const handleReschedualaModal = async (formData: any) => {
    if (!formData.availableSlots) {
      setSlotError('Select the slots')
      setError('availableSlots', { message: 'Select the slots' })

      return
    }

    try {
      await rmcVideoCallSchedual.mutateAsync({
        invite_id: Number(calanderReschedualData?.invite_Id),
        value: value!.format('YYYY-MM-DD'),
        day_id: Number(dayId),
        slot_ids: Number(formData.availableSlots),
        message: formData.additionalNotes,
        tender_id: tender_id
      })
    } catch (error) {
      console.error(error)
    }
  }

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

      <DialogContent sx={{ px: 3, py: 0 }}>
        <Grid container spacing={6} className='mt-[20px]'>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box
                sx={{
                  '& *': {
                    '&.MuiOutlinedInput-root': {
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#35C0ED !important',
                        borderWidth: '2px !important'
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#35C0ED !important',
                        borderWidth: '2px !important'
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#35C0ED !important',
                        borderWidth: '2px !important'
                      }
                    },
                    '&.MuiInputLabel-root': {
                      color: '#35C0ED !important',
                      '&.Mui-focused': {
                        color: '#35C0ED !important'
                      }
                    }
                  },
                  '& .MuiTextField-root': {
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#35C0ED !important',
                        borderWidth: '2px !important'
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#35C0ED !important',
                        borderWidth: '2px !important'
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#35C0ED !important',
                        borderWidth: '2px !important'
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: '#35C0ED !important',
                      '&.Mui-focused': {
                        color: '#35C0ED !important'
                      }
                    }
                  },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused': {
                      borderColor: '#35C0ED !important',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#35C0ED !important',
                        borderWidth: '2px !important'
                      }
                    },
                    '&:hover': {
                      borderColor: '#35C0ED !important',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#35C0ED !important',
                        borderWidth: '2px !important'
                      }
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#35C0ED !important',
                      borderWidth: '2px !important'
                    }
                  }
                }}
              >
                <DatePicker
                  label='Select date'
                  value={value}
                  onChange={handleDateChange}
                  shouldDisableDate={shouldDisableDate}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      sx: {
                        '& .MuiInputLabel-root': {
                          color: '#35C0ED',
                          '&.Mui-focused': {
                            color: '#35C0ED'
                          }
                        },
                        '& .MuiOutlinedInput-root': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#35C0ED !important'
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'customColors.ligthBlue'
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#35C0ED !important', // ✅ force override
                            borderWidth: 2
                          }
                        }
                      }
                    }
                  }}
                />
              </Box>
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name='availableSlots'
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.availableSlots || !!slotError}>
                  <InputLabel
                    sx={{
                      '&.Mui-focused': {
                        color: 'customColors.ligthBlue',
                        backgroundColor: 'white',
                        padding: '0 4px'
                      },
                      backgroundColor: 'white',
                      padding: '0 4px'
                    }}
                  >
                    Available Slots
                  </InputLabel>
                  <Select
                    {...field}
                    value={field.value || ''}
                    onChange={e => {
                      const value = e.target.value

                      field.onChange(value)
                      handleSlotSelection(value)
                    }}
                    sx={{
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'customColors.ligthBlue'
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'customColors.ligthBlue'
                      }
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          zIndex: 9999,
                          maxHeight: 300,
                          '& .MuiMenuItem-root': {
                            padding: '8px 16px',
                            '&.Mui-selected': {
                              backgroundColor: 'customColors.ligthBlue !important',
                              color: 'white !important',
                              '&:hover': {
                                backgroundColor: 'customColors.ligthBlue !important',
                                color: 'white !important'
                              }
                            },
                            '&:hover': {
                              backgroundColor: 'rgba(53, 192, 237, 0.1)'
                            }
                          }
                        }
                      },
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left'
                      },
                      transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left'
                      }
                    }}
                  >
                    {finalSelectedSlots.map(
                      (item, index) => (
                        console.log(item),
                        (
                          <MenuItem
                            key={index}
                            disabled={item?.booked}
                            value={String(item.id)}
                            className={`${item?.booked ? 'bg-gray-400' : ''} my-2 `}
                          >
                            <span className='my-2'>{item.slot_name}</span>
                          </MenuItem>
                        )
                      )
                    )}
                  </Select>
                  {(errors.availableSlots || slotError) && (
                    <FormHelperText>{errors.availableSlots?.message || slotError}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h6' sx={{ mb: 2, color: '#333', fontWeight: '600' }}>
              Availability Set for
            </Typography>

            <Grid container spacing={2} alignItems='center' sx={{ mb: 2, mt: 6 }}>
              <Grid container spacing={4} alignItems='center' sx={{ mb: 2 }}>
                {gettingSlotsAndDays?.data?.slots?.map(item => {
                  const isSelected = userSelectedSlots?.selectedIds === String(item.id)

                  return (
                    <Grid item xs={12} sm={6} key={item?.id}>
                      <Chip
                        label={
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-start'
                            }}
                          >
                            <Typography variant='body1' fontWeight='bold' sx={{ color: 'white' }}>
                              {item.slot_name.split('from')[0]}
                            </Typography>
                            <Typography sx={{ color: 'white' }} variant='body2'>
                              {item.slot_name.split('from')[1]}
                            </Typography>
                          </Box>
                        }
                        onClick={() => handleSlotSelection(String(item.id))}
                        sx={{
                          backgroundColor: isSelected
                            ? 'customColors.ligthBlue'
                            : theme => theme.colorSchemes.light.palette.customColors.darkGray,
                          color: 'white',
                          '& .MuiChip-label': {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start'
                          },
                          borderRadius: '5px',
                          width: '100%',
                          py: 2,
                          px: 2,
                          cursor: 'pointer',
                          justifyContent: 'flex-start',
                          border: isSelected ? '2px solid' : 'none',
                          borderColor: isSelected ? 'customColors.ligthBlue' : 'transparent'
                        }}
                      />
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 4 }}>
              <Button
                variant='contained'
                sx={{
                  backgroundColor: 'customColors.ligthBlue',
                  '&:hover': { backgroundColor: 'customColors.ligthBlue' }
                }}
              >
                Update Slot
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h6' sx={{ mb: 2, color: '#35C0ED', fontWeight: '600' }}>
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
                  value={field.value || []}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      placeholder='Select guests...'
                      variant='outlined'
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#35C0ED'
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#35C0ED'
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#35C0ED'
                          }
                        }
                      }}
                    />
                  )}
                  renderTags={(value: any[], getTagProps) =>
                    value.map((option, index) => {
                      const { key, ...tagProps } = getTagProps({ index })

                      return (
                        <Chip
                          key={option.id ?? key}
                          {...tagProps}
                          label={option.pma_number}
                          sx={{
                            backgroundColor: '#35C0ED',
                            color: 'white',
                            '& .MuiChip-deleteIcon': { color: 'white' }
                          }}
                        />
                      )
                    })
                  }
                  sx={{
                    "& .MuiAutocomplete-option[aria-selected='true']": {
                      backgroundColor: '#35C0ED',
                      color: 'white'
                    },
                    '& .MuiAutocomplete-option.Mui-focused': {
                      backgroundColor: '#35C0ED',
                      color: 'white'
                    },
                    '& .MuiAutocomplete-option:hover': {
                      backgroundColor: '#35C0ED33', // lighter hover version
                      color: '#000'
                    }
                  }}
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
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'customColors.ligthBlue'
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'customColors.ligthBlue'
                      }
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: 'customColors.ligthBlue'
                    }
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 8, mt: 5 }}>
        {types == 'reschedual' ? (
          <>
            <Button
              variant='contained'
              onClick={handleSubmit(handleReschedualaModal)}
              disabled={videoCallInviteMutation.isPending}
            >
              {videoCallInviteMutation.isPending ? 'Sending...' : 'Reschedual'}
            </Button>
          </>
        ) : (
          <>
            <CustomButton
              variant='contained'
              onClick={handleSubmit(handleSendVideoCalls)}
              disabled={videoCallInviteMutation.isPending}
            >
              {'Send To All Shortlisted Agents'}
            </CustomButton>

            <CustomButton variant='contained' onClick={handleSubmit(handleSendVideoCall)}>
              Send To Selected Agents
            </CustomButton>
          </>
        )}
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
