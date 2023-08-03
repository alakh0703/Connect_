import React from 'react'
import './Home.css'
import Navbar from './Navbar'
import laptopart from '../../Images/art_lap.jpg' // <a href="https://www.freepik.com/free-vector/telecommuting-concept-illustration_7321334.htm#query=online%20working&position=21&from_view=keyword&track=ais">Image by storyset</a> on Freepik
import Login from './Sign/Login';



import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUp from './Sign/SignUp';

function Home(props) {
  const [showLogin, setShowLogin] = React.useState(true);



  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    
  ]);

  const handleSwitch = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className='home_main'>
        <Navbar />  
        <div className='home_body'>
            <div className='home_bodyLeft'>
              <div className='home_title'>
                  <p className='title'>Welcome to <br/> Connect</p>
              </div>
              <div className='login_form'>
           
             {showLogin && <Login handleSwitch={handleSwitch}/>}
              {!showLogin && <SignUp handleSwitch={handleSwitch} />}

              </div>
            </div>
            <div className='home_bodyRight'>
                    <img src={laptopart} className='art0' alt='laptopart' />
             </div>
        </div>
    </div>
  )
}

export default Home;