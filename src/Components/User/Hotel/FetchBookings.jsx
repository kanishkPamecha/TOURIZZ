// src/components/FetchBookings.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FetchBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await axios.get('/api/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    }

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            Hotel ID: {booking.hotelId}, Room ID: {booking.roomId}, Check-In: {booking.checkInDate}, Check-Out: {booking.checkOutDate}, Guest Name: {booking.guestName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FetchBookings;
