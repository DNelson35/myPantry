import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import useUserContext from '../hooks/useUserContext'

function TableRow({itemObj}) {
  
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

  const updateUserItem = (item) => {
    setUser({...user, user_items: user.user_items.map(userItem => {
      if(userItem.id === item.id){
        return(item)
      } else {
        return userItem
      }
    })})
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
        resp.json().then(item => updateUserItem(item))
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
      }
    })
  }
    
  const tableData = Object.entries(itemObj).map(set => {
      if(isEditable &&  ['quantity', 'expiration_date'].includes(set[0])){
        return(
          <td className="px-6 py-4 whitespace-nowrap" key={`${set}`}>
            <form onSubmit={onSubmit}>
              <input type="text" className='border border-blue-400' placeholder={set[1]} name={set[0]} value={updateForm[set[0]]}onChange={onChange}/>
              <button type='submit'></button>
            </form>
          </td>
        )
      } else {
        return(
          <td className="px-6 py-4 whitespace-nowrap" key={`${set}`}>
              <div className="text-sm text-gray-900">{set[1]}</div>
          </td>
        )
      }
    }
  )

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