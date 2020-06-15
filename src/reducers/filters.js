const date = new Date(),
  y = date.getFullYear(),
  m = date.getMonth()
const firstDay = new Date(y, m, 1)
const lastDay = new Date(y, m + 1, 0)
const defFirstDay = new Date('01/01/1970')
const defLastDay = new Date('01/01/5000')

// @@@@@@@@@@@Reducer Filters State (written as 3rd part)
const filtersReducerDefState = {
  text: '',
  sortBy: 'date',
  startDate: firstDay,
  endDate: lastDay,
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
      if (action.date === null) {
        return { ...state, startDate: defFirstDay }
      } else {
        return { ...state, startDate: action.date }
      }
    case 'SET_END_DATE':
      if (action.date === null) {
        return { ...state, endDate: defLastDay }
      } else {
        return { ...state, endDate: action.date }
      }
    default:
      return state
  }
}

export default filtersReducer
