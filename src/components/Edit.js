import React from 'react'
import { connect } from 'react-redux'
import Form from './Form'
import { editExpense, removeExpense, funcRemoveExpense, funcEditExpense } from '../actions/expenses'

const Edit = (props) => {
  return (
    <div>
      <Form
        // this props.expense is going to be used by useEffect on the Form component
        expense={props.expense}
        onSubmit={(expense) => {
          props.dispatch(funcEditExpense(props.match.params.id, expense))
          props.history.push('/dashboard')
        }}
      />
      <button
        onClick={() => {
          props.dispatch(funcRemoveExpense(props.match.params.id))
          props.history.push('/dashboard')
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
