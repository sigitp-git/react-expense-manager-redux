import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'

const Login = (props) => (
  <div>
    <button
      onClick={() => {
        props.dispatch(startLogin())
      }}
    >
      Login
    </button>
  </div>
)

// connect Login props with startLogin function
// const mapDispatchToProps = (dispatch) => ({
//     startLogin: () => dispatch(startLogin())
// })

// connect() first argument is map state to props, second argument is map Dispatch to Prop
//const ConnectedLogin = connect(undefined, mapDispatchToProps)(Login)
const ConnectedLogin = connect()(Login)

export default ConnectedLogin
