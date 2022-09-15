import React from 'react'
import { Button } from '@mui/material';

import { usePayments, verifyPayment } from '../../context/payment/PaymentState'


const loadScript = (src) =>
  new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    document.body.appendChild(script)
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
  })

const Razorpay = () => {
  const [paymentState, paymentDispatch] = usePayments()
  const {
    order,
    donor: { name, email, contact },
    fundraiser,
  } = paymentState
  const prod = document.domain !== 'localhost'

  const onPaymentSuccess = (response) => {
    let donor = {
      name,
      email,
      contact,
      amount: order.amount / 100,
    }
    let data = {
      order_id: order.id,
      ...response,
      donor,
      shortUrl: fundraiser.shortUrl,
    }
    verifyPayment(paymentDispatch, data)
  }
  const onPaymentFailure = (response) => console.log('fail', response)

  const displayRazorpay = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    if (!res)
      return alert('Razorpay SDK failed to load. Make sure you are online')

    const options = {
      key: prod ? process.env.RAZORPAY_ID : process.env.REACT_APP_RAZORPAY_ID,
      amount: order.amount,
      currency: 'INR',
      name: fundraiser.subCategory || fundraiser.ngo,
      description: 'Thank you for your kindness.',
      image: 'https://www.bhumi.ngo/wp-content/uploads/2016/06/logo-bhumi.png',
      order_id: order.id,
      handler: onPaymentSuccess,
      prefill: {
        name,
        email,
        contact,
      },
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.on('payment.failed', onPaymentFailure)
    paymentObject.open()
  }

  return (
    <Button
      variant='contained'
      color='primary'
      size='large'
      onClick={displayRazorpay}
    >
      Donate
    </Button>
  )
}

export default Razorpay
