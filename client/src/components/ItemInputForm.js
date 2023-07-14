import React from 'react'
import { useState, useEffect } from 'react'

function ItemInputForm({updateItems, items, errors, setErrors}) {
  
  const [itemInput, setItemInput] = useState({
    name: '',
    description: '',
    category: '',
    expiration_date: '',
    quantity: ''
  })

  const {name, description, category, expiration_date, quantity} = itemInput

  const updateItemInput = (e) => {
    const { name, value } = e.target;

    setItemInput({ ...itemInput, [name]: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() });
    
    const selectedItem = items.find(item => item.name === value);
    if (selectedItem) {
      const { description, category} = selectedItem;
  
      setItemInput(prevState => ({
        ...prevState,
        description: description || '',
        category: category || '',
      }));
    }
  };

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
        setErrors([])
      } else {
        resp.json().then(err => setErrors(err.errors))
      }
    })
    setItemInput({
      name: '',
      description: '',
      category: '',
      expiration_date: '',
      quantity: ''
    })
  }
  
  return (
    <form className='flex  justify-between h-20 w-full bg-slate-500 items-center mt-10 p-3' onSubmit={onItemFormSubmit}>
      <div>
        <label>name</label>
        <input name='name' value={name} list='items' onChange={updateItemInput}  />
        <datalist id='items'>
          {items.map(item => <option value={item.name} key={item.id}/>)}
        </datalist>
      </div>
      <div>
        <label>description</label>
        <input name='description' value={description} onChange={updateItemInput} />
      </div>
      <div>
        <label>category</label>
        <select type='dropdown' name='category' value={category} onChange={updateItemInput} >
          <option value=''> --select-- </option>
          <option>General</option>
          <option>Canned good</option>
          <option>Bag item</option>
          <option>Drink item</option>
          <option>Bottle item</option>
          <option>Seasoning</option>
        </select>
      </div>
      <div>
        <label>expiration Date</label>
        <input name='expiration_date' value={expiration_date} onChange={updateItemInput} placeholder=' YYYY/MM/DD'  />
      </div>
      <div>
        <label>quantity</label>
        <input name='quantity' value={quantity} onChange={updateItemInput} />
      </div>
      <button type="submit" className='mr-10 rounded-full bg-blue-500 px-4 py-1 text-white transition duration-200 hover:bg-blue-600 active:bg-blue-700'>Save</button>
    </form>
  )
}

export default ItemInputForm