import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Group from '../Hotel/Group';

const PackagesInfo = () => {
  const location = useLocation();
  const selectedPackage = location?.state?.selectedPackage || null;
  const citiesData = location?.state?.citiesData || [];
  const [hotels, setHotels] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(true);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [city, setCity] = useState('New Delhi');
  const [Hotel, setHotel] = useState(false);
  const [error, setError] = useState(null);
  const [activities, setActivities] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]); // Initialize filteredHotels state
   const Price_others =0;
   const Price_hotels =0;
   const Price_trans =0;
   

  const handleToggleActivity = (activity) => {
    setSelectedActivities((prevActivities) => {
      if (prevActivities.includes(activity)) {
        return prevActivities.filter((item) => item !== activity);
      } else {
        return [...prevActivities, activity];
      }
    });
  };

  const fetchHotels = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/hotels');
      setHotels(response.data);
      console.log(response.data);

     
      
      setSearchPerformed(true);
      setFilteredHotels(hotels);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };
const Change_transport=()=>{

}
  const change_hotel = () => {
    setHotel(true);
    fetchHotels();
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/activities/${selectedPackage.name}`);
        const data = await response.json();

        if (response.ok) {
          setActivities(data);
        } else {
          console.error('Failed to fetch activities:', data.message);
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    if (city) {
      fetchActivities();
    }
  }, [city]);

  const handleSelectHotel = (hotel) => {
    setSelectedHotel((prevHotel) => (prevHotel === hotel ? null : hotel));
  };

  if (!selectedPackage) {
    return <div>No package selected.</div>;
  }

  return (
    <div  style={{marginTop:'0%'}} >
      <h1>Package Info</h1>
      <h2>{selectedPackage.name}</h2>
      <p>{selectedPackage.description}</p>
      <div className='flexxx'>
        <img src={`http://127.0.0.1:3001/${selectedPackage.img}`} className="Image_plane" alt="hello image here" />
        <div>
          <div className='divi'>Cities</div> <br /><div className='divi'>HotelS: </div>
          <br />
          <div className='divi'>Transport: </div>
          <br />
          <div className='divi'>Places: </div>
          <br />   <div className='divi'>others: </div>
        </div>
      </div>

      <ul>
        <h2>Cities Data</h2>
        {citiesData.map((cityData, index) => (
          <li key={index}>
            <p>Name: {cityData.name}</p>
            <p>Activities: {cityData.activities.join(', ')}</p>
            <button onClick={() => handleToggleActivity(cityData.name)}>
              {selectedActivities.includes(cityData.name) ? 'Remove Activity' : 'Add Activity'}
            </button>
            <button onClick={() => handleSelectHotel(cityData.name)}>
              {selectedHotel === cityData.name ? 'Deselect Hotel' : 'Select Hotel'}
            </button>
          </li>
        ))}
      </ul>

      <button onClick={change_hotel}>Change Hotel</button>
   
      {Hotel && (
        <div>
          Hotel
          {searchPerformed &&
            filteredHotels.map((hotel) => (
              <Group hotel={hotel} key={hotel.id} 
              //  onClick={selectedHotel(hotel.price)}
               />
            ))}
          {console.log(filteredHotels)}
        </div>
      )}
 
      <button onClick={Change_transport}>Change Transport</button>
      <button>Change Places</button>

      <div>
        <h2>Selected Activities</h2>
        <ul>
          {selectedActivities.map((activity, index) => (
            <li key={index}>
              <p>{activity}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Selected Hotel</h2>
        <p>{selectedHotel || 'None selected'}</p>
      </div>

      {error ? (
        <p>{error}</p>
      ) : (
        activities.length > 0 ? (
          <ul>
            {activities.map((activity) => (
              <li key={activity._id}>
                {activity.name} - {activity.Rate}
              </li>
            ))}
          </ul>
        ) : (
          <p>No activities found for the specified city.</p>
        )
      )}

      <div className='customDiv'>
        <p>Total: </p>
        <h4>Hotels{Price_hotels}</h4>
        <h4>Trans.{Price_trans}</h4>
        <h4>others{Price_others}</h4>

        <button className='btn btn-success'>price {Price_hotels+Price_trans+Price_others} </button>
      </div>
    </div>
  );
};

export default PackagesInfo;
