'use client'
import React, { useState } from 'react'

import { Box, Typography, TextField, Snackbar, Alert } from '@mui/material'

import CustomButton from '@/common/CustomButton'
import CommonModal from '@/common/CommonModal'
import EvaluationInstructions from './EvaluationInstructions'

const EvaluationMatrix = () => {
  const [toast, setToast] = useState({ open: false, message: '', severity: 'error' as 'error' | 'success' })

  const [isOpen, setIsOpen] = useState(false)

  const [evaluationData, setEvaluationData] = useState([
    {
      categoryName: 'Pricing & Value',
      description: 'Overall price quoted, value for money based on services offered.',
      Weighting: '',
      'PMA 1 (TBC)': '',
      'PMA 2 (TBC)': '',
      'PMA 3 (TBC)': '',
      'PMA 4 (TBC)': '',
      'PMA 5 (TBC)': '',
      'PMA 6 (TBC)': ''
    },
    {
      categoryName: 'Clarity of Response',
      description: 'How clearly the agent answered your tender questions.',
      Weighting: '',
      'PMA 1 (TBC)': '',
      'PMA 2 (TBC)': '',
      'PMA 3 (TBC)': '',
      'PMA 4 (TBC)': '',
      'PMA 5 (TBC)': '',
      'PMA 6 (TBC)': ''
    },
    {
      categoryName: 'Experience with Similar Blocks',
      description: 'Relevant portfolio experience, block size/type alignment.',
      Weighting: '',
      'PMA 1 (TBC)': '',
      'PMA 2 (TBC)': '',
      'PMA 3 (TBC)': '',
      'PMA 4 (TBC)': '',
      'PMA 5 (TBC)': '',
      'PMA 6 (TBC)': ''
    },
    {
      categoryName: 'Communication',
      description: 'How professional, clear, and responsive they were in calls or emails.',
      Weighting: '',
      'PMA 1 (TBC)': '',
      'PMA 2 (TBC)': '',
      'PMA 3 (TBC)': '',
      'PMA 4 (TBC)': '',
      'PMA 5 (TBC)': '',
      'PMA 6 (TBC)': ''
    },
    {
      categoryName: 'Proactive Approach',
      description: 'Evidence they will take initiative and resolve issues without prompting.',
      Weighting: '',
      'PMA 1 (TBC)': '',
      'PMA 2 (TBC)': '',
      'PMA 3 (TBC)': '',
      'PMA 4 (TBC)': '',
      'PMA 5 (TBC)': '',
      'PMA 6 (TBC)': ''
    },
    {
      categoryName: 'Technology & Tools',
      description: 'Online portals, reporting systems, issue-tracking platforms.',
      Weighting: '',
      'PMA 1 (TBC)': '',
      'PMA 2 (TBC)': '',
      'PMA 3 (TBC)': '',
      'PMA 4 (TBC)': '',
      'PMA 5 (TBC)': '',
      'PMA 6 (TBC)': ''
    },
    {
      categoryName: 'Site Presence',
      description: 'Frequency of site visits and on-site visibility.',
      Weighting: '',
      'PMA 1 (TBC)': '',
      'PMA 2 (TBC)': '',
      'PMA 3 (TBC)': '',
      'PMA 4 (TBC)': '',
      'PMA 5 (TBC)': '',
      'PMA 6 (TBC)': ''
    },
    {
      categoryName: 'Reporting Transparency',
      description: 'Willingness to audit or review existing contractor relationships.',
      Weighting: '',
      'PMA 1 (TBC)': '',
      'PMA 2 (TBC)': '',
      'PMA 3 (TBC)': '',
      'PMA 4 (TBC)': '',
      'PMA 5 (TBC)': '',
      'PMA 6 (TBC)': ''
    }
  ])

  const pmaColumns = ['PMA 1 (TBC)', 'PMA 2 (TBC)', 'PMA 3 (TBC)', 'PMA 4 (TBC)', 'PMA 5 (TBC)', 'PMA 6 (TBC)']

  const showToast = (message: string, severity: 'error' | 'success' = 'error') => {
    setToast({ open: true, message, severity })
  }

  const validateWeighting = (value: string): boolean => {
    const numValue = parseFloat(value)

    if (isNaN(numValue)) return false

    return numValue >= 0.5 && numValue <= 1.5
  }

  const validatePMA = (value: string): boolean => {
    const numValue = parseInt(value)

    if (isNaN(numValue)) return false

    return numValue >= 1 && numValue <= 10 && Number.isInteger(numValue)
  }

  const handleInputChange = (categoryIndex: number, field: string, value: string) => {
    if (field === 'Weighting' && value !== '') {
      if (!validateWeighting(value)) {
        showToast('Weighting must be between 0.5 and 1.5')

        return
      }
    } else if (pmaColumns.includes(field) && value !== '') {
      if (!validatePMA(value)) {
        showToast('PMA values must be whole numbers between 1 and 10')

        return
      }
    }

    const updatedData = [...evaluationData]

    updatedData[categoryIndex] = {
      ...updatedData[categoryIndex],
      [field]: value
    }
    setEvaluationData(updatedData)
  }

  const calculateTotals = () => {
    const totals = {
      Weighting: 0,
      ...pmaColumns.reduce((acc, pma) => ({ ...acc, [pma]: 0 }), {})
    }

    evaluationData.forEach(category => {
      const weighting = parseFloat(category.Weighting) || 0

      totals.Weighting += weighting

      pmaColumns.forEach(pma => {
        const pmaValue = parseInt(category[pma as keyof typeof category] as string) || 0

        totals[pma as keyof typeof totals] += pmaValue
      })
    })

    return totals
  }

  const totals = calculateTotals()

  const handleSaveEvaluation = () => {
    console.log('Saving evaluation data:', evaluationData)
  }

  const handleModalOpen = () => {
    setIsOpen(true)
  }

  const handleModalClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Box sx={{ marginTop: 18 }}>
        <Typography sx={{ color: '#262B43E5', fontWeight: 600, fontSize: '18px' }}>Evaluation Matrix</Typography>
        <Typography sx={{ marginTop: '16px', color: '#262B43E5', fontWeight: 400, fontSize: '16px' }}>
          Use this matrix to score each shortlisted managing agent on a scale of 1 to 10 during your video calls and
          site visits. You can print a copy to take handwritten notes, then return to your portal to enter final scores.
          Your saved weightings will be applied automatically, and the results will be shown in your Final Report. Note:
          once saved, your matrix cannot be changed
        </Typography>

        <Typography
          sx={{
            marginTop: '16px',
            color: '#262B43E5',
            fontWeight: 600,
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          How to use Evaluation Matrix
          <span onClick={handleModalOpen}>
            <i className='ri-error-warning-line text-lg pt-1 cursor-pointer'></i>
          </span>
        </Typography>
      </Box>
      <div className='flex flex-col items-center mt-5'>
        <div className='bg-white p-8 pt-10 w-full max-w-8xl mt-6'>
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th
                    style={{
                      padding: '16px',
                      textAlign: 'left',
                      border: '1px solid #e0e0e0',
                      backgroundColor: '#f8f9fa',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      color: '#333'
                    }}
                  >
                    CATEGORY
                  </th>
                  <th
                    style={{
                      padding: '16px',
                      textAlign: 'center',
                      border: '1px solid #e0e0e0',
                      backgroundColor: '#f8f9fa',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      color: '#333'
                    }}
                  >
                    Weighting
                  </th>
                  {pmaColumns.map((pma, index) => (
                    <th
                      key={index}
                      style={{
                        padding: '16px',
                        textAlign: 'center',
                        border: '1px solid #e0e0e0',
                        backgroundColor: '#f8f9fa',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        color: '#333'
                      }}
                    >
                      {pma}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {evaluationData.map((category, categoryIndex) => (
                  <tr key={categoryIndex}>
                    <td
                      style={{
                        padding: '16px',
                        border: '1px solid #e0e0e0',
                        verticalAlign: 'top',
                        width: '300px'
                      }}
                    >
                      <Typography variant='body2' sx={{ fontWeight: 'bold', marginBottom: '4px' }}>
                        {category.categoryName}
                      </Typography>
                      <Typography variant='caption' sx={{ color: '#666', fontSize: '12px' }}>
                        {category.description}
                      </Typography>
                    </td>
                    <td
                      style={{
                        padding: '8px',
                        border: '1px solid #e0e0e0',
                        textAlign: 'center'
                      }}
                    >
                      <TextField
                        type='number'
                        size='small'
                        value={category.Weighting}
                        onChange={e => handleInputChange(categoryIndex, 'Weighting', e.target.value)}
                        placeholder='--'
                        inputProps={{
                          min: 0.5,
                          max: 1.5,
                          step: 0.25
                        }}
                        sx={{
                          width: '80px',
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#d9d9d9'
                            },
                            '&:hover fieldset': {
                              borderColor: '#bfbfbf'
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#35C0ED'
                            }
                          }
                        }}
                      />
                    </td>
                    {pmaColumns.map((pma, pmaIndex) => (
                      <td
                        key={pmaIndex}
                        style={{
                          padding: '8px',
                          border: '1px solid #e0e0e0',
                          textAlign: 'center'
                        }}
                      >
                        <TextField
                          type='number'
                          size='small'
                          value={category[pma as keyof typeof category]}
                          onChange={e => handleInputChange(categoryIndex, pma, e.target.value)}
                          placeholder='--'
                          inputProps={{
                            min: 1,
                            max: 10,
                            step: 1
                          }}
                          sx={{
                            width: '80px',
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: '#d9d9d9'
                              },
                              '&:hover fieldset': {
                                borderColor: '#bfbfbf'
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#35C0ED'
                              }
                            }
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td
                    style={{
                      padding: '16px',
                      border: '1px solid #e0e0e0',
                      fontWeight: 'bold',
                      backgroundColor: '#f8f9fa'
                    }}
                  >
                    TOTAL
                  </td>
                  <td
                    style={{
                      padding: '8px',
                      border: '1px solid #e0e0e0',
                      textAlign: 'center',
                      backgroundColor: '#f8f9fa'
                    }}
                  >
                    <Typography variant='body2' sx={{ color: '#333', fontWeight: 'bold' }}>
                      {totals.Weighting.toFixed(1)}
                    </Typography>
                  </td>
                  {pmaColumns.map((pma, index) => (
                    <td
                      key={index}
                      style={{
                        padding: '8px',
                        border: '1px solid #e0e0e0',
                        textAlign: 'center',
                        backgroundColor: '#f8f9fa'
                      }}
                    >
                      <Typography variant='body2' sx={{ color: '#333', fontWeight: 'bold' }}>
                        {totals[pma as keyof typeof totals]}
                      </Typography>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </Box>

          <div className='flex justify-end mt-8'>
            <CustomButton
              onClick={handleSaveEvaluation}
              sx={{
                fontSize: '16px',
                fontWeight: 700,
                backgroundColor: '#35C0ED',
                '&:hover': {
                  backgroundColor: '#2BA8D1'
                }
              }}
              startIcon={<i className='ri-download-2-line text-lg'></i>}
            >
              Save Evaluation
            </CustomButton>
          </div>
        </div>

        <Snackbar
          open={toast.open}
          autoHideDuration={4000}
          onClose={() => setToast({ ...toast, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity} sx={{ width: '100%' }}>
            {toast.message}
          </Alert>
        </Snackbar>
      </div>

      {isOpen && (
        <CommonModal
          isOpen={isOpen}
          handleClose={handleModalClose}
          header='How to use Evaluation Matrix'
          maxWidth='lg'
          fullWidth
        >
          <EvaluationInstructions />
        </CommonModal>
      )}
    </>
  )
}

export default EvaluationMatrix
