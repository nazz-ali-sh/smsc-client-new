'use client'

import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material'

import { finalSelectionData } from '../data'

const ProjectMetrics = () => {
  const { metrics, budgetItems, totalBudget } = finalSelectionData

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ mb: 4, paddingTop: '10px' }}>
          <Grid container spacing={4}>
            {metrics.map((metric, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: `${metric.color}15`,
                          border: `1px solid ${metric.color}30`
                        }}
                      >
                        <i
                          className={metric.icon}
                          style={{
                            fontSize: 24,
                            color: metric.color
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography variant='body2' sx={{ mb: 1, fontSize: '0.875rem' }}>
                          {metric.title}
                        </Typography>
                        <Typography variant='h5' sx={{ fontWeight: 500, fontSize: 15 }}>
                          {metric.value}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant='h6'
            sx={{
              fontWeight: 600,
              mb: 2,
              fontSize: 22,
              color: 'customColors.darkBlue'
            }}
          >
            Agreed Budget
          </Typography>

          <Box
            sx={{
              width: '100%',
              backgroundColor: 'white'
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                backgroundColor: 'customColors.gray5',
                py: 4,
                px: 2,
                borderBottom: '1px solid #e5e5e5'
              }}
            >
              <Typography sx={{ fontWeight: 500, fontSize: 13 }}>ITEM</Typography>
              <Typography sx={{ fontWeight: 500, fontSize: 13 }}>TOTAL</Typography>
              <Typography sx={{ fontWeight: 500, fontSize: 13 }}>PER FLAT</Typography>
            </Box>

            {budgetItems.map((row, index) => (
              <Box
                key={index}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  px: 2,
                  py: 6,
                  borderBottom: '1px solid #f0f0f0'
                }}
              >
                <Typography sx={{ fontSize: 15 }}>{row.item}</Typography>
                <Typography sx={{ fontWeight: 500, fontSize: 15 }}>{row.total}</Typography>
                <Typography sx={{ fontWeight: 500, fontSize: 15 }}>{row.perFlat}</Typography>
              </Box>
            ))}

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                px: 2,
                py: 2,
                borderTop: '1px solid customColors.gray4',
                paddingTop: 7
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>Total</Typography>
              <Typography sx={{ fontWeight: 600, color: 'customColors.darkBlue' }}>{totalBudget.total}</Typography>
              <Typography sx={{ fontWeight: 600, color: 'customColors.darkBlue' }}>{totalBudget.perFlat}</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant='contained'
            sx={{
              backgroundColor: 'customColors.ligthBlue',
              marginTop: 16,
              '&:hover': {
                backgroundColor: 'customColors.ligthBlue'
              }
            }}
            startIcon={<i className='ri-download-line' style={{ fontSize: 18, color: 'white' }} />}
          >
            Download Evaluation Matrix
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProjectMetrics
