import React, { useEffect } from 'react'
import Spinner from '../layout/Spinner'
import NotFound from '../layout/NotFound'
import { usePayments, getFundraiser } from '../../context/payment/PaymentState'
import FundraiserDetails from './FundraiserDetails'
import FundraiserActions from './FundraiserActions'
import Grid from '@material-ui/core/Grid'

const Fundraiser = ({
  match: {
    params: { shortUrl },
  },
}) => {
  const [paymentState, paymentDispatch] = usePayments()
  const { fundraiser, loading, error } = paymentState

  useEffect(() => {
    getFundraiser(paymentDispatch, shortUrl)
  }, [paymentDispatch, shortUrl])

  return (
    <>
      {error ? (
        <NotFound />
      ) : loading ? (
        <Spinner />
      ) : (
        <Grid
          style={{ minHeight: '100vh', padding: '5%' }}
          container
          direction='row'
          spacing={1}
        >
          <Grid item align='center' xs={12} sm={8}>
            <FundraiserDetails fundraiser={fundraiser} />
          </Grid>
          <Grid item align='center' xs={12} sm={4}>
            <FundraiserActions />
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default Fundraiser
