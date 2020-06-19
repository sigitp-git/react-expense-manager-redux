import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter, { history } from './routers/AppRouter'
import { Provider } from 'react-redux'
// redux store --> connecting redux state and reducers, reducer returns new states objects based on dispatched action types
import configureStore from './store/configureStore'
// redux actions --> called by store.dispatch() --> sending objects of reducer types + required arguments
import {
  funcAddExpense,
  funcFetchExpenses,
  addExpense,
  removeExpense,
  editExpense,
} from './actions/expenses'
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
import { firebase } from './firebase/firebase'
// adding new redux state to store uid to make sure only logged in users can use the app
import { login, logout } from './actions/auth'
import Loading from './components/Loading'

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
ReactDOM.render(<Loading />, document.getElementById('app'))

// this moved to use onAuthStateChanged
// store.dispatch(funcFetchExpenses()).then(() => {
//   ReactDOM.render(jsx, document.getElementById('app'))
// })

let hasRendered = false
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'))
    hasRendered = true
  }
}

//Regular non-async show of expenses data
//ReactDOM.render(jsx, document.getElementById('app'))

// from firebase/firebase.js defining googleAuthProvider, to actions/auth.js to call the popup
// followed up by these lines to check onAuthStateChanged
// logout will be put on Header.js component
// this app.js does not have props.history api, because this is not part of AppRouter/BrowserRouter component
// modify AppRouter.js to get the history api here (yarn add history@4.10.1) 5.0.0 has bugs
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // to maintain state, keep the user.uid in the auth reducer and create handling in auth actions
    //console.log('logged in, uid :', user.uid)
    store.dispatch(login(user.uid))
    store.dispatch(funcFetchExpenses()).then(() => {
      renderApp()
      if (history.location.pathname === '/') {
        history.push('/dashboard')
      }
    })
  } else {
    //console.log('logged out')
    store.dispatch(logout())
    renderApp()
    history.push('/')
  }
})
