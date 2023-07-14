import React from 'react'
import Table from '../components/Table'

function Items({ filterItemsList, items, setItems }) {
  return (
    <div>
        {filterItemsList.length > 0 ? <Table data={filterItemsList} items={items} setItems={setItems} /> : null}
    </div>
  )
}

export default Items