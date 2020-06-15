import { createStore } from 'redux'

//action generator
const incrementCount = (arg = {}) => ({
  type: 'INCREMENT',
  incrementBy: typeof arg.incrementBy === 'number' ? arg.incrementBy : 1,
})

//action generator with arg destructuring
const incrementCount2 = ({ incrementBy = 1 }) => ({
  type: 'INCREMENT',
  incrementBy: incrementBy,
})

const decrementCount = ({ decrementBy = 1 }) => ({
  type: 'DECREMENT',
  decrementBy,
})

const resetCount = () => ({
  type: 'RESET',
})

const setCount = ({ count = 0 }) => ({
  type: 'SET',
  count,
})


// Redux Reducer
// 1. Pure function, spit output based on output, self contained from outside variable
// 2. Never change state or action, only reading and returning new object instead
// 
const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy,
      }

    case 'DECREMENT':
      const decrementBy =
        typeof action.decrementBy === 'number' ? action.decrementBy : 1
      return {
        count: state.count - decrementBy,
      }

    case 'SET':
      const newCount = typeof action.count === 'number' ? action.count : 0
      return {
        count: newCount,
      }

    case 'RESET':
      return {
        count: 0,
      }

    default:
      return state
  }
}

const store = createStore(countReducer)
store.subscribe(() => console.log(store.getState()))
// uses action generator passing object
store.dispatch(incrementCount({ incrementBy: 5 }))
// uses action generator passing object, but with object destructuring on the argument function above
store.dispatch(incrementCount2({ incrementBy: 5 }))
store.dispatch(decrementCount({ decrementBy: 5 }))
store.dispatch(resetCount())
store.dispatch(setCount({ count: 101 }))
