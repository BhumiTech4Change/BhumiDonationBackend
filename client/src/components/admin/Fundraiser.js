import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../layout/Spinner'
import { DataGrid } from '@material-ui/data-grid'
import Typography from '@material-ui/core/Typography'

const Fundraiser = ({
  match: {
    params: { shortUrl },
  },
}) => {
  const [fundraiser, setFundraiser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/fundraisers/${shortUrl}`)
        setFundraiser(res.data.fundraiser)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    fetchData()
  }, [shortUrl])

  let rows
  if (fundraiser) {
    rows = fundraiser.donors.map((donor) => ({
      ...donor,
      id: donor.payment_id,
      amount: `₹${donor.amount}`,
    }))
  }

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'contact', headerName: 'Mobile', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 150 },
    { field: 'donatedAt', headerName: 'Date and Time', width: 200 },
    { field: 'payment_id', headerName: 'Razorpay PaymentID', width: 200 },
  ]

  return loading ? (
    <Spinner />
  ) : (
    <>
      <Typography variant='h5' gutterBottom>
        Fundraiser for{' '}
        {fundraiser.type === 'ngo' ? fundraiser.ngo : fundraiser.subCategory}{' '}
        {fundraiser.type !== 'ngo' && <span>under {fundraiser.ngo}</span>}
      </Typography>
      <Typography variant='subtitle1'>{fundraiser.description}</Typography>
      <Typography>
        <strong>Created by</strong>: {fundraiser.creatorName} on{' '}
        {fundraiser.createdAt.substring(0, 11)}{' '}
      </Typography>
      <Typography>
        <strong>Total amount raised</strong>: {`₹${fundraiser.amountRaised}`}
      </Typography>
      <Typography variant='h6' style={{ paddingTop: '2%' }}>
        Donors' Details:
      </Typography>

      <div style={{ height: '500px', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          showToolbar
          showCellRightBorder
        />
      </div>
    </>
  )
}

export default Fundraiser
