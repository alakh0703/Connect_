import React from 'react'
import './Sidebar.css'
import pen from '../../../Images/pen.png'
import Compose from './Compose/Compose'
function Sidebar(props) {
  const [isCompose, setIsCompose] = React.useState(false)
  const handleCompose = () => {
    setIsCompose(true)
  }
 const [isMax, setIsMax] = React.useState(false)
 const handleItemClick = (item) => {
  props.setActiveItem(item);
};
 
  return (
    <div className='Sidebar_main'>
       <div className='Sidebar_Compose'>
          <button className='Sidebar_ComposeText' onClick={handleCompose}>
            <img src={pen} alt='pen' className='Sidebar_ComposeImg'/>
            Compose</button>
       </div>
       <div className='Sidebar_Menu'>
          <p className={ props.activeItem === 'inbox' ? 'active' :'Sidebar_MenuText'} onClick={() => handleItemClick('inbox')}>Inbox</p>
          <p className={ props.activeItem === 'important' ? 'active' :'Sidebar_MenuText'} onClick={() => handleItemClick('important')}>Important</p>
          <p className={props.activeItem === 'sent' ? 'active' :'Sidebar_MenuText'} onClick={() => handleItemClick('sent')}>Sent</p>
          <p className={props.activeItem=== 'trash' ? 'active' : 'Sidebar_MenuText'} onClick={() => handleItemClick('trash')}>Trash</p>
        </div>
        {isCompose && <div className={isMax ? 'composeMax' : 'compose'}>
          <Compose setIsCompose={setIsCompose} isMax={isMax} setIsMax={setIsMax} /> 
        </div>}
        
    </div>
  )
}

export default Sidebar