import React, { Children, Component } from 'react';
import { useState, useContext, createContext } from 'react';
import {   useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  getValidJwtToken from './jwtTokenFunction'
import axios from 'axios';

const userContext = createContext("");

function UserContextProvider({children}) {
    const [user, setUser] = useState(['name','email']);



    useEffect(() => {
      // alert('useEffect')
      const token = getValidJwtToken();
      // alert(token)
      if(token){
        const config = {
          headers:{
            Authorization: 'Bearer ' + token //the token is a variable which holds the token
          }
        };
        // alert(token)
        axios.get('http://localhost:3000/connect/users/verifyToken', config).then((res) => {
          // alert('verified') 
  setUser([res.data.name, res.data.email])
}
)
.catch((err) => {
  console.log(err)
}
)
}
      

  }, [])

  return (
    <userContext.Provider value={{user, setUser}}>{children}</userContext.Provider>
  )
}

export {UserContextProvider, userContext};