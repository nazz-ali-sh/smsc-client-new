'use client'

import { Grid, Box, Container } from '@mui/material'



// DrawerStats

interface drawerface {
  DrawerStats?: any
  drawerData?: any
  TenderResponse?: any
}


const ViewPmaFullProfile: React.FC<drawerface> = ({  }) => {
  

  
  return (
    <div>
      <Container maxWidth={false} sx={{ py: 4 }}>
        <Box>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              {/* <CongratulationsSection startDate={finalResultResponce?.data?.pma_start_date} /> */}
            </Grid>
            <Grid item xs={12} md={4}>
              {/* <PmaDetails drawerData={responceData} /> */}
            </Grid>
            <Grid item xs={12} md={8}>
              {/* <PmaAllResponce drawerData={responceData} DrawerStats={DrawerStats} /> */}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  )
}

export default ViewPmaFullProfile
