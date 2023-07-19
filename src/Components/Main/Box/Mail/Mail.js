import React from 'react'
import star from '../../../../Images/star.svg'
import './Mail.css'
// import {View} from '../View/View.js'
function Mail(props) {
  return (
    <div className='m_main' id={props.id} onClick={props.viewHandler}>
        <div className='m_left' onClick={(e)=> e.stopPropagation()}>
            {/* <img src={star} alt='star' className='starIcon'/> */}
            <input type='checkbox'  className='starIcon2' ></input>
        </div>
        <div className='m_mid'>
            <p>{(props.name).slice(0,25)}</p>
        </div>
        <div className='m_right'>
            <p>
                <span className='subject'>I{(props.subject).slice(0,30)}</span>
                <span>&nbsp;&nbsp;  - &nbsp;&nbsp;</span>
                <span className='mail_prevue'>{(props.body).slice(0,120)}&nbsp;...</span>
            </p>
        </div>
      

    </div>
  )
}

export default Mail