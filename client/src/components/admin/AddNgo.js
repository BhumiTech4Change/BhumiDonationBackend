import React, { useState, useEffect } from 'react'
import { useAlert, setAlert } from '../../context/alert/AlertState'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import Typography from '@material-ui/core/Typography'

const AddNgo = () => {
  const [, alertDispatch] = useAlert()
  const [error, setError] = useState('')
  const [ngo, setNgo] = useState({
    name: '',
    description: '',
    url: '',
  })
  const [file, setFile] = useState('')
  const [filename, setFilename] = useState('Choose file')
  useEffect(() => {
    if (error) setAlert(alertDispatch, error, 'error')
  }, [error, alertDispatch])

  const { name, description, url } = ngo

  const onFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0])
      setFilename(e.target.files[0].name)
    }
  }

  const onChange = (e) => setNgo({ ...ngo, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()

    if (name === '' || description === '' || url === '')
      setError('Please fill all fields')
    else if (file === '') setError('Please upload a logo')
    else {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('name', name)
      formData.append('description', description)
      formData.append('url', url)
      try {
        await axios.post('/api/admin/ngos', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        setAlert(alertDispatch, 'NGO added successfully', 'success')
        setNgo({
          name: '',
          description: '',
          url: '',
        })
        setFile('')
        setFilename('Choose file')
      } catch (err) {
        setError(err.response.data.msg)
      }
    }
  }

  return (
    <div style={formDivStyles}>
      <h1>Add NGO</h1>
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
        <Alert severity='info'>
          Please enter full url starting with http(s)://
        </Alert>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <input
            accept='image/*'
            style={{ display: 'none' }}
            id='contained-button-file'
            multiple
            type='file'
            onChange={onFileChange}
          />
          <label htmlFor='contained-button-file'>
            <Button variant='contained' color='secondary' component='span'>
              Upload NGO Logo
            </Button>
          </label>
          <Typography>{filename}</Typography>
        </div>
        <Button variant='contained' color='primary' type='submit'>
          Add NGO
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
  height: '70%',
  margin: 'auto',
  paddingTop: '1%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
}

export default AddNgo
