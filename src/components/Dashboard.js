import React from 'react'
import List from './List'
import Filters from './Filters'
import Summary from './Summary'

const Dashboard = () => (
  <div>
    <Summary />
    <Filters />
    <List />
  </div>
)

export default Dashboard
