import { v4 as uuidv4 } from 'uuid'
import database from '../firebase/firebase'

// 1. component calls action generator
// 2. action generator returns objects
// 3. component dispatches object returned by action
// 4. redux store changes

// now with DB integration (like Firebase): 
// 1. component calls action generator
// 2. action generator returns FUNCTION (with redux-thunk ApplyMiddleware)
// 3. component dispatches FUNCTION returned by action
// 4. FUNCTION update the DB .then() dispatch action to update Redux Store

// the FUNCTIONS returning function for redux-thunk
// the returned function called internally by redux and has access to dispatch
// dispatch to update redux store after external DB transactions completed
const funcAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const { description = '', note = '', amount = 0, createdAt = 0 } = expenseData
    const expense = { description, note, amount, createdAt }
    database.ref('expenses').push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }))
    })
  }
}

// modified addExpense after redux-thunk
const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
})

// // @@@@@@@@@@@Actions (written as 4th part), Expenses State
// const addExpense = ({
//   description = '',
//   note = '',
//   amount = 0,
//   createdAt = 0,
// } = {}) => ({
//   type: 'ADD_EXPENSE',
//   expense: {
//     id: uuidv4(),
//     description: description,
//     note: note,
//     amount: amount,
//     createdAt: createdAt,
//   },
// })

const removeExpense = ( id  = '') => ({
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

export { addExpense, removeExpense, editExpense, funcAddExpense }