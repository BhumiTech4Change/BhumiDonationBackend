import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
import { useAuth, logout } from '../../context/auth/AuthState'

const Navbar = () => {
  const [authState, authDispatch] = useAuth()
  const { isAuthenticated } = authState

  const onLogout = () => logout(authDispatch)

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6'>Fundraiser App</Typography>
        {isAuthenticated && (
          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
            }}
          >
            <Typography
              variant='h6'
              style={{ lineHeight: '2.6', fontWeight: '400' }}
            >
              <Link to='/admin' style={{ color: 'white' }}>
                Dashboard
              </Link>
            </Typography>
            <IconButton
              style={{ marginLeft: '10%', color: 'white' }}
              onClick={onLogout}
            >
              <ExitToAppIcon />
            </IconButton>
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
