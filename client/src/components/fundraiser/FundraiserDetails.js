import React from 'react'
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'

const FundraiserDetails = ({ fundraiser }) => {
  return (
    <>
      <Typography variant='h4' gutterBottom>
        Fundraiser for{' '}
        {fundraiser.type === 'ngo' ? fundraiser.ngo : fundraiser.subCategory}{' '}
        {fundraiser.type !== 'ngo' && <span>under {fundraiser.ngo}</span>}
      </Typography>
      <Typography variant='body1' paragraph style={{ padding: '2%' }}>
        {fundraiser.description}
      </Typography>
      <Alert severity='info' align='left' style={{ marginBottom: '2%' }}>
        <AlertTitle>Note</AlertTitle>
        To make a donation, fill your details and click on the 'Save Details'
        button. You would then see a 'Donate' button. Click on that to make the
        payment.
      </Alert>
    </>
  )
}

export default FundraiserDetails
