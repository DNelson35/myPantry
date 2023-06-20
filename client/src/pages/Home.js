import React from 'react'
import Table from '../components/Table'
import { useState } from 'react'

function Home({ user}) {

    const [itemInput, setItemInput] = useState({
        name: '',
        sku: '',
        description: '',
        category: '',
        experation_date: '',
        quantity: ''
      })

      const [items, setItem] = useState(null)

      const {name, sku, description, category, experation_date, quantity} = itemInput
    
      const updateItemInput = (e) => {
        if (e.target.name !== "quantity") {
          setItemInput({...itemInput, [e.target.name]: e.target.value})
        } else
          setItemInput({...itemInput, [e.target.name]: parseInt(e.target.value)})
      }

      console.log(itemInput)

      const onItemFormSubmit = (e) => {
        e.preventDefault()
        fetch('/items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(itemInput)
        })
        .then(resp => {
          if(resp.ok){
            resp.json().then(item => setItem(item))
          }
        })
      }

  return(
    <div>
      <h1>Total Items = {user.total_items}</h1>
      <Table data={user.items}/>

      <h1> total items stored = {user.total_items}</h1>
      <form className='flex  justify-between h-20 w-full bg-slate-500 items-center mt-10 p-3' onSubmit={onItemFormSubmit}>
        <div>
          <label>name</label>
          <input name='name' value={name} onChange={updateItemInput}></input>
        </div>
        <div>
          <label>sku</label>
          <input name='sku' value={sku} onChange={updateItemInput}></input>
        </div>
        <div>
          <label>description</label>
          <input name='description' value={description} onChange={updateItemInput}></input>
        </div>
        <div>
          <label>category</label>
          <input name='category' value={category} onChange={updateItemInput}></input>
        </div>
        <div>
          <label>expiration Date</label>
          <input name='experation_date' value={experation_date} onChange={updateItemInput}></input>
        </div>
        <div>
          <label>quantity</label>
          <input name='quantity' value={quantity} onChange={updateItemInput}></input>
        </div>
        <button type="submit">Save</button>
      </form>
      <br/>
      <br/>
      <br/>
    </div>
  )
}

export default Home