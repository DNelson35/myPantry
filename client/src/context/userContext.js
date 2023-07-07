import React, { useState, useEffect } from 'react'
import { createContext } from 'react'
import LogIn from '../pages/LogIn'

const userContext = createContext()

function Provider({children}) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch('/me')
        .then(resp => {
            if (resp.ok){
                resp.json().then(user => setUser(user))
            }else{
                resp.json().then(error => console.log(error.errors))
            }
        })
    },[])


  return (
    <userContext.Provider value={{user, setUser}}>
        {user? children : <LogIn setUser={setUser} />}
    </userContext.Provider>
  )
}

export { userContext } 
export default Provider