// Search.js
import React, { useState } from 'react';
import './Search.css'; // Add a CSS file for styling
import { Navigate } from 'react-router-dom';
import Planes from './Planes';

function Search() {
  const [query, setQuery] = useState('');

  // const nav = Navigate(); // Initialize Navigate

   const handleInputChange = (e) => {
    setQuery(e.target.value);
   };

  const handleSubmit = (e) => {
    e.preventDefault();
    // nav(<Planes/>);
  };

  return (
    <div className="search-container" style={{ position:'fixed'}}>
      <h2>WHERE To ??</h2>
      <form className='FormSearch' onSubmit={handleSubmit}>
        <input
          type="search"
          value={query} // Bind the value to the state
          onChange={handleInputChange}
          placeholder="Where To ??"
          className="search-input"
        />

        <button type="submit" className="search-btn">
          Search
        </button>
        <div>

        </div>
      </form>
        <input type="range" value="" />
    </div>
  );
}

export default Search;
