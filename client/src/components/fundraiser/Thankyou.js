import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import React from 'react'

const Thankyou = () => {
  return (
    <Alert severity='success' align='left'>
      <AlertTitle>Payment Successful</AlertTitle>
      Thank you for your contribution.
    </Alert>
  )
}

export default Thankyou
