import React from 'react'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'
import ConnectedHeader from '../components/Header'
import Dashboard from '../components/Dashboard'
import Create from '../components/Create'
import Edit from '../components/Edit'
import Help from '../components/Help'
import NotFound from '../components/404'
import ConnectedLogin from '../components/Login'

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <ConnectedHeader />
      <Switch>
        <Route path='/' component={ConnectedLogin} exact={true} />
        <Route path='/dashboard' component={Dashboard} exact={true} />
        <Route path='/create' component={Create} />
        <Route path='/edit/:id' component={Edit} />
        <Route path='/help' component={Help} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default AppRouter
