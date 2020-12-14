import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import React from 'react'

const PaymentError = () => {
  return (
    <Alert severity='Error' align='left'>
      <AlertTitle>Error</AlertTitle>
      Payment could not be verified.
    </Alert>
  )
}

export default PaymentError
