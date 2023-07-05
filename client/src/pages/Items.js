import React from 'react'
import Table from '../components/Table'

function Items({ items }) {
  return (
    <div>
        {items.length > 0 ? <Table data={items} /> : null}
    </div>
  )
}

export default Items