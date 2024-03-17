import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const BusInterface = ({ BusName, Date, BusId, userEmail }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const seats = 40; // Assuming there are 40 seats
  const autoDeselectSeats = [5, 10, 12, 35, 20];
  const reservedSeats = {}; // Assuming reservedSeats is an object with busCode keys

  const makePayment = async () => {
    try {
      const stripe = await loadStripe(
        'pk_test_51O3LMrSGuCW05tAAnSBcKwGAMiFcvNuLxOxzgmSDDCDQ8aSjzMOyue93cBjt0vfMzPl8uDNGyL4l1LaIxaaphDiv00Ike0EEJH'
      );
      const selectedSeatsLength = selectedSeats.length;
      const response = await axios.post('http://127.0.0.1:7000/api/create-bus-session', {
        products: {
          selectedSeats: selectedSeats,
          selectedSeatsLength:selectedSeatsLength,
          BusName: BusName,
          BusId: BusId,
          Date: Date,
        },
        userEmail: userEmail,
      });

      const result = await stripe.redirectToCheckout({ sessionId: response.data.id });

      if (result.error) {
        console.log(result.error);
      } else {
        console.log('1step done');
        const updateResponse = await axios.post('http://127.0.0.1:7001/api/successful-payment', {
          userEmail: userEmail,
          products: selectedSeats,
          BusName: BusName,
          BusId: BusId,
          Date: Date,
        });

        console.log('Booking updated successfully:', updateResponse.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const maxSeats = 5; // Maximum number of selected seats

  const handleSeatSelect = (seatNumber) => {
    const isSelected = selectedSeats.includes(seatNumber);

    if (!autoDeselectSeats.includes(seatNumber)) {
      if (isSelected) {
        setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
      } else {
        // Check if the maximum number of seats is reached
        if (selectedSeats.length < maxSeats) {
          setSelectedSeats([...selectedSeats, seatNumber]);
        } else {
          // Handle the case where the maximum number of seats is reached
          alert('Maximum number of seats reached!');
        }
      }
    }
  };

  const generateSeats = () => {
    const numRows = Math.ceil(seats / 5);
    const seatElements = [];

    for (let row = 0; row < numRows; row++) {
      const startSeat = row * 5 + 1;
      const endSeat = Math.min(startSeat + 4, seats);

      const rowSeats = [];
      for (let i = startSeat; i <= endSeat; i++) {
        const isSelected = selectedSeats.includes(i);
        const isAutoDeselect = autoDeselectSeats.includes(i);

        rowSeats.push(
          <div
            key={i}
            className={`seat  ${
              isAutoDeselect ? 'auto-deselect' : `${isSelected ? 'selected' : ''}`
            }`}
            onClick={() => handleSeatSelect(i)}
            style={{
              width: '30px',
              height: '30px',
              margin: '5px',
              border: '1px solid #000',
              backgroundColor: isSelected
                ? '#00f'
                : isAutoDeselect
                ? '#aaa' // Color for automatically deselected seats
                : 'transparent',
              color: isSelected ? '#fff' : isAutoDeselect ? '#000' : '#000',
              cursor: isAutoDeselect ? 'not-allowed' : 'pointer',
            }}
          >
            {i}
          </div>
        );
      }

      seatElements.push(
        <div key={row} style={{ display: 'flex' }}>
          {rowSeats}
        </div>
      );

      seatElements.push(<br key={`br-${row}`} />);
    }

    return seatElements;
  };

  return (
    <div className="bus-seat-container">
      <h2>Select Your Seat(s)</h2>
      <p>Selected Seats: {selectedSeats.join(', ')}</p>
      <div>
        {/* Render the generated div elements */}
        {generateSeats()}
        Total amount : nof of seats * price of one seat
        <button onClick={makePayment} className="btn btn-success">
          Submit Reservation
        </button>
      </div>
    </div>
  );
};

export default BusInterface;
