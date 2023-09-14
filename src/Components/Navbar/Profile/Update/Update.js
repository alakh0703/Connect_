import React from 'react';
import './Update.css';
import { useState } from 'react';
import axios from 'axios';

function Update(props) {
    const [change, setChange] = useState("Save Changes");

    const oldPassRef = React.useRef(null)
    const newPassRef = React.useRef(null)
    const newNameRef = React.useRef(null)
  
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const oldPass = oldPassRef.current.value;
      const newPass = newPassRef.current.value;
      const newName = newNameRef.current.value;

      if(oldPass === '' || newPass === '' || newName === ''){
        alert('Please fill all fields')
        return
      }
      // get token
      const tokenString = localStorage.getItem('jwtToken');
      const userToken = JSON.parse(tokenString);
      const token = userToken;

      // hash password
      const bcrypt = require('bcryptjs');
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(newPass, salt);

      
      const data = {
        oldPass: oldPass,
        newPass: hash,
        newName: newName,
        token: token
      }
      setChange("Saving...")
      await axios.post(`https://connect-backend-c83a.onrender.com/connect/users/updatePassword`, data )
      .then(res => {
        setChange("Save Changes")
         props.setShowUpdate(false);
          window.location.reload();
      })
      .catch(err => {
        setChange("Save Changes")

          alert('Incorrect Old Password. Try Again')
          return
      })
      setChange("Save Changes")




    

    };
    const handleCancel1 = () => {
        props.setShowUpdate(false);
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
    <div className={isMobile ? 'U_main_m' : 'U_main'} >
    <div className={isMobile ? "change-form-container_m" : "change-form-container"}>

    <h2>Change Name or Password</h2>
    <form onSubmit={handleSubmit}>
        <label>
            Current Password:
            <input type="password" ref={oldPassRef}/>


        </label>
      <label>
        New Name:
        <input type="text" ref={newNameRef}  />
      </label>
      <label>
        New Password:
        <input type="password" ref={newPassRef}  />
      </label>
      <button type="submit" onClick={handleSubmit}>{change}</button>
      <br />
      <button type="button" onClick={handleCancel1}>Cancel</button>
    </form>
  </div>
  </div>
  )
}
    
export default Update;