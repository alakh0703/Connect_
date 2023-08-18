import React from 'react';
import './Navbar.css';
import burgerIcon from '../../Images/burger.png';
// import settingIcon from '../../Images/setting.png';
import Searchbar from './Searchbar/Searchbar';
import Profile from './Profile/Profile';
import { useState,  } from 'react';
import { useContext } from 'react';
import { userContext } from '../../context/userContext';


function Navbar(props) {

  const {user, setUser, device} = useContext(userContext);
  const [showProfile, setShowProfile] = useState(false);
  const showProfileHandler = () => {
    setShowProfile(!showProfile);
   
    }

  const showSidebarHandler = () => {
  
       props.sss(!props.ss);
    }


  
    
  return (
    <div className='N_main'>
        <div className='N_logoM'>
            <img src={burgerIcon} onClick={showSidebarHandler} className='N_logo' alt='logo' />
            <p className='N_name'>Connect</p>
        </div>
        <div className='N_search'>
            <Searchbar setSearchQuery={props.setSearchQuery}/>
        </div>
        <div className='N_menu'>
            {/* <div className='N_setting'>
                <img src={settingIcon} className='N_settingIcon' alt='setting' />
            </div> */}
            <div className='N_profile' onClick={showProfileHandler}>
                <p>{user[0][0]}</p>
            </div>
            {showProfile && <Profile  />}
        </div>

    </div>
  )
}

export default Navbar