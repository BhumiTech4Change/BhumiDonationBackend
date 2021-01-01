import React, { useState, useEffect } from 'react'
import { useAlert, setAlert } from '../../context/alert/AlertState'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'

const Login = (props) => {
  const [, alertDispatch] = useAlert()
  const [error, setError] = useState('')
  const [details, setDetails] = useState({
    currentPwd: '',
    newPwd: '',
  })
  useEffect(() => {
    if (error !== '') setAlert(alertDispatch, error, 'error')
  }, [error, alertDispatch])

  const { currentPwd, newPwd } = details

  const onChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()

    if (currentPwd === '') setError('Please enter current password')
    else if (newPwd === '') setError('Please enter new password')
    else if (currentPwd === newPwd)
      setError('New password cannot be the same as old password')
    else if (
      !newPwd.match(
        /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
      )
    )
      setError('New password does not fulfill all conditions')
    else {
      try {
        await axios.post(
          '/api/auth/changepassword',
          { currentPwd, newPwd },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        setAlert(alertDispatch, 'Password changed', 'success')
        setDetails({
          currentPwd: '',
          newPwd: '',
        })
      } catch (err) {
        setError(err.response.data.msg)
      }
    }
  }

  return (
    <div style={formDivStyles}>
      <h1>Change Password</h1>
      <form onSubmit={onSubmit} style={formStyles}>
        <TextField
          label='Current Password'
          name='currentPwd'
          type='password'
          variant='outlined'
          value={currentPwd}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label='New Password'
          name='newPwd'
          type='password'
          variant='outlined'
          value={newPwd}
          onChange={onChange}
          fullWidth
        />
        <Alert severity='info'>
          Your password should be atleast 8 characters long and contain atleast
          1 uppercase, 1 lowercase, 1 special character and 1 number.
        </Alert>
        <Button variant='contained' color='primary' type='submit'>
          Update
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
