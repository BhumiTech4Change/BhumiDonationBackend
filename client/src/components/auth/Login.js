import React, { useState, useEffect } from 'react'
import { useAlert, setAlert } from '../../context/alert/AlertState'
import { clearErrors, login, useAuth } from '../../context/auth/AuthState'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const Login = (props) => {
  const [, alertDispatch] = useAlert()
  const [authState, authDispatch] = useAuth()
  const { isAuthenticated, error } = authState

  useEffect(() => {
    if (isAuthenticated) props.history.push('/admin')

    if (
      [
        'This email is not registered',
        'Incorrect password',
        'Validation error',
      ].includes(error)
    ) {
      setAlert(alertDispatch, 'Incorrect credentials', 'error')
      clearErrors(authDispatch)
    }
    if (error === 'You do not have admin priviliges') {
      setAlert(alertDispatch, error, 'error')
      clearErrors(authDispatch)
    }
  }, [error, isAuthenticated, props.history, authDispatch, alertDispatch])

  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const { email, password } = user

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()

    if (email === '' || password === '')
      setAlert(alertDispatch, 'Please enter both email and password', 'error')
    else {
      login(authDispatch, { email, password })
    }
  }

  return (
    <div style={formDivStyles}>
      <h1>Admin Login</h1>
      <form onSubmit={onSubmit} style={formStyles}>
        <TextField
          label='Email'
          name='email'
          type='email'
          variant='outlined'
          value={email}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label='Password'
          name='password'
          type='password'
          variant='outlined'
          value={password}
          onChange={onChange}
          fullWidth
        />
        <Button variant='contained' color='primary' type='submit'>
          Login
        </Button>
      </form>
    </div>
  )
}

const formDivStyles = {
  width: '100%',
  height: '100vh',
  textAlign: 'center',
  padding: '3%',
}

const formStyles = {
  width: '50%',
  height: '50%',
  margin: 'auto',
  paddingTop: '1%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
}

export default Login
