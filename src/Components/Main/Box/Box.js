import React from 'react'
import reloadIcon from '../../../Images/reload.svg'
import './Box.css'
import Mail from './Mail/Mail'
import fakeMails from './FakeMails.json'
import View from './Mail/View/View.js'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { act } from 'react-dom/test-utils'



function Box(props) {

  const [mails, setMails] = useState([]); // Set the default active item
  const [impMails, setImpMails] = useState([]); // Set the default active item
  const [sentMails, setSentMails] = useState([]); // Set the default active item
  const [trashMails, setTrashMails] = useState([]); // Set the default active item
  const [componentLoaded, setComponentLoaded] = useState(false);
  const [inbox, setInbox] = useState(mails); // Set the default active item

  const i = [1,2,3,4,5,6,7,8,9,10]
  const [reload, setReload] = useState(0);

  const [ViewMail, setViewMail] = useState(false);
  var [filter, setFilter] = useState([]); // Set the default active item

  const [entry, setEntry] = useState(['subject','name','cmail','body','id']);

  const handleView = (event) => {
    const id = event.currentTarget.id;
  
  var i = [];
  if(props.activeItem === 'sent'){
    i = sentMails.filter((item)=>{
      return item['unique_id'] === id;
    })
  }
  else {
    i = mails.filter((item)=>{
      return item['unique_id'] === id;
    })
  }

    
    // Filtering mails to find the one with the matching unique_id
    // const i = mails.filter((item) => {
    //   return item['unique_id'] === id;
    // });
    
    if (i.length > 0) {
      // Accessing the first element of the filtered array (assuming unique_id is unique)
      const mail = i[0];
      // alert(mail.subject);
  
      entry[0] = mail.subject;
      entry[1] = mail.name;
      entry[2] = mail.from;
      entry[3] = mail.body;
      entry[4] = mail.unique_id;
  
      setViewMail(true);
    } else {
      // Handle the case when no mail is found with the given unique_id
      alert("Mail not found!");
    }
  };
  
  const reloadHandler = () => {
     retriveMails();
  }



 async function retriveMails() {
  // alert('retriveMails')
        
    const token = localStorage.getItem('jwtToken')
    if(!token){
      // Navigate('/login')
      return
    }
    await axios.get('https://connect-backend-c83a.onrender.com/connect/users/retriveMails', {
      params: {
        token: token
      }
     })
    .then((res) => {
      // console.log(res.data.cmail.received)

      setMails(res.data.cmail.received);
      setSentMails(res.data.cmail.sent);
      setFilter(res.data.cmail.received);
    }
    )
    .catch((err) => {
      console.log(err)
    })

  }

 useEffect(() => {

  // run the function to retrive mails only `reload` changes


  if (!componentLoaded) {
    retriveMails();
    setComponentLoaded(true);
  }

    
    const impMails = mails.filter((item) => {
      return item['imp'] === true;
    });

    const trashMails = mails.filter((item) => {
      return item['deleted'] === true;
    });
    const inboxMails = mails.filter((item) => {
      return item['deleted'] === false;
    });

    setTrashMails(trashMails);
    setInbox(inboxMails);
    setImpMails(impMails);

   
  },[props.searchQuery, mails])

  // useEffect(() => {
  //   const impMails = mails.filter((item) => {
  //     return item['imp'] === true;
  //   });
  //   setImpMails(impMails);

  // },[props.searchQuery, mails])

// console.log(filter)
  return (
    <div className='b_main'>
        <div className='b_nav'>
            <img src={reloadIcon}  onClick={reloadHandler} alt='reload'  className='reloadIcon'/>
        </div>
        <div className='b_mail'>
           
           {/* {props.activeItem === 'inbox' ? filter.map((item,index) => {
                return <Mail key={index} id={item['id']} name={item['from']['name']} cmail={item['from']['email']} subject={item['subject']} body={item['body']}  viewHandler={handleView}/>
            }) : <p>Oops! You got no mails </p>
            } */}
             {props.activeItem === 'inbox' && inbox.map((item,index) => {
                return <Mail activeItem={props.activeItem} mails={mails} retriveMails={retriveMails} setMails={setMails} key={index} id={item['unique_id']} imp={item['imp']} name={item['fromName']} cmail={item['from']['email']} subject={item['subject']} body={item['body']}  viewHandler={handleView}/>
            }) 
            }

            {props.activeItem === 'important' && impMails.map((item,index) => {
                return <Mail activeItem={props.activeItem} mails={mails} retriveMails={retriveMails} setMails={setMails} key={index} id={item['unique_id']} imp={item['imp']} name={item['fromName']} cmail={item['from']['email']} subject={item['subject']} body={item['body']}  viewHandler={handleView}/>
            })
            }
            {
              props.activeItem === 'sent' && sentMails.map((item,index) => {
                
                return <Mail activeItem={props.activeItem} mails={mails} setMails={setMails} key={index} id={item['unique_id']} cmail={item['from']} to={item['to']} subject={item['subject']} body={item['body']}  viewHandler={handleView}/>
            })
            }

            {
              props.activeItem === 'trash' && trashMails.map((item,index) => {

                return <Mail activeItem={props.activeItem} mails={mails} setMails={setMails} key={index} id={item['unique_id']} imp={item['imp']} name={item['fromName']} cmail={item['from']['email']} subject={item['subject']} body={item['body']}  viewHandler={handleView}/>
            })
            }


            


            {/* {fakeMails.map((item,index) => {
                return <Mail key={index} id={item['id']} name={item['from']['name']} cmail={item['from']['email']} subject={item['subject']} body={item['body']}  viewHandler={handleView}/>
            })
            } */}
        </div>


        {ViewMail &&  <div className='main_view'>
            <View setMails={setMails} setViewMail={setViewMail} id={entry[4]} subject={entry[0]} name={entry[1]} email={entry[2]} body={entry[3]} />
        </div>}
       
    </div>
  )
}

export default Box