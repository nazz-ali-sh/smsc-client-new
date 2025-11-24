'use client'

import { useState, useEffect } from 'react'

import Image from 'next/image'

import { Box, Card, Typography } from '@mui/material'

import CustomButton from '@/common/CustomButton'
import { usePmadsahbaordData } from '@/hooks/usePmadsahbaordData'
import { useTenderCardNavigation } from '@/hooks/useTenderCardNavigation'

interface SlideData {
  id: number
  title: string
  emoji: string
  mainText: string
  highlightText: string
  subText: string
  buttonText: string
  imagePath: string
}

const CongratulationsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { data: dashboardData } = usePmadsahbaordData()
  const { handleSliderNavigation } = useTenderCardNavigation()

  const slidesData: SlideData[] = [
    {
      id: 1,
      title: 'Congratulations User Name!',
      emoji: '🎉',
      mainText: 'You have won ',
      highlightText: `+${dashboardData?.data?.tender_updates?.appointed?.total_count || 0} Tenders`,
      subText: `Total Tenders Won`,
      buttonText: 'View Tender',
      imagePath: '/svgs/celebarations.svg'
    },
    {
      id: 2,
      title: 'Successfully Applied!',
      emoji: '🎉',
      mainText: 'You have applied for ',
      highlightText: `+${dashboardData?.data?.tender_updates?.submitted?.last_thirty_days_count || 0} Tenders`,
      subText: `Past 30 Days`,
      buttonText: 'View More',
      imagePath: '/svgs/applied.svg'
    },
    {
      id: 3,
      title: 'Shortlisted Tenders!',
      emoji: '🎉',
      mainText: 'You are shortlisted for ',
      highlightText: `+${dashboardData?.data?.tender_updates?.shortlisted?.last_thirty_days_count || 0} Tenders`,
      subText: `Past 30 Days`,
      buttonText: 'View More',
      imagePath: '/svgs/shortlisted.svg'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slidesData.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleDotClick = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <Box sx={{ marginTop: 12, marginBottom: 4 }}>
      <Card
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '230px'
        }}
      >
        {slidesData.map((slide, index) => (
          <Box
            key={slide.id}
            sx={{
              display: currentSlide === index ? 'flex' : 'none',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: 4,
              gap: 4,
              animation: currentSlide === index ? 'fadeIn 0.5s ease-in-out' : 'none',
              '@keyframes fadeIn': {
                from: { opacity: 0 },
                to: { opacity: 1 }
              }
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#374151',
                  marginBottom: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                {slide.title}
                <span>{slide.emoji}</span>
              </Typography>

              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#6B7280',
                  marginBottom: 1
                }}
              >
                {slide.mainText}
                <span style={{ fontWeight: 700, color: '#F59E0B' }}>{slide.highlightText}</span>
              </Typography>

              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#6B7280',
                  marginBottom: 3,
                  marginTop: 3
                }}
              >
                {slide.subText}
              </Typography>

              <CustomButton
                sx={{ marginTop: 3 }}
                onClick={() => handleSliderNavigation(slide.id)}
              >
                {slide.buttonText}
              </CustomButton>
            </Box>

            <Box
              sx={{
                width: '200px',
                height: '200px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Image
                src={slide.imagePath}
                alt={slide.title}
                width={180}
                height={180}
                style={{ objectFit: 'contain' }}
              />
            </Box>
          </Box>
        ))}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1.5,
            marginTop: 3,
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          {slidesData.map((_, index) => (
            <Box
              key={index}
              onClick={() => handleDotClick(index)}
              sx={{
                width: currentSlide === index ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: currentSlide === index ? '#35C0ED' : '#D1D5DB',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </Box>
      </Card>
    </Box>
  )
}

export default CongratulationsSlider
