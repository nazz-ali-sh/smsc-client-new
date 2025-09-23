'use client'

import React, { useState } from 'react'

import { Typography, Box, Button } from '@mui/material'

import AddAndEditCatagoryModal from '@/common/AddAndEditCatagoryModal'
import DeleteCatagoryModal from '@/common/DeleteCatagoryModal'
import CommonModal from '@/common/CommonModal'
import EvaluationInstructions from './EvaluationInstructions'

interface CategoriesProps {
  isOpenCategory?: boolean
  setIsOpenCategory?: React.Dispatch<React.SetStateAction<boolean>>
  metrixCategories?: any
  handleBackbutton?: () => void
}

interface CategoryData {
  id?: number
  name: string
  description: string
  default_weight: string | number
}

const AddCategories: React.FC<CategoriesProps> = ({ metrixCategories, handleBackbutton }) => {
  const [isCategory, setIsCategory] = useState(false)
  const [isCategoryDelete, setIsCategoryDelete] = useState(false)
  const [type, setType] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [categoryid, seCategoryId] = useState<number | null>()

  const [categoryData, setCategoryData] = useState<CategoryData>({
    name: '',
    description: '',
    default_weight: ''
  })

  const handleEdit = (value: 'edit' | 'view' | 'add', item?: any, id?: number) => {
    if (value === 'add') {
      setIsCategory(true)
      setType(value)

      if (id) seCategoryId(id)
    } else if (value === 'edit') {
      setIsCategory(true)
      setType(value)
      setCategoryData({
        id: item?.id,
        name: item?.name || '',
        description: item?.description || '',
        default_weight: item?.default_weight || ''
      })
    }
  }

  const handleModalOpen = () => setIsOpen(true)
  const handleModalClose = () => setIsOpen(false)

  const handleDelete = (id: number) => {
    setIsCategoryDelete(true)
    seCategoryId(id)
  }

  return (
    <>
      <div>
        <Box sx={{ marginTop: 18 }}>
          <div className='flex items-center justify-between'>
            <Typography sx={{ color: '#262B43E5', fontWeight: 600, fontSize: '18px' }}>Evaluation Matrix</Typography>
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
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: '22px',
                        textAlign: 'center',
                        backgroundColor: '#f8f9fa',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        color: '#333'
                      }}
                    >
                      Title
                    </th>
                    <th
                      style={{
                        padding: '22px',
                        textAlign: 'center',
                        backgroundColor: '#f8f9fa',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        color: '#333'
                      }}
                    >
                      Description
                    </th>
                    <th
                      style={{
                        padding: '22px',
                        textAlign: 'center',
                        backgroundColor: '#f8f9fa',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        color: '#333'
                      }}
                    >
                      Weightage
                    </th>
                    <th
                      style={{
                        padding: '22px',
                        textAlign: 'center',
                        backgroundColor: '#f8f9fa',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        color: '#333'
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {metrixCategories?.map((item: any, index: any) => {
                    return (
                      <tr key={index}>
                        <td
                          style={{
                            padding: '34px',
                            textAlign: 'center',
                            borderBottom: '1px solid #e0e0e0',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            color: '#262B43E5'
                          }}
                        >
                          {item?.name}
                        </td>
                        <td
                          style={{
                            padding: '34px',
                            textAlign: 'center',
                            borderBottom: '1px solid #e0e0e0',
                            lineHeight: '24px',
                            fontSize: '12px',
                            color: '#262B43E5'
                          }}
                        >
                          {item?.description}
                        </td>
                        <td
                          style={{
                            padding: '34px',
                            textAlign: 'center',
                            borderBottom: '1px solid #e0e0e0',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            color: '#333'
                          }}
                        >
                          {item?.default_weight || '--'}
                        </td>
                        <td
                          style={{
                            padding: '34px',
                            textAlign: 'center',
                            borderBottom: '1px solid #e0e0e0',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            color: '#333'
                          }}
                        >
                          <div className='flex justify-center gap-x-[12px] '>
                            <span className='size-[33px] rounded-[5px] cursor-pointer bg-[#26C6F93D] text-[#35C0ED] flex justify-center items-center'>
                              <i onClick={() => handleEdit('edit', item, item?.id)} className='ri-edit-box-line'></i>
                            </span>
                            <span
                              onClick={() => handleDelete(Number(item?.id))}
                              className='size-[33px] rounded-[5px] cursor-pointer bg-[#26C6F93D] text-[#35C0ED] flex justify-center items-center'
                            >
                              <i className='ri-delete-bin-6-line'></i>
                            </span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </Box>
            <div className='flex justify-end items-end gap-x-[40px]'>
              <div className='flex justify-end mt-8'>
                <Button
                  onClick={handleBackbutton}
                  variant='outlined'
                  className='bg-white gap-x-3 border-[buttonPrimary] py-[10px] px-9'
                >
                  Back
                </Button>
              </div>

              <div className='flex justify-end mt-8'>
                <Button
                  onClick={() => handleEdit('add')}
                  variant='contained'
                  className='bg-buttonPrimary gap-x-3 py-3 px-9'
                >
                  Add Category
                </Button>
              </div>
            </div>
          </div>
        </div>

        <AddAndEditCatagoryModal
          open={isCategory}
          onClose={() => setIsCategory(false)}
          types={type}
          metrixCategories={metrixCategories}
          categoryid={categoryid}
          categoryData={categoryData}
        />

        <CommonModal isOpen={isOpen} handleClose={handleModalClose} header='How to use Evaluation Matrix'>
          <EvaluationInstructions />
        </CommonModal>

        <DeleteCatagoryModal
          title='Delete Category'
          description='Are you sure you want to delete this category? This action cannot be undone.'
          open={isCategoryDelete}
          categoryid={categoryid}
          onClose={() => setIsCategoryDelete(false)}
        />
      </div>
    </>
  )
}

export default AddCategories
