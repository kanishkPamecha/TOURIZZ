import React, { useState } from 'react';
import './Search.css';

const Planes = () => {


  return (
    <div>
      <div className="search-container">
        <h2>WHERE To ??</h2>
        <form className='FormSearch' >
          <input
            type="search"
            // value={query}
            // onChange={handleInputChange}
            placeholder="Where To ??"
            className="search-input"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
        {/* <input type="range" value={numOfDays} onChange={(e) => setNumOfDays(Number(e.target.value))} /> */}
      </div>

      <h2>Submitted Data</h2>
   
    

      {/* <button onClick={handleAddDay}>Add Day</button> */}
    </div>
  );
};

export default Planes;
