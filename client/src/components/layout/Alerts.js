import React from 'react'
import { useAlert } from '../../context/alert/AlertState'
import Alert from '@material-ui/lab/Alert'

const Alerts = () => {
  const [alertState] = useAlert()
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
