import { createStore, combineReducers } from 'redux'
import { v4 as uuidv4 } from 'uuid'

// @@@@@@@@@@@Actions (written as 4th part), Expenses State
const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0,
} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuidv4(),
    description: description,
    note: note,
    amount: amount,
    createdAt: createdAt,
  },
})

const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  expense: {
    id: id,
  },
})

const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id: id,
  updates: updates,
})

// @@@@@@@@@@@Actions (written as 4th part), Filter State
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text,
})

const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
})

const sortByDate = () => ({
  type: 'SORT_BY_DATE',
})

const setStartDate = (date) => ({
    type: 'SET_START_DATE',
    date
})

const setEndDate = (date) => ({
    type: 'SET_END_DATE',
    date
})

// @@@@@@@@@@@Reducer Expenses State (written as 2nd part)
const expensesReducerDefState = []

const expensesReducer = (state = expensesReducerDefState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense]
    case 'REMOVE_EXPENSE':
      return state.filter((expense) => expense.id !== action.expense.id)
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          }
        } else {
          return expense
        }
      })
    default:
      return state
  }
}

// @@@@@@@@@@@Reducer Filters State (written as 3rd part)
const filtersReducerDefState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
}

const filtersReducer = (state = filtersReducerDefState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return { ...state, text: action.text }
    case 'SORT_BY_AMOUNT':
      return { ...state, sortBy: 'amount' }
    case 'SORT_BY_DATE':
      return { ...state, sortBy: 'date' }
    case 'SET_START_DATE':
        return { ...state, startDate: action.date }
    case 'SET_END_DATE': 
        return { ...state, endDate: action.date }
    default:
      return state
  }
}

// @@@@@@@@@@@Selectors
// Get Filtered Expenses
// timestamp in milliseconds, timezone independent, unix epoch, jan 01 1970
const getFilteredExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((exp) => {
        // returns true for match, match means shown on the filteredNotes=getFilteredNotes()
        const textMatch = exp.description.toLowerCase().includes(text) || exp.note.toLowerCase().includes(text)
        const startDateMatch = typeof startDate !== 'number' || exp.createdAt >= startDate
        const endDateMatch = typeof endDate !== 'number' || exp.createdAt <= endDate

        return textMatch && startDateMatch && endDateMatch
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt > b.createdAt ? -1 : 1
        } else if (sortBy === 'amount') {
            return a.amount > b.amount ? -1 : 1
        } else {
            return 0
        }
    })
}

// @@@@@@@@@@@Create the State/Store (written as 3rd part)
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
)

store.subscribe(() => {
  const state = store.getState()
  const filteredExpenses = getFilteredExpenses(state.expenses, state.filters)
  console.log(filteredExpenses)
})

// // @@@@@@@@@@@DISPATCHES
// // Writing how function being called first then work out the function details is good practice
// // Expenses State Dispatch
const expense1 = store.dispatch(addExpense({ description: 'Rent', amount: 1000, createdAt: 500 }))
const expense2 = store.dispatch(addExpense({ description: 'Car', amount: 300, createdAt: 1500 }))
// store.dispatch(removeExpense({ id: expense1.expense.id }))
// store.dispatch(editExpense(expense2.expense.id, { amount: 800 }))

// // Filter State Dispatch
// store.dispatch(setTextFilter())
store.dispatch(sortByAmount())
// store.dispatch(sortByDate())
// store.dispatch(setStartDate(125))
// store.dispatch(setEndDate(1250))

// @@@@@@@@@@@State Definition ( written first), just for white-boarding in constructing the states
const demoState = {
  expenses: [
    {
      id: 'asfdasdfasdfasdf',
      description: 'January Rent',
      note: 'This is the payment for the Jan rent',
      amount: 54500,
      createdAt: 0,
    },
  ],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined,
  },
}
