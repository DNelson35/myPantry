import React from 'react'
import useUserContext from '../hooks/useUserContext'

function NavBar() {
    const {user, setUser} = useUserContext()

    const onLogOut = () => {
        fetch('/logout', {
            method: 'DELETE',
        })
        .then(resp =>{
            if(resp.ok){
                setUser(null)
            }
        })
    }

  return (
    <nav className='flex relative w-screen h-20 bg-slate-500 align-middle'>
        <h1 className='text-white text-2xl pl-3'>myPantry</h1>
        <div className='inline-flex absolute right-3'>
            <h3 className='capitalize text-white text-lg'>{user.username}</h3>
            <button className='w-20 h-10 text-white bg-blue-800 rounded-full' onClick={onLogOut}>Log out</button>
        </div>
    </nav>
  )
}

export default NavBar