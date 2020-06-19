import React from 'react'
import { connect } from 'react-redux'
import Form from './Form'
import {
  editExpense,
  removeExpense,
  funcRemoveExpense,
  funcEditExpense,
} from '../actions/expenses'

const Edit = (props) => {
  return (
    <div>
      <div className='page-header'>
        <div className='content-container'>
          <h1 className='page-header__title'>Edit Expense</h1>
        </div>
      </div>
      <div className='content-container'>
        <Form
          // this props.expense is going to be used by useEffect on the Form component
          expense={props.expense}
          onSubmit={(expense) => {
            props.dispatch(funcEditExpense(props.match.params.id, expense))
            props.history.push('/dashboard')
          }}
        />
        <button
          className='button button--grey'
          onClick={() => {
            props.dispatch(funcRemoveExpense(props.match.params.id))
            props.history.push('/dashboard')
          }}
        >
          Remove
        </button>
      </div>
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
