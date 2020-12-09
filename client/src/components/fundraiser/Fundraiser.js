import React, { useEffect } from 'react'
import Spinner from '../layout/Spinner'
import NotFound from '../layout/NotFound'
import Razorpay from '../payment/Razorpay'
import DetailsForm from './DetailsForm'
import { usePayments, getFundraiser } from '../../context/payment/PaymentState'
import Thankyou from './Thankyou'

const Fundraiser = ({
  match: {
    params: { shortUrl },
  },
}) => {
  const [paymentState, paymentDispatch] = usePayments()
  const {
    fundraiser,
    loading,
    error,
    amount,
    donor,
    order,
    isPaymentDone,
  } = paymentState

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
        <>
          <p>{fundraiser.title}</p>
          <p>{fundraiser.description}</p>
          {!isPaymentDone ? (
            donor && amount && order ? (
              <Razorpay fundraiser={fundraiser} />
            ) : (
              <DetailsForm fundraiser={fundraiser} />
            )
          ) : (
            <Thankyou />
          )}
        </>
      )}
    </>
  )
}

export default Fundraiser
