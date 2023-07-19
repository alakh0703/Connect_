import React from 'react'
import './Compose.css'
import cross from '../../../../Images/multiply.png'
import max from '../../../../Images/maximize.png'
import min from '../../../../Images/min.png'

function Compose(props) {

  const [isMin, setIsMin] = React.useState(false)

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
          <input type='text' placeholder='Recipient' className='to_input'/>
        </div>
        <hr className='hr1'/>
        <div className='compose_2'>
          <p className='sub to'>Sub:</p>
          <input type='text' placeholder='Subject' className='to_input'/>
        </div>
        <hr className='hr1'/>
        <div className='compose3'>
          <textarea className='compose_textarea' placeholder='Type your message here...'></textarea>
        </div>
        <div className='footer'>
          <button className={isMax ? 'send2' : 'send'}>Send</button>

          
        </div>
    </div>
  )
}

export default Compose