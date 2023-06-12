import React, { useState, useEffect } from 'react'
import { createContext } from 'react'

const userContext = createContext()

function Provider({children}) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch('/me')
        .then(resp => {
            if (resp.ok){
                resp.json().then(user => setUser(user))
            }
        })
    },[])

  return (
    <userContext.Provider value={{user, setUser}}>
        {children}
    </userContext.Provider>
  )
}

export { userContext } 
export default Provider