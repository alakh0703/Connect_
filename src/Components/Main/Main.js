import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import Box from './Box/Box'
import { useState, useEffect } from 'react';
import './Main.css';
import MessageBox from './MessageBox/MessageBox';
import Compose from './Compose/Compose';
import { useNavigate } from 'react-router-dom';
import pen from '../../Images/pen_icon2.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Main(props) {
  // console.log("cidna" + props.showSidebar)
  const Navigate = useNavigate();
  const [showCompose, setShowCompose] = useState(false);

  const [activeItem, setActiveItem] = React.useState('inbox'); // Set the default active item
  useEffect(() => {
    if(window.innerWidth <= 600){
      setIsMobile(true)
    }else{
      setIsMobile(false)
    }
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

  const composeHandler = () => {
    checkDevice()
    setShowCompose(true)
  }
  const [isMobile, setIsMobile] = React.useState('')

  const checkDevice = () => {
    if(window.innerWidth <= 600){
      setIsMobile(true)
    }else{
      setIsMobile(false)
    }
  }
  return (
    <div className='Main_main'>
      {props.showSidebar ?<Sidebar sss={props.sss} activeItem={activeItem} setActiveItem={setActiveItem} setShowCompose={setShowCompose} />:null}
       {/* <Sidebar /> */}
      
  <Box ss={props.ss} sss={props.sss} searchQuery={props.searchQuery} activeItem={activeItem} />
  {
      <MessageBox message="Welcome to Connect!" duration={5000} />
    }
    {
      showCompose && <Compose setShowCompose={setShowCompose}/>
    }
    {isMobile && <div>
  {!showCompose &&  <div className='compose_btn_m' onClick={composeHandler}>
      <button className='compose_btn' onClick={composeHandler} >
        
      <img src={pen} alt='pen' className='Sidebar_ComposeImg_m'/>
        </button>   
   </div>}</div>}
  </div>
  )
}

export default Main