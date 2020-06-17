import React from 'react'
// connect to state redux auth
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

// const PrivateRoute = (props) => (
//     <Route {...props}/>
// )
// destructure the props from the AppRouter.js and connect(),
// to separate out props: isAuth and Component and ...rest{path exact etc, rest is just a name}
// for conditional logic login/logout
// component setup as function that returns jsx
const PublicRoute = ({ isAuth, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={(props) =>
      isAuth ? <Redirect to='/dashboard' /> : <Component {...props} />
    }
  />
)

const mapStateToProps = (state) => ({
  // !! convert truthy to boolean value
  isAuth: !!state.auth.uid,
})

export default connect(mapStateToProps)(PublicRoute)
