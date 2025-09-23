'use client'
import React from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  useTheme,
  Divider,
  TextField,
  Button
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import * as v from 'valibot'
import { useMutation } from '@tanstack/react-query'

import { string, pipe, nonEmpty } from 'valibot'

import { useSelector } from 'react-redux'

import { addEMetric, editEMetric } from '@/services/evaluation_matrix/evaluation_matrix'

interface ToolTipModalProps {
  open: boolean
  onClose?: () => void
  title?: string
  types?: 'add' | 'edit' | any
  metrixCategories?: any
  categoryid?: any
  categoryData?: any
}

// ✅ Valibot Schema

export const categorySchema = v.object({
  categoryName: pipe(string(), v.nonEmpty('Category Name is required')),
  weight: v.pipe(v.string(), v.nonEmpty('Weight is required')),
  description: v.pipe(v.string(), nonEmpty('Description is required'))
})

type CategoryFormValues = v.InferOutput<typeof categorySchema>

const AddAndEditCatagoryModal: React.FC<ToolTipModalProps> = ({ open, onClose, types, categoryData }) => {
  const theme = useTheme()

  const rmcData = useSelector((state: any) => state?.rmcOnboarding?.rmcData)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CategoryFormValues>({
    resolver: valibotResolver(categorySchema),
    defaultValues: {
      categoryName: '',
      weight: '',
      description: ''
    }
  })

  React.useEffect(() => {
    if (types === 'edit' && categoryData) {
      reset({
        categoryName: categoryData?.name || '',
        weight: categoryData?.default_weight || '',
        description: categoryData?.description || ''
      })
    } else if (types === 'add') {
      reset({
        categoryName: '',
        weight: '',
        description: ''
      })
    }
  }, [types, categoryData, reset])

  // ✅ Single mutation for both Add & Edit
  const mutation = useMutation({
    mutationFn: (data: CategoryFormValues) => {
      if (types === 'edit') {
        return editEMetric(
          categoryData?.id,
          rmcData?.tender_id,
          data.categoryName,
          data.description,
          Number(data.weight),
          true
        )
      } else {
        return addEMetric(rmcData?.tender_id, data.categoryName, data.description, Number(data.weight), true)
      }
    },
    onSuccess: res => {
      console.log(`${types === 'edit' ? 'Metric updated' : 'Metric added'} successfully:`, res)
      onClose?.()
    },
    onError: err => {
      console.error(`Error ${types === 'edit' ? 'updating' : 'adding'} metric:`, err)
    }
  })

  const onSubmit = (data: CategoryFormValues) => {
    mutation.mutate(data)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: '400px',
          paddingX: '24px',
          width: '1200px'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1, px: 3, pt: 3 }}>
        <Box display='flex' justifyContent='space-between' alignItems='flex-start' sx={{ paddingTop: '16px' }}>
          <Typography
            variant='h4'
            sx={{
              color: theme.colorSchemes.light.palette.customColors.darkBlue,
              fontSize: '1.7rem'
            }}
          >
            {types === 'edit' ? 'Edit Category' : 'Add Category'}
          </Typography>

          <IconButton onClick={onClose} sx={{ color: 'customColors.textGray' }}>
            <i className='ri-close-line' />
          </IconButton>
        </Box>
        <Typography
          variant='h5'
          sx={{
            color: theme.colorSchemes.light.palette.customColors.darkGray1,
            fontSize: '12px',
            marginTop: '10px'
          }}
        >
          Add your category here
        </Typography>
        <Box sx={{ paddingY: '12px' }}>
          <Divider />
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 3, mt: 6 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display='flex' flexDirection='column' gap={3}>
            <Controller
              name='categoryName'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Category Name'
                  variant='outlined'
                  error={!!errors.categoryName}
                  helperText={errors.categoryName?.message as string}
                />
              )}
            />

            <Controller
              name='weight'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ marginTop: '14px' }}
                  fullWidth
                  type='number'
                  inputProps={{ min: 0.5, max: 1.5, step: 0.25 }}
                  label='Default weight'
                  variant='outlined'
                  error={!!errors.weight}
                  helperText={errors.weight?.message as string}
                />
              )}
            />

            <Controller
              name='description'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ marginTop: '22px' }}
                  fullWidth
                  label='Category Description'
                  multiline
                  rows={4}
                  variant='outlined'
                  error={!!errors.description}
                  helperText={errors.description?.message as string}
                />
              )}
            />
          </Box>

          <div className='flex justify-end items-end gap-x-[12px] mt-[34px]'>
            <Button
              onClick={onClose}
              variant='outlined'
              className='bg-white gap-x-3 border-[buttonPrimary] py-[10px] px-7'
            >
              Cancel
            </Button>

            {types === 'edit' ? (
              <div className='flex justify-end mt-8'>
                <Button
                  type='submit'
                  variant='contained'
                  className='bg-buttonPrimary gap-x-3 py-3 px-7'
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? 'Saving...' : 'Save'}
                </Button>
              </div>
            ) : (
              <div className='flex justify-end mt-8'>
                <Button
                  type='submit'
                  variant='contained'
                  className='bg-buttonPrimary gap-x-3 py-3 px-9'
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? 'Adding...' : 'Add'}
                </Button>
              </div>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddAndEditCatagoryModal
