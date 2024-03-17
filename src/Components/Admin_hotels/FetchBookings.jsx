// FetchBookings.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FetchBookings({ hotelId }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/bookings/Rr4MkHpVX`);
        setBookings(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    }
  
    fetchBookings();
  }, [hotelId]);
  

  return (
    <div>
      
         <div>
               Current Booking 
                 <div className='back-122' style={{minHeight:'50px',minWidth:'100%',backgroundColor:'wheat'}}> 
                 hello
                 <div style={{minHeight:'50px',minWidth:'100%'}}></div></div>
                </div>
      <div className='center '>
        <h2>Bookings</h2>
      <label>Hotel Name:</label>
        </div>
          {/* <input type="text" name="name" onChange={handleChange} /> */}
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            Hotel ID: {booking.name}, Room ID: {booking.rooms}, Check-In: {booking.checkInDate}, Check-Out: {booking.checkOutDate}, Guest Name: {booking.guestName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FetchBookings;
