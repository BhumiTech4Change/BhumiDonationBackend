import { Button, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAlert, setAlert } from '../../context/alert/AlertState'
import { clearErrors, login, useAuth } from '../../context/auth/AuthState'

const Login = () => {
    const [ , alertDispatch ] = useAlert()
    const [ authState, authDispatch ] = useAuth()
    const { isAuthenticated, error } = authState
    let navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin')
        }

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
        if (error === 'You do not have admin privileges') {
            setAlert(alertDispatch, error, 'error')
            clearErrors(authDispatch)
        }
    }, [ error, isAuthenticated, authDispatch, alertDispatch ])

    const [ user, setUser ] = useState({
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
          <Typography variant='h4'>Admin Login</Typography>
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
