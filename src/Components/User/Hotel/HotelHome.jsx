import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import hotel1 from '../../../images/hotel1.jpg';
import hotel2 from '../../../images/image1.jpg';
import Group from './Group';
import './HotelHome.css';
import Hotelsearch from './Hotelsearch';
import h from '../../../images/hotel_main.jpg';
import axios from 'axios';
import ReactGA from 'react-ga';
import image from '../../../Json/Hotel Booking.gif'

export default function Home() {
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [hotels, setHotels] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleSearch = () => {
  fetchHotels();
    setSearchPerformed(true);
    ReactGA.event({
      category: 'Search',
      action: 'Performed',
      label: selectedCity, // Optionally, you can include additional information
    });
    console.log('done');
  };

  const today = new Date().toISOString().split('T')[0];
  const fetchHotels = async () => {
    try {
      if (selectedCity) {
        const response = await axios.get(`http://127.0.0.1:5000/api/hotels/${encodeURIComponent(selectedCity)}`);
        setHotels(response.data);
        console.log(hotels);
      }
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };
  useEffect(() => {
    if (location.action === 'POP') {
      fetchHotels();
      setSearchPerformed(true);
    }
  }, [location]);


 

  const filteredHotels = hotels.filter((hotel) =>
    hotel.city?.toLowerCase().includes(selectedCity.toLowerCase())
  );
  useEffect(() => {
    ReactGA.initialize('G-4SPBX5RW3W');

   
  ReactGA.pageview('/hotel-home');

    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);


  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);


  return (
    <div>

        <div >


      {!searchPerformed
        &&

        <div className="container colon " style={{minHeight:'100vh'}}>
        <div className="display11    help " style={{borderRadius:'20px'}}>
          <div className="input-group">
            <div className='baseName' style={{marginTop:'-70px' ,display:'flex',alignContent:'space-between',minWidth:'100%',justifyContent:"space-between"}}>

            <button className='btn2 buttton2'>Book </button>
            <button className='btn2 buttton2'  >Refund </button>
            <button className='btn2 buttton2'>Bookings </button>
            </div>
            <br />
            <label htmlFor="cityInput">Enter City:</label>
            <input type="text" id="cityInput" value={selectedCity} onChange={handleCityChange} />
          </div>
          <div className="input-group">
            <label htmlFor="startDateInput">Check in-date:</label>
            <input
              type="date"
              id="startDateInput"
              value={startDate}
              min={today}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="endDateInput">Check out-date:</label>
            <input
              type="date"
              id="endDateInput"
              value={endDate}
              min={startDate}
              onChange={handleEndDateChange}
            />
          </div>
          <button className="btn-primary" onClick={handleSearch}>
            Search
          </button>
          <input type="range" name="" id="" />

        </div>
        
      </div>
      
      }

      {searchPerformed &&
        <div><div className="display1">
          <div className="input-group">
            <label htmlFor="cityInput">Enter City:</label>
            <input type="text" id="cityInput" value={selectedCity} onChange={handleCityChange} />
          </div>
          <div className="input-group">
            <label htmlFor="startDateInput">Check in-date:</label>
            <input
              type="date"
              id="startDateInput"
               value={startDate}
              min={today}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="endDateInput">Check out-date:</label>
            <input
              type="date"
              id="endDateInput"
              value={endDate}
              min={startDate}
              onChange={handleEndDateChange}
            />
          </div>
          <button className="btn-primary" onClick={handleSearch}>
            Search
          </button>
          <input type="range" name="" id="" />
        </div>

          <div>
            <div className='flex'>
              {searchPerformed &&
                filteredHotels.map((hotel) => (
                  <Group hotel={hotel} key={hotel.id} date ={startDate} outdate ={endDate}/>
                ))}
            </div>
          </div>
        </div>
      }
    </div>
    </div>

  );
}
