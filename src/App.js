import './App.css';
import Home from './Components/Home/Home';
import Main from './Components/Main/Main';
import Navbar from './Components/Navbar/Navbar';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContextProvider, userContext} from './context/userContext';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import  getValidJwtToken from './context/jwtTokenFunction'
import axios from 'axios';



function App() {
  // const Navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "verified",
      element:  <div className='app_main'>
      <Navbar setSearchQuery={setSearchQuery} sss={setShowSidebar} ss={showSidebar} />  
      <Main searchQuery={searchQuery} showSidebar={showSidebar} />
      </div>,
    },
  ]);

  console.log(showSidebar)
  return (
    <div className="App">
      <UserContextProvider>
       <RouterProvider router={router} />
      </UserContextProvider>
    </div>
  );
}

export default App;
