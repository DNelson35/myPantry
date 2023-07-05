import React from 'react'
import Table from '../components/Table'
import ItemInputForm from '../components/ItemInputForm'

function Home({ user, updateItems, items, filteredItems }) {

  const totalQuantity = user.user_items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div>
      {filteredItems && (
        <div>
          <h1>Total Items = {totalQuantity}</h1>
          {filteredItems.length > 0 ? <Table data={filteredItems} /> : null}
          <ItemInputForm updateItems={updateItems} items={items} />
        </div>
      )}
    </div>
  )
}

export default Home