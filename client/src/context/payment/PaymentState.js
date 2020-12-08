import { useContext, useReducer } from 'react'
import axios from 'axios'
import PaymentContext from './paymentContext'
import paymentReducer from './paymentReducer'
import {
  GET_FUNDRAISER,
  NOT_FOUND_ERROR,
  RAZORPAY_ERROR,
  SET_AMOUNT,
  SET_DONOR,
  SET_ORDER,
} from '../types'

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

//custom hook
export const usePayments = () => {
  const { state, dispatch } = useContext(PaymentContext)
  return [state, dispatch]
}

export const getFundraiser = async (dispatch, shortUrl) => {
  try {
    const res = await axios.get(`/api/fundraisers/${shortUrl}`)

    dispatch({
      type: GET_FUNDRAISER,
      payload: res.data.fundraiser,
    })
  } catch (err) {
    dispatch({
      type: NOT_FOUND_ERROR,
    })
  }
}

export const setDonor = (dispatch, donor) => {
  dispatch({
    type: SET_DONOR,
    payload: donor,
  })
}

export const setAmount = (dispatch, amount) => {
  dispatch({
    type: SET_AMOUNT,
    payload: amount,
  })
  createOrder(dispatch, amount)
}

const createOrder = async (dispatch, amount) => {
  try {
    const res = await axios.post(`/api/razorpay`, { amount }, config)
    dispatch({
      type: SET_ORDER,
      payload: res.data.order,
    })
  } catch (err) {
    dispatch({
      type: RAZORPAY_ERROR,
      payload: err.response.data.msg,
    })
  }
}

const PaymentState = (props) => {
  const initialState = {
    fundraiser: null,
    loading: true,
    error: null,
    donor: null,
    amount: null,
    order: null,
    razorpayError: null,
  }

  const [state, dispatch] = useReducer(paymentReducer, initialState)

  return (
    <PaymentContext.Provider value={{ state, dispatch }}>
      {props.children}
    </PaymentContext.Provider>
  )
}

export default PaymentState
