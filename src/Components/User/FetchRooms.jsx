// src/components/FetchRooms.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FetchRooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await axios.get('/api/hotels');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    }

    fetchRooms();
  }, []);

  return (
    <div>
      <h2>Rooms</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room._id}>
            Type: {room.type}, Number: {room.number}, Price: ${room.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FetchRooms;
