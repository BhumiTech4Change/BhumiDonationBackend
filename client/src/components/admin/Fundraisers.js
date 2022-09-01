import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../layout/Spinner'
import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'

const Fundraisers = () => {
  const [fundraisers, setFundraisers] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/admin/fundraisers')
        setLoading(false)
        setFundraisers(res.data.fundraisers)
      } catch (error) {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const rows = fundraisers.map((fundraiser) => ({
    ...fundraiser,
    id: fundraiser._id,
    amountRaised: fundraiser.amountRaised,
    createdAt: fundraiser.createdAt.substring(0, 11),
    subCategory: fundraiser.subCategory ? fundraiser.subCategory : '-nil-',
  }))
  const columns = [
    { field: 'ngo', headerName: 'NGO', width: 200 },
    { field: 'subCategory', headerName: 'Sub-Category', width: 200 },
    { field: 'amountRaised', headerName: 'Amount Raised', width: 150 },
    { field: 'creatorName', headerName: 'Created By', width: 180 },
    { field: 'createdAt', headerName: 'Created On', width: 140 },
    {
      field: 'shortUrl',
      headerName: 'Details',
      width: 150,
      renderCell: (params) => (
        <Typography>
          <Link to={`/admin/fundraisers/${params.value}`}>View More</Link>
        </Typography>
      ),
      sortable: false,
      filterable: false,
    },
  ]

  return loading ? (
    <Spinner />
  ) : (
    <>
      <Typography variant='h6' style={{ paddingTop: '2%' }}>
        Fundraisers:
      </Typography>
      <div style={{ height: '500px', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
          showToolbar
          showCellRightBorder
        />
      </div>
    </>
  )
}

export default Fundraisers
