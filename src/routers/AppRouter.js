import React from 'react'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'
import Header from '../components/Header'
import Dashboard from '../components/Dashboard'
import Create from '../components/Create'
import Edit from '../components/Edit'
import Help from '../components/Help'
import NotFound from '../components/404'

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path='/' component={Dashboard} exact={true} />
        <Route path='/create' component={Create} />
        <Route path='/edit/:id' component={Edit} />
        <Route path='/help' component={Help} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default AppRouter
