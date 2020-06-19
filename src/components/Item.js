import React from 'react'
import { Link } from 'react-router-dom'
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
    <Link className='list-item' to={`edit/${id}`}>
      <div>
        <h3 className='list-item__title'>{description}</h3>
        <span className='list-item__subtitle'>Created On: {date}</span>
        <p className='list-item__subtitle'>Note: {note}</p>
      </div>
      <div>
        <h3 className='list-item__data'>{numeral(amount / 100).format('$0,0.00')}</h3>
      </div>
    </Link>
  )
}

export default Item
