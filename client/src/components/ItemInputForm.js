import React from 'react'
import { useState } from 'react'

function ItemInputForm({updateItems, items}) {

    const [itemInput, setItemInput] = useState({
        name: '',
        sku: '',
        description: '',
        category: '',
        experation_date: '',
        quantity: ''
      })

    const {name, sku, description, category, experation_date, quantity} = itemInput

    const updateItemInput = (e) => {
        setItemInput({...itemInput, [e.target.name]: e.target.value})
      }
      const onItemFormSubmit = (e) => {
        e.preventDefault()
        fetch('/user_items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(itemInput)
        })
        .then(resp => {
          if(resp.ok){
            resp.json().then(userItem => updateItems(userItem))
          }
        })
      }

    // TODO: import or figure out a diffrent method for creating unique keys for items
    // also decide whether to remove sku form frontend and database. the thought is it can be replaced by the items id.

    // TODO: IMPORTANT: I need to figure out a way for the item form to autofill if the item exist on the backend so users know that they do not need to fill the rest of the form. if the item does not exist yet then the user should be able to fill out the rest of the form.
  return (
    <form className='flex  justify-between h-20 w-full bg-slate-500 items-center mt-10 p-3' onSubmit={onItemFormSubmit}>
        <div>
          <label>name</label>
          <input name='name' value={name} list='items' onChange={updateItemInput}></input>
          <datalist id='items'>
            {items.map(item => <option value={item.name} key={Math.random() * 10000}/>)}
          </datalist>
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
          <select type='dropdown' name='category' value={category} onChange={updateItemInput}>
            <option value=''> --select-- </option>
            <option>General</option>
            <option>Canned good</option>
            <option>Bag item</option>
            <option>Drink item</option>
            <option>Bottle item</option>
            <option>seasoning</option>
          </select>
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
  )
}

export default ItemInputForm