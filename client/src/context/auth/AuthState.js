import { useEffect, useContext, useReducer } from 'react'
import axios from 'axios'
import authReducer from './authReducer'
import AuthContext from './authContext'
import setAuthToken from '../../utils/setAuthToken'
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  CLEAR_ERRORS,
} from '../types'

export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext)
  return [state, dispatch]
}

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const loadUser = async (dispatch) => {
  try {
    const res = await axios.get('/api/auth')

    dispatch({
      type: USER_LOADED,
      payload: res.data.user,
    })
  } catch (err) {
    dispatch({ type: AUTH_ERROR })
  }
}

export const login = async (dispatch, formData) => {
  try {
    const res = await axios.post('/api/auth', formData, config)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.token,
    })

    loadUser(dispatch)
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.msg,
    })
  }
}

export const logout = (dispatch) => {
  dispatch({ type: LOGOUT })
}

export const clearErrors = (dispatch) => dispatch({ type: CLEAR_ERRORS })

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  setAuthToken(state.token)

  if (state.loading) loadUser(dispatch)

  useEffect(() => {
    setAuthToken(state.token)
  }, [state.token])

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
