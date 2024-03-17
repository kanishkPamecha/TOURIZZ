import React, { useState } from 'react';

function One() {
  const [locationName, setLocationName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [name, setName] = useState('');
  const [Mobile1, setMobile1] = useState('');
  const [Mobile2, setMobile2] = useState('');
  const [roomType, setRoomType] = useState('');
  const [roomPrice, setRoomPrice] = useState('');
  const [roomList, setRoomList] = useState([]);
 const [city,setCity]=useState('');
 const[state,setstate]=useState('');
 const[country,setcountry]=useState('');
  const handleLocationInputChange = (e) => {
    setLocationName(e.target.value);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLatitude(lat);
          setLongitude(lon);
          fetchLocationName(lat, lon);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const fetchLocationName = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=YOUR_API_KEY`
      );
      const data = await response.json();
      setLocationName(data.name);
    } catch (error) {
      console.error("Error fetching location name:", error);
    }
  };

  const handleAddRoomType = () => {
    if (roomType && roomPrice) {
      const newRoomType = {
        name: roomType,
        price: roomPrice,
      };
      setRoomList([...roomList, newRoomType]);
      setRoomType('');
      setRoomPrice('');
    }
  };

  const handleAddHotel = () => {
    const newHotel = {
      name: name,
      Mobile1: Mobile1,
      Mobile2: Mobile2,
      location: {
        latitude: latitude,
        longitude: longitude,
      },
      Room_types: roomList,
    };

   
    console.log(newHotel);
  };

  return (
    <div style={{marginTop:'60px'}}>
      <label htmlFor="busName">Name of Hotel</label>
      <input type="text" name="busName" id="busName" value={name} onChange={(e) => setName(e.target.value)} />

      <label htmlFor="phone1">Contact Number 1</label>
      <input type="number" name="phone1" id="phone1" value={Mobile1} onChange={(e) => setMobile1(e.target.value)} />

      <label htmlFor="phone2">Contact Number 2</label>
      <input type="number" name="phone2" id="phone2" value={Mobile2} onChange={(e) => setMobile2(e.target.value)} />

      <div>
        <label htmlFor="Location">Location:</label>
        <input
          type="text"
          name="Location"
          id="Location"
          value={locationName}
          onChange={handleLocationInputChange}
        />
      </div>
      <div>
        <label htmlFor="Location">City:</label>
        <input
          type="text"
          name="City"
          id="City"
          value={city}
          onChange={(r)=>setCity.r.value}
        />
      </div>
      <div>
        <label htmlFor="Location">State:</label>
        <input
          type="text"
          name="State"
          id="State"
          value={state}
          onChange={(r)=>setstate.r.value}
        />
      </div>
      <div>
        <label htmlFor="Location">Location:</label>
        <input
          type="text"
          name="Country"
          id="Country"
          value={country}
          onChange={(r)=>setcountry.r.value}
        />
      </div>
      <button onClick={handleGetCurrentLocation}>Get Current Coordinates</button>

      <div>
        <label htmlFor="Latitude">Latitude:</label>
        <input
          type="text"
          name="Latitude"
          id="Latitude"
          value={latitude}
                 />
      </div>
      <div>
        <label htmlFor="Longitude">Longitude:</label>
        <input
          type="text"
          name="Longitude"
          id="Longitude"
          value={longitude}
          
        />
      </div>

      <h2>Add Room Type</h2>
      <label htmlFor="roomType">Room Type</label>
      <input type="text" name="roomType" id="roomType" value={roomType} onChange={(e) => setRoomType(e.target.value)} />

      <label htmlFor="roomPrice">Room Price</label>
      <input type="number" name="roomPrice" id="roomPrice" value={roomPrice} onChange={(e) => setRoomPrice(e.target.value)} />

      <button onClick={handleAddRoomType}>Add Room Type</button>

      <button onClick={handleAddHotel}>Submit</button>

      {/* Display added room types */}
      <ul>
        {roomList.map((room, roomIndex) => (
          <li key={roomIndex}>
            {room.name} - Price: {room.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default One;
