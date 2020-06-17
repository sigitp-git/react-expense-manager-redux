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
  return (dispatch, getState) => {
    // store in uid specific tree to privateize expenses, dispatch() and getState() is part of Redux Store
    // get the state of auth and the uid returned by auth reducers
    const uid = getState().auth.uid
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0,
    } = expenseData
    const expense = { description, note, amount, createdAt }
    database
      .ref(`users/${uid}/expenses`)
      .push(expense)
      .then((ref) => {
        dispatch(
          addExpense({
            id: ref.key,
            ...expense,
          })
        )
      })
  }
}

// modified addExpense after redux-thunk
const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense,
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

const funcRemoveExpense = (id = '') => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    return database
      .ref(`users/${uid}/expenses/${id}`)
      .remove()
      .then(() => {
        dispatch(removeExpense(id))
      })
  }
}

const removeExpense = (id = '') => ({
  type: 'REMOVE_EXPENSE',
  expense: {
    id: id,
  },
})

const funcEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    return database
      .ref(`users/${uid}/expenses/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editExpense(id, updates))
      })
  }
}

const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id: id,
  updates: updates,
})

// fetching from external DB

const fetchExpenses = (expenses) => ({
  type: 'FETCH_EXPENSES',
  expenses,
})

const funcFetchExpenses = (expensesData = {}) => {
  return (dispatch, getState) => {
    // fetch in uid specific tree to privateize expenses, dispatch() and getState() is part of Redux Store
    const uid = getState().auth.uid
    // returning modified firebase snapshot {objects of expenses} into array[] of expenses objects{}
    return database
      .ref(`users/${uid}/expenses`)
      .once('value')
      .then((snapshot) => {
        const expenses = []
        snapshot.forEach((childSnap) => {
          expenses.push({
            id: childSnap.key,
            ...childSnap.val(),
          })
        })
        dispatch(fetchExpenses(expenses))
      })
  }
}

export {
  addExpense,
  removeExpense,
  editExpense,
  funcAddExpense,
  fetchExpenses,
  funcFetchExpenses,
  funcRemoveExpense,
  funcEditExpense,
}


// privatize firebase real-time db on rules section on the firebase realtime db console:
// {
//   "rules": {
//     ".read": false,
//     ".write": false,
//     "users": {
//       "$user_id": {
//         ".read": "$user_id ===  auth.uid",
//         ".write": "$user_id ===  auth.uid"
//       }
//     }
//   }
// }