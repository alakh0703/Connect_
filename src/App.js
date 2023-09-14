import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { UserContextProvider } from './context/userContext';
import Home from './Components/Home/Home';
import Main from './Components/Main/Main';
import Navbar from './Components/Navbar/Navbar';
import ChatHome from './Components/Chats/ChatHome';

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="App">
      <UserContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/verified"
              element={
                <div className='app_main'>
                  <Navbar setSearchQuery={setSearchQuery} sss={setShowSidebar} ss={showSidebar} />  
                  <Main  ss={showSidebar} searchQuery={searchQuery} sss={setShowSidebar} showSidebar={showSidebar} />
                </div>
              }
            />
            <Route path='/connectVerse' element={
              <ChatHome />
            } />
          </Routes>
        </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;
