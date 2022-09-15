import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

const CardWithLink = ({ title, link, linkText }) => {
    return (
      <Card variant='outlined' raised>
          <CardContent>
              <Typography gutterBottom>{title}</Typography>
          </CardContent>
          <CardActions>
              <Button color='primary' component={RouterLink} to={`/admin/${link}`}>
                  {linkText}
              </Button>
          </CardActions>
      </Card>
    )
}

export default CardWithLink
