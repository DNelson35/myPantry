import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import useUserContext from '../hooks/useUserContext'

function NavBar() {
    const {user, setUser} = useUserContext()
    const [search, setSearch] = useState('')

    const onSearch = (e) => {
        setSearch(e.target.value)
    }

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
    <nav className="flex items-center justify-between flex-wrap bg-slate-500 py-4 lg:px-12 shadow border-solid border-t-2 border-slate-500">
        <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
            <div className="flex items-center flex-shrink-0 text-white mr-16">
                <span className="font-semibold text-2xl tracking-tight">myPantry</span>
            </div>
        </div>
        <div className=" w-full flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
            <div className="text-md font-bold text-white lg:flex-grow">
                <NavLink to="/"
                className="block mt-4 lg:inline-block lg:mt-0 hover:text-black px-4 py-2 mr-2">
                    Home
                </NavLink>
                <NavLink to='/items'
                className="block mt-4 lg:inline-block lg:mt-0 hover:text-black px-4 py-2 mr-2">
                    Items
                </NavLink>
            </div>
            <div className="relative mx-auto text-gray-600 lg:block hidden">
                <input className="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-blue-500" placeholder="Search" value={search} onChange={onSearch}/>
                <button type="submit" className="absolute right-0 top-0 mt-1 mr-2 text-xl">
                🔍
                </button>
            </div>
            <div className="flex ">
                <h1
                className="block text-md px-4 py-2 text-white ml-2 font-bold mt-4 lg:mt-0 capitalize">{user.name}</h1>
    
                <button
                className=" block text-md px-4  ml-2 py-2 text-white font-bold hover:text-black mt-4 lg:mt-0" onClick={onLogOut}>Log Out</button>
            </div>
        </div>
    </nav>
  )
}

export default NavBar