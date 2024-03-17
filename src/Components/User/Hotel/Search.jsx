import React from 'react';
import Group from './Group';

function Search() {
  const { searchPerformed, filteredHotels } = window.history.state;

  return (
    <div>
      <div>hii</div>
      <div>
        {searchPerformed &&
          filteredHotels.map((hotel) => (
            <Group hotel={hotel} key={hotel.id} />
          ))}
      </div>
    </div>
  );
}

export default Search;
