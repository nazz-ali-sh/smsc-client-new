'use client'

import React, { useState } from 'react'

import { TextField, Button, Card, CardHeader, CardContent, Grid, Typography, Tooltip, Box, Chip } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'

const BANNED_TERMS_REGEX =
  /(@|\b(?:http[s]?:\/\/)?(?:www\.)?\w+\.(com|net|org|co\.uk|pk|io)\b|\d{7,}|\b(?:company name|email|phone|website)\b)/gi

interface Props {
  defaultValues: {
    bioText?: string
    status?: 'Approved' | 'Pending Review' | 'Flagged'
    previousBioText?: string
  }
  onNext: (data: { bioText?: string }) => void
  onBack: () => void
}

const MAX_CHAR_COUNT = 1400

const CompanyBioStep: React.FC<Props> = ({ defaultValues, onNext, onBack }) => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues
  })

  const bioText = watch('bioText') || ''
  const [charCount, setCharCount] = useState(MAX_CHAR_COUNT - bioText.length)

  const onSubmit = (data: { bioText?: string }) => {
    const containsBannedTerms = BANNED_TERMS_REGEX.test(data.bioText || '')

    if (containsBannedTerms) {
      alert(
        'Your bio has been flagged for review by SMSC. This may have been triggered by automated filters – a team member will verify and approve manually.'
      )
    } else {
      alert('Thanks for submitting your company bio. Your profile is now complete.')
    }

    onNext(data)
  }

  return (
    <Card elevation={0} sx={{ boxShadow: 'none' }}>
      <CardHeader
        title={
          <Box display='flex' alignItems='center' gap={1}>
            <Typography variant='h6'>Write Company Bio</Typography>
            <Tooltip
              title='This is the first thing an RMC sees when you’re shortlisted. Make it count: highlight your strengths, your unique selling points, what you specialise in, and what makes you stand out from the rest. Think about what an RMC would want in a partner and present it clearly and confidently.'
              arrow
            >
              <i className='ri-information-line text-textSecondary text-base cursor-pointer' />
            </Tooltip>
          </Box>
        }
      />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='bioText'
            control={control}
            rules={{
              required: 'Bio is required',
              maxLength: {
                value: MAX_CHAR_COUNT,
                message: `Bio must not exceed ${MAX_CHAR_COUNT} characters`
              },
              validate: value => {
                if (BANNED_TERMS_REGEX.test(value as any)) {
                  return 'Bio contains restricted terms like company name, email, phone, or website'
                }

                return true
              }
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label='Company Bio'
                fullWidth
                multiline
                rows={6}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                placeholder='Tell us about your company...'
                onChange={e => {
                  field.onChange(e)
                  setCharCount(MAX_CHAR_COUNT - e.target.value.length)
                }}
              />
            )}
          />

          <Box mt={1} display='flex' justifyContent='space-between' alignItems='center'>
            <Typography color='error' fontStyle='italic'>
              Please do not include your company name, email address, phone number or website. Breaching this may result
              in account suspension.
            </Typography>
            <Typography variant='body2' color={charCount < 0 ? 'error' : 'text.secondary'}>
              {charCount} characters remaining
            </Typography>
          </Box>

          {defaultValues?.status === 'Approved' && <Chip label='Approved' color='success' sx={{ mt: 2 }} />}

          {defaultValues?.previousBioText && defaultValues.status === 'Pending Review' && (
            <Box mt={2}>
              <Typography variant='subtitle2' color='warning.main'>
                Previous Version (still visible to RMCs while your new version is under review):
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {defaultValues.previousBioText}
              </Typography>
              <Chip label='Pending Review' color='warning' size='small' sx={{ mt: 1 }} />
            </Box>
          )}

          <Grid container justifyContent='space-between' mt={4}>
            <Button variant='outlined' onClick={onBack}>
              Back
            </Button>
            <Button variant='contained' type='submit'>
              Next
            </Button>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default CompanyBioStep
