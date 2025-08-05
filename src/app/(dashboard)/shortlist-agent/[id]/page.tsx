// app/shortlist-agent/[id]/page.tsx

import { Grid } from '@mui/material'

import EventDetails from '@/views/dynamicShortlist/EventDetails'
import UserProfile from '@/views/dynamicShortlist/UserProfile'

interface PageProps {
  params: {
    id: string
  }
}

export default function AgentDetail({ params }: PageProps) {
  console.log(params, 'params')

  return (
    <div>
      <section>
        <Grid container spacing={6}>
          <Grid item xs={12} lg={3} md={5}>
            <UserProfile />
          </Grid>
          <Grid item xs={12} lg={9} md={7}>
            <EventDetails />
          </Grid>
        </Grid>
      </section>
    </div>
  )
}
