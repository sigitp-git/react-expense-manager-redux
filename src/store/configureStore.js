import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import expensesReducer from '../reducers/expenses'
import filtersReducer from '../reducers/filters'
import thunk from 'redux-thunk'

// applyMiddleware required for redux-thunk, function enabler for actions for external DB support
// with redux-thunk, we can integrate redux and async external DB CRUD

// Redux Dev Tool integration, exists or use compose imported from Redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = () => {
  // @@@@@@@@@@@Create the State/Store (written as 3rd part)
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer,
    }),
    // redux dev tool plus the thunk support
    composeEnhancers(applyMiddleware(thunk))
    // redux dev tool chrome extension 
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  return store
}

export default configureStore