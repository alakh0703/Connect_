import React from 'react'
import reloadIcon from '../../../Images/reload.svg'
import './Box.css'
import Mail from './Mail/Mail'
import fakeMails from './FakeMails.json'
import View from './Mail/View/View.js'

import { useState } from 'react'
function Box(props) {

  

  const i = [1,2,3,4,5,6,7,8,9,10]
  const [reload, setReload] = useState(0);

  const [ViewMail, setViewMail] = useState(false);
  var [filter, setFilter] = useState(fakeMails); // Set the default active item

  const [entry, setEntry] = useState(['subject','name','cmail','body']);

  const handleView = (event) => {
    // id of the component clicked
    const id = event.currentTarget.id;
    const i = fakeMails[id]
    entry[0] = i['subject']
    entry[1] = i['from']['name']
    entry[2] = i['from']['email']
    entry[3] = i['body']

    setViewMail(true);
  }

  console.log(fakeMails)
  const reloadHandler = () => {
    setReload(prev => prev+1);
  }


  console.log("first")


  React.useEffect(() => {
    console.log("second")
    const filtered = fakeMails.filter((item) => {
      return  item['from']['name'].toLowerCase().includes(props.searchQuery.toLowerCase()) || item['from']['email'].toLowerCase().includes(props.searchQuery.toLowerCase()) 
    })
    setFilter(filtered);
  },[props.searchQuery])


  return (
    <div className='b_main'>
        <div className='b_nav'>
            <img src={reloadIcon}  onClick={reloadHandler} alt='reload'  className='reloadIcon'/>
        </div>
        <div className='b_mail'>
           
           {props.activeItem === 'inbox' ? filter.map((item,index) => {
                return <Mail key={index} id={item['id']} name={item['from']['name']} cmail={item['from']['email']} subject={item['subject']} body={item['body']}  viewHandler={handleView}/>
            }) : <p>Oops! You got no mails </p>
            }

            {/* {fakeMails.map((item,index) => {
                return <Mail key={index} id={item['id']} name={item['from']['name']} cmail={item['from']['email']} subject={item['subject']} body={item['body']}  viewHandler={handleView}/>
            })
            } */}
        </div>


        {ViewMail &&  <div className='main_view'>
            <View setViewMail={setViewMail} subject={entry[0]} name={entry[1]} cmail={entry[2]} body={entry[3]} />
        </div>}
       
    </div>
  )
}

export default Box