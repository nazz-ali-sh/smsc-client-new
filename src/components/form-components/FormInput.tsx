'use client'

import React, { useState } from 'react'

import { Controller } from 'react-hook-form'
import type { FieldValues } from 'react-hook-form'
import type { TextFieldProps } from '@mui/material'
import { TextField, Box } from '@mui/material'

const FormInput = <T extends FieldValues = FieldValues>({
  name,
  control,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  fullWidth = true,
  multiline = false,
  rows,
  helperText,
  error = false,
  variant = 'outlined',
  size = 'medium',
  className,
  sx,
  icon,
  onIconClick,
  onIconHover,
  onIconLeave,
  showPasswordToggle = false,
  ...textFieldProps
}: FormInputProps<T> & Omit<TextFieldProps, 'name' | 'control'>) => {
  const background = sx?.background || 'transparent'
  const restSx = sx ? { ...sx } : {}
  const [showPassword, setShowPassword] = useState(false)

  delete restSx.background

  const isPasswordField = type === 'password'
  const inputType = isPasswordField && showPasswordToggle ? (showPassword ? 'text' : 'password') : type

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => (
        <Box sx={{ position: 'relative' }}>
          <TextField
            {...field}
            {...textFieldProps}
            type={inputType}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            fullWidth={fullWidth}
            multiline={multiline}
            rows={rows}
            variant={variant}
            size={size}
            className={className}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '6px',
                paddingRight: icon ? '60px' : '14px',
                backgroundColor: background,
                '& fieldset': {
                  borderColor: '#d9d9d9'
                },
                '&:hover fieldset': {
                  borderColor: '#bfbfbf',
                  border: '1px solid #35C0ED'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#35C0ED',
                  border: '1px solid #35C0ED'
                },
                '& input::placeholder': {
                  color: '#6C6C6C',
                  opacity: field.value ? 0 : 1,
                  fontSize: '14px',
                  transition: 'opacity 0.2s ease'
                }
              },
              '& input:-webkit-autofill': {
                boxShadow: '0 0 0 100px white inset !important',
                WebkitTextFillColor: '#000',
                caretColor: '#000'
              },
              '& input:-webkit-autofill:focus': {
                boxShadow: '0 0 0 100px white inset !important'
              },
    '& .MuiFormHelperText-root': {
  marginLeft: '2px',  
  marginTop: '6px',
  fontSize: '12px',
  lineHeight: 1.4,
},
              ...restSx
            }}
            error={error || !!fieldError}
            helperText={fieldError?.message || helperText}
            value={field?.value || ''}
            onChange={e => field.onChange(e.target.value)}
            onBlur={field.onBlur}
            InputLabelProps={{
              shrink: false
            }}
          />
          {(icon || (isPasswordField && showPasswordToggle)) && (
            <Box
              onClick={event => {
                if (isPasswordField && showPasswordToggle) {
                  handlePasswordToggle()
                } else {
                  onIconClick?.(event)
                }
              }}
              onMouseEnter={event => onIconHover?.(event)}
              onMouseLeave={onIconLeave}
              sx={{
                position: 'absolute',
                right: '1px',
                top: fieldError ? '1px' : '1px',
                backgroundColor: '#f5f5f5',
                borderRadius: '0 6px 6px 0',
                width: '60px',
                height: '53px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                boxShadow: 'none',
                transition: 'top 0.2s ease, background-color 0.2s ease',
                cursor: onIconClick || onIconHover || (isPasswordField && showPasswordToggle) ? 'pointer' : 'default',
                '&:hover':
                  onIconClick || onIconHover || (isPasswordField && showPasswordToggle)
                    ? {
                        backgroundColor: '#e5e5e5'
                      }
                    : {}
              }}
            >
              {isPasswordField && showPasswordToggle ? (
                <i 
                  className={showPassword ? 'ri-eye-line' : 'ri-eye-off-line'} 
                  style={{ fontSize: '16px', color: '#6B7280' }}
                />
              ) : (
                icon
              )}
            </Box>
          )}
        </Box>
      )}
    />
  )
}

export default FormInput
