import React from 'react'
import {
  BrowserRouter,
  Router,
  Route,
  Switch,
  Link,
  NavLink,
} from 'react-router-dom'
// header taken out from AppRouter to put only on PrivateRoute (logged in users)
//import ConnectedHeader from '../components/Header'
import Dashboard from '../components/Dashboard'
import Create from '../components/Create'
import Edit from '../components/Edit'
import NotFound from '../components/404'
import ConnectedLogin from '../components/Login'
// yarn add history, to enable history api anywhere not only in component based on BrowserRouter, useful for login on app.js
import { createBrowserHistory } from 'history'
// locking pages only to logged in users for dashboard, edit, add
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

// if we want to use our own history here from  yarn add history, change BrowserRouter to ordinary Router and plug the history
const history = createBrowserHistory()

// const AppRouter = () => (
//   <Router history={history}>
//     <div>
//       <ConnectedHeader />
//       <Switch>
//         <Route exact path='/'> <ConnectedLogin /> </Route>
//         <Route path='/dashboard'> <Dashboard /> </Route>
//         <Route path='/create'> <Create /> </Route>
//         <Route path='/edit/:id'> <Edit /> </Route>
//         <Route path='/help'> <Help /> </Route>
//         <Route> <NotFound /> </Route>
//       </Switch>
//     </div>
//   </Router>
// )


const AppRouter = () => (
  <Router history={history}>
    <div>
      {/* <ConnectedHeader /> moved to PrivateRoute for logged in users*/}
      <Switch>
        <PublicRoute path='/' component={ConnectedLogin} exact={true} />
        <PrivateRoute path='/dashboard' component={Dashboard}/>
        <PrivateRoute path='/create' component={Create} />
        <PrivateRoute path='/edit/:id' component={Edit} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
)

export { history, AppRouter as default }