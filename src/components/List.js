import React from 'react'
import Item from './Item'
import getFiltered from '../selectors/expenses'
// connect() function is reactive, when state changes, connect keeps updating the state
// this way we dont' have to worry about store.subscribe() and store.getState()
// connect() also provides dispatch() function to send actions to the store
import { connect } from 'react-redux'

// props passed by mapStateToProps(), the props contains props.expenses
const List = (props) => (
  <div>
    <h1>Expense List</h1>
    {props.expenses.map((item) => (
      <Item key={item.id} {...item} />
    ))}
  </div>
)

const mapStateToProps = (state) => {
  // Return send props to the wrapped component List
  // These states keeps updating and re-rendering during state changes
  return {
    expenses: getFiltered(state.expenses, state.filters),
  }
}

// Connect the Store to this Component
// The function inside connect() is filtering which states to take into this Component
const ConnectedList = connect(mapStateToProps)(List) // Wrapped Componet List

export default ConnectedList
