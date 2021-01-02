import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../layout/Spinner'
import { DataGrid, setRowCountStateUpdate } from '@material-ui/data-grid'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import { Link as RouterLink } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

const Ngo = ({
  match: {
    params: { ngoid },
  },
}) => {
  const [ngo, setNgo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/ngos/${ngoid}`)
        setNgo(res.data.ngo)
        setRows(res.data.ngo.subCategories)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    fetchData()
  }, [ngoid])

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 350 },
    {
      field: 'url',
      headerName: 'Website',
      width: 300,
      renderCell: (params) => (
        <Typography>
          <Link href={params.value}>{params.value}</Link>
        </Typography>
      ),
      sortable: false,
      filterable: false,
    },
    { field: 'createdAt', headerName: 'Date and Time', width: 200 },
    {
      field: 'id',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <IconButton color='secondary' onClick={onDelete} data-id={params.value}>
          <DeleteIcon />
        </IconButton>
      ),
      sortable: false,
      filterable: false,
    },
  ]

  const onDelete = async (e) => {
    const { id } = e.target.closest('button').dataset
    await axios.delete(`/api/admin/ngos/${ngoid}/categories/${id}`)
    setRows(rows.filter((row) => row.id !== id))
  }

  return loading ? (
    <Spinner />
  ) : (
    <>
      <Grid container style={{ padding: 8 }}>
        <Grid item xs={2}>
          <Avatar
            src={`/uploads/${ngo.logo}`}
            alt='Logo'
            style={{ width: 200, height: 200 }}
          />
        </Grid>
        <Grid item xs={10} align='center'>
          <Typography variant='h4' gutterBottom>
            {ngo.name}
            {'       '}
            <Link href={ngo.url} variant='caption'>
              Website
            </Link>
          </Typography>
          <Typography variant='subtitle1'>{ngo.description}</Typography>
        </Grid>
      </Grid>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: 25,
        }}
      >
        <Typography variant='h6'>Sub-Categories:</Typography>
        <Typography variant='button'>
          <RouterLink to={`/admin/ngos/${ngoid}/addcategory`}>
            Add Sub-Category
          </RouterLink>
        </Typography>
      </div>

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
