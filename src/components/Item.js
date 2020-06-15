import React from 'react'
import { NavLink } from 'react-router-dom'
import numeral from 'numeral'

const Item = ({ id, description, note, amount, createdAt }) => {
  const dateObj = new Date(createdAt)
  const date = dateObj.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  return (
    <div>
    <NavLink to={`edit/${id}`}><h3>{description}</h3></NavLink>
      <p>
        Amount: {numeral(amount / 100).format('$0,0.00')} - Created On: {date}
      </p>
      <p>Note: {note}</p>
    </div>
  )
}

export default Item
