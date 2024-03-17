import React, { useState } from 'react';
import axios from 'axios';

function Hotelroom() {
  const [response, setResponse] = useState(null); // Added state variable to hold the API response

  const searchFare = async () => {
    const options = {
      method: 'GET',
      url: 'https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete',
      params: {
        query: 'eiffel tower',
        lang: 'en_US',
        units: 'km',
      },
      headers: {
        'X-RapidAPI-Key': '49321a048emsh4fa22ced5b909c9p1c3d39jsn74434b071f03',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setResponse(response.data); // Update the state with the API response
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button className="btn btn-success" onClick={searchFare}>
        Submit
      </button>
      {response && (
        <pre>{JSON.stringify(response, null, 2)}</pre>
      )}
    </div>
  );
}

export default Hotelroom;
