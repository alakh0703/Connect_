import React from 'react';
import './Searchbar.css';
import searchIcon from '../../../Images/search.svg';

function Searchbar(props) {

  const handleChange = (event) => {
    props.setSearchQuery(event.target.value);
  }

  return (
    <div className='S_main'>
        <div className='S_searchicon'>
            <img src={searchIcon} className='S_icon' alt='search' />
        </div>
        <div className='S_2'>
        <input className='S_searchbar' onChange={handleChange} type='text' placeholder='Search' />
        </div>
    </div>
  )
}

export default Searchbar