import { firebase, googleAuthProvider } from '../firebase/firebase'

// async firebase login
// on the main app.js we define onAuthStateChanged
const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider)
  }
}

const startLogout = () => {
  return () => {
    return firebase.auth().signOut()
  }
}

const login = (uid) => ({
  type: 'LOGIN',
  uid
})

const logout = () => ({
  type: 'LOGOUT'
})

export { startLogin, startLogout, login, logout }
