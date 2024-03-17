import React, { Component } from 'react';
import axios from 'axios';

class Hotelsearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: [],
      city: '',
    };
  }

  handleApiRequest = async () => {
   
    const options = {
      method: 'GET',
      url: 'https://hotels4.p.rapidapi.com/locations/v3/search',
      params: {
        q: 'city', // Use the city state value here
        locale: 'en_US',
        langid: '1033',
        siteid: '300000001',
      },
      headers: {
        'X-RapidAPI-Key': '49321a048emsh4fa22ced5b909c9p1c3d39jsn74434b071f03',
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      this.setState({ apiResponse: response.data });
    } catch (error) {
      console.error(error);
      this.setState({ apiResponse: [] });
    }
  };

  render() {
    const { apiResponse, city } = this.state;

    return (
      <div>
        <input
          type="text"
          name="city"
          id="city"
          value={city}
          onChange={(e) => this.setState({ city: e.target.value })} // Update the city state when the user types
        />
        <button >Request Room</button>
        {apiResponse.length > 0 ? (
          <div>
            <h2>Hotel Search Results</h2>
            <ul>
              {apiResponse.map((hotel) => (
                <li key={hotel.id}>{hotel.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No hotel results found.</p>
        )}
      </div>
    );
  }
}

export default Hotelsearch;
