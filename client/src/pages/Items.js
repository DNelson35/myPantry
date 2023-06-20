import React from 'react'
import Table from '../components/Table'

function Items({ items }) {
  return (
    <div>
        <Table data={items}/>
    </div>
  )
}

export default Items