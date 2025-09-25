'use client'

import Image from 'next/image'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Box, Divider,  } from '@mui/material'

import { pdfjs } from 'react-pdf'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

import { useMutation } from '@tanstack/react-query'

import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import companyImage from '../../../public/images/customImages/company.png'
import type { RootState } from '@/redux-store'

import { downloadFinalSeectionPDf } from '@/services/final_result_and_archeive_apis/final_results_apis'
import CustomButton from '@/common/CustomButton'

interface FinalSelectionResponse {
  finalSelection?: any
  DrawerStats?: any
}

const PmaDetails: React.FC<FinalSelectionResponse> = ({ finalSelection  }) => {
    
  const tender_id = useSelector((state: RootState) => state?.rmcOnboarding?.rmcData?.tender_id)

  const downloadMutation = useMutation({
    mutationFn: (id: number) => downloadFinalSeectionPDf(id),
    onSuccess: data => {
      const blob = new Blob([data], { type: 'application/pdf' })

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')

      link.href = url
      link.download = `tender_${tender_id}.pdf`
      link.click()
      window.URL.revokeObjectURL(url)

      toast.success('PDF downloaded successfully!')
    },
    onError: (error: any) => {

      if (error?.response?.data?.message) {
        toast.error(error.response.data.message)
      } else if (error?.message) {
        toast.error(error.message)
      } else {
        toast.error('Failed to download PDF. Please try again.')
      }
    }
  })

  const handlePdfClick = () => {
    if (tender_id) {
      downloadMutation.mutate(tender_id)
    }
  }

  return (
    <Card>
      <CardContent className='flex flex-col   '>
        <div className='flex flex-col '>
          <div className='flex flex-col items-center justify-center gap-y-4 pt-4'>
            <Image alt='user-profile' src={companyImage} width={155} height={155} className='rounded-lg' />
          </div>
          <Typography
            className='flex justify-center items-center text-[38px] pt-4'
            sx={{ color: 'customColors.darkGray1' }}
          >
            {finalSelection?.data?.pma_user?.pma_number}
          </Typography>
          <Box sx={{ marginX: '28px', marginTop: '12px' }}>
            <Divider />
          </Box>
          <Typography
            className='flex justify-center items-center text-[18px] pt-4 leading-[22px]'
            sx={{ color: 'customColors.darkGray1' }}
          >
            {finalSelection?.data?.pma_user?.company_details?.name}
          </Typography>
          
        </div>
      

        <section className='flex flex-col items-center gap-4 pt-4'>
          <div style={{ minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          </div>
          <CustomButton onClick={handlePdfClick} disabled={downloadMutation.isPending} variant='contained'>
            {downloadMutation.isPending ? 'Downloading...' : 'Download Tender Responce'}
          </CustomButton>
        </section>
      </CardContent>
    </Card>
  )
}

export default PmaDetails
