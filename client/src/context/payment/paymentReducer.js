import {
  GET_FUNDRAISER,
  NOT_FOUND_ERROR,
  PAYMENT_SUCCESS,
  RAZORPAY_ERROR,
  SET_AMOUNT,
  SET_DONOR,
  SET_LOADING,
  SET_ORDER,
} from '../types'

const paymentReducer = (state, action) => {
  switch (action.type) {
    case GET_FUNDRAISER:
      return {
        ...state,
        fundraiser: action.payload,
      }
    case SET_DONOR:
      return {
        ...state,
        donor: action.payload,
      }
    case SET_AMOUNT:
      return {
        ...state,
        amount: action.payload,
      }
    case SET_ORDER:
      return {
        ...state,
        order: action.payload,
      }
    case PAYMENT_SUCCESS:
      return {
        ...state,
        isPaymentDone: true,
      }
    case RAZORPAY_ERROR:
      return {
        ...state,
        razorpayError: action.payload,
      }
    case NOT_FOUND_ERROR:
      return {
        ...state,
        error: 404,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state
  }
}

export default paymentReducer
