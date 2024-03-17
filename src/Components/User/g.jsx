import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import image from '../images/jaipur.jpg';
import image1 from '../images/Agra.jpg';
import hotel2 from '../images/jaipur.jpg';
import hotel1 from '../images/Agra.jpg';
import Group from './Group';
import './Group.css';

const Home = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [selectedCityIndex, setSelectedCityIndex] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const location = useLocation();
  const handleOptionChange = (event, transportIndex) => {
    const value = event.target.value;
    setSelectedOptions((prevSelectedOptions) => {
      const updatedSelectedOptions = [...prevSelectedOptions];
      updatedSelectedOptions[selectedCityIndex][transportIndex] = value;
      return updatedSelectedOptions;
    });
  };
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: 'The Great Indian Hotel, Jaipur',
      location: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      price: '2200',
      image: hotel1,
      city: 'Jaipur',
    },
    {
      id: 2,
      name: 'The Burj Al Arab, Dubai',
      location: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      price: '2200000000',
      image: hotel2,
      city: 'Dubai',
    },
  ]);

  const handleSearch = () => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('startDate', startDate);
    queryParams.set('endDate', endDate);
    queryParams.set('searchQuery', searchQuery);
    navigate(`/search?${queryParams.toString()}`);
  };
  const cityOptions = cities.map((city) => city.name);

  const handleAddCity = () => {
    const cityName = prompt('Enter city name:');
    if (cityName) {
      const city = {
        name: cityName,
        places: [],
        transport: [],
        personal: [],
      };
      setCities((prevCities) => [...prevCities, city]);
      setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions, []]);
    }
  };
  
  
  const filteredHotels = hotels.filter(
    (hotel) => hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPlace = () => {
    if (selectedCityIndex !== null) {
      const placeName = prompt('Enter place name:');
      if (placeName) {
        setCities((prevCities) => {
          const updatedCities = [...prevCities];
          if (!updatedCities[selectedCityIndex].places.includes(placeName)) {
            updatedCities[selectedCityIndex].places.push(placeName);
          }
          return updatedCities;
        });
      }
    } else {
      alert('Please select a city first');
    }
  };

  const handleAddHotel = () => {
    if (selectedCityIndex !== null) {
      const hotelName = prompt('Enter hotel name:');
      if (hotelName) {
        setCities((prevCities) => {
          const updatedCities = [...prevCities];
          if (!updatedCities[selectedCityIndex].hotels.includes(hotelName)) {
            updatedCities[selectedCityIndex].hotels.push(hotelName);
          }
          return updatedCities;
        });
      }
    } else {
      alert('Please select a city first');
    }
  };

  const handleAddTransport = () => {
    if (selectedCityIndex !== null) {
      const transportMode = prompt('Enter transport mode:');
      if (transportMode) {
        setCities((prevCities) => {
          const updatedCities = [...prevCities];
          if (!updatedCities[selectedCityIndex].transport.includes(transportMode)) {
            updatedCities[selectedCityIndex].transport.push(transportMode);
          }
          return updatedCities;
        });
      }
    } else {
      alert('Please select a city first');
    }
  };

  const handleAddPersonal = () => {
    if (selectedCityIndex !== null) {
      const personalTime = prompt('Enter personal time:');
      if (personalTime) {
        setCities((prevCities) => {
          const updatedCities = [...prevCities];
          if (!updatedCities[selectedCityIndex].personal.includes(personalTime)) {
            updatedCities[selectedCityIndex].personal.push(personalTime);
          }
          return updatedCities;
        });
      }
    } else {
      alert('Please select a city first');
    }
  };
  const handleCitySelection = (index) => {
    setSelectedCityIndex(index);
    setSelectedCity(cities[index].name);
    // Rest of the code...

    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.length <= index) {
        const updatedSelectedOptions = [...prevSelectedOptions];
        while (updatedSelectedOptions.length <= index) {
          updatedSelectedOptions.push([]);
        }
        return updatedSelectedOptions;
      }
      return prevSelectedOptions;
    });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid bg">
          <a className="navbar-brand" href="#">
            <h2>Group Bookings</h2>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <button className="nav-link" onClick={handleAddCity}>
                  Add City
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={handleAddPlace}>
                  Add Place
                </button>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={handleAddPersonal}>
                  Add Personal Time
                </a>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={handleAddHotel}>
                  Add Hotel
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={handleAddTransport}>
                  Add Transport
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div>
        <h4>Cities</h4>
        {cities.map((city, index) => (
          <div key={index} className="city-list" style={{ marginBottom: '1px' }}>
            <div
              className={`city-name container-fluid ${selectedCityIndex === index ? 'selected' : ''}`}
              onClick={() => handleCitySelection(index)}
            >
              {city.name}
            </div>

            <div className="m-5 ml-5">
              {selectedCityIndex === index && (
                <>
                  <div className="place-list">
                    <h4>Places:</h4>
                    {city.places.map((place, placeIndex) => (
                      <div key={placeIndex} className="place-name mt-3 container-fluid">
                        {place}
                      </div>
                    ))}
                  </div>
                  <div className="transport-list">
                    <h4>Transport:</h4>
                    {city.transport.map((transport, transportIndex) => (
                      <div key={transportIndex} className="transport-name container-fluid disp px-20 mt-2">
                        
                        <span className="p-">{transport}</span>
                        <select
                          value={selectedOptions[selectedCityIndex]?.[transportIndex] || ''}
                          onChange={(event) => handleOptionChange(event, transportIndex)}
                        >
                          <option value="walk">walk</option>
                          <option value="bike">bike</option>
                          <option value="cab">cab</option>
                          <option value="public bus" id="bus">
                            Bus
                          </option>
                          <option value="train">train</option>
                          <option value="metro">metro</option>
                          <option value="cycle">cycle</option>
                          <option value="plane">plane</option>
                        </select>
                      </div>
                    ))}
                  </div>
                  <div className="personal-list">
                    <h4>Personal Time:</h4>
                    {city.personal.map((time, timeIndex) => (
                      <div key={timeIndex} className="personal-time mt-3 container-fluid">
                        {time}
                      </div>
                    ))}
                  </div>
                  <div>
                  <div>
                          <h4>Hotels</h4>
                        <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                    <option value="">All</option>
                   {cities.map((city) => (
                     <option key={city.id} value={city.name}>
                    {city.name}
                       </option>
                         ))}
                        </select>
                             {filteredHotels
                      .filter((hotel) => !selectedCity || hotel.city.toLowerCase() === selectedCity.toLowerCase())
                .map((hotel) => (
                <Group hotel={hotel} key={hotel.id} />
                       ))}
                     </div>

                                    </div>

                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
