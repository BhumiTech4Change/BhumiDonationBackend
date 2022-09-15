import { Alert } from '@mui/material';
import React from 'react'

import { useAlert } from '../../context/alert/AlertState'

const Alerts = () => {
    const [ alertState ] = useAlert()
    const { alerts } = alertState
    return (
        alerts.length > 0 &&
        alerts.map((alert) => (
            <Alert key={alert.id} variant='filled' severity={alert.type}>
                {alert.msg}
            </Alert>
        ))
    )
}

export default Alerts
