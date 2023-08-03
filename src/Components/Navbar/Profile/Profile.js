import React from 'react'
import './Profile.css';
import { useContext } from 'react';
import { UserContextProvider, userContext } from '../../../context/userContext';
import { Navigate , useNavigate} from 'react-router-dom';

function Profile() {
const Navigate = useNavigate();
  const {user, setUser} = useContext(userContext);
  const logoutHandler = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem("jwtTokenExpiration");
    setUser(['name','email'])
    Navigate('/');
    }

  return (
    <div className='P_main'>
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
            <div className='PO_signout' onClick={logoutHandler}>
                <p>Sign Out</p>
            </div>
        </div>
        
    </div>
  )
}

export default Profile