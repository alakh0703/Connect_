import React from 'react'
import './Login.css'
import { Link } from "react-router-dom";
import { useRef, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { UserContextProvider, userContext } from '../../../context/userContext';
import { useContext } from 'react';

function Login(props) {
  const Navigate = useNavigate();
  const {user, setUser} = useContext(userContext);


  const [error, setError] = useState('')
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if(!email || !password) {
      return setError('* All fields are required')
    }
    if(email.slice(-12) !== '@connect.com') {
      return setError('* Email must end with @connect.com')
    }
    setError('');
    axios.post('https://connect-backend-c83a.onrender.com/connect/users/login', {email: email, password: password})
    .then((res) => {
      Navigate('/verified')
      // console.log("LOGIN :",res.data)
      // console.log(res.data.result['name'])
      setUser([res.data.result['name'], res.data.result['email']])
      const expirationTimeInSeconds = 3600; // Example: 1 hour (adjust as per your token's actual expiration time)

      // Calculate the expiration timestamp in milliseconds from the current time
      const expirationTimestamp = new Date().getTime() + expirationTimeInSeconds * 1000;
      localStorage.setItem('jwtTokenExpiration', expirationTimestamp.toString());
      localStorage.setItem('jwtToken', JSON.stringify(res.data.token));
    })
    .catch((err) => {
      console.log(err)
    })





  
    alert(email + " " + password)
  }

  return (
    <div className='login_main'>
        <div className='clogin_title'>
          <p className='clogin_title1'>New to Connect ! <span className='cforget' onClick={props.handleSwitch}>Sign Up</span></p>
          </div>
        <div className='cmail_in'>
            <input  type='text' placeholder='Email' ref={emailRef} className='cmail' />
        </div>
        <div className='cpass_in'>
            <input type='password' placeholder='Password' ref={passwordRef} className='cpass' />
          </div>
        <div className='clogin_in'>
            <button className='clogin' onClick={handleSubmit}>
                 Login

            </button>
            </div>
        <div className='cforget_in'>
            <p className='cforget'>Forgot Password?</p>
            </div>
        <p className='loginError'>{error}</p>
    </div>
  )
}

export default Login