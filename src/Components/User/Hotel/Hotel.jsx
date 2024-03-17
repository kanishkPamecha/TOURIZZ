import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import { loadStripe } from '@stripe/stripe-js';

export default function Hotel() {
  // Access additional props
  
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  
  const location = useLocation();
  const hotel = location.state.hotel;
  const date = location.state.date;
  const outdate = location.state.outdate;
  const [startDate, setStartDate] = useState(date);
  const [endDate, setEndDate] = useState(outdate);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const storedUserEmail = localStorage.getItem('userEmail');
    if (storedUserEmail) {
      setUserEmail(storedUserEmail);
    }
  }, []);

  const [numOfRooms1, setNumOfRooms1] = useState(1);
  const [roomsData, setRoomsData] = useState(hotel.rooms.map(() => ({ numOfRooms2: 1, numOfRooms3: 0, mattresses: 0 })));

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  const defaultProps = {
    center: {
      lat: hotel.latitude,
      lng: hotel.longitude
    },
    zoom: 11
  };

  const makePayment = async () => {
    
 
       try {
          const stripe = await loadStripe('pk_test_51O3LMrSGuCW05tAAnSBcKwGAMiFcvNuLxOxzgmSDDCDQ8aSjzMOyue93cBjt0vfMzPl8uDNGyL4l1LaIxaaphDiv00Ike0EEJH');
    
          const response = await axios.post('http://localhost:7000/api/create-checkout-session', {
            products: {
              type: selectedRoom.type,
              roomsData: roomsData,
              endDate: endDate,
              startDate: startDate,
              Price: selectedRoom.Price,
           
              
            },
            userEmail: userEmail,
          });
    
          const result = await stripe.redirectToCheckout({ sessionId: response.data.id });
        
          if (result.error) {
            console.log(result.error);
          } else {
          
            console.log('1step done ');
            const updateResponse = await axios.post('http://127.0.0.1:7001/api/successful-payment', {
              userEmail: userEmail,
              products: selectedRoom,
              roomsData: roomsData,
              startDate: startDate,
              endDate: endDate,
            });
            
    
            console.log('Booking updated successfully:', updateResponse.data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
      
    

  const handleSubmit = () => {
    if (selectedRoom) {
      makePayment();
    } else {
      console.error('Please select a room before booking.');
    }
  };
const handleIncrementMattresses = (roomIndex) => {
 const updatedRooms = [...roomsData];
 updatedRooms[roomIndex].mattresses = (updatedRooms[roomIndex].mattresses || 0) + 1;
 setRoomsData(updatedRooms);
};

const handleDecrementMattresses = (roomIndex) => {
  const updatedRooms = [...roomsData];
  if (updatedRooms[roomIndex].mattresses > 0) {
    updatedRooms[roomIndex].mattresses--;
    setRoomsData(updatedRooms);
  }
};




  const today = new Date().toISOString().split('T')[0];

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleNumOfRooms2Change = (roomIndex, value) => {
    const updatedRooms = [...roomsData];
    updatedRooms[roomIndex].numOfRooms2 = value;
    setRoomsData(updatedRooms);
  };
  
  const handleNumOfRooms3Change = (roomIndex, value) => {
    const updatedRooms = [...roomsData];
    updatedRooms[roomIndex].numOfRooms3 = value;
    setRoomsData(updatedRooms);
    
  };
  
  const handleIncrementNumOfRooms = (roomIndex, field) => {
    const updatedRooms = [...roomsData];
    updatedRooms[roomIndex][field]++;
    setRoomsData(updatedRooms);
    // setMattresses(0);
  };

  const handleDecrementNumOfRooms = (roomIndex, field) => {
    const updatedRooms = [...roomsData];
    if (updatedRooms[roomIndex][field] > 1) {
      updatedRooms[roomIndex][field]--;
      setRoomsData(updatedRooms);
    }
  };

  const addNewRoom = () => {
    setRoomsData([...roomsData, { numOfRooms2: 1, numOfRooms3: 1 }]);
  };
  const DeleteNewRoom = () => {
    setRoomsData(prevRoomsData => {
      if (prevRoomsData.length > 1) {
        // Remove the last room
        const updatedRoomsData = prevRoomsData.slice(0, -1);
        return updatedRoomsData;
      } else {
        return prevRoomsData; // Do nothing if there's only one room
      }
    });
  };

  
  return (
    <div className='flexx'>
      {console.log(userEmail)}
      <div className='des  '>
      <div className='cont flex1'>
        <img src={`http://localhost:5000/uploads/${hotel.images[0]}`} alt="Hotel" className="card-img-top cont" />
      {/* </div>
      <div className='fle'> */}
      <div className='des inline '>
        
         <h2>{hotel.name}</h2>
       <label htmlFor="dateInput">Check in-date:</label>         <input
          type="date"
          id="startDateInput"
          value={startDate}
          min={today}
          onChange={handleStartDateChange}
        />
        <hr />
        <label>Check out-date</label>
        <input
          type="date"
          id="endDateInput"
          value={endDate}
          min={startDate}
          onChange={handleEndDateChange}
          />
        <p>Location: {hotel.location}</p>
        {/* {hotel.rooms[0]} */}
        <p>Price: {hotel.Price}</p>
        </div>
          </div>
          <br /><br />
        <ul>
          {!selectedRoom && hotel.rooms.map((room, index) => (
           
            <div key={index} className='black-border' onClick={() => handleRoomClick(room)}>
              Room Type: {room.type}
              <p>Price Per Room: {room.Price}</p>
            </div>
          ))}
        </ul>
        {selectedRoom && (
              <div className='flex'>

          <div className="room-details">
            {roomsData.map((roomData, index) => (
              <div >
              <div key={index} className='box5'>
              
                <h3>Room {index + 1}</h3>
                <div>
                  <label>
                   {' No of People Greater >18'}
                    <input
                      type="number"
                      value={roomData.numOfRooms2}
                      onChange={(e) => handleNumOfRooms2Change(index, parseInt(e.target.value))}
                      min="1"
                      max="4"
                    />
                  </label>
                  <button onClick={() => handleIncrementNumOfRooms(index, 'numOfRooms2')}>+</button>
                  <button onClick={() => handleDecrementNumOfRooms(index, 'numOfRooms2')} disabled={roomData.numOfRooms2 === 1}>-</button>
                </div>
                <div>
                  <label>
                 {'   No of People Greater < 18'}
                    <input
                      type="number"
                      value={roomData.numOfRooms3}
                      onChange={(e) => handleNumOfRooms3Change(index, parseInt(e.target.value))}
                      min="0"
                     max ="4"
                    />
                  </label>
                  <button onClick={() => handleIncrementNumOfRooms(index, 'numOfRooms3')}>+</button>
                  <button onClick={() => handleDecrementNumOfRooms(index, 'numOfRooms3')} disabled={roomData.numOfRooms3 === 1}>-</button>
                </div>

                
                <div>Number of Mattresses: {roomData.mattresses}</div>
  <button type="submit" onClick={() => handleIncrementMattresses(index)}>Add Mattress</button>
  <button type="submit" onClick={() => handleDecrementMattresses(index)}>Remove Mattress</button>
  </div>

<br />
<button onClick={addNewRoom}>Add Room</button>
        <button onClick={DeleteNewRoom}>Close Room</button>
</div>
            ))
            }
          </div>
       </div> )}   <div style={{display:'flex',marginLeft:'70%' ,height: '60vh', width: '50vh' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <div
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
       
     
        <button className='btn btn-success' onClick={handleSubmit}> Book Now</button>
      </div>
      {/* <Payment/> */}
    </div>
  );
}
