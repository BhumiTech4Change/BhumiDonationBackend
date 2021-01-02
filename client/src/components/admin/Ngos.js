import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../layout/Spinner'
import { DataGrid } from '@material-ui/data-grid'
import { Link as RouterLink } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

const Ngos = () => {
  const [ngos, setNgos] = useState([])
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/ngos')
        setRows(
          res.data.ngos.map((ngo) => ({
            ...ngo,
            id: ngo._id,
          }))
        )
        setLoading(false)
        setNgos(res.data.ngos)
      } catch (error) {
        setLoading(false)
      }
    }
    fetchData()
  }, [ngos])

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'description', headerName: 'Description', width: 270 },
    {
      field: 'subCategories',
      headerName: 'Sub-Categories',
      width: 160,
      valueFormatter: (params) => params.value.length.toString(),
    },
    {
      field: 'url',
      headerName: 'Website',
      width: 170,
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
      field: '_id',
      headerName: 'Actions',
      width: 170,
      renderCell: (params) => (
        <>
          <Typography>
            <RouterLink to={`/admin/ngos/${params.value}`}>
              View More
            </RouterLink>
          </Typography>
          <IconButton
            color='secondary'
            style={{ marginLeft: 12 }}
            onClick={onDelete}
            data-id={params.value}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
      sortable: false,
      filterable: false,
    },
  ]

  const onDelete = async (e) => {
    let { id } = e.target.closest('button').dataset

    await axios.delete(`/api/admin/ngos/${id}`)
    setRows(rows.filter((row) => row.id !== id))
  }

  return loading ? (
    <Spinner />
  ) : (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: 25,
        }}
      >
        <Typography variant='h6'>NGOs:</Typography>
        <Typography variant='button'>
          <RouterLink to={`/admin/ngos/add`}>Add NGO</RouterLink>
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

export default Ngos
