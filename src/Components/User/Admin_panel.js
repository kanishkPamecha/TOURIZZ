import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin_panel(bus) {
  const seats = 40;
  const [busCode, setBusCode] = useState('');
  const [starting, setStarting] = useState('');
  const [destination, setDestination] = useState('');
  const [showRadioButtons, setShowRadioButtons] = useState(false);
  const [existingReservations, setExistingReservations] = useState([]);
  const [reservedSeats, setReservedSeats] = useState({});

  const fetchExistingReservations = async (seatNumber) => {
    try {
      const response = await axios.get(`/api/reservations/${seatNumber}`);
      setExistingReservations(response.data);
    } catch (error) {
      // Handle error
    }
  };

  const handleSearchClick = () => {
    
      setShowRadioButtons(true);
    
  };


    const handleSeatSelect = async (seatNumber) => {
      await fetchExistingReservations(seatNumber);
    
      if (existingReservations.length > 0) {
        // Handle already reserved seat (show an alert, disable the reservation button, etc.)
        // You can add your specific logic here
        return;
      }
    
      
    
      const currentReservation = [starting, destination];
    
      if (!reservedSeats[busCode]) {
        // If this is the first seat reservation for the bus, initialize it
        setReservedSeats({
          ...reservedSeats,
          [busCode]: [currentReservation],
        });
      } else {
        // Check if the new reservation overlaps with existing reservations
        const overlappingReservations = reservedSeats[busCode].filter(
          (reservation) =>
            stations.indexOf(reservation[0]) <= stations.indexOf(destination) &&
            stations.indexOf(reservation[1]) >= stations.indexOf(starting)
        );
    
        if (overlappingReservations.length > 0) {
          // Handle overlapping reservations (show an alert, disable the reservation button, etc.)
          // You can add your specific logic here
          return;
        }
    
        // If no overlap, add the new reservation
        setReservedSeats({
          ...reservedSeats,
          [busCode]: [...reservedSeats[busCode], currentReservation],
        });
      }
    };
    const handleReservationSubmit = async () => {
      if (!busCode || !starting || !destination) {
        // Missing information, show an alert or handle accordingly
        return;
      }
  
      // Prepare the reservation data
      const reservationData = {
        busCode: bus.name,
        starting: bus.starting,
        destination: bus.Stop,
      };
  
      try {
        // Send a POST request to the backend API to register the reservation
        const response = await axios.post('http://127.0.0.1:port/api/reservations', reservationData);
        console.log(response.data.message); // Log the response message
      } catch (error) {
        console.error('Error registering reservation:', error);
        // Handle the error (show an alert, error message, etc.)
      }
    };
  const generateRadioButtons = () => {
    const numRows = Math.ceil(seats / 5);
    const radioButtons = [];

    for (let row = 0; row < numRows; row++) {
      const startSeat = row * 5 + 1;
      const endSeat = Math.min(startSeat + 4, seats);

      const rowRadios = [];
      for (let i = startSeat; i <= endSeat; i++) {
        rowRadios.push(
          <div key={i} style={{ display: 'inline-block', width: '50%' }}>
            <input
              type="radio"
              name={`seat-${i}`}
              value={i}
              onChange={() => handleSeatSelect(i)}
              disabled={reservedSeats[busCode]?.includes(i)}
            />
            <label>{`Seat ${i}`}</label>
            {i % 2 === 0 && i % 5 !== 0 ? <br /> : null}
          </div>
        );
      }

      radioButtons.push(
        <div key={row} style={{ display: 'flex' }}>
          {rowRadios}
        </div>
      );
    }

    return radioButtons;
  };
  return (
    <div>
      <div>
        
       
        <div>
          select the date
          <input type="date" name="date" id="" />
        </div>
        <div>
        
          <button onClick={handleSearchClick} className='btn btn-success'>Search</button>
        </div>
      </div>
      <div style={{maxWidth :' 700px'}}>
        {showRadioButtons && (
          <div>
            {/* Render the generated radio buttons */}
            {generateRadioButtons()}
            <button onClick={handleReservationSubmit} className='btn btn-success'>
        Submit Reservation
      </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin_panel;


