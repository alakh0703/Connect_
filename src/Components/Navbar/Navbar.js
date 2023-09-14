import React from 'react';
import './Navbar.css';
import burgerIcon from '../../Images/burger.png';
// import settingIcon from '../../Images/setting.png';
import Searchbar from './Searchbar/Searchbar';
import Profile from './Profile/Profile';
import { useState,  } from 'react';
import { useContext } from 'react';
import { userContext } from '../../context/userContext';
import TaskManager from './TaskManager/TaskManager';

import menuIcon from '../../Images/menu.png';

import DeleteAccount from './Profile/DeleteAccount/DeleteAccount';
import Update from './Profile/Update/Update';

function Navbar(props) {

  const {user, setUser, device} = useContext(userContext);
  const [showProfile, setShowProfile] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);



  const showProfileHandler = () => {
    setShowProfile(!showProfile);
   
    }

  const showSidebarHandler = () => {
  
       props.sss(!props.ss);
    }

    const showFeatureHandler = () => {
      findDevice();
      setShowFeatures(!showFeatures);
    }

    const showTaskHandler = () => {
      setShowFeatures(false);
      setShowTask(!showTask);
    }

    const [delete1,setDelete] = React.useState(false);

    const [isMobile, setIsMobile] = React.useState('')

    const findDevice = () => {
      if(window.innerWidth <= 600){
        setIsMobile(true)
      }else{
        setIsMobile(false)
      }
    }
    React.useEffect(() => {
      if(window.innerWidth <= 600){
        setIsMobile(true)
      }else{
        setIsMobile(false)
      }
    }, [])
    
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
            <div className='N_menuIcon'>
              <img src={menuIcon} onClick={showFeatureHandler} className={showFeatures ? 'N_menuIcon2' : 'N_menuIcon1 '} alt='menu' />
              {showFeatures && <div className={isMobile ? 'Features_m' : 'Features'}>
                <div className={isMobile ? 'f-1_m f_m' : 'f-1 f'} onClick={showTaskHandler}>
                  <p>Task Manager</p>
                </div>
               
             
               
               
              </div>}
              
            </div>
            {showProfile && <Profile setSP={setShowProfile} setShowUpdate={setShowUpdate} delete1={setDelete} />}
          {showTask && <TaskManager setShowTask={showTaskHandler}/>}
        </div>
        {delete1 && <DeleteAccount delete1={setDelete} />}
          { showUpdate && <Update showUpdate={showUpdate} setShowUpdate={setShowUpdate}/>}

    </div>
  )
}

export default Navbar