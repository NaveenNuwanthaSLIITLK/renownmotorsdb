import React, { createContext, useEffect, useState } from 'react';


const UserContext = createContext();

export const UserProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))

    useEffect(()=>{
        localStorage.setItem('user', JSON.stringify(currentUser))
    })
  return (
    <UserContext.Provider value={{currentUser,setCurrentUser}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContext