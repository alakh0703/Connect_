import React, { Children, Component } from 'react';
import { useState, useContext, createContext } from 'react';
import {   useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  getValidJwtToken from './jwtTokenFunction'
import axios from 'axios';

const mesContext = createContext("");

function MessageContextProvider({children}) {

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');





  return (
    <mesContext.Provider value={{message, setMessage, error, setError}}>{children}</mesContext.Provider>
  )
}

export {MessageContextProvider, mesContext};