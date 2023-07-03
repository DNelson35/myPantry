import React from 'react'
import Table from '../components/Table'
import ItemInputForm from '../components/ItemInputForm'

function Home({ user, updateItems, items }) {

   
  const totalQuantity = user.user_items.reduce((sum, item) => sum + item.quantity, 0)

  return(
    <div>
      <h1>Total Items = {totalQuantity} </h1>
      {(user.user_items.length > 0)? <Table data={user.user_items}/> : null}
      <ItemInputForm updateItems={updateItems} items={items} />
    </div>
  )
}

export default Home