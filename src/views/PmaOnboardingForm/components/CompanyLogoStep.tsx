'use client'

import { useState } from 'react'

import { useDropzone } from 'react-dropzone'
import { Card, CardContent, CardHeader, Typography, List, ListItem, IconButton, Button, Box, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useDispatch } from 'react-redux'

import { updateCompanyLogo, setCurrentStep } from '@/redux-store/slices/pmaOnboardingFormSlice'

interface Props {
  defaultValues?: {
    logoFile?: File
  }
  onBack: () => void
}

const Dropzone = styled(Box)(({ theme }) => ({
  '& .dropzone': {
    padding: theme.spacing(12),
    border: '2px dashed',
    borderRadius: theme.spacing(1),
    borderColor: theme.palette.divider,
    textAlign: 'center',
    cursor: 'pointer',
    boxShadow: 'none',
    [theme.breakpoints.down('sm')]: {
      paddingInline: theme.spacing(5)
    }
  }
}))

const CompanyLogoStep: React.FC<Props> = ({ defaultValues = {}, onBack }) => {
  const dispatch = useDispatch()
  const [files, setFiles] = useState<File[]>(defaultValues.logoFile ? [defaultValues.logoFile] : [])

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0]

      setFiles([file])
      dispatch(updateCompanyLogo({ logoFile: file }))
    }
  })

  const handleRemove = () => {
    setFiles([])
    dispatch(updateCompanyLogo({ logoFile: undefined }))
  }

  const handleContinue = () => {
    dispatch(setCurrentStep(5))
  }

  return (
    <Dropzone>
      <Card elevation={0} sx={{ boxShadow: 'none' }}>
        <CardHeader title='Upload Company Logo' />
        <CardContent>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <div className='flex flex-col items-center gap-2 text-center'>
              <Typography variant='h4'>Drag & Drop your logo</Typography>
              <Typography color='text.secondary'>or click to browse</Typography>
              <Button variant='outlined' size='small'>
                Browse Logo
              </Button>
            </div>
          </div>

          {files.length > 0 && (
            <List>
              <ListItem>
                <Typography className='file-name'>{files[0].name}</Typography>
                <IconButton onClick={handleRemove}>
                  <i className='ri-close-line' />
                </IconButton>
              </ListItem>
            </List>
          )}

          <Grid container justifyContent='space-between' mt={4}>
            <Button variant='outlined' onClick={onBack}>
              Back
            </Button>
            <Button variant='contained' onClick={handleContinue}>
              Next
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </Dropzone>
  )
}

export default CompanyLogoStep
