import React from 'react'
import reloadIcon from '../../../Images/reload.svg'
import './Box.css'
import Mail from './Mail/Mail'
import View from './Mail/View/View.js'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { act, isDOMComponent } from 'react-dom/test-utils'
import Loader from './Loader/Loader.js'



function Box(props) {
  const [typee, setTypee] = useState('inbox'); // Set the default active item
  const [mails, setMails] = useState([]); // Set the default active item
  const [impMails, setImpMails] = useState([]); // Set the default active item
  const [sentMails, setSentMails] = useState([]); // Set the default active item
  const [trashMails, setTrashMails] = useState([]); // Set the default active item
  const [componentLoaded, setComponentLoaded] = useState(false);
  const [inbox, setInbox] = useState(mails); // Set the default active item
  const [Loaderr, setLoader] = useState(false); // Set the default active item
const [refresh, setRefresh] = useState(false); // Set the default active item
const [isMobile, setIsMobile] = React.useState(false); // Set the default active item
const [searchQuery2, setSearchQuery2] = useState(''); // Set the default active item
  const i = [1,2,3,4,5,6,7,8,9,10]
  const [reload, setReload] = useState(0);

  const [ViewMail, setViewMail] = useState(false);
  var [filter, setFilter] = useState([]); // Set the default active item

  const [entry, setEntry] = useState(['subject','name','cmail','body','id']);

  const checkDevice = () => {
    if(window.innerWidth <= 600){
      setIsMobile(true)
    }else{
      setIsMobile(false)
    }

  }

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

    
  
    if (i.length > 0) {
      // Accessing the first element of the filtered array (assuming unique_id is unique)
      const mail = i[0];
      // alert(mail.subject);
      console.log("Mail: ", mail)
      entry[0] = mail.subject;
      entry[1] = mail.fromName;
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
  setRefresh(true);

  setLoader(false);
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
      setLoader(true);
      setRefresh(false);
    }
    )
    .catch((err) => {
      console.log(err)
    })
  
    setRefresh(false);

  }

 useEffect(() => {
  // alert('useEffect')
  setLoader(true);
  setSearchQuery2(props.searchQuery.toLowerCase());
  checkDevice();
  // run the function to retrive mails only `reload` changes


  if (!componentLoaded) {
    retriveMails();
    setComponentLoaded(true);
    setLoader(false);
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
    console.log("MAILS", mails);

    filter = mails.filter((item) => {
      return item['subject'].toLowerCase().includes(searchQuery2) 
      || item['fromName'].toLowerCase().includes(searchQuery2)
       || item['from'].toLowerCase().includes(searchQuery2);
    }
    )
  
    setFilter(filter);

    // console.log(filter)

   
  },[props.searchQuery, mails])
  const [main_class, setMain_class] = useState('b_main_m');
 useEffect(() => {
   if(props.ss === true){
      setMain_class('b_main_m2')
  }else{
    setMain_class('b_main_m')
  }

 },[props.ss])

function sm1(mails0){
  setMails(mails0);
  console.log(mails0)
  const impMails = mails0.filter((item) => {
    return item['imp'] === true;
  });

  const trashMails = mails0.filter((item) => {
    return item['deleted'] === true;
  });
  const inboxMails = mails0.filter((item) => {
    return item['deleted'] === false;
  });
  setInbox(inboxMails);
  setTrashMails(trashMails);
  setImpMails(impMails);

}

// console.log(filter)
  return (
    <div className={isMobile ? main_class:'b_main'}>
        <div className='b_nav'>
            <img src={reloadIcon}  onClick={reloadHandler} alt='reload'  className='reloadIcon'/>
            &nbsp;
            {refresh &&  <p className='re'>refreshing ...</p>
}
        </div>

    {searchQuery2.length > 0 && <div className='b_mail'>
       {filter.map((item,index) => {
              return <Mail sm={sm1}  activeItem={props.activeItem} mails={mails} retriveMails={retriveMails} setMails={setMails} key={index} id={item['unique_id']} imp={item['imp']} name={item['fromName']} cmail={item['from']['email']} subject={item['subject']} body={item['body']}  viewHandler={handleView}/>
          }
          )

       }
      </div>
      
      }

     { searchQuery2.length === 0 &&  <div className='b_mail'>
           
         

           {!Loaderr ? <Loader /> : <div>
             {props.activeItem === 'inbox' && inbox.map((item,index) => {
              return <Mail  setTypee={setTypee} sm={sm1}   activeItem={props.activeItem} mails={mails} retriveMails={retriveMails} setMails={setMails} key={index} id={item['unique_id']} imp={item['imp']} name={item['fromName']} cmail={item['from']['email']} subject={item['subject']} body={item['body']}  viewHandler={handleView}/>
          }) 
          }

          {props.activeItem === 'important' && impMails.map((item,index) => {
              return <Mail  setTypee={setTypee} sm={sm1} impMails={impMails} setImpMails={setImpMails}  activeItem={props.activeItem} mails={mails} retriveMails={retriveMails} setMails={setMails} key={index} id={item['unique_id']} imp={item['imp']} name={item['fromName']} cmail={item['from']['email']} subject={item['subject']} body={item['body']}  viewHandler={handleView}/>
          })
          }
          {
            props.activeItem === 'sent' && sentMails.map((item,index) => {
              
              return <Mail sm={sm1} setTypee={setTypee} activeItem={props.activeItem} mails={mails} setMails={setMails} key={index} id={item['unique_id']}  cmail={item['from']} to={item['to']} subject={item['subject']} body={item['body']}  viewHandler={handleView}/>
          })
          }

          {
            props.activeItem === 'trash' && trashMails.map((item,index) => {

              return <Mail  setTypee={setTypee} sm={sm1} activeItem={props.activeItem} mails={mails} setMails={setMails} key={index} id={item['unique_id']} imp={item['imp']} name={item['fromName']} cmail={item['from']['email']} subject={item['subject']} body={item['body']}  viewHandler={handleView}/>
          })
          }


          
           </div>
           }
           


          
        </div>}


        {ViewMail &&  <div className='main_view'>
            <View typee={typee} sendM = {sentMails} setMails={setMails} mails={mails} sm={sm1} setViewMail={setViewMail} id={entry[4]} subject={entry[0]} name={entry[1]} email={entry[2]} body={entry[3]} />
        </div>}
       
    </div>
  )
}

export default Box