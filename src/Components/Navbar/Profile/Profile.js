import React from 'react'
import './Profile.css';


function Profile() {

 
  return (
    <div className='P_main'>
        <div className='P_header'>
            <div className='PH_profile' >
                <p className='PH_name'>A</p>
               
            </div>
            <div className='PH_status'>
                    <p className='PH_username'>Alakh Patel</p>
                    <p className='PH_userConnectId'>alakh007@connect.com</p>
            </div>
        </div>
         <div className='P_Options'>
            <div className='PO_signout'>
                <p>Sign Out</p>
            </div>
        </div>
        
    </div>
  )
}

export default Profile