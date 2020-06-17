// store logged-in, logged-out info in a state object

import { auth } from "firebase"

// 2 actions defined startLogin and startLogout, we can store state as uid, but setting as object makes it more flexible
const authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid,
      }
    case 'LOGOUT':
      return {}
    default:
      return state
  }
}

export default authReducer