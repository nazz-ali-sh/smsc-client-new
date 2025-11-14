'use client'

import React from 'react'

import { Box, Grid, Typography } from '@mui/material'

import {
  getYearLabel,
  getOutdoorSpaceLabel,
  getLeaseholderTypeLabel,
  getBlockConditionLabel,
  getBuildingHeightLabel
} from '@/constants'

import type { BlockDetailsSectionProps } from '../types'

interface ExtendedBlockDetailsSectionProps extends BlockDetailsSectionProps {
  cardsPerRow?: number
  isVerticalList?: boolean
  showTitle?: boolean
  visibleCardsCount?: number
}

const BlockDetailsInfoSection = ({
  blockData,
  cardsPerRow = 5,
  isVerticalList = false,
  showTitle = true,
  visibleCardsCount
}: ExtendedBlockDetailsSectionProps) => {
  if (!blockData) {
    return null
  }

  const gridSize = 12 / cardsPerRow

  const blockItems = [
    {
      label: 'Region',
      value: blockData?.region || 'N/A',
      icon: 'ri-map-pin-line'
    },
    {
      label: 'Unit Count',
      value: `${blockData?.total_units || 0} Units`,
      icon: 'ri-building-line'
    },
    {
      label: 'Number of Blocks',
      value: blockData?.number_of_blocks || 'N/A',
      icon: 'ri-grid-line'
    },
    {
      label: 'Year Built',
      value: getYearLabel(blockData?.year_built) || 'N/A',
      icon: 'ri-calendar-line'
    },
    {
      label: 'Block Condition',
      value: getBlockConditionLabel(blockData?.block_condition) || 'N/A',
      icon: 'ri-shield-line'
    },
    {
      label: 'Outdoor Space',
      value: getOutdoorSpaceLabel(blockData?.outdoor_space) || 'N/A',
      icon: 'ri-plant-line'
    },
    {
      label: 'Leasehold Type',
      value: getLeaseholderTypeLabel(blockData?.leasehold_type) || blockData?.leasehold_type,
      icon: 'ri-settings-3-line'
    },
    {
      label: 'Building Height',
      value: getBuildingHeightLabel(blockData?.building_height as any) || 'N/A',
      icon: 'ri-building-line'
    }
  ]

  const visibleItems = blockItems.slice(0, visibleCardsCount || blockItems.length)

  if (isVerticalList) {
    return (
      <Box sx={{ marginBottom: 4 }}>
        {showTitle && (
          <Box sx={{ marginBottom: 4 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '24px', color: 'customColors.darkGray1' }}>
              Block Details
            </Typography>
          </Box>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {visibleItems?.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, paddingY: '8px' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  backgroundColor: 'customColors.ligthBlue1',
                  borderRadius: '8px',
                  flexShrink: 0
                }}
              >
                <i className={item?.icon} style={{ fontSize: '1.5rem', color: '#1976D2' }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography color='text.secondary' sx={{ fontSize: '12px' }}>
                  {item?.label}
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    fontWeight: 400,
                    fontSize: '20px',
                    color: 'customColors.darkGray1',
                    wordBreak: 'break-word'
                  }}
                >
                  {item?.value}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{ marginBottom: 4 }}>
      {showTitle && (
        <Box sx={{ marginBottom: 4, paddingTop: '24px' }}>
          <Typography sx={{ fontWeight: 700, fontSize: '24px', color: 'customColors.darkGray1' }}>
            Block Details
          </Typography>
        </Box>
      )}
      <Box sx={{ marginBottom: 4, marginTop: '24px' }}>
        <Grid container spacing={3} rowSpacing={6}>
          {visibleItems?.map((item, index) => {
            return (
              <Grid item xs={12} sm={6} md={gridSize} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      backgroundColor: 'customColors.ligthBlue1',
                      borderRadius: '8px',
                      flexShrink: 0
                    }}
                  >
                    <i className={item?.icon} style={{ fontSize: '1.5rem', color: '#1976D2' }} />
                  </Box>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography color='text.secondary' sx={{ fontSize: '12px' }}>
                      {item?.label}
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{
                        fontWeight: 400,
                        fontSize: '20px',
                        color: 'customColors.darkGray1',
                        wordBreak: 'break-word'
                      }}
                    >
                      {item?.value}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </Box>
  )
}

export default BlockDetailsInfoSection
