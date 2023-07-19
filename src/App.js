import './App.css';
import Main from './Components/Main/Main';
import Navbar from './Components/Navbar/Navbar';
import { useState } from 'react';
function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  console.log(showSidebar)
  return (
    <div className="App">
      <Navbar setSearchQuery={setSearchQuery} sss={setShowSidebar} ss={showSidebar} />  
      <Main searchQuery={searchQuery} showSidebar={showSidebar} />
    </div>
  );
}

export default App;
