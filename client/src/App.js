import './App.css'
import Fundraiser from './components/fundraiser/Fundraiser'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PaymentState from './context/payment/PaymentState'

const App = () => {
  return (
    <PaymentState>
      <Router>
        <h1>Let's say this is a navbar</h1>
        <Switch>
          <Route exact path='/fundraiser/:shortUrl' component={Fundraiser} />
        </Switch>
      </Router>
    </PaymentState>
  )
}

export default App
