'use client'

import React from 'react'

import { Controller } from 'react-hook-form'
import type { FieldValues } from 'react-hook-form'
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import type { SelectProps } from '@mui/material'

const FormSelect = <T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  options,
  placeholder,
  required = false,
  disabled = false,
  fullWidth = true,
  variant = 'outlined',
  size = 'medium',
  className,
  sx,
  ...selectProps
}: FormSelectProps<T> & Omit<SelectProps, 'name' | 'control'>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => (
        <FormControl
          fullWidth={fullWidth}
          error={!!fieldError}
          required={required}
          sx={{
            '& .MuiInputLabel-root': {
              color: '#6C6C6C',
              fontSize: '14px'
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#35C0ED'
            }
          }}
        >
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select
            {...field}
            {...selectProps}
            labelId={`${name}-label`}
            label={label}
            value={field.value || ''}
            onChange={field.onChange}
            onBlur={field.onBlur}
            disabled={disabled}
            variant={variant}
            size={size}
            className={className}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                  overflow: 'auto'
                }
              },
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left'
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left'
              },
              disableAutoFocusItem: true,
              variant: 'menu'
            }}
            sx={{
              borderRadius: '6px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d9d9d9'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#bfbfbf'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#35C0ED'
              },
              '& .MuiSelect-select': {
                color: field.value ? 'inherit' : '#6C6C6C'
              },
              ...sx
            }}
          >
            {placeholder && (
              <MenuItem value='' disabled>
                {placeholder}
              </MenuItem>
            )}
            {options.map(option => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: '#26C6F929 !important',
                    color: '#26C6F9 !important'
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: '#26C6F929 !important'
                  }
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  )
}

export default FormSelect
