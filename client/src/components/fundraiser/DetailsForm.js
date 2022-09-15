import React, { useState } from 'react'
import { Button, InputAdornment, Slider, TextField, Typography } from '@mui/material';
import { AccountCircle, Email, Phone, Save } from '@mui/icons-material';

import {
    usePayments,
    setAmount,
    setDonor,
} from '../../context/payment/PaymentState'

const DetailsForm = () => {
    const [ , paymentDispatch ] = usePayments()

    const [ localDonor, setLocalDonor ] = useState({
        name: '',
        email: '',
        contact: '',
    })

    const [ localAmount, setLocalAmount ] = useState(500)

    const { name, email, contact } = localDonor

    const onDonorChange = (e) =>
      setLocalDonor({ ...localDonor, [e.target.name]: e.target.value })

    const onAmountChange = (e, val) => setLocalAmount(val)

    const onSubmit = (e) => {
        e.preventDefault()

        setAmount(paymentDispatch, localAmount)
        setDonor(paymentDispatch, localDonor)
    }

    let formStyles = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '90%',
        alignItems: 'center',
    }

    let marks = [
        {
            value: 100,
            label: '₹100',
        },
        {
            value: 5000,
            label: '₹5000',
        },
    ]

    return (
      <form onSubmit={onSubmit} style={formStyles}>
          <TextField
            label='Name'
            name='name'
            size='small'
            variant='outlined'
            value={name}
            onChange={onDonorChange}
            required
            InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                      <AccountCircle fontSize='small'/>
                  </InputAdornment>
                ),
            }}
          />
          <br/>
          <TextField
            type='email'
            label='Email'
            size='small'
            name='email'
            variant='outlined'
            value={email}
            onChange={onDonorChange}
            required
            InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                      <Email fontSize='small'/>
                  </InputAdornment>
                ),
            }}
          />
          <br/>
          <TextField
            inputProps={{ minLength: '10', maxLength: '10' }}
            size='small'
            label='Contact Number'
            name='contact'
            variant='outlined'
            value={contact}
            onChange={onDonorChange}
            required
            InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                      <Phone fontSize='small'/>
                  </InputAdornment>
                ),
            }}
          />
          <br/>
          <Typography gutterBottom>Amount:</Typography>
          <Slider
            value={localAmount}
            onChange={onAmountChange}
            step={100}
            size='small'
            valueLabelDisplay='on'
            min={100}
            max={5000}
            marks={marks}
            style={{ width: '70%' }}
          />

          <Button
            variant='contained'
            color='primary'
            size='small'
            startIcon={<Save/>}
            type='submit'
          >
              Save Details
          </Button>
      </form>
    )
}

export default DetailsForm
