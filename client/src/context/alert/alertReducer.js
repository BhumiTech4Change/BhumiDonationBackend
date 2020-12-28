import { SET_ALERT, REMOVE_ALERT } from '../types'

const alertReducer = (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        alerts: [action.payload, ...state.alerts],
      }
    case REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== action.payload),
      }
    default:
      throw new Error(`Unsupported action of type ${action.type}`)
  }
}

export default alertReducer
