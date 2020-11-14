import React, { Fragment } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import MainNavbar from './components/layout/MainNavbar'
import Home from './components/pages/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Stats from './components/stats/Stats'
import Strava from './components/strava/Strava'
import Alerts from './components/layout/Alerts'
import Footer from './components/layout/Footer'
import Banner from './components/banners/Banner'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'

import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import RaceState from './context/race/RaceState'
import StravaState from './context/strava/StravaState'

import setAuthToken from './utils/setAuthToken'

import './App.css'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  return (
    <Fragment>
      <AuthState>
        <RaceState>
          <StravaState>
            <AlertState>
              <Router>
                <MainNavbar />
                <div className='globalCore'>
                  <Alerts />
                  <Switch>
                    <Route path='/stats/:userId' component={Banner} />
                    <Route path='/races/:userId' component={Banner} />
                    <Route path='/strava/:userId' component={Banner} />
                  </Switch>
                  <Switch>
                    <PrivateRoute
                      exact
                      path='/dashboard'
                      component={Dashboard}
                    />
                    <Redirect
                      exact
                      from='/'
                      to='/races/5bd91a027b59b61efe06ae3d'
                    />
                    <Redirect
                      exact
                      from='/stats'
                      to='/stats/5bd91a027b59b61efe06ae3d'
                    />
                    <Redirect
                      exact
                      from='/strava'
                      to='/strava/5bd91a027b59b61efe06ae3d'
                    />
                    <Route path='/stats/:userId' component={Stats} />
                    <Route path='/races/:userId' component={Home} />
                    <Route path='/strava/:userId' component={Strava} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                  </Switch>
                  <Footer />
                </div>
              </Router>
            </AlertState>
          </StravaState>
        </RaceState>
      </AuthState>
    </Fragment>
  )
}

export default App
