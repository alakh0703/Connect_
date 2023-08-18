import React from 'react'
import { Link } from "react-router-dom";
import './SignUp.css'
import { useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import bcrypt from 'bcryptjs'
import axios from 'axios';

import { useContext } from 'react';
import { UserContextProvider, userContext } from '../../../context/userContext';

function SignUp(props) {
  const Navigate = useNavigate();

  const {user, setUser} = useContext(userContext);
  // use ref
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const nameRef = useRef('')
  const confirmPasswordRef = useRef('')
  const [error, setError] = useState('')

  // handle submit
  const handleSubmit = (e) => {

    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    // console.log(email, password, name, confirmPassword)

    if(!email || !password || !name || !confirmPassword) {
      return setError('* All fields are required')
    }

    if(password.length < 6) {
      return setError('* Password must be at least 6 characters')
    }

    if (password!== confirmPassword) {
      return setError('* Password do not match')
    }

    if(email.slice(-12) !== '@connect.com') {
      return setError('* Email must end with @connect.com')
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    console.log("Hashed password: ", hash)

    const data = {
      name: name,
      email: email,
      password: hash
    }

    axios.post('https://connect-backend-c83a.onrender.com/connect/users/register', data)
    .then((res) => {
      setUser([name, email])
      alert(res.data.token)
      // localStorage.setItem('user', 'JSON.stringify([name, email])');
      localStorage.setItem('jwtToken', JSON.stringify(res.data.token));
      // set expiry time
      const expirationTimeInSeconds = 3600; // Example: 1 hour (adjust as per your token's actual expiration time)

      // Calculate the expiration timestamp in milliseconds from the current time
      const expirationTimestamp = new Date().getTime() + expirationTimeInSeconds * 1000;
      localStorage.setItem('jwtTokenExpiration', expirationTimestamp.toString());



    })
    .catch((err) => {
      console.log(err)
    })



    setError('')
    alert('Sign Up Successful')
    Navigate('/verified')
  }  

  React.useEffect(() => {
    const salt = bcrypt.genSaltSync(10);

    // const x = bcrypt.hash('1',salt)
    // const y = bcrypt.hash('1',salt)
    // console.log("X",x)
    // console.log("Y",y)
    // if(x===y) {
    //   console.log('same')
    // }
    // else {
    //   console.log('not same')
    // }
  },[])

  return (
    <div className='login_main'>
        <div className='clogin_title'>
          <p className='clogin_title1'>Already a user ! <span className='cforget' onClick={props.handleSwitch}>Login</span></p>
          </div>
          <div className='cmail_in'>
            <input type='text' placeholder='Name' ref={nameRef} className='cmail' />
        </div>
        <div className='cmail_in'>
            <input type='text' placeholder='Email: jon.dawis@connect.com' ref={emailRef} className='cmail' />
        </div>
        <div className='cpass_in'>
            <input type='password' placeholder='Password' ref={passwordRef} className='cpass' />
          </div>
          <div className='cmail_in'>
            <input type='password' placeholder='Confirm Password' ref={confirmPasswordRef} className='cmail' />
        </div>
        <div className='clogin_in'>
            <button className='clogin' onClick={handleSubmit}>
            <Link to='/' id='login_btn'>Sign Up</Link>

            </button>
            </div>
      <p className='cerror'>{error}</p>
    </div>
  )
}

export default SignUp