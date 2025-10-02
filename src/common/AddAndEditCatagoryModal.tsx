'use client'
import React from 'react'

import { Dialog, DialogTitle, DialogContent, Typography, Box, IconButton, useTheme, Divider } from '@mui/material'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import * as v from 'valibot'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { string, pipe, nonEmpty } from 'valibot'
import { useSelector } from 'react-redux'

import { addEMetric, editEMetric } from '@/services/evaluation_matrix/evaluation_matrix'
import FormInput from '@/components/form-components/FormInput'
import CustomButton from './CustomButton'

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
  const queryClient = useQueryClient()
  const tenderId = useSelector((state: any) => state?.rmcOnboarding?.tenderId)

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
        weight: String(categoryData?.default_weight) || '',
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

  const mutation = useMutation({
    mutationFn: (data: CategoryFormValues) => {
      if (types === 'edit') {
        return editEMetric(categoryData?.id, tenderId, data.categoryName, data.description, Number(data.weight), true)
      } else {
        return addEMetric(tenderId, data.categoryName, data.description, Number(data.weight), true)
      }
    },
    onSuccess: res => {
      console.log(`${types === 'edit' ? 'Metric updated' : 'Metric added'} successfully:`, res)
      queryClient.invalidateQueries({ queryKey: ['metrix', tenderId] })
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
          sx={{
            color: theme.colorSchemes.light.palette.customColors.darkGray1,
            fontSize: '15px',
            marginTop: '10px',
            fontWeight: '400'
          }}
        >
          Add your category here
        </Typography>
        <Box sx={{ paddingY: '12px' }}>
          <Divider />
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display='flex' flexDirection='column' gap={3}>
            <FormInput
              name='categoryName'
              control={control}
              label='Category Name'
              type='text'
              error={!!errors.categoryName}
              helperText={errors.categoryName?.message as string}
              inputProps={{ maxLength: 40 }}
              sx={{ marginTop: '14px' }}
            />

            <FormInput
              name='weight'
              control={control}
              label='Default Weightage'
              type='number'
              inputProps={{ min: 0.5, max: 1.5, step: 0.25 }}
              sx={{ marginTop: '14px' }}
            />

            <FormInput
              name='description'
              control={control}
              label='Category Description'
              type='text'
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description?.message as string}
              inputProps={{ maxLength: 60 }}
              sx={{ marginTop: '22px' }}
            />
          </Box>

          <div className='flex justify-end items-end gap-x-[12px] mt-[34px]'>
            <CustomButton onClick={onClose} variant='outlined'>
              Cancel
            </CustomButton>

            {types === 'edit' ? (
              <div className='flex justify-end mt-8'>
                <CustomButton type='submit' variant='contained' disabled={mutation.isPending}>
                  {mutation.isPending ? 'Saving...' : 'Save'}
                </CustomButton>
              </div>
            ) : (
              <div className='flex justify-end mt-8'>
                <CustomButton type='submit' variant='contained' disabled={mutation.isPending}>
                  {mutation.isPending ? 'Adding...' : 'Add'}
                </CustomButton>
              </div>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddAndEditCatagoryModal
