'use client'

import { useState } from 'react'

import Image from 'next/image'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { Box, Stack } from '@mui/material'

import { Document, Page, pdfjs } from 'react-pdf'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()

import companyImage from '../../../../public/images/customImages/company.png'

const ManagingAgentDetails = () => {
  const [numPages, setNumPages] = useState<number | null>(null)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  console.log(numPages, 'numPages')
  const iconStyle = { fontSize: '20px' }

  return (
    <Card>
      <CardContent className='flex flex-col   '>
        <div className='flex flex-col '>
          <div className='flex flex-col items-center justify-center gap-y-4'>
            <Image alt='user-profile' src={companyImage} width={155} height={155} className='rounded-lg' />
          </div>
          <Typography
            className='flex justify-center items-center text-[38px] pt-4'
            sx={{ color: 'customColors.darkGray1' }}
          >
            PMA-SE10077
          </Typography>
          <Typography
            className='flex justify-center items-center text-[18px] leading-[22px]'
            sx={{ color: 'customColors.darkGray1' }}
          >
            Ouma Property Management London
          </Typography>
          <Link
            href='#'
            underline='none'
            sx={{ color: 'customColors.ligthBlue', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            www.oumapropertymanagement.co.uk
          </Link>
        </div>
        <Stack spacing={3} sx={{ color: 'text.primary', paddingX: '28px', paddingTop: '22.5px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <i className='ri-user-line' style={iconStyle} />
            <Typography variant='body2'>David Greenway</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <i className='ri-mail-line' style={iconStyle} />
            <Typography variant='body2'>david@oumapropertymanagement.co.uk</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <i className='ri-phone-line' style={iconStyle} />
            <Typography variant='body2'>07825 97 3421</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <i className='ri-map-pin-line' style={iconStyle} />
            <Typography variant='body2'>52 Old Quay Street London SW11 6HP</Typography>
          </Box>
        </Stack>

        <section className='flex flex-col items-center gap-4 pt-4'>
          <div className='border rounded shadow-md'>
            <Document
              file='/data.pdf'
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={error => console.error('Error loading PDF:', error)}
              loading={<Typography>Loading PDF preview...</Typography>}
              className='cursor-pointer'
            >
              <Page pageNumber={1} width={100} />
            </Document>
          </div>
          <Typography variant='body1' align='center'>
            <a href='data.pdf' download className='hover:underline hover:underline-offset-4'>
              Download PDF
            </a>
          </Typography>
        </section>
      </CardContent>
    </Card>
  )
}

export default ManagingAgentDetails
