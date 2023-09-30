import React, { useState, useRef } from 'react';
import axios from 'axios';
import './Forgot.css'; // Import the CSS file
// import {useNavigate} from 'react-router-dom';
import bcrypt from 'bcryptjs';


function Forgot(props) {
  const [securityQuestion1, setSecurityQuestion1] = useState('');
  const [securityQuestion2, setSecurityQuestion2] = useState('');
  const [securityAnswer1, setSecurityAnswer1] = useState('');
    const [securityAnswer2, setSecurityAnswer2] = useState('');
    const [userEmail, setUserEmail] = useState('');
  const [checkText, setCheckText] = useState('Check');
  const [resetSuccessful, setResetSuccessful] = useState(false);
const [resetText, setResetText] = useState('Reset Password')
  const [error, setError] = useState('');
  const cmail_ref = useRef('')

  const sa1_ref = useRef('')
    const sa2_ref = useRef('')
    const np_ref = useRef('')
    const cp_ref = useRef('')

  const checkForEmail = async (e) => {
    e.preventDefault();
    const email = cmail_ref.current.value;
    setUserEmail(email)
    if(email === '') {
        alert('Please enter your email')

        return
        }
        const data = {
            email: email
        }
      setCheckText('Checking...')
    await axios.post(`https://connect-backend-c83a.onrender.com/connect/users/check`, data )
    .then(res => {
        const data = res.data;
        setSecurityQuestion1(data.sq1)
        setSecurityQuestion2(data.sq2)
        setSecurityAnswer1(data.sa1)
        setSecurityAnswer2(data.sa2)

        
        setValid(true)
        setCheckText('Check')
    }

    )
    .catch(err => {
      setCheckText('Check')

        alert('Email not found')
        return
    })
    }

    


  const [valid, setValid] = useState(false);
    const back = () => {
        props.setForgot(false)
    }

  const updatePassword = async (pass) => {
    alert(userEmail)
    alert(pass)
    const data = {
        email: userEmail,
        password: pass
    }
    await axios.post(`https://connect-backend-c83a.onrender.com/connect/users/resetPassword`, data )
    .then(res => {
        // console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const sa11 = sa1_ref.current.value;
    const sa22 = sa2_ref.current.value;
    const newPassword = np_ref.current.value;
    const confirmPassword = cp_ref.current.value;

    if(!sa11 || !sa22 || !newPassword || !confirmPassword) {
      alert('Please fill all fields')
      return
    }

    if(newPassword.length < 6) {
      alert('Password must be at least 6 characters')
      return
    }

    if (newPassword!== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    
    if(sa11 !== securityAnswer1) {
        if(sa22 !== securityAnswer2) {
            setError('* Security answers do not match. Either one of them is wrong or both are wrong')
            return
        }
        setError('* Security answers do not match. Either one of them is wrong or both are wrong')
        return
    }
    
    if(sa11 === securityAnswer1) {
        if(sa22 === securityAnswer2) {
            alert('Password reset successful')
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(newPassword, salt);
            updatePassword(hash);
            setResetSuccessful(true);
            return
        }

    }

    setError('')
    

  };

  return (
    <div className="forgot-container">
      <h2>Forgot Password</h2>
      {resetSuccessful ? (
        <p className="forgot-success">
          Password reset successful! You can now log in with your new password.
        </p>
      ) : (
        <form className="forgot-form" onSubmit={handleSubmit}>
   {  !valid && <form>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              ref={cmail_ref}
            
              required
            />
            <button onClick={checkForEmail}>{checkText}</button>
        </form>}
        {valid && <div>
            <div>
            <label htmlFor="securityQuestion1">Security Question 1: {securityQuestion1}</label>
            <input
              type="text"
              id="securityQuestion1"
                ref={sa1_ref}
              required
            />
          </div>
          <div>
            <label htmlFor="securityQuestion2">Security Question 2: {securityQuestion2}</label>
            <input
              type="text"
              id="securityQuestion2"
              ref={sa2_ref}
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              ref={np_ref}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
                ref={cp_ref}
              required
            />
          </div>
          <p className="forgot-error">{error}</p>
          <br />

          <button  onClick={handleSubmit}>{resetText}</button>
            </div>}

        </form>
      )}
      <br />
      <p className='b2L' onClick={back}>Back to <span>Login</span></p>
    </div>
  );
}

export default Forgot;
