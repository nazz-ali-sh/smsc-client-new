'use client'
import React, { useEffect, useState, useCallback, useMemo } from 'react'

import { Box, Typography, TextField, Snackbar, Alert, Button } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

import { useSelector } from 'react-redux'

import CustomButton from '@/common/CustomButton'
import CommonModal from '@/common/CommonModal'
import EvaluationInstructions from './EvaluationInstructions'
import { finalShortListedAgent, getSavedEvaluationData } from '@/services/tender_result-apis/tender-result-api'
import axiosClient from '@/utils/axiosInstance'
import { gettingmetrixDetails } from '@/services/evaluation_matrix/evaluation_matrix'
import AddCatogories from './AddCatogories'

const EvaluationMatrix = () => {
  const [toast, setToast] = useState({ open: false, message: '', severity: 'error' as 'error' | 'success' })
  const [isOpen, setIsOpen] = useState(false)
  const [evaluationData, setEvaluationData] = useState<any[]>([])

  const [isSaved, setIsSaved] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isScored, setisScored] = useState(false)
  const [isOpenCatagory, setIsOpenCatagory] = useState(false)

  const tender_id = useSelector((state: any) => state?.rmcOnboarding?.tenderId)

  const { data: shortlistedPMAs } = useQuery({
    queryKey: ['shortlistedPMAs', tender_id],
    queryFn: () => finalShortListedAgent(Number(tender_id)),
    enabled: !!tender_id,
    refetchOnWindowFocus: false
  })

  const { data: metrixCategories } = useQuery({
    queryKey: ['metrix', tender_id],
    queryFn: () => gettingmetrixDetails(Number(tender_id)),
    enabled: !!tender_id,
    refetchOnWindowFocus: false
  })

  console.log(metrixCategories)

  useEffect(() => {
    if (metrixCategories) {
      setEvaluationData(metrixCategories)
    }
  }, [metrixCategories])

  const pmaColumns = useMemo(() => {
    if (shortlistedPMAs?.data?.shortlisted_pmas?.length > 0) {
      return shortlistedPMAs?.data?.shortlisted_pmas?.map(
        (pma: any, index: number) => `PMA ${index + 1} (${pma?.pma_user?.full_name})`
      )
    }

    return []
  }, [shortlistedPMAs])

  // Create initial evaluation data
  const createInitialEvaluationData = useCallback(
    (pmaColumns: string[]) => {
      if (!metrixCategories) return []

      return metrixCategories.map((category: { category_id: any; name: any; description: any; weight: any }) => {
        const pmaColumnsData = pmaColumns.reduce(
          (acc: Record<string, string>, column: string) => {
            acc[column] = ''

            return acc
          },
          {} as Record<string, string>
        )

        return {
          category_id: category?.category_id,
          name: category?.name,
          description: category?.description,
          weight: category?.weight,
          ...pmaColumnsData
        }
      })
    },
    [metrixCategories]
  )

  // Load saved evaluation data
  const loadSavedEvaluationData = useCallback(async () => {
    if (!tender_id) return

    try {
      const savedData = await getSavedEvaluationData(tender_id)

      if (savedData?.data?.categories?.length > 0) {
        // ✅ check once before mapping
        const hasValidScore = savedData.data.categories.some((category: { scores: any[] }) =>
          category?.scores?.some(score => score?.score >= 1)
        )

        if (hasValidScore) {
          setisScored(true)
        }

        const convertedData = savedData.data.categories.map((item: any) => {
          const categoryData: any = {
            category_id: item.category.id,
            name: item.category.name,
            description: item.category.description,
            weight: item.weight
          }

          if (item.scores?.length > 0) {
            const scoreMap = new Map()

            item.scores.forEach((score: any) => {
              scoreMap.set(score.pma_user_id, score.score)
            })

            pmaColumns.forEach((pmaColumn: string, index: number) => {
              const pmaUserId = shortlistedPMAs?.data?.shortlisted_pmas?.[index]?.pma_user?.id

              categoryData[pmaColumn] = pmaUserId && scoreMap.has(pmaUserId) ? scoreMap.get(pmaUserId).toString() : ''
            })
          } else {
            pmaColumns.forEach((pmaColumn: string) => {
              categoryData[pmaColumn] = ''
            })
          }

          return categoryData
        })

        setEvaluationData(convertedData)
        setIsSaved(true)
        setHasUnsavedChanges(false)
      } else {
        if (pmaColumns.length > 0) {
          setEvaluationData(createInitialEvaluationData(pmaColumns))
        }
      }
    } catch (error) {
      console.error('Error loading saved evaluation data:', error)

      if (pmaColumns.length > 0) {
        setEvaluationData(createInitialEvaluationData(pmaColumns))
      }
    }
  }, [tender_id, pmaColumns, shortlistedPMAs, createInitialEvaluationData])

  useEffect(() => {
    if (shortlistedPMAs && pmaColumns.length > 0) {
      loadSavedEvaluationData()
    }
  }, [shortlistedPMAs, pmaColumns, loadSavedEvaluationData])

  useEffect(() => {
    if (shortlistedPMAs && pmaColumns.length > 0) {
      loadSavedEvaluationData()
    }
  }, [shortlistedPMAs, pmaColumns, loadSavedEvaluationData])

  const saveEvaluationScores = async (tenderId: number, evaluationData: any[]) => {
    try {
      const items = evaluationData
        .map(category => {
          const scores = pmaColumns
            .map((pmaColumn: string, index: number) => {
              const pmaUserId = shortlistedPMAs?.data?.shortlisted_pmas?.[index]?.pma_user?.id
              const score = parseInt((category as any)[pmaColumn] as string) || 0

              return { pma_user_id: pmaUserId, score }
            })
            .filter((score: any) => score.score > 0 && score.pma_user_id)

          return { category_id: category.category_id, weight: category.weight, scores }
        })
        .filter(item => item.scores.length > 0)

      const payload = { tender_id: tenderId, items }
      const response = await axiosClient.post('/rmc/evaluation-matrix/scores', payload)

      return response.data
    } catch (error) {
      console.error('Error saving evaluation scores:', error)
      throw error
    }
  }

  const showToast = (message: string, severity: 'error' | 'success' = 'error') => {
    setToast({ open: true, message, severity })
  }

  const validateWeighting = (value: string) => {
    const numValue = parseFloat(value)

    return !isNaN(numValue) && numValue >= 0.5 && numValue <= 1.5
  }

  const validatePMA = (value: string) => {
    const numValue = parseInt(value)

    return !isNaN(numValue) && numValue >= 1 && numValue <= 10 && Number.isInteger(numValue)
  }

  const handleInputChange = (categoryIndex: number, field: string, value: string) => {
    if (field === 'weight' && value !== '') {
      if (!validateWeighting(value)) return showToast('Weighting must be between 0.5 and 1.5')
    } else if (pmaColumns.includes(field) && value !== '') {
      if (!validatePMA(value)) return showToast('PMA values must be whole numbers between 1 and 10')
    }

    setEvaluationData(prev => {
      const updated = [...prev]

      updated[categoryIndex] = { ...updated[categoryIndex], [field]: value }

      return updated
    })

    setHasUnsavedChanges(true)
    setIsSaved(false)
  }

  const calculateTotals = () => {
    const totals = {
      weight: 0,
      ...pmaColumns.reduce((acc: Record<string, number>, pma: string) => ({ ...acc, [pma]: 0 }), {})
    }

    evaluationData?.forEach(category => {
      const weight = typeof category?.weight === 'string' ? parseFloat(category?.weight) : category?.weight || 0

      totals.weight += weight
      pmaColumns.forEach((pmaColumn: string) => {
        const pmaValue = parseInt(category[pmaColumn as keyof typeof category] as string) || 0

        totals[pmaColumn as keyof typeof totals] += pmaValue
      })
    })

    return totals
  }

  const totals = calculateTotals()

  const handleEdit = (value: string) => {
    if (value == 'edit') {
      setisScored(false)
    }
  }

  const handleSaveEvaluation = async () => {
    try {
      setIsSaving(true)
      const tenderId = tender_id

      await saveEvaluationScores(tenderId, evaluationData)
      showToast('Evaluation scores saved successfully!', 'success')
      setIsSaved(true)
      setHasUnsavedChanges(false)
      setTimeout(() => loadSavedEvaluationData(), 100)
    } catch {
      showToast('Failed to save evaluation scores. Please try again.', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const handleModalOpen = () => setIsOpen(true)
  const handleModalClose = () => setIsOpen(false)

  const updateCatagoryState = () => {
    setIsOpenCatagory(false)
  }

  return (
    <>
      {isOpenCatagory ? (
        <AddCatogories metrixCategories={metrixCategories} handleBackbutton={updateCatagoryState} />
      ) : (
        <>
          <Box sx={{ marginTop: 18 }}>
            <div className='flex items-center justify-between'>
              <Typography sx={{ color: '#262B43E5', fontWeight: 600, fontSize: '18px' }}>Evaluation Matrix</Typography>
              {isSaved && (
                <div className='flex items-center gap-2 text-green-600'>
                  <i className='ri-check-line text-lg'></i>
                  <span className='text-sm font-medium'>Saved</span>
                </div>
              )}
              {hasUnsavedChanges && !isSaved && (
                <div className='flex items-center gap-2 text-orange-600'>
                  <i className='ri-edit-line text-lg'></i>
                  <span className='text-sm font-medium'>Unsaved changes</span>
                </div>
              )}
            </div>
            <Typography sx={{ marginTop: '16px', color: '#262B43E5', fontWeight: 400, fontSize: '16px' }}>
              Use this matrix to score each shortlisted managing agent on a scale of 1 to 10 during your video calls and
              site visits. You can print a copy to take handwritten notes, then return to your portal to enter final
              scores. Your saved weightings will be applied automatically, and the results will be shown in your Final
              Report. Note: once saved, your matrix cannot be changed
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
              {pmaColumns.length === 0 && (
                <Box
                  sx={{
                    marginBottom: '16px',
                    padding: '12px',
                    backgroundColor: '#f0f8ff',
                    border: '1px solid #b3d9ff',
                    borderRadius: '4px'
                  }}
                >
                  <Typography sx={{ color: '#1976d2', fontSize: '14px', fontWeight: 500 }}>
                    ℹ️ No PMAs have been shortlisted yet. The matrix will show PMA columns once agents are shortlisted.
                  </Typography>
                </Box>
              )}
              <Box sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          padding: '24px',
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
                          padding: '24px',
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
                      {pmaColumns.length > 0 ? (
                        pmaColumns.map((pma: string, index: number) => (
                          <th
                            key={index}
                            style={{
                              padding: '24px',
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
                        ))
                      ) : (
                        <th
                          style={{
                            padding: '24px',
                            textAlign: 'center',
                            border: '1px solid #e0e0e0',
                            backgroundColor: '#f8f9fa',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            color: '#666',
                            fontStyle: 'italic'
                          }}
                        >
                          No PMAs shortlisted yet
                        </th>
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {evaluationData?.map((category: any, categoryIndex) => (
                      <tr key={categoryIndex}>
                        <td
                          style={{ padding: '16px', border: '1px solid #e0e0e0', verticalAlign: 'top', width: '300px' }}
                        >
                          <Typography variant='body2' sx={{ fontWeight: 'bold', marginBottom: '4px' }}>
                            {category.name}
                          </Typography>
                          <Typography variant='caption' sx={{ color: '#666', fontSize: '12px' }}>
                            {category.description}
                          </Typography>
                        </td>

                        {!isScored == true ? (
                          <td style={{ padding: '8px', border: '1px solid #e0e0e0', textAlign: 'center' }}>
                            <TextField
                              type='number'
                              size='small'
                              value={category?.weight > 1.5 ? 0 : category?.default_weight || '--'}
                              onChange={e => handleInputChange(categoryIndex, 'weight', e.target.value)}
                              placeholder='--'
                              inputProps={{ min: 0.5, max: 1.5, step: 0.25 }}
                              sx={{ width: '80px' }}
                            />
                          </td>
                        ) : (
                          <td style={{ padding: '8px', border: '1px solid #e0e0e0', textAlign: 'center' }}>
                            {category?.default_weight > 1.5 ? 0 : category?.default_weight || '--'}
                          </td>
                        )}

                        {pmaColumns.length > 0 ? (
                          pmaColumns.map((pma: string, pmaIndex: number) => (
                            <td
                              key={pmaIndex}
                              style={{ padding: '8px', border: '1px solid #e0e0e0', textAlign: 'center' }}
                            >
                              {!isScored ? (
                                <TextField
                                  type='number'
                                  size='small'
                                  value={category[pma as keyof typeof category] ?? ''}
                                  onChange={e => handleInputChange(categoryIndex, pma, e.target.value)}
                                  placeholder='--'
                                  inputProps={{ min: 1, max: 10, step: 1 }}
                                  sx={{ width: '80px' }}
                                />
                              ) : (
                                category[pma as keyof typeof category] || '--'
                              )}
                            </td>
                          ))
                        ) : (
                          <td
                            style={{
                              padding: '8px',
                              border: '1px solid #e0e0e0',
                              textAlign: 'center',
                              color: '#666',
                              fontStyle: 'italic'
                            }}
                          >
                            --
                          </td>
                        )}
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
                          {totals.weight.toFixed(1)}
                        </Typography>
                      </td>
                      {pmaColumns.length > 0 ? (
                        pmaColumns.map((pma: string, index: number) => (
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
                        ))
                      ) : (
                        <td
                          style={{
                            padding: '8px',
                            border: '1px solid #e0e0e0',
                            textAlign: 'center',
                            backgroundColor: '#f8f9fa',
                            color: '#666',
                            fontStyle: 'italic'
                          }}
                        >
                          --
                        </td>
                      )}
                    </tr>
                  </tbody>
                </table>
              </Box>

              <div className='flex justify-end items-end gap-x-[40px]'>
                <div className='flex justify-end mt-8'>
                  <Button
                    onClick={() => setIsOpenCatagory(true)}
                    variant='contained'
                    className='bg-buttonPrimary gap-x-3'
                  >
                    update category
                  </Button>
                </div>

                {!isScored ? (
                  <div className='mt-8 flex justify-end'>
                    <CustomButton
                      onClick={() => handleSaveEvaluation()}
                      disabled={isSaving || isSaved}
                      sx={{
                        fontSize: '16px',
                        fontWeight: 700,
                        backgroundColor: '#35C0ED',

                        '&:hover': { backgroundColor: isSaved ? '#28a745' : '#2BA8D1' },
                        '&:disabled': { backgroundColor: isSaved ? '#2BA8D1' : '#2BA8D1' }
                      }}
                    >
                      {isSaving ? 'Saving...' : 'Save Evaluation'}
                    </CustomButton>
                  </div>
                ) : (
                  <div className='flex justify-end mt-8'>
                    <Button onClick={() => handleEdit('edit')} variant='contained' className='bg-buttonPrimary gap-x-3'>
                      Edit
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <CommonModal isOpen={isOpen} handleClose={handleModalClose} header='How to use Evaluation Matrix'>
            <EvaluationInstructions />
          </CommonModal>
          <Snackbar
            open={toast.open}
            autoHideDuration={6000}
            onClose={() => setToast(prev => ({ ...prev, open: false }))}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert
              onClose={() => setToast(prev => ({ ...prev, open: false }))}
              severity={toast.severity}
              sx={{ width: '100%' }}
            >
              {toast.message}
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  )
}

export default EvaluationMatrix
