import React from 'react'
import './Profile.css';
import { useContext } from 'react';
import { UserContextProvider, userContext } from '../../../context/userContext';
import { Navigate , useNavigate} from 'react-router-dom';
import DeleteAccount from './DeleteAccount/DeleteAccount';

function Profile(props) {
const Navigate = useNavigate();
  const {user, setUser} = useContext(userContext);
  const logoutHandler = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem("jwtTokenExpiration");
    setUser(['name','email'])
    Navigate('/');
    }
const handleDelete = () => {
  props.delete1(true);
  props.setSP(false)
}

const handleUpdate = () => {
  props.setShowUpdate(true);
  props.setSP(false)

  }


  
  const [isMobile, setIsMobile] = React.useState('')
  React.useEffect(() => {
    if(window.innerWidth <= 600){
      setIsMobile(true)
    }else{
      setIsMobile(false)
    }
  }, [])

  return (
    <div className={isMobile ? 'P_main_m' : 'P_main'}>
        <div className='P_header'>
            <div className='PH_profile' >
                <p className='PH_name'>A</p>
               
            </div>
            <div className='PH_status'>
                    <p className='PH_username'>{user[0]}</p>
                    <p className='PH_userConnectId'>{user[1]}</p>
            </div>
        </div>
         <div className='P_Options'>
         <div className='PO_updateInfo' onClick={handleUpdate}>
            <p>Update Name/Password</p>
          </div>
         
          <div onClick={handleDelete} className='PO_deleteAccount'>
            <p>Delete Account</p>
          </div>
            <div className='PO_signout' onClick={logoutHandler}>
                <p>Sign Out</p>
            </div>
        </div>
    </div>
  )
}

export default Profile