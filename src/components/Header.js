import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogout } from '../actions/auth'

const Header = (props) => (
  <header>
    <h1>Expense Manager</h1>
    <NavLink to='/dashboard' activeClassName='is-active' exact={true}>
      Dashboard
    </NavLink>
    <NavLink to='/create' activeClassName='is-active'>
      Create
    </NavLink>
    <NavLink to='/help' activeClassName='is-active'>
      Help
    </NavLink>
    <button
      onClick={() => {
        props.dispatch(startLogout())
      }}
    >
      Logout
    </button>
  </header>
)

const ConnectedHeader = connect()(Header)

export default ConnectedHeader
