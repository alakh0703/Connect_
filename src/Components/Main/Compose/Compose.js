import React from 'react'
import { useContext } from 'react'
import { userContext } from '../../../context/userContext'
import './Compose.css'
import cross from '../../../Images/multiply.png'
import max from '../../../Images/maximize.png'
import min from '../../../Images/min.png'
import axios from 'axios';
import TextEditor from './TextEditor.js/TextEditor'

import { v4 as uuid } from 'uuid';
import { faL } from '@fortawesome/free-solid-svg-icons'


function Compose(props) {
const [sendText, setSendText] = React.useState('Send')
  const {user, setUser} = useContext(userContext);
  const [mailCheck, setMailCheck] = React.useState('')
// alert(user)
  const [isMin, setIsMin] = React.useState(false)

  const receipientRef = React.useRef(null)
  const subjectRef = React.useRef(null)
  const messageRef = React.useRef(null)


  const [isMobile, setIsMobile] = React.useState('')

  const checkDevice = () => {
    if(window.innerWidth <= 600){
      setIsMin(true)
      setIsMobile(true)
    }else{
      setIsMin(false)

      setIsMobile(false)
    }
  }
const getToken = () => {
  const tokenString = localStorage.getItem('jwtToken');
  const userToken = JSON.parse(tokenString);
  // alert(userToken)
  return userToken;
}

 const handleSend = async (text) => {
    setSendText('Sending...')
    const receipient = receipientRef.current.value
    const subject = subjectRef.current.value
    // const message = messageRef.current.value
    const message = text;
    const unique_id = uuid();

    if(!receipient){
      alert('Please enter receipient')
    }

    if(!subject){
      alert('Please enter subject')
    }

    if(!message){
      alert('Please enter message')
    }
    if(receipient.slice(-12) !== '@connect.com'){
      setMailCheck('    * Invalid receipient')
      setSendText('Send')

      return
    }else{

      setMailCheck('')
    }

    if(receipient === '' || subject === '' || message === ''){
      setSendText('Send')

      setMailCheck('    * Please fill all fields')
      return
    }else{

      setMailCheck('')
    }
    const token = getToken()
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
   

    await axios.post('https://connect-backend-c83a.onrender.com/connect/email/sendEmail', data).then((res) => {
      // alert(res.data)
      setSendText('Send')
      props.setShowCompose(false)
    }
    ).catch((err) => {
      alert(err)
      props.setShowCompose(false)
    }
    // await axios.post('https://connect-backend-c83a.onrender.com/connect/email/sendEmail', data).then((res) => {
    //   alert(res.data)
    // }
    // ).catch((err) => {
    //   alert(err)
    // }
    )
    setSendText('Send')

 

    

  }




  const handleMin1 = () => {
    setIsMin(false)
  
  }
  const handleMax1 = () => {
    setIsMin(true)

  }
  const handleCross = () => {
  
    props.setShowCompose(false)
  }

  React.useEffect(() => {
    checkDevice()
  }, [])

  return (
    <div className={isMin ? 'compose_main2' : 'compose_main'}>
        <div className='compose_nav'>
            <p className='C_newMessage'>New Message</p>
            <div className='C_to'>
           
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
        {/* <div className='compose3'>
          <textarea className='compose_textarea' ref={messageRef} placeholder='Type your message here...'></textarea>
        </div> */}
        <TextEditor handleSend={handleSend} sendText={sendText} />
        <div className='footer'>
          {/* <button className={isMin ? 'send2' : 'send'} onClick={handleSend}>Send</button> */}

          
        </div>
        <p className='footer_error'>{mailCheck}</p>

    </div>
  )
}

export default Compose