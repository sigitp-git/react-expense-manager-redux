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

export default expensesReducer