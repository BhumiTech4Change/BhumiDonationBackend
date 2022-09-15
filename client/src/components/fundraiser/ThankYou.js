import { Alert, AlertTitle } from '@mui/material';
import React from 'react'

const ThankYou = () => {
  return (
    <Alert severity='success' align='left'>
      <AlertTitle>Payment Successful</AlertTitle>
      Thank you for your contribution.
    </Alert>
  )
}

export default ThankYou
