import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import './SignUp.css'
import { useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import bcrypt from 'bcryptjs'
import axios, { all } from 'axios';

import { useContext } from 'react';
import { UserContextProvider, userContext } from '../../../context/userContext';

function SignUp(props) {
  const Navigate = useNavigate();
  const [addSecurityQ, setAddSecurityQ] = useState(false)
const [signText, setSignText] = useState('Sign Up')

  const {user, setUser} = useContext(userContext);
  // use ref
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const nameRef = useRef('')
  const confirmPasswordRef = useRef('')
  const securityQuestion1Ref = useRef('')
  const securityQuestion2Ref = useRef('')
  const securityAnswer1Ref = useRef('')
  const securityAnswer2Ref = useRef('')
  const [error, setError] = useState('')
  const [allMails, setAllMails] = useState([]); // Set the default active item


  useEffect(() => {
    setAddSecurityQ(true)
  }, [])
  const addSecurityQ2 = () => {
    setAddSecurityQ(!addSecurityQ)
 
  }

  // handle submit
  const handleSubmit =async (e) => {

    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const securityQuestion1 = securityQuestion1Ref.current.value;
    const securityQuestion2 = securityQuestion2Ref.current.value;
    const securityAnswer1 = securityAnswer1Ref.current.value;
    const securityAnswer2 = securityAnswer2Ref.current.value;


    // console.log(email, password, name, confirmPassword)

    if(!email || !password || !name || !confirmPassword || !securityQuestion1 || !securityQuestion2 || !securityAnswer1 || !securityAnswer2) {
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

    if(allMails.indexOf(email) !== -1) {
      return setError('* Email already exists')
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    console.log("Hashed password: ", hash)

    const data = {
      name: name,
      email: email,
      password: hash,
      securityQuestion1: securityQuestion1,
      securityQuestion2: securityQuestion2,
      securityAnswer1: securityAnswer1,
      securityAnswer2: securityAnswer2

    }
    setSignText('Creating your Account...')
    await axios.post('https://connect-backend-c83a.onrender.com/connect/users/register', data)
    .then((res) => {
      setUser([name, email])
      // localStorage.setItem('user', 'JSON.stringify([name, email])');
      localStorage.setItem('jwtToken', JSON.stringify(res.data.token));
      // set expiry time
      const expirationTimeInSeconds = 3600; // Example: 1 hour (adjust as per your token's actual expiration time)

      // Calculate the expiration timestamp in milliseconds from the current time
      const expirationTimestamp = new Date().getTime() + expirationTimeInSeconds * 1000;
      localStorage.setItem('jwtTokenExpiration', expirationTimestamp.toString());
      alert('Sign Up Successful')
      setSignText('Sign Up')
      Navigate('/verified')


    })
    .catch((err) => {
      setSignText('Sign Up')

      console.log(err)
    })
    setSignText('Sign Up')

    // axios.post('https://connect-backend-c83a.onrender.com/connect/users/register', data)
    // .then((res) => {
    //   setUser([name, email])
    //   alert(res.data.token)
    //   // localStorage.setItem('user', 'JSON.stringify([name, email])');
    //   localStorage.setItem('jwtToken', JSON.stringify(res.data.token));
    //   // set expiry time
    //   const expirationTimeInSeconds = 3600; // Example: 1 hour (adjust as per your token's actual expiration time)

    //   // Calculate the expiration timestamp in milliseconds from the current time
    //   const expirationTimestamp = new Date().getTime() + expirationTimeInSeconds * 1000;
    //   localStorage.setItem('jwtTokenExpiration', expirationTimestamp.toString());



    // })
    // .catch((err) => {
    //   console.log(err)
    // })



    setError('')
  }  

  const getAllMails = async () => {
    const existingMails  = await axios.get('https://connect-backend-c83a.onrender.com/connect/users/allMails');
    setAllMails(existingMails.data)
    console.log(existingMails.data)
    return existingMails.data;
  }

  React.useEffect(() => {
 const mails = getAllMails();

  
  }, [])
  

 

  return (
    <div className='login_main'>
      <form>
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

        {addSecurityQ && <div className='SQ' onClick={addSecurityQ2}>
          <p>          + Add Security Questions
</p>

        </div> 
        
        }
        
       {!addSecurityQ && <div className='SQ_main'>
         <div className='security-question'>
           <select className='security-question-select' ref={securityQuestion1Ref}>
             <option value='Who is your best friend ?'>Who is your best friend ?</option>
             <option value='Who is your first crush ?'>Who is your first crush ?</option>
             <option value='What is your first employer ?'>What is your first employer ?</option>
             <option value='What is your first pet name ?'>What is your first pet name ?</option>
             <option value='What is your first school name ?'>What is your first school name ?</option>
             
             {/* Add more options for other security questions if needed */}
           </select>
           <input type='text' ref={securityAnswer1Ref} placeholder='Answer to Security Question 1' className='security-question-answer' />
         </div>
         <div className='security-question'>
           <select className='security-question-select' ref={securityQuestion2Ref}>
             <option value="What is your mother's maiden name ?">What is your mother's maiden name ?</option>
             <option value='What is your favourite TV show ?'>What is your favourite TV show ?</option>
             <option value='What is your favourite actor ?'>What is your favourite actor ?</option>
             <option value='Which is the first country you visited ?'>Which is the first country you visited ?</option>
             <option value='What is your favourite video game ?'>What is your favourite video game ?</option>
             {/* Add more options for other security questions if needed */}
           </select>
           <input type='text' ref={securityAnswer2Ref} placeholder='Answer to Security Question 2' className='security-question-answer' />
         </div>
         {/* Add more security-question blocks as needed */}
       </div> }
       <p className='cerror'>{error}</p>
       <br />

        <div className='clogin_in'>
            <button className='clogin' type='submit' onClick={handleSubmit}>
            <Link to='/' id='login_btn'>{signText }</Link>

            </button>
            </div>


            </form>
    </div>
  )
}

export default SignUp