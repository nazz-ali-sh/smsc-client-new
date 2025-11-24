'use client'

import { Box, Card, Typography } from '@mui/material'

import { usePmadsahbaordData } from '@/hooks/usePmadsahbaordData'

const PendingIncomeSection = () => {
  const { data: dashboardData } = usePmadsahbaordData()

  return (
    <>
      {dashboardData?.data?.pending_invoices && (
        <Card sx={{ marginTop: 12, paddingX: '24px' }}>
          <Box sx={{ marginTop: 6, marginBottom: 4 }}>
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#262B43E5',
                marginBottom: 2
              }}
            >
              Pending Income
            </Typography>

            <Box
              sx={{
                padding: '16px',
                marginBottom: 8,
                position: 'relative',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                marginTop: '40px'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#10B981'
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: '18px',
                      fontWeight: 300,
                      color: '#262B43E5'
                    }}
                  >
                    {dashboardData?.data?.pending_invoices?.invoice_id}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#E0F2FE',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#BAE6FD'
                    }
                  }}
                >
                  <i className='ri-eye-line text-[16px] text-[#0EA5E9]'></i>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#262B43E5'
                    }}
                  >
                    Creation Date :
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 300,
                      color: '#262B43E5'
                    }}
                  >
                    {dashboardData?.data?.pending_invoices?.creation_date}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#262B43E5'
                    }}
                  >
                    Total Amount :
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 300,
                      color: '#262B43E5'
                    }}
                  >
                    {dashboardData?.data?.pending_invoices?.total_amount}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#262B43E5'
                    }}
                  >
                    Invoice Status :
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 300,
                      color: '#262B43E5'
                    }}
                  >
                    {dashboardData?.data?.pending_invoices?.invoice_status}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Card>
      )}
    </>
  )
}

export default PendingIncomeSection
