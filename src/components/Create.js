import React from 'react'
import { connect } from 'react-redux'
import Form from './Form'
import { addExpense } from '../actions/expenses'

const Create = (props) => (
  <div>
    <h2>Create Expense</h2>
    <Form
      onSubmit={(expense) => {
        props.dispatch(addExpense(expense))
        props.history.push('/')
      }}
    />
  </div>
)

// connect()(Create) throw props to Create() where we can use props.dispatch to the state action generator
// connect()(Create) throw props.history() to Create() as well. history() does not refresh browser, it is Browser routing
const ConnectedCreate = connect()(Create)
export default ConnectedCreate
