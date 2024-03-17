import React, { useState } from 'react';
import axios from 'axios';
import countriesWithStates from './countrie';
import './admincss.css'
function CreateRoom() {
  const [hotelData, setHotelData] = useState({
    name: '',
    rooms: [
      { type: '', numberOfRooms: 0, price: 0 },
    ],
  });

  const [locationName, setLocationName] = useState('');
  const [Mobile1, setMobile1] = useState('');
  const [Mobile2, setMobile2] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [images, setImages] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData({ ...hotelData, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState("");
    setSelectedCity("");
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity("");
  };

  const handleRoomChange = (e, index) => {
    const { name, value } = e.target;
    const updatedRooms = [...hotelData.rooms];
    updatedRooms[index][name] = value;
    setHotelData({ ...hotelData, rooms: updatedRooms });
  };

  const addRoom = () => {
    const updatedRooms = [...hotelData.rooms, { type: '', numberOfRooms: 0, price: 0 }];
    setHotelData({ ...hotelData, rooms: updatedRooms });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isValid = hotelData.rooms.every((room) => room.type.trim() !== '' && room.numberOfRooms > 0 && room.price > 0);

      if (!isValid) {
        alert('Please fill in all room details');
        return;
      }

      const updatedHotelData = {
        name: hotelData.name,
        rooms: hotelData.rooms.map((rooms) => ({
          type: hotelData.rooms.type,
          numberOfRooms: parseInt(hotelData.rooms.numberOfRooms),
          price: parseFloat(hotelData.rooms.price),
         
        })),
        Mobile1: Mobile1,
        Mobile2: Mobile2,
        latitude: latitude,
        longitude: longitude,
        email: email,
        country: selectedCountry,
        state: selectedState,
        city: selectedCity,
      };
      const formData = new FormData();
      formData.append('name', hotelData.name);
      hotelData.rooms.forEach((room, index) => {
        formData.append(`rooms[${index}].type`, room.type);
        formData.append(`rooms[${index}].price`, room.price);
        formData.append(`rooms[${index}].noOfRooms`, room.numberOfRooms);
      });
      formData.append('Mobile1', Mobile1);
      formData.append('Mobile2', Mobile2);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
      formData.append('email', email);
      formData.append('country', selectedCountry);
      formData.append('state', selectedState);
      formData.append('city', selectedCity);
    

   
      images.forEach((image, index) => {
        formData.append(`images`, image); // Note that 'images' is the field name in the backend
      });

      await axios.post('http://127.0.0.1:5000/api/hotels', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log(hotelData);

      alert('Hotel created successfully!');
    } catch (error) {
      console.log(error);
      alert('Error creating hotel');
    }
  }



  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLatitude(lat);
          setLongitude(lon);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <button onClick={handleGetCurrentLocation}>Get Current Coordinates</button>
      <h2>Create a Hotel</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Hotel Name:</label>
          <input type="text" name="name" onChange={handleChange} />
        </div>
        <label htmlFor="phone1">Mobile Number 1</label>
        <input type="number" name="phone1" id="phone1" onChange={(e) => setMobile1(e.target.value)} />
        <label htmlFor="phone2">Mobile Number 2</label>
        <input type="number" name="phone2" id="phone2" onChange={(e) => setMobile2(e.target.value)} />
        <label htmlFor="email">email</label>
        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="location">Location</label>
        <input type="text" name="location" id="location" />
        <label>Images:</label>
        <input type="file" name="images" multiple onChange={handleImageChange} />


        {hotelData.rooms.map((room, index) => (
          <div key={index } className='back mid ' >
            <br />
            <br />
            <hr />
            <label>Room Type:</label>
            <input
              type="text"
              name={`type`}
              onChange={(e) => handleRoomChange(e, index)}
            />
            <label>Number of Rooms:</label>
            <input
              type="number"
              name={`numberOfRooms`}
              onChange={(e) => handleRoomChange(e, index)}
            />
            <label>Price:</label>
            <input
              type="number"
              name={`price`}
              onChange={(e) => handleRoomChange(e, index)}
            />
            <hr />
          </div>
        ))}
        <br />
        <button type="button" onClick={addRoom}>
          Add Room
        </button>
        <label>Country:</label>
      <select value={selectedCountry} onChange={handleCountryChange}>
        <option value="">Select Country</option>
        {countriesWithStates.map((country, index) => (
          <option key={index} value={country.country}>
            {country.country}
          </option>
        ))}
      </select>
{selectedCountry && (
        <div>
          <label>State:</label>
          <select value={selectedState} onChange={handleStateChange}>
            <option value="">Select State</option>
            {countriesWithStates
              .find((country) => country.country === selectedCountry)
              .states.map((state, index) => (
                <option key={index} value={state.name}>
                  {state.name}
                </option>
              ))}
          </select>
        </div>
      )}

      {selectedState && (
        <div>
          <label>City:</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value) }
           
          >
            <option value="" size>Select City</option> 
   
            {countriesWithStates
              .find((country) => country.country === selectedCountry)
              .states.find((state) => state.name === selectedState)
              .cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
          </select>
          <button onClick={Map}>Map</button>
          {Map
     
          }
        </div>
      )}
        <button type="submit">Create Hotel</button>
      </form>
    </div>
  );
}

export default CreateRoom;
