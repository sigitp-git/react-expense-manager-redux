// Higher Order Component renders/wraps another React Component
// Reuse Code + Render Hijacking + Prop Manipulation + Abstract State

import React from 'react'
import ReactDOM from 'react-dom'

// React Component to be Wrapped
const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
)

const withAdminWarning = (WrappedComponent) => {
  // Ordinary Arrow function that returns HOC to wrap above component
  return (props) => (
    <div>
      {props.isAdmin && <p>This is Admin Warning</p>}
      <WrappedComponent {...props} />
    </div>
  )
}
const AdminInfo = withAdminWarning(Info)

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthenticated ? <WrappedComponent {...props} /> : <p>Please sign-in</p>}
    </div>
  )
}
const AuthInfo = requireAuthentication(Info)

// ReactDOM.render(
//   <AdminInfo info='These are the details' isAdmin={false}/>,
//   document.getElementById('app')
// )

ReactDOM.render(
  <AuthInfo info='These are the details' isAuthenticated={true} />,
  document.getElementById('app')
)
