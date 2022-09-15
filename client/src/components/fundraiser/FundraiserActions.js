import React from 'react'

import { usePayments } from '../../context/payment/PaymentState'
import Razorpay from '../payment/Razorpay'
import DetailsForm from './DetailsForm'
import ThankYou from './ThankYou'
import PaymentError from './PaymentError'

const FundraiserActions = () => {
    const [ paymentState ] = usePayments()
    const {
        fundraiser,
        amount,
        donor,
        order,
        isPaymentDone,
        razorpayError,
    } = paymentState
    return (
      <>
          {!isPaymentDone ? (
            donor && amount && order ? (
              <Razorpay fundraiser={fundraiser}/>
            ) : (
              <DetailsForm/>
            )
          ) : !razorpayError ? (
            <ThankYou/>
          ) : (
            <PaymentError/>
          )}
      </>
    )
}

export default FundraiserActions
