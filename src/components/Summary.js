import React from 'react'
import getFiltered from '../selectors/expenses'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Summary = (props) => (
  <div className='page-header'>
    <div className='content-container'>
      <h1 className='page-header__title'>
        Viewing <span>{props.expenses.length}</span> expenses, total:{' '}
        <span>
          {numeral(
            props.expenses.reduce((acc, cur) => {
              return acc + cur.amount
            }, 0) / 100
          ).format('$0,0.00')}
        </span>
      </h1>
      <div className="page-header__actions">
        <Link className='button button--dark' to='/create'>
          Add Expense
        </Link>
      </div>
    </div>
  </div>
)

const mapStateToProps = (state) => {
  return {
    expenses: getFiltered(state.expenses, state.filters),
  }
}

export default connect(mapStateToProps)(Summary)
