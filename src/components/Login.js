import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'

const Login = (props) => (
  <div className='box-layout'>
    <div className='box-layout__box'>
      <h1 className='box-layout__title'>Expense Manager</h1>
      <p className='box-layout__subtitle'>Your expenses, managed!</p>
      <button
        className='button'
        onClick={() => {
          props.dispatch(startLogin())
        }}
      >
        Login with Google
      </button>
    </div>
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
