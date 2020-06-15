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

export { addExpense, removeExpense, editExpense }