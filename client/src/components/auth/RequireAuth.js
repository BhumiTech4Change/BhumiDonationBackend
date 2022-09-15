import React from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from '../../context/auth/AuthState';

function RequireAuth({ children }) {
    const [ authState ] = useAuth()
    const { isAuthenticated } = authState
    return isAuthenticated ? children : <Navigate to='/admin/login'/>;
}

export default RequireAuth