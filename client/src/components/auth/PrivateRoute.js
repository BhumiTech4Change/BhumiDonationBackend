import React from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from '../../context/auth/AuthState'

const PrivateRoute = ({ children }) => {
    const [ authState ] = useAuth()
    const { isAuthenticated } = authState
    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace/>;
    }

    return children;
};

export default PrivateRoute
