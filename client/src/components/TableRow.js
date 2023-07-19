import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import useUserContext from '../hooks/useUserContext'

function TableRow({itemObj, items, setItems}) {
  const location = useLocation()
  const {user, setUser} = useUserContext()
  const [isEditable, setIsEditable] = useState(false)

  const [updateForm, setUpdateForm] = useState({
    quantity: '',
    expiration_date: ''
  })

  const onChange = (e) => {
    setUpdateForm({...updateForm, [e.target.name]: e.target.value})
  }

  const updateUserItem = (data) => {
    setUser({...user, user_items: user.user_items.map(userItem => {
      if(userItem.id === data.id){
        return(data)
      } else {
        return userItem
      }
    })})
  }

  const updateItems = () => {
    setItems(items.map(item => {
      if(item.id === itemObj.item_id && user.user_items.filter(userItem => userItem.name === itemObj.name).length === 1) {
        return({...item, users: item.users.filter(deletedUser => deletedUser.id !== user.id)})
      } else{
        return(item)
      }
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const updatedForm = {
      quantity: updateForm.quantity || itemObj.quantity,
      expiration_date: updateForm.expiration_date || itemObj.expiration_date,
    };

    fetch(`/user_items/${itemObj.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedForm),
    })
    .then(resp => {
      if(resp.ok){
        resp.json().then(data =>  updateUserItem(data))
      }else {
        resp.json().then(err => alert(err.errors))
      }
    })
    setIsEditable(false)
  }

  const onDelete = (itemObj) => { 
    fetch(`/user_items/${itemObj.id}`, {
      method: 'DELETE',
    })
    .then(resp => {
      if (resp.ok) {
        setUser({...user, user_items: user.user_items.filter(currItem => currItem.id !== itemObj.id)})
        updateItems()
      }
    })
  }

  const tableData = Object.entries(itemObj).map(([key, value]) => {
    if (isEditable && ['quantity', 'expiration_date'].includes(key)) {
      console.log(isEditable)
      return (
        <td className="px-6 py-4 whitespace-nowrap" key={key}>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              className="border border-blue-400"
              placeholder={value}
              name={key}
              value={updateForm[key]}
              onChange={onChange}
            />
            <button type="submit"></button>
          </form>
        </td>
      );
    } else if (Array.isArray(value) && value) {
      return (
        <td key={key}>
          <select>
            {value.map((user) => (
              <option key={user.name}>{user.name}</option>
            ))}
          </select>
        </td>
      );
    }
    return (
      <td className="px-6 py-4 whitespace-nowrap" key={key}>
        <div className="text-sm text-gray-900">{value}</div>
      </td>
    );
  });
  

  return (
    <tr>
      {tableData}
      {(location.pathname === '/')?
        <td className='px-6 py-4 whitespace-nowrap'>
            <button className='pr-3' onClick={() => setIsEditable(!isEditable)}>✏️</button>
            <button className='pl-3' onClick={() => onDelete(itemObj)}>🗑️</button>
        </td>
        : null
      }
    </tr>
  )
}

export default TableRow