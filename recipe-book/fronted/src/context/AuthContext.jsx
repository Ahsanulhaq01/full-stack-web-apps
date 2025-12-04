import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { AuthContext } from './AthContext';

export function AuthProvider({children}) {

    const [user , setUser] = useState(JSON.parse(localStorage.getItem('username') || null));

    useEffect(()=>{
        if(user){
            localStorage.setItem('username' , JSON.stringify(user))
        }else{
            localStorage.removeItem('username')
        }
    } , [user])
  return (
    <AuthContext.Provider value={{user , setUser}}>
    {children}
    </AuthContext.Provider>
  )
}

