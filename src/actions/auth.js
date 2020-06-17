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

export { startLogin, startLogout }
