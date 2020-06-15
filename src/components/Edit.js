import React from 'react'
import { connect } from 'react-redux'
import Form from './Form'
import { editExpense, removeExpense } from '../actions/expenses'

const Edit = (props) => {
  return (
    <div>
      <Form
        // this props.expense is going to be used by useEffect on the Form component
        expense={props.expense}
        onSubmit={(expense) => {
          props.dispatch(editExpense(props.match.params.id, expense))
          props.history.push('/')
        }}
      />
      <button
        onClick={() => {
          props.dispatch(removeExpense(props.match.params.id))
          props.history.push('/')
        }}
      >
        remove
      </button>
    </div>
  )
}

// current state provided by connec()
// current props can be taken as well as second argument
// expense object thrown to Edit component as part of props
const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((exp) => exp.id === props.match.params.id),
  }
}

const ConnectedEdit = connect(mapStateToProps)(Edit)
export default ConnectedEdit
