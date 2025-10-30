'use client'

import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { toast } from 'react-toastify'

import { Box, Typography, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material'

import CustomButton from '@/common/CustomButton'
import { iconClass } from '@/constants/styles'
import { usePmaTemplates } from '@/hooks/usePmaTemplates'
import type { TenderId, PmaTemplateType } from '../types'

const ResponseFormSection = ({ tenderId }: TenderId) => {
  const router = useRouter()
  const { pmaTemplatesData, isPmaTemplatesLoading } = usePmaTemplates()
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [responseText, setResponseText] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const maxCharacters = 3500

  const templates = pmaTemplatesData?.data?.templates || []

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    const selectedTemplateData = templates.find((template: PmaTemplateType) => String(template.id) === templateId)

    if (selectedTemplateData) {
      setResponseText(selectedTemplateData.message)
      setIsEditing(false)
    }
  }

  const handleEditTemplate = () => {
    setIsEditing(true)
  }

  const handleSaveTemplate = () => {
    if (!responseText.trim()) {
      toast.error('Please enter a response message before saving')

      return
    }

    localStorage.setItem('template_response', responseText)
    setIsEditing(false)
  }

  const handleNext = () => {
    if (isEditing) {
      toast.error('Please save your response as template before proceeding to the next')

      return
    }

    if (!responseText.trim()) {
      toast.error('Please enter a response message before proceeding')

      return
    }

    if (tenderId) {
      localStorage.setItem('template_response', responseText)
      setIsEditing(false)
      router.push(`/tender-quote/${tenderId}`)
    }
  }

  return (
    <Box sx={{ marginTop: 5 }}>
      <Box sx={{ overflow: 'hidden' }}>
        <Box sx={{ paddingY: '26px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 600, color: '#1F4E8D', fontSize: '18px' }}>Response</Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FormControl sx={{ minWidth: 220 }} size='small'>
                <InputLabel
                  id='template-select-label'
                  sx={{
                    color: '#26C6F9',
                    '&.Mui-focused': {
                      color: '#26C6F9'
                    }
                  }}
                >
                  Select Template
                </InputLabel>
                <Select
                  labelId='template-select-label'
                  id='template-select'
                  value={selectedTemplate}
                  onChange={e => handleTemplateSelect(e.target.value)}
                  label='Select Template'
                  disabled={isPmaTemplatesLoading}
                  sx={{
                    width: '300px',
                    backgroundColor: '#fff',
                    color: '#26C6F9 !important',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#26C6F9 !important'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#26C6F9 !important'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#26C6F9 !important'
                    },
                    '& .MuiSelect-select': {
                      color: '#26C6F9 !important'
                    },
                    '& .MuiSelect-icon': {
                      color: '#26C6F9 !important'
                    }
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        '& .MuiMenuItem-root': {
                          color: '#26C6F9 !important',
                          paddingY: '10px',
                          '&:hover': {
                            backgroundColor: '#26C6F93D !important',
                            color: '#26C6F9 !important'
                          },
                          '&.Mui-selected': {
                            backgroundColor: '#26C6F93D !important',
                            color: '#26C6F9 !important',
                            '&:hover': {
                              backgroundColor: '#26C6F93D !important',
                              color: '#26C6F9 !important'
                            }
                          }
                        }
                      }
                    }
                  }}
                >
                  {templates?.length > 0 ? (
                    templates?.map((template: PmaTemplateType) => (
                      <MenuItem key={template.id} value={String(template.id)}>
                        {template.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value='' disabled>
                      {isPmaTemplatesLoading ? 'Loading templates...' : 'No templates available'}
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>

        <Box>
          <TextField
            multiline
            rows={16}
            fullWidth
            placeholder='Type Here'
            value={responseText}
            disabled={!isEditing}
            onChange={e => {
              if (e.target.value.length <= maxCharacters) {
                setResponseText(e.target.value)
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#E5E7EB'
                },
                '&:hover fieldset': {
                  borderColor: '#35C0ED'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#35C0ED'
                }
              },
              '& .MuiInputBase-input::placeholder': {
                color: '#9CA3AF',
                opacity: 1
              }
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
            <Box sx={{ display: 'flex', gap: 6 }}>
              <Box sx={iconClass} onClick={handleSaveTemplate}>
                <i className='ri-save-line' />
                <span>Save As New Template</span>
              </Box>
              <Box sx={iconClass} onClick={handleEditTemplate}>
                <i className='ri-edit-line' />
                <span>Edit Template</span>
              </Box>
            </Box>

            <Typography sx={{ color: '#9CA3AF', fontSize: '14px' }}>
              {responseText.length}/{maxCharacters} Characters
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
            <CustomButton variant='contained' endIcon={<i className='ri-arrow-right-line' />} onClick={handleNext}>
              Next
            </CustomButton>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ResponseFormSection
