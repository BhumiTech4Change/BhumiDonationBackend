import React, { useState, useEffect } from 'react'
import { useAlert, setAlert } from '../../context/alert/AlertState'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import Typography from '@material-ui/core/Typography'

const AddCategory = ({
  match: {
    params: { ngoid },
  },
}) => {
  const [, alertDispatch] = useAlert()
  const [error, setError] = useState('')
  const [sub, setSub] = useState({
    name: '',
    description: '',
    url: '',
  })
  useEffect(() => {
    if (error) setAlert(alertDispatch, error, 'error')
  }, [error, alertDispatch])

  const { name, description, url } = sub

  const onChange = (e) => setSub({ ...sub, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()

    if (name === '' || description === '' || url === '')
      setError('Please fill all fields')
    else {
      try {
        await axios.post(
          `/api/admin/ngos/${ngoid}/categories`,
          { name, description, url },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        setAlert(alertDispatch, 'Category added successfully', 'success')
        setSub({
          name: '',
          description: '',
          url: '',
        })
      } catch (err) {
        setError(err.response.data.msg)
      }
    }
  }

  return (
    <div style={formDivStyles}>
      <Typography variant='h4'>Add Sub-Category</Typography>
      <form onSubmit={onSubmit} style={formStyles}>
        <TextField
          label='Name'
          name='name'
          size='small'
          variant='outlined'
          value={name}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label='Description'
          name='description'
          multiline
          rows={2}
          variant='outlined'
          value={description}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label='URL'
          size='small'
          name='url'
          type='url'
          variant='outlined'
          value={url}
          onChange={onChange}
          fullWidth
        />
        <Alert severity='info' align='left'>
          Please enter full url starting with http(s)://
        </Alert>

        <Button variant='contained' color='primary' type='submit'>
          Add
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
  height: '60%',
  margin: 'auto',
  paddingTop: '1%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
}

export default AddCategory
