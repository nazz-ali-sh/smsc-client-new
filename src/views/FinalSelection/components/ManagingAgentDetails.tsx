'use client'

import { useState } from 'react'

import Image from 'next/image'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { Box, Divider, Stack } from '@mui/material'

import { Document, Page, pdfjs } from 'react-pdf'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

import { useMutation } from '@tanstack/react-query'

import { useSelector } from 'react-redux'

import companyImage from '../../../../public/images/customImages/company.png'
import type { RootState } from '@/redux-store'

import { downloadFinalSeectionPDf } from '@/services/final_result_and_archeive_apis/final_results_apis'

interface FinalSelectionResponse {
  finalSelection?: any
}

const ManagingAgentDetails: React.FC<FinalSelectionResponse> = ({ finalSelection }) => {
  const [numPages, setNumPages] = useState<number | null>(null)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  console.log(numPages, 'numPages')
  const iconStyle = { fontSize: '17px' }

  const tender_id = useSelector((state: RootState) => state?.tenderForm?.tender_id)

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
    },
    onError: error => {
      console.error('Download failed:', error)
    }
  })

  const handlePdfClick = () => {
    downloadMutation.mutate(tender_id)
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
          <Link
            href='#'
            underline='none'
            sx={{
              color: 'customColors.ligthBlue',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '5px'
            }}
          >
            {finalSelection?.data?.pma_user?.company_details?.website}
          </Link>
        </div>
        <Stack spacing={5} sx={{ color: 'text.primary', paddingX: '28px', paddingTop: '22.5px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <i className='ri-user-line text-[#696969]' style={iconStyle} />
            <Typography variant='body2'> {finalSelection?.data?.pma_user?.name}</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <i className='ri-mail-line text-[#696969]' style={iconStyle} />
            <Typography variant='body2'> {finalSelection?.data?.pma_user?.email}</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <i className='ri-phone-line text-[#696969]' style={iconStyle} />
            <Typography variant='body2'> {finalSelection?.data?.pma_user?.mobile_number}</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <i className='ri-map-pin-line text-[#696969]' style={iconStyle} />
            <Typography variant='body2'>{finalSelection?.data?.company_details?.address}</Typography>
          </Box>
        </Stack>

        <section className='flex flex-col items-center gap-4 pt-4'>
          <div className='border rounded shadow-md cursor-pointer' onClick={handlePdfClick}>
            <Document
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={error => console.error('Error loading PDF:', error)}
              loading={<Typography>Loading PDF preview...</Typography>}
            >
              <Page pageNumber={1} width={100} />
            </Document>
          </div>
          <Typography variant='body1' align='center'>
            Download PDF
          </Typography>
        </section>
      </CardContent>
    </Card>
  )
}

export default ManagingAgentDetails
