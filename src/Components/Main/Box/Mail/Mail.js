import React from 'react'
import star from '../../../../Images/star.svg'
import './Mail.css';
import axios from 'axios';
// import {View} from '../View/View.js'
function Mail(props) {
    console.log(props)

    var current = props.activeItem;

    async function deleteForeverHandler(event) {
        event.stopPropagation();
        // alert('Marked as important')
        const token = localStorage.getItem('jwtToken')
        if(!token){

            window.location = '/login'
        }
        const data = {
            unique_id: props.id,

            token: token

        }
        await axios.post('http://localhost:3000/connect/email/deleteForever', data).then((res) => {
            // alert(res.data)
            const mails = props.mails;
            const index = mails.findIndex((item) => {
                return item['unique_id'] === props.id
            })
            mails.splice(index, 1);
            // props.setMails(mails)

            event.target.checked = false
            // props.retriveMails();

        }
        ).catch((err) => {
            alert(err)
        }
        )

    }


    async function restoreMailHandler(event) {
        event.stopPropagation();
        // alert('Marked as important')
        const token = localStorage.getItem('jwtToken')
        if(!token){
            window.location = '/login'
        }
        const data = {

            unique_id: props.id,
            token: token

        }
        await axios.post('http://localhost:3000/connect/email/restoreMail', data).then((res) => {
            // alert(res.data)
            const mails = props.mails;
            const index = mails.findIndex((item) => {
                return item['unique_id'] === props.id
            })
            mails[index]['deleted'] = false;
            // props.setMails(mails)

            event.target.checked = false

        }

        ).catch((err) => {
            alert(err)
        }
        )

    }





  async function markUnImpHandler(event) {
        event.stopPropagation();
        // alert('Marked as important')
        const token = localStorage.getItem('jwtToken')
        if(!token){
            window.location = '/login'
        }
        const data = {
            unique_id: props.id,
            token: token

        }


        await axios.post('http://localhost:3000/connect/email/markUnimportant', data).then((res) => {
            // alert(res.data)
            const mails = props.mails;
            const index = mails.findIndex((item) => {
                return item['unique_id'] === props.id
            })
            mails[index]['imp'] = false;
            // props.setMails(mails)

            event.target.checked = false
            props.retriveMails();

        }
        ).catch((err) => {
            alert(err)
        }
        )

    


    }

  async function markImpHandler(event) {
        event.stopPropagation();
        if(!event.target.checked){
            markUnImpHandler(event)
            return
        }

        // alert('Marked as important')
        const token = localStorage.getItem('jwtToken')
        if(!token){
            window.location = '/login'
        }
        const data = {
            unique_id: props.id,
            token: token

        }
        await axios.post('http://localhost:3000/connect/email/markImportant', data).then((res) => {
            // alert(res.data)
            const mails = props.mails;
            const index = mails.findIndex((item) => {
                return item['unique_id'] === props.id
            })
            mails[index]['imp'] = true;

            event.target.checked = true
            props.retriveMails();

        }
        ).catch((err) => {
            alert(err)
        }
        )



        
    }


  return (
    <div className='m_main' id={props.id} onClick={props.viewHandler}>
        {current === "inbox" || current === "important" ? 
             <div className='m_left' onClick={(e)=> e.stopPropagation()}>
             {/* <img src={star} alt='star' className='starIcon'/> */}
             <input type='checkbox' onClick={markImpHandler}  checked={props.imp} className='starIcon2' ></input>
         </div>: null}
   {current === "inbox" || current === "important" || current === "trash" ?
   <div className='m_mid'>
   <p>{(props.name).slice(0,25)}</p>
</div>: null
   }
   {current === "sent" ?
   <div className='m_mid'>
    <p>{(props.to).slice(0,25)}</p>
</div>: null

    }
        
        <div className='m_right'>
            <p>
                <span className='subject'>I{(props.subject).slice(0,30)}</span>
                <span>&nbsp;&nbsp;  - &nbsp;&nbsp;</span>
                <span className='mail_prevue'>{(props.body).slice(0,120)}&nbsp;...</span>
            </p>
        </div>
        {current === "trash" ? 
        <div className="restore">
        <button className="restore_btn" onClick={restoreMailHandler}>Restore</button>
        <button className="deleteForever_btn" onClick={deleteForeverHandler}>Delete Forever</button>
    </div>: null}
        
      

    </div>
  )
}

export default Mail