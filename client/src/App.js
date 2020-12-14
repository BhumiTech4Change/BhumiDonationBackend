import './App.css'
import Fundraiser from './components/fundraiser/Fundraiser'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PaymentState from './context/payment/PaymentState'
import Navbar from './components/layout/Navbar'

const App = () => {
  return (
    <PaymentState>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/fundraiser/:shortUrl' component={Fundraiser} />
        </Switch>
      </Router>
    </PaymentState>
  )
}

export default App
