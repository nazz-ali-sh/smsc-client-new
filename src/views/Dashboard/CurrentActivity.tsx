'use client'
import { useState, useEffect } from 'react'

import dynamic from 'next/dynamic'

import Image from 'next/image'

import { Button, Typography } from '@mui/material'

import line from '../../../public/images/customImages/line.svg'

const Document = dynamic(() => import('react-pdf').then(mod => ({ default: mod.Document })), {
  ssr: false,
  loading: () => <div className='w-[160px] h-[145px] bg-gray-200 animate-pulse rounded'></div>
})

const Page = dynamic(() => import('react-pdf').then(mod => ({ default: mod.Page })), {
  ssr: false
})

const pdfFiles = [
  { file: '/data.pdf', label: 'Download Blind Tender Report' },
  { file: '/data.pdf', label: ' Download Full Journey Report ' }
]

const CurrentActivity = () => {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  console.log(numPages, 'numPages')

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  const headingStyle = {
    fontSize: '30px',
    color: 'customColors.darkGray1',
    paddingTop: '8px',
    paddingX: '22px',
    fontWeight: 500
  }

  return (
    <>
      <div className='bg-white p-4 md:p-8 shadow-xl  rounded-lg h-[288px]'>
        <div className=''>
          <section className='flex justify-between items-start w-[100%] '>
            <Typography variant='h3' className='w-[50%]' sx={headingStyle}>
              Current Activity
            </Typography>
            <Typography variant='h3' className='w-[50%] pl-[40px] ' sx={headingStyle}>
              Download Reports
            </Typography>
          </section>
          <div className='flex items-start justify-between pt-3'>
            <div className=' w-[50%]'>
              <div className='flex gap-x-[70px] items-center '>
                <div className='bg-white rounded-lg shadow-sm border border-gray-200 px-[20px] py-[20px] w-[259px] h-[145px]'>
                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center space-x-4'>
                      <div className=' bg-sky p-2 flex items-center rounded-lg'>
                        <i className='ri-customer-service-2-line bg-buttonPrimary'></i>
                      </div>
                      <div>
                        <div className=' font-bold text-gray-900 text-[15px]'>27</div>
                        <div className='text-textGray text-[14px]'>Scheduled Calls</div>
                      </div>
                    </div>
                  </div>
                  <section className='flex justify-end items-end mt-5 mb-2 mr-2'>
                    <Button variant='contained' className='bg-buttonPrimary w-[110px] text-[11px] whitespace-nowrap'>
                      View List <i className='ri-arrow-right-line bg-white ml-1 size-[12px]'></i>
                    </Button>
                  </section>
                </div>
                <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-5 w-[259px] h-[145px]'>
                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center justify-center space-x-4'>
                      <div className='bg-[#E6E7FF] p-2 flex items-center rounded-lg'>
                        <i className='ri-user-3-line bg-[#666CFF]'></i>
                      </div>
                      <div>
                        <div className='text-[15px] font-bold text-gray-900'>6</div>
                        <div className='text-[14px] text-textGray '>Shortlisted Agents</div>
                      </div>
                    </div>
                  </div>
                  <section className='flex justify-end items-end mt-5 mb-2 mr-2'>
                    <Button variant='contained' className='bg-buttonPrimary w-[110px] text-[11px] whitespace-nowrap'>
                      View List <i className='ri-arrow-right-line bg-white ml-1 size-[12px]'></i>
                    </Button>
                  </section>
                </div>
              </div>
            </div>
            <section className='w-[50%]'>
              <div className='flex '>
                <div>
                  <Image src={line} alt='horizontal line' height={166} />
                </div>
                <div className=' w-[100%] relative space-y-8 flex items-end justify-between  '>
                  {pdfFiles.map(({ file, label }, index) => (
                    <section key={index} className='relative flex flex-col justify-between  items-center w-[100%]'>
                      <div
                        className='relative cursor-pointer'
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        {' '}
                        {isClient && (
                          <Document
                            file={file}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadError={error => console.error('Error loading PDF:', error)}
                          >
                            <Page pageNumber={1} width={160} height={145} />
                          </Document>
                        )}
                        {hoveredIndex === index && isClient && (
                          <div className='absolute top-0 left-0 z-10 bg-white shadow-lg border border-gray-200'>
                            <Document
                              file={file}
                              onLoadSuccess={onDocumentLoadSuccess}
                              onLoadError={error => console.error('Error loading PDF:', error)}
                            >
                              <Page pageNumber={1} width={300} height={390} />
                            </Document>
                          </div>
                        )}
                      </div>
                      <section className='w-[100%]'>
                        <Typography variant='body1' align='center' className='mt-2 cursor-pointer '>
                          <a
                            href={file}
                            download
                            className='hover:underline hover:underline-offset-4'
                            style={{ textDecorationColor: '#35C0ED' }}
                          >
                            {label}
                          </a>
                        </Typography>
                      </section>
                    </section>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default CurrentActivity
