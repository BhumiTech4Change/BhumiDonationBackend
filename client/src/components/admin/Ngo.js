import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../layout/Spinner'
import { DataGrid } from '@material-ui/data-grid'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

const Ngo = ({
  match: {
    params: { ngoid },
  },
}) => {
  const [ngo, setNgo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/ngos/${ngoid}`)
        setNgo(res.data.ngo)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    fetchData()
  }, [ngoid])

  let rows
  if (ngo) {
    rows = ngo.subCategories.map((sub) => ({
      ...sub,
      id: sub.name,
    }))
  }

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 350 },
    {
      field: 'url',
      headerName: 'Website',
      width: 320,
      renderCell: (params) => (
        <Typography>
          <Link href={params.value}>{params.value}</Link>
        </Typography>
      ),
      sortable: false,
      filterable: false,
    },
    { field: 'createdAt', headerName: 'Date and Time', width: 200 },
  ]

  return loading ? (
    <Spinner />
  ) : (
    <>
      <Typography variant='h5' gutterBottom>
        {ngo.name}
        {'       '}
        <Link href={ngo.url} variant='caption'>
          Website
        </Link>
      </Typography>
      <Typography variant='subtitle1'>{ngo.description}</Typography>
      <Typography variant='h6' style={{ paddingTop: '2%' }}>
        Subcategories:
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

export default Ngo
