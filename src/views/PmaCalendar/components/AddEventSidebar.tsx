import { useState, useEffect, useCallback } from 'react'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'

import { useForm, Controller } from 'react-hook-form'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import type { AddEventSidebarType, AddEventType } from '@/types/apps/calendarTypes'

import { addEvent, deleteEvent, updateEvent, selectedEvent, filterEvents } from '@/redux-store/slices/calendar'

interface DefaultStateType {
  title: string
  description: string
  endDate: Date
  startDate: Date
}

const defaultState: DefaultStateType = {
  title: '',
  description: '',
  endDate: new Date(),
  startDate: new Date()
}

const AddEventSidebar = (props: AddEventSidebarType) => {
  const { calendarStore, dispatch, addEventSidebarOpen, handleAddEventSidebarToggle } = props

  const [values, setValues] = useState<DefaultStateType>(defaultState)

  const {
    control,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { title: '' } })

  const resetToStoredValues = useCallback(() => {
    if (calendarStore.selectedEvent !== null) {
      const event = calendarStore.selectedEvent

      setValue('title', event.title || '')
      setValues({
        title: event.title || '',
        description: event.extendedProps?.description || '',
        endDate: new Date(),
        startDate: new Date()
      })
    }
  }, [setValue, calendarStore.selectedEvent])

  const resetToEmptyValues = useCallback(() => {
    setValue('title', '')
    setValues(defaultState)
  }, [setValue])

  const handleModalClose = () => {
    setValues(defaultState)
    clearErrors()
    dispatch(selectedEvent(null))
    handleAddEventSidebarToggle()
  }

  const onSubmit = (data: { title: string }) => {
    const modifiedEvent: AddEventType = {
      title: data.title,
      start: values.startDate,
      end: values.endDate,
      allDay: true,
      extendedProps: {
        calendar: 'Site Visits',
        description: values.description
      }
    }

    if (
      calendarStore.selectedEvent !== null &&
      calendarStore.selectedEvent.title &&
      calendarStore.selectedEvent.title.length
    ) {
      dispatch(updateEvent({ ...modifiedEvent, id: calendarStore.selectedEvent.id }))
    } else {
      dispatch(addEvent(modifiedEvent))
    }

    dispatch(filterEvents())
    handleModalClose()
  }

  const handleDeleteButtonClick = () => {
    if (calendarStore.selectedEvent !== null) {
      dispatch(deleteEvent(calendarStore.selectedEvent.id))
      dispatch(filterEvents())
      handleModalClose()
    }
  }

  const RenderModalFooter = () => {
    return (
      <Box className='flex items-center gap-2'>
        <Button variant='outlined' onClick={handleModalClose}>
          Reset
        </Button>
        <Button variant='contained' type='submit'>
          {calendarStore.selectedEvent !== null &&
          calendarStore.selectedEvent.title &&
          calendarStore.selectedEvent.title.length
            ? 'Update'
            : 'Add'}
        </Button>
      </Box>
    )
  }

  useEffect(() => {
    if (addEventSidebarOpen) {
      if (calendarStore.selectedEvent !== null) {
        resetToStoredValues()
      } else {
        resetToEmptyValues()
      }
    }
  }, [addEventSidebarOpen, resetToStoredValues, resetToEmptyValues, calendarStore.selectedEvent])

  const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 24,
    p: 4
  }

  return (
    <Modal
      open={addEventSidebarOpen}
      onClose={handleModalClose}
      aria-labelledby='add-event-modal'
      aria-describedby='add-event-modal-description'
    >
      <Box sx={modalStyle}>
        <Box className='flex justify-between items-center mbe-4'>
          <Typography variant='h5'>
            {calendarStore.selectedEvent &&
            calendarStore.selectedEvent.title &&
            calendarStore.selectedEvent.title.length
              ? 'Update Event'
              : 'Add Event'}
          </Typography>
          {calendarStore.selectedEvent &&
          calendarStore.selectedEvent.title &&
          calendarStore.selectedEvent.title.length ? (
            <Box className='flex items-center' sx={{ gap: calendarStore.selectedEvent !== null ? 1 : 0 }}>
              <IconButton size='small' onClick={handleDeleteButtonClick}>
                <i className='ri-delete-bin-line text-2xl' />
              </IconButton>
              <IconButton size='small' onClick={handleModalClose}>
                <i className='ri-close-line text-2xl' />
              </IconButton>
            </Box>
          ) : (
            <IconButton size='small' onClick={handleModalClose}>
              <i className='ri-close-line text-2xl' />
            </IconButton>
          )}
        </Box>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <FormControl fullWidth className='mbe-5'>
            <Controller
              name='title'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  label='Title'
                  value={value}
                  onChange={onChange}
                  {...(errors.title && { error: true, helperText: 'This field is required' })}
                />
              )}
            />
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className='mbe-5'>
              <DatePicker
                label='Start Date'
                value={values.startDate}
                onChange={(date: Date | null) => date !== null && setValues({ ...values, startDate: date })}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: false
                  }
                }}
              />
            </div>
            <div className='mbe-5'>
              <DatePicker
                label='End Date'
                value={values.endDate}
                onChange={(date: Date | null) => date !== null && setValues({ ...values, endDate: date })}
                minDate={values.startDate}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: false
                  }
                }}
              />
            </div>
          </LocalizationProvider>

          <TextField
            rows={4}
            multiline
            fullWidth
            className='mbe-5'
            label='Description'
            id='event-description'
            value={values.description}
            onChange={e => setValues({ ...values, description: e.target.value })}
          />

          <div className='flex items-center justify-end'>
            <RenderModalFooter />
          </div>
        </form>
      </Box>
    </Modal>
  )
}

export default AddEventSidebar
