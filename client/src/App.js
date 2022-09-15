import { Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Fundraiser from './components/fundraiser/Fundraiser'
import RequireAuth from './components/auth/RequireAuth'
import PaymentState from './context/payment/PaymentState'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import Navbar from './components/layout/Navbar'
import NotFound from './components/layout/NotFound'
import Login from './components/auth/Login'
import Dashboard from './components/admin/Dashboard'
import Alerts from './components/layout/Alerts'
import ChangePassword from './components/auth/ChangePassword'
import Fundraisers from './components/admin/Fundraisers'
import AdminFundraiser from './components/admin/Fundraiser'
import Ngos from './components/admin/Ngos'
import AddNgo from './components/admin/AddNgo'
import Ngo from './components/admin/Ngo'
import AddCategory from './components/admin/AddCategory'

import './App.css'

const App = (props) => {
    return (
      <AuthState>
          <PaymentState>
              <AlertState>
                  <Router>
                      <Navbar/>
                      <Container>
                          <Alerts/>
                          <Routes>
                              <Route
                                exact
                                path='/'
                                element={<RequireAuth> <Dashboard/> </RequireAuth>}
                              />
                              <Route
                                exact
                                path='/fundraiser/:shortUrl'
                                element={<Fundraiser/>}
                              />
                              <Route exact path='/admin/login' element={<Login/>}/>
                              <Route exact path='/admin' element={<RequireAuth> <Dashboard/> </RequireAuth>}/>
                              <Route
                                exact
                                path='/admin/changepassword'
                                element={<RequireAuth> <ChangePassword/> </RequireAuth>}
                              />
                              <Route
                                exact
                                path='/admin/fundraisers'
                                element={<RequireAuth> <Fundraisers/> </RequireAuth>}
                              />
                              <Route
                                exact
                                path='/admin/fundraisers/:shortUrl'
                                element={<RequireAuth> <AdminFundraiser/> </RequireAuth>}
                              />
                              <Route exact path='/admin/ngos' element={<RequireAuth> <Ngos/> </RequireAuth>}/>
                              <Route exact path='/admin/ngos/add' element={<RequireAuth> <AddNgo/> </RequireAuth>}/>
                              <Route exact path='/admin/ngos/:ngoId' element={<RequireAuth> <Ngo/> </RequireAuth>}/>
                              <Route
                                exact
                                path='/admin/ngos/:ngoId/addcategory'
                                element={<AddCategory/>}
                              />
                              <Route element={<NotFound/>}/>
                          </Routes>
                      </Container>
                  </Router>
              </AlertState>
          </PaymentState>
      </AuthState>
    )
}

export default App
