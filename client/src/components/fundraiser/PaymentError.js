import { Alert, AlertTitle } from '@mui/material';
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
