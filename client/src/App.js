import './App.css'
import Fundraiser from './components/fundraiser/Fundraiser'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PaymentState from './context/payment/PaymentState'
import AuthState from './context/auth/AuthState'
import Navbar from './components/layout/Navbar'
import NotFound from './components/layout/NotFound'
import Login from './components/auth/Login'

const App = () => {
  return (
    <AuthState>
      <PaymentState>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/fundraiser/:shortUrl' component={Fundraiser} />
            <Route exact path='/admin/login' component={Login} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </PaymentState>
    </AuthState>
  )
}

export default App
