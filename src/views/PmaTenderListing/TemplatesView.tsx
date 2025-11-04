'use client'

import React, { useState, useEffect } from 'react'

import { Box, Typography, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

import CustomButton from '@/common/CustomButton'
import { usePmaTemplates } from '@/hooks/usePmaTemplates'
import { saveTemplate, updateTemplate, deleteTemplate } from '@/services/pma-tender-listing-apis/pma-templates-api'
import TemplateFormModal from './components/TemplateFormModal'
import type { PmaTemplateType, SaveTemplatePayload } from './types'

const TemplatesView = () => {
  const { pmaTemplatesData, isPmaTemplatesLoading, invalidatePmaTemplatesCache } = usePmaTemplates()
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [templateName, setTemplateName] = useState('')
  const [templateDescription, setTemplateDescription] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const maxCharacters = 3500

  const templates = pmaTemplatesData?.data?.templates || []

  const saveTemplateMutation = useMutation({
    mutationFn: saveTemplate,
    onSuccess: (response: any) => {
      toast.success(response?.message)
      setIsModalOpen(false)
      invalidatePmaTemplatesCache()
      const newTemplateId = response?.data?.id
      const newTemplateMessage = response?.data?.message
      const newTemplateName = response?.data?.name

      if (newTemplateId) {
        setSelectedTemplate(String(newTemplateId))
        setTemplateName(newTemplateName || '')
        setTemplateDescription(newTemplateMessage || '')
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
      invalidatePmaTemplatesCache()
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to update template. Please try again.'

      toast.error(errorMessage)
    }
  })

  const deleteTemplateMutation = useMutation({
    mutationFn: (id: number) => deleteTemplate(id),
    onSuccess: (response: any) => {
      toast.success(response?.message || 'Template deleted successfully')
      invalidatePmaTemplatesCache()

      const remainingTemplates = templates.filter(
        (template: PmaTemplateType) => String(template?.id) !== selectedTemplate
      )

      if (remainingTemplates?.length > 0) {
        const firstTemplate = remainingTemplates[0]

        setSelectedTemplate(String(firstTemplate?.id))
        setTemplateName(firstTemplate?.name)
        setTemplateDescription(firstTemplate?.message)
      } else {
        setSelectedTemplate('')
        setTemplateName('')
        setTemplateDescription('')
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to delete template. Please try again.'

      toast.error(errorMessage)
    }
  })

  useEffect(() => {
    if (templates?.length > 0 && !selectedTemplate) {
      const firstTemplate = templates[0]

      setSelectedTemplate(String(firstTemplate?.id))
      setTemplateName(firstTemplate?.name)
      setTemplateDescription(firstTemplate?.message)
    }
  }, [templates, selectedTemplate])

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    const selectedTemplateData = templates.find((template: PmaTemplateType) => String(template.id) === templateId)

    if (selectedTemplateData) {
      setTemplateName(selectedTemplateData.name)
      setTemplateDescription(selectedTemplateData.message)
      setIsEditMode(false)
    }
  }

  const handleAddNewTemplate = () => {
    setIsModalOpen(true)
  }

  const handleEditTemplate = () => {
    setIsEditMode(true)
  }

  const handleCancelEdit = () => {
    const selectedTemplateData = templates.find((template: PmaTemplateType) => String(template.id) === selectedTemplate)

    if (selectedTemplateData) {
      setTemplateName(selectedTemplateData.name)
      setTemplateDescription(selectedTemplateData.message)
    }

    setIsEditMode(false)
  }

  const handleSaveChanges = () => {
    if (!templateName.trim()) {
      toast.error('Please enter a template name')

      return
    }

    if (!templateDescription.trim()) {
      toast.error('Please enter a template description')

      return
    }

    const selectedTemplateData = templates.find((template: PmaTemplateType) => String(template.id) === selectedTemplate)

    if (!selectedTemplateData) {
      toast.error('Template not found')

      return
    }

    const payload = {
      name: templateName,
      message: templateDescription
    }

    updateTemplateMutation.mutate({
      id: selectedTemplateData.id,
      payload
    })
  }

  const handleDeleteTemplate = () => {
    const selectedTemplateData = templates?.find(
      (template: PmaTemplateType) => String(template?.id) === selectedTemplate
    )

    if (!selectedTemplateData) {
      toast.error('Template not found')

      return
    }

    deleteTemplateMutation.mutate(selectedTemplateData.id)
  }

  const handleTemplateSave = (data: SaveTemplatePayload) => {
    saveTemplateMutation.mutate(data)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: 4,
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <Typography sx={{ fontSize: '24px', fontWeight: 600, color: '#1F4E8D' }}>Saved Templates</Typography>
          <CustomButton variant='contained' onClick={handleAddNewTemplate}>
            Add New Template
          </CustomButton>
        </Box>

        {templates?.length === 0 && !isPmaTemplatesLoading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 8,
              textAlign: 'center'
            }}
          >
            <Typography sx={{ fontSize: '16px', color: '#9CA3AF' }}>
              No templates available. Click "Add New Template" to create one.
            </Typography>
          </Box>
        )}

        {templates?.length > 0 && (
          <>
            <div className='flex justify-between items-center mt-10'>
              {!isEditMode ? (
                <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#374151', marginBottom: 1 }}>
                  {templateName}
                </Typography>
              ) : (
                <Box sx={{ marginBottom: 3, width: '300px', marginRight: 2 }}>
                  <TextField
                    fullWidth
                    label='Template Name'
                    value={templateName}
                    onChange={e => setTemplateName(e.target.value)}
                    disabled={updateTemplateMutation.isPending}
                    size='small'
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
                      }
                    }}
                  />
                </Box>
              )}
              <Box sx={{ marginBottom: 3, width: '300px' }}>
                <FormControl fullWidth size='small'>
                  <InputLabel
                    id='template-select-label'
                    sx={{
                      color: '#26C6F9',
                      '&.Mui-focused': {
                        color: '#26C6F9'
                      }
                    }}
                  >
                    Template Name
                  </InputLabel>
                  <Select
                    labelId='template-select-label'
                    id='template-select'
                    value={selectedTemplate}
                    onChange={e => handleTemplateSelect(e.target.value)}
                    label='Template Name'
                    disabled={isPmaTemplatesLoading || isEditMode}
                    sx={{
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
            </div>

            {selectedTemplate && (
              <>
                <Box
                  sx={{
                    borderRadius: '8px',
                    padding: 2,
                    marginBottom: 2,
                    position: 'relative'
                  }}
                >
                  <TextField
                    multiline
                    rows={12}
                    fullWidth
                    placeholder='Template description'
                    value={templateDescription}
                    onChange={e => {
                      if (e.target.value.length <= maxCharacters) {
                        setTemplateDescription(e.target.value)
                      }
                    }}
                    disabled={!isEditMode || updateTemplateMutation.isPending}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'transparent'
                        },
                        '&:hover fieldset': {
                          borderColor: 'transparent'
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'transparent'
                        }
                      },
                      '& .MuiInputBase-input::placeholder': {
                        color: '#9CA3AF',
                        opacity: 1
                      }
                    }}
                  />
                  {isEditMode && (
                    <Typography
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 16,
                        color: '#9CA3AF',
                        fontSize: '12px'
                      }}
                    >
                      {templateDescription.length}/{maxCharacters} Characters
                    </Typography>
                  )}
                </Box>

                {isEditMode && (
                  <Typography
                    sx={{
                      color: '#EF4444',
                      fontSize: '12px',
                      marginBottom: 3,
                      fontStyle: 'italic'
                    }}
                  >
                    Please do not include your company name, email address, phone number or website. Breaching this may
                    result in account suspension.
                  </Typography>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  {!isEditMode ? (
                    <>
                      <CustomButton
                        variant='outlined'
                        onClick={handleDeleteTemplate}
                        disabled={deleteTemplateMutation.isPending}
                        sx={{
                          borderColor: '#EF4444',
                          color: '#EF4444',
                          '&:hover': {
                            borderColor: '#DC2626',
                            backgroundColor: '#FEE2E2'
                          }
                        }}
                      >
                        {deleteTemplateMutation.isPending ? 'Deleting...' : 'Delete Template'}
                      </CustomButton>
                      <CustomButton variant='contained' onClick={handleEditTemplate}>
                        Edit Template
                      </CustomButton>
                    </>
                  ) : (
                    <>
                      <CustomButton
                        variant='outlined'
                        onClick={handleCancelEdit}
                        disabled={updateTemplateMutation.isPending}
                      >
                        Cancel
                      </CustomButton>
                      <CustomButton
                        variant='contained'
                        onClick={handleSaveChanges}
                        disabled={updateTemplateMutation.isPending}
                      >
                        {updateTemplateMutation.isPending ? 'Saving...' : 'Save Changes'}
                      </CustomButton>
                    </>
                  )}
                </Box>
              </>
            )}
          </>
        )}
      </Box>

      <TemplateFormModal
        isOpen={isModalOpen}
        handleClose={handleModalClose}
        onSave={handleTemplateSave}
        isLoading={saveTemplateMutation.isPending}
      />
    </Box>
  )
}

export default TemplatesView
