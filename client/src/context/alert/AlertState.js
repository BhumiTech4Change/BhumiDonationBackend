import { useContext, useReducer } from 'react'
import alertContext from './alertContext'
import AlertContext from './alertContext'
import alertReducer from './alertReducer'
import { SET_ALERT, REMOVE_ALERT } from '../types'
import { nanoid } from 'nanoid'

export const useAlert = () => {
    const { state, dispatch } = useContext(alertContext)
    return [ state, dispatch ]
}

export const setAlert = (dispatch, msg, type, timeout = 5000) => {
    const id = nanoid()
    dispatch({
        type: SET_ALERT,
        payload: {
            msg,
            type,
            id,
        },
    })

    setTimeout(
      () =>
        dispatch({
            type: REMOVE_ALERT,
            payload: id,
        }),
      timeout
    )
}

const AlertState = (props) => {
    const initialState = {
        alerts: [],
    }

    const [ state, dispatch ] = useReducer(alertReducer, initialState)

    return (
      <AlertContext.Provider value={{ state, dispatch }}>
          {props.children}
      </AlertContext.Provider>
    )
}

export default AlertState
