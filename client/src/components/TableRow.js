import { useLocation } from 'react-router-dom'
import useUserContext from '../hooks/useUserContext'

function TableRow({itemObj}) {
    // TODO: maybe create a table data component.

    // TODO: set up the update functionality most is commented out. 
    const location = useLocation()
    const {user, setUser} = useUserContext()
    // const [isEditable, setIsEditable] = useState(false)

    // const [updateForm, setUpdateForm] = useState({
    //   quantity: '',
    //   expiration_date: ''
    // })

    // const onChange = (e) => {
    //   setUpdateForm({...updateForm, [e.target.name]: e.target.value})
    // }

    // adding this made it where my validations fail every item must fix

  //  const tableData = Object.entries(itemObj).map(set => {
  //   if(set[0] !== 'image_url'){
  //     if(isEditable &&  ['quantity', 'expiration_date'].includes(set[0])){
  //       return(
  //         <td className="px-6 py-4 whitespace-nowrap" key={`${set}`}>
  //           <form>
  //             <input type="text" className='border border-blue-400' placeholder={set[1]} name={set[0]} onChange={onChange}/>
  //             <button type='submit'></button>
  //           </form>
  //         </td>
  //       )
  //     } else {
  //       return(
  //         <td className="px-6 py-4 whitespace-nowrap" key={`${set}`}>
  //             <div className="text-sm text-gray-900">{set[1]}</div>
  //         </td>
  //       ) 
  //     }
  //   }
  //  })

  const tableData = Object.entries(itemObj).map(set => (
    <td className="px-6 py-4 whitespace-nowrap" key={`${set}`}>
        <div className="text-sm text-gray-900">{set[1]}</div>
    </td> 
  ))

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