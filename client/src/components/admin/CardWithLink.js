import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

const CardWithLink = ({ title, link, linkText }) => {
  return (
    <Card variant='outlined' raised>
      <CardContent>
        <Typography gutterBottom>{title}</Typography>
      </CardContent>
      <CardActions>
        <Button color='primary' component={Link} to={`/admin/${link}`}>
          {linkText}
        </Button>
      </CardActions>
    </Card>
  )
}

export default CardWithLink
