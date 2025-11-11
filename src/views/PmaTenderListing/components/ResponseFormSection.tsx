'use client'

import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

import { Box, Typography, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material'

import CustomButton from '@/common/CustomButton'
import { iconClass } from '@/constants/styles'
import { usePmaTemplates } from '@/hooks/usePmaTemplates'
import { saveTemplate, updateTemplate } from '@/services/pma-tender-listing-apis/pma-templates-api'
import AddTemplateModal from './AddTemplateModal'
import type { TenderId, PmaTemplateType, SaveTemplatePayload } from '../types'

const ResponseFormSection = ({ tenderId }: TenderId) => {
  const router = useRouter()
  const { pmaTemplatesData, isPmaTemplatesLoading, invalidatePmaTemplatesCache } = usePmaTemplates()
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [responseText, setResponseText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isTextareaDisabled, setIsTextareaDisabled] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const maxCharacters = 3500

  const templates = pmaTemplatesData?.data?.templates || []

  React.useEffect(() => {
    const savedResponse = localStorage.getItem('template_response')
    const savedTemplate = localStorage.getItem('selected_template')

    if (savedResponse) {
      setResponseText(savedResponse)
    }

    if (savedTemplate) {
      setSelectedTemplate(savedTemplate)

      if (savedTemplate !== '') {
        setIsTextareaDisabled(true)
      }
    }
  }, [])

  const saveTemplateMutation = useMutation({
    mutationFn: saveTemplate,
    onSuccess: (response: any) => {
      toast.success(response?.message)
      setIsModalOpen(false)
      setIsEditMode(false)
      invalidatePmaTemplatesCache()
      const newTemplateId = response?.data?.id
      const newTemplateMessage = response?.data?.message

      if (newTemplateId) {
        setSelectedTemplate(String(newTemplateId))
        setResponseText(newTemplateMessage || '')
        setIsTextareaDisabled(true)
        localStorage.setItem('selected_template', String(newTemplateId))
        localStorage.setItem('template_response', newTemplateMessage || '')
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to save template. Please try again.'

      toast.error(errorMessage)
    }
  })

  const updateTemplateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: SaveTemplatePayload }) => updateTemplate(id, payload),
    onSuccess: (response: any) => {
      toast.success(response?.message)
      setIsEditMode(false)
      setIsTextareaDisabled(true)
      invalidatePmaTemplatesCache()
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to update template. Please try again.'

      toast.error(errorMessage)
    }
  })

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    localStorage.setItem('selected_template', templateId)

    const selectedTemplateData = templates.find((template: PmaTemplateType) => String(template.id) === templateId)

    if (selectedTemplateData) {
      setResponseText(selectedTemplateData.message)
      setIsTextareaDisabled(true)
      localStorage.setItem('template_response', selectedTemplateData.message)
    }
  }

  const handleEditTemplate = () => {
    setIsTextareaDisabled(false)
    setIsEditMode(true)
  }

  const handleSaveEdit = () => {
    if (!responseText.trim()) {
      toast.error('Please enter a response message before saving')

      return
    }

    const selectedTemplateData = templates.find((template: PmaTemplateType) => String(template.id) === selectedTemplate)

    if (!selectedTemplateData) {
      toast.error('Template not found')

      return
    }

    const payload = {
      name: selectedTemplateData.name,
      message: responseText
    }

    updateTemplateMutation.mutate({
      id: selectedTemplateData.id,
      payload
    })
  }

  const handleCancelEdit = () => {
    const selectedTemplateData = templates?.find(
      (template: PmaTemplateType) => String(template?.id) === selectedTemplate
    )

    if (selectedTemplateData) {
      setResponseText(selectedTemplateData?.message)
      localStorage.setItem('template_response', selectedTemplateData?.message)
    }

    setIsTextareaDisabled(true)
    setIsEditMode(false)
  }

  const handleSaveTemplate = () => {
    setIsModalOpen(true)
  }

  const handleTemplateSave = (data: SaveTemplatePayload) => {
    saveTemplateMutation.mutate(data)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleNext = () => {
    if (!responseText.trim()) {
      toast.error('Please enter a response message before proceeding')

      return
    }

    if (tenderId) {
      localStorage.setItem('template_response', responseText)
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
            disabled={isTextareaDisabled}
            onChange={e => {
              if (e.target.value.length <= maxCharacters) {
                setResponseText(e.target.value)
                localStorage.setItem('template_response', e.target.value)
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
              {selectedTemplate && !isEditMode && (
                <Box sx={iconClass} onClick={handleEditTemplate}>
                  <i className='ri-edit-line' />
                  <span>Edit Template</span>
                </Box>
              )}
              {isEditMode && (
                <>
                  <Box sx={iconClass} onClick={handleCancelEdit}>
                    <i className='ri-close-line' />
                    <span>Cancel</span>
                  </Box>
                  <Box sx={iconClass} onClick={handleSaveEdit}>
                    <i className='ri-check-line' />
                    <span>Save</span>
                  </Box>
                </>
              )}
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

      <AddTemplateModal
        isOpen={isModalOpen}
        handleClose={handleModalClose}
        onSave={handleTemplateSave}
        isLoading={saveTemplateMutation.isPending}
        initialMessage={responseText}
        responseMessage={responseText}
      />
    </Box>
  )
}

export default ResponseFormSection
