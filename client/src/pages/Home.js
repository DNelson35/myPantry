import React, { useEffect, useState } from 'react'

function Home() {
  const [items, setItems] = useState(null)
  // TODO: figure out how i will handle having a user only be able to update or delete an item that they created. 
  useEffect(()=> {
    fetch('/items')
    .then(resp => {
      if (resp.ok){
        resp.json().then(itemData => setItems(itemData))
      } else {
        resp.json().then(error => console.log(error))
      }
    })
  }, [])


  const itemsList = items? items.map(item => (
    <div key={item.id}>
      <h1>{item.name}</h1>
      <img src={item.image_url} alt={item.name}/>
      <ol>
        <li><span>sku: </span>{item.sku}</li>
        <li><span>description: </span>{item.description}</li>
        <li><span>category: </span>{item.category}</li>
      </ol>
      <p>created by: </p>

    </div>
  )):null

  console.log(items)
  return (
    <div>
     {itemsList}
    </div>
  )
}

export default Home