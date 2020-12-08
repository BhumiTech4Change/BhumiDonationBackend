import React, { useState } from 'react'
import {
  usePayments,
  setAmount,
  setDonor,
} from '../../context/payment/PaymentState'

const DetailsForm = ({ fundraiser: { isAmountFixed, amountPerDonor } }) => {
  const [, paymentDispatch] = usePayments()

  const [localDonor, setLocalDonor] = useState({
    name: '',
    email: '',
    contact: '',
  })

  const [localAmount, setLocalAmount] = useState(
    isAmountFixed ? amountPerDonor : 500
  )

  const { name, email, contact } = localDonor

  const onDonorChange = (e) =>
    setLocalDonor({ ...localDonor, [e.target.name]: e.target.value })
  const onAmountChange = (e) => setLocalAmount(e.target.value)

  const onSubmit = (e) => {
    e.preventDefault()
    setAmount(paymentDispatch, localAmount)
    setDonor(paymentDispatch, localDonor)
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onDonorChange}
        required
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onDonorChange}
        required
      />
      <input
        type='text'
        minLength='10'
        maxLength='10'
        placeholder='Contact'
        name='contact'
        value={contact}
        onChange={onDonorChange}
        required
      />
      <label htmlFor='slider'>Amount: {localAmount}</label>
      {!isAmountFixed && (
        <input
          type='range'
          min='100'
          max='10000'
          step='100'
          id='slider'
          value={localAmount}
          onChange={onAmountChange}
        />
      )}
      <input type='submit' value='Save Details' />
    </form>
  )
}

export default DetailsForm
