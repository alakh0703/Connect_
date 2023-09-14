import React, { useEffect, useState } from 'react'

import './DeleteAccount.css';
import { useRef } from 'react';
import axios from 'axios';

function DeleteAccount(props) {

    const confirmref = useRef(null);
    const [cf,setCf] = useState(false);
   
    function handleClick() {
        if (confirmref.current.value === 'delete my account') {
            setCf(true);
        }
        else {
            setCf(false);
        }
    }

    function handleCancel() {
        props.delete1(false);
    }

   async function handleDelete() {

    const token = localStorage.getItem('jwtToken');
    alert(token);
        await axios.post('https://connect-backend-c83a.onrender.com/connect/users/deleteAccount', { token: token })
        .then(res => {
            console.log(res.data);
            props.delete1(false);
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('jwtTokenExpiration');
            window.location.reload();

        })
        .catch(err => {
            console.log(err);
        })


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
    <div className='DA_main_main'>
    <div className={isMobile ? 'DA_main_m': 'DA_main'}>
        <p>Are you sure to Delete Your Account ?</p>
        <p>Type <span className='span_d'>'delete my account'</span> to confirm</p>
        <input className='DA_input' onChange={handleClick} ref={confirmref} type='text' placeholder='delete my account' />
        <div className='DA_buttons'>
            <div className='DA_cancel'>
                <p onClick={handleCancel}>Cancel</p>

            </div>
            {cf ?  <div className='DA_delete' onClick={handleDelete}>
                <p>Delete</p>
            </div> : null}
           
        </div>
    </div>
    </div>
  )
}

export default DeleteAccount