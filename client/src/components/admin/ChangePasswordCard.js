import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

const ChangePasswordCard = () => {
  return (
    <Card variant='outlined'>
      <CardContent>
        <Typography color='textSecondary' gutterBottom>
          Change your account password
        </Typography>
      </CardContent>
      <CardActions>
        <Typography>
          <Link to='/admin/changepassword'>Change Password</Link>
        </Typography>
      </CardActions>
    </Card>
  )
}

export default ChangePasswordCard
