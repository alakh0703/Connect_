import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import Box from './Box/Box'
import { useState, useEffect } from 'react';
import './Main.css'

import { useNavigate } from 'react-router-dom';

function Main(props) {
  // console.log("cidna" + props.showSidebar)
  const Navigate = useNavigate();

  const [activeItem, setActiveItem] = React.useState('inbox'); // Set the default active item
  useEffect(() => {
    // check for jwt token
    const token = localStorage.getItem('jwtToken');
    const expTime = localStorage.getItem('jwtTokenExpiration');

    if (!token || !expTime) {
      Navigate('/'); // Navigate to login page
      return;
    }

    
  
    if (new Date().getTime() > parseInt(expTime)) {
      Navigate('/'); // Navigate to login page
      return;
    }
  
    // Navigate('/verified'); // Navigate to home page
  }, [props.showSidebar]);

  return (
    <div className='Main_main'>
      {props.showSidebar ?<Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />:null}
       {/* <Sidebar /> */}
      
  <Box searchQuery={props.searchQuery} activeItem={activeItem} /></div>
  )
}

export default Main