import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import Box from './Box/Box'
import './Main.css'
function Main(props) {
  // console.log("cidna" + props.showSidebar)

  const [activeItem, setActiveItem] = React.useState('inbox'); // Set the default active item

  return (
    <div className='Main_main'>
      {props.showSidebar ?<Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />:null}
       {/* <Sidebar /> */}
      
    <Box searchQuery={props.searchQuery} activeItem={activeItem} /></div>
  )
}

export default Main