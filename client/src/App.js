import './App.css'
import Fundraiser from './components/fundraiser/Fundraiser'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './components/auth/PrivateRoute'
import PaymentState from './context/payment/PaymentState'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import Navbar from './components/layout/Navbar'
import NotFound from './components/layout/NotFound'
import Login from './components/auth/Login'
import Dashboard from './components/admin/Dashboard'
import Container from '@material-ui/core/Container'
import Alerts from './components/layout/Alerts'

const App = () => {
  return (
    <AuthState>
      <PaymentState>
        <AlertState>
          <Router>
            <Navbar />
            <Container>
              <Alerts />
              <Switch>
                <Route
                  exact
                  path='/fundraiser/:shortUrl'
                  component={Fundraiser}
                />
                <Route exact path='/admin/login' component={Login} />
                <PrivateRoute exact path='/admin' component={Dashboard} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Router>
        </AlertState>
      </PaymentState>
    </AuthState>
  )
}

export default App
