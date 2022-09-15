import { ExitToApp } from '@mui/icons-material';
import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';

import { useAuth, logout } from '../../context/auth/AuthState'

const Navbar = () => {
    const [ authState, authDispatch ] = useAuth()
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
                        <ExitToApp/>
                    </IconButton>
                </div>
              )}
          </Toolbar>
      </AppBar>
    )
}

export default Navbar
