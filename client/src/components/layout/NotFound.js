import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const NotFound = () => {
  return (
    <Grid
      container
      justify='center'
      align='center'
      direction='column'
      style={{ padding: '10%' }}
    >
      <Typography variant='h4'>Not Found</Typography>
      <Typography variant='h6'>
        The page you're looking for does not exist.
      </Typography>
    </Grid>
  )
}

export default NotFound
