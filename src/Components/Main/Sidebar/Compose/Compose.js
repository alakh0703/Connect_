import React from 'react'
import { useContext } from 'react'
import { userContext } from '../../../../context/userContext'
import './Compose.css'
import cross from '../../../../Images/multiply.png'
import max from '../../../../Images/maximize.png'
import min from '../../../../Images/min.png'
import axios from 'axios';

import { v4 as uuid } from 'uuid';


function Compose(props) {
  const {user, setUser} = useContext(userContext);
  const [mailCheck, setMailCheck] = React.useState('')
// alert(user)
  const [isMin, setIsMin] = React.useState(false)

  const receipientRef = React.useRef(null)
  const subjectRef = React.useRef(null)
  const messageRef = React.useRef(null)

const getToken = () => {
  const tokenString = localStorage.getItem('jwtToken');
  const userToken = JSON.parse(tokenString);
  // alert(userToken)
  return userToken;
}

 const handleSend = async () => {
    const receipient = receipientRef.current.value
    const subject = subjectRef.current.value
    const message = messageRef.current.value
    const unique_id = uuid();


    if(receipient === '' || subject === '' || message === ''){
      setMailCheck('    * Please fill all fields')
    }else{
      setMailCheck('')
    }
    const token = getToken()
    alert(token)
    // alert(token)
    const data = {
      unique_id: unique_id,
      from: user[1],
      to: receipient,
      subject: subject,
      body: message,
      token: token,
      fromName: user[0]
    }
   
   
    await axios.post('http://localhost:3000/connect/email/sendEmail', data).then((res) => {
      alert(res.data)
    }
    ).catch((err) => {
      alert(err)
    }
    )



    

  }




  const isMax = props.isMax;
  const handleMin = () => {
    setIsMin(false)
    props.setIsMax(false)
  }
  const handleMax = () => {
    setIsMin(true)
    props.setIsMax(true)
  }
  const handleCross = () => {
    props.setIsMax(false)
    props.setIsCompose(false)
  }
  return (
    <div className={isMax ? 'compose_main2' : 'compose_main'}>
        <div className='compose_nav'>
            <p className='C_newMessage'>New Message</p>
            <div className='C_to'>
              {isMin ? <img src={min} onClick={handleMin} alt='min' className='C_min c_img'/>:  <img src={max} onClick={handleMax} alt='max' className='C_max c_img'/>

}
                <img src={cross} alt='cross' onClick={handleCross} className='C_cross c_img'/>
            </div>
        </div>
        <div className='compose_2'>
          <p className='to'>To:</p>
          <input type='text' ref={receipientRef} placeholder='Recipient' className='to_input'/>
        </div>
        <hr className='hr1'/>
        <div className='compose_2'>
          <p className='sub to'>Sub:</p>
          <input type='text' ref={subjectRef} placeholder='Subject' className='to_input'/>
        </div>
        <hr className='hr1'/>
        <div className='compose3'>
          <textarea className='compose_textarea' ref={messageRef} placeholder='Type your message here...'></textarea>
        </div>

        <div className='footer'>
          <button className={isMax ? 'send2' : 'send'} onClick={handleSend}>Send</button>

          
        </div>
        <p className='footer_error'>{mailCheck}</p>

    </div>
  )
}

export default Compose