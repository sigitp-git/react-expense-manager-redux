import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routers/AppRouter'
import { Provider } from 'react-redux'
// redux store --> connecting redux state and reducers, reducer returns new states objects based on dispatched action types
import configureStore from './store/configureStore'
// redux actions --> called by store.dispatch() --> sending objects of reducer types + required arguments
import { funcAddExpense, funcFetchExpenses, addExpense, removeExpense, editExpense } from './actions/expenses'
import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate,
} from './actions/filters'
// redux selectors --> using current states to show select results to render
import getFilteredExpenses from './selectors/expenses'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import './firebase/firebase'

const store = configureStore()

// // amount stored in cents to sort
// // createdAt stored in unix timestam to sort
// const expense1 = store.dispatch(
//   funcAddExpense({
//     description: 'Rent',
//     note: 'monthly housing',
//     amount: 457566,
//     createdAt: 1589998899999,
//   })
// )
// const expense2 = store.dispatch(
//   funcAddExpense({
//     description: 'Car',
//     note: 'toyota camry',
//     amount: 53354,
//     createdAt: 1499998899999,
//   })
// )
// const expense3 = store.dispatch(
//   funcAddExpense({
//     description: 'Water',
//     note: 'city water company',
//     amount: 21198,
//     createdAt: 1577798899999,
//   })
// )
// const expense4 = store.dispatch(
//   funcAddExpense({
//     description: 'Gas',
//     note: 'city gas company',
//     amount: 33487,
//     createdAt: 1598898666666,
//   })
// )
// const expense5 = store.dispatch(
//   funcAddExpense({
//     description: 'Rent June',
//     note: 'monthly housing',
//     amount: 487566,
//     createdAt: 1592178824000,
//   })
// )

// const state = store.getState()
// const filteredExpenses = getFilteredExpenses(state.expenses, state.filters)
// console.log(filteredExpenses)

// setTimeout(() => {
//     store.dispatch(addExpense({ description: 'Laptop', amount: 3000, createdAt: 2000 }))
//     store.dispatch(setTextFilter('gas'))
// }, 3000)

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

// async fetch from external DB
ReactDOM.render(<p>Loading data...</p>, document.getElementById('app'))
store.dispatch(funcFetchExpenses()).then(() => {
  ReactDOM.render(jsx, document.getElementById('app'))
})

//Regular non-async show of expenses data
//ReactDOM.render(jsx, document.getElementById('app'))
