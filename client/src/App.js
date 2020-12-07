import './App.css'
import Fundraiser from './components/Fundraiser'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <h1>Let's say this is a navbar</h1>
      <Switch>
        <Route exact path='/fundraiser/:shortUrl' component={Fundraiser} />
      </Switch>
    </Router>
  )
}

export default App
