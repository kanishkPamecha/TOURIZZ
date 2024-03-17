// FetchRooms.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FetchRooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/hotels');
        setRooms(response.data);
        console.log(response.data);
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
        {rooms.map((room,roms) => (
          <li key={room._id}>
            Type: {room.name}, Number: {room.Mobile1},
         {/*  for displaying the rooms of the hotels */}
        delux: {room.rooms.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FetchRooms;
