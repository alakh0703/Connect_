import React from 'react'
import './Sidebar.css'
import pen from '../../../Images/pen.png'
import Compose from '../Compose/Compose'
function Sidebar(props) {
  const handleCompose = () => {
    props.setShowCompose(true)
  }
 const handleItemClick = (item) => {
  props.setActiveItem(item);
  checkDevice()
  if(isMobile === true){
    
  props.sss(false)
  }
};
const [isMobile, setIsMobile] = React.useState('')
const checkDevice = () => {
  if(window.innerWidth <= 600){
    setIsMobile(true)
  }else{
    setIsMobile(false)
  }
}
React.useEffect(() => {
    if(window.innerWidth <= 600){
      setIsMobile(true)
    }else{
      setIsMobile(false)
    }
  }, [])


  return (
    <div className={isMobile ? 'Sidebar_main_m':'Sidebar_main'}>
      { !isMobile && <div className='Sidebar_Compose'>
          <button className='Sidebar_ComposeText' onClick={handleCompose}>
            <img src={pen} alt='pen' className='Sidebar_ComposeImg'/>
            Compose</button>
       </div>}
       <div className='Sidebar_Menu'>
          <p className={ props.activeItem === 'inbox' ? 'active' :'Sidebar_MenuText'} onClick={() => handleItemClick('inbox')}>Inbox</p>
          <p className={ props.activeItem === 'important' ? 'active' :'Sidebar_MenuText'} onClick={() => handleItemClick('important')}>Important</p>
          <p className={props.activeItem === 'sent' ? 'active' :'Sidebar_MenuText'} onClick={() => handleItemClick('sent')}>Sent</p>
          <p className={props.activeItem=== 'trash' ? 'active' : 'Sidebar_MenuText'} onClick={() => handleItemClick('trash')}>Trash</p>
        </div>
      
    </div>
  )
}

export default Sidebar