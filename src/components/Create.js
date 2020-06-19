import React from 'react'
import { connect } from 'react-redux'
import Form from './Form'
//modified after redux-thunk to use the function action
import { funcAddExpense } from '../actions/expenses'
//import { addExpense } from '../actions/expenses'

const Create = (props) => (
  <div>
    <div className='page-header'>
      <div className='content-container'>
        <h1 className='page-header__title'>Create Expense</h1>
      </div>
    </div>
    <div className="content-container">
      <Form
        onSubmit={(expense) => {
          props.dispatch(funcAddExpense(expense))
          props.history.push('/dashboard')
        }}
      />
    </div>
  </div>
)

// connect()(Create) throw props to Create() where we can use props.dispatch to the state action generator
// connect()(Create) throw props.history() to Create() as well. history() does not refresh browser, it is Browser routing
const ConnectedCreate = connect()(Create)
export default ConnectedCreate
