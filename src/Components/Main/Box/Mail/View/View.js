import React from 'react';
import './View.css';
import back from '../../../../../Images/back.png';
import print from '../../../../../Images/print.png';
import delete0 from '../../../../../Images/delete0.svg';
function View(props) {

    const handleBack = () => {
        props.setViewMail(false);
    }
  return (
    <div className='view_main'>
        <div className='view_nav'>
            <img onClick={handleBack} src={back} alt='back' className='view_back'/>
        </div>
        <div className='view_subject'>
            <p className='view_subject_name'>{props.subject}</p>
            <div className='view_subject_right'>
                <img src={delete0} alt='delete' className='view_delete view_print'/>
                <img src={print} alt='print' className='view_print'/>
            </div>
        </div>
        <div className='view_sender'>
            <div className='view_sender_profile'>
                <p>A</p>
            </div>
            <p className='view_sender_name'>{props.name}</p>
            <p className='view_sender_email'>-{props.cmail}</p>
        </div>
        <div className='view_body'>
            <p className='view_body_text'>{props.body}</p>
        </div>
      <div className='view_footer'>
        <button className='view_footer_btn'>Reply</button>
        
        </div>
    </div>
  )
}

export default View




