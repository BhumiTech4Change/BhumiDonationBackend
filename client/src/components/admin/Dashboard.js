import React from 'react'
import CardWithLink from './CardWithLink'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const Dashboard = () => {
  return (
    <div>
      <Typography variant='h4' style={{ padding: '2% 0' }}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <CardWithLink
            title='Change your account password'
            link='changepassword'
            linkText='Change'
          />
        </Grid>
        <Grid item xs={3}>
          <CardWithLink
            title='View All Fundraisers'
            link='fundraisers'
            linkText='View'
          />
        </Grid>
        <Grid item xs={3}>
          <CardWithLink title='View All NGOs' link='ngos' linkText='View' />
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard
