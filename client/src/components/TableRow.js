import React from 'react'
import { useLocation } from 'react-router-dom'
import useUserContext from '../hooks/useUserContext'

function TableRow({itemObj}) {
    // TODO: maybe create a table data component.
    const location = useLocation()
    const {user, setUser} = useUserContext()

   const tableData = Object.entries(itemObj).map(set => {
    if(set[0] !== 'image_url'){
        return (
            <td className="px-6 py-4 whitespace-nowrap" key={`${set}`}>
                <div className="text-sm text-gray-900">{set[1]}</div>
            </td> 
        )
    }
   })

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

  return (
    <tr>
        {tableData}
        {(location.pathname === '/')?
            <td className='px-6 py-4 whitespace-nowrap'>
                <button className='pr-3'>✏️</button>
                <button className='pl-3' onClick={() => onDelete(itemObj)}>🗑️</button>
            </td>
            : null
        }
    </tr>
  )
}

export default TableRow