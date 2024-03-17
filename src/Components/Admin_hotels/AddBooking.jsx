import React, { useState } from 'react';
import axios from 'axios';

function AddBooking() {
  const [bookingData, setBookingData] = useState({
    hotelId: '',
    checkInDate: '',
    checkOutDate: '',
    name: '', // Assuming 'name' corresponds to 'guestName' in the server code
    date: '', // Assuming 'date' corresponds to 'checkInDate' or 'checkOutDate' in the server code
    Email: '',
    mobileNumber: 'Mobile', // Assuming 'mobileNumber' corresponds to 'Mobile' in the server code
    amount: 'Amount', // Assuming 'amount' corresponds to 'Amount' in the server code
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  const handleSubmit = async (e) => {
   
    e.preventDefault();
    try {
      // Log the request details before sending the request
      console.log('Sending booking request:', bookingData);

      // Make the POST request to User_bookings
      await axios.post('http://127.0.0.1:3003/api/User_bookings',{ hotelBookingData: bookingData });

      // Make the POST request to hotelRoom_bookings
      await axios.post('http://127.0.0.1:7001/api/bookings/new', bookingData);

      // Display success message to the user
      alert('Booking created successfully!');
      console.log("First Done");
      console.log("Second start");

      // Make the POST request to hotelRoom_bookings
      await axios.post('http://127.0.0.1:5000/api/hotelRoom_bookings', bookingData);
      console.log("Second done");
      // Clear the form or perform any other necessary actions
    } catch (error) {
      // Display an error message to the user
      alert('Error creating booking.');
    }
  };

  return (
    <div>
      <h2>Add a Booking</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Hotel ID:</label>
          <input type="text" name="hotelId" onChange={handleChange} />
        </div>
        <div>
          <label>Check-in Date:</label>
          <input type="date" name="date" onChange={handleChange} />
        </div>
        {/* <div> */}
          {/* <label>Check-out Date:</label> */}
          {/* <input type="date" name="checkOutDate" onChange={handleChange} /> */}
        {/* </div> */}
        <div>
          <label>Guest Name:</label>
          <input type="text" name="name" onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="text" name="Email" onChange={handleChange} />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input type="text" name="mobileNumber" onChange={handleChange} />
        </div>
        <div>
          <label>Amount:</label>
          <input type="text" name="amount" onChange={handleChange} />
        </div>
        {/* Add more input fields for additional details as needed */}
        <button type="submit">Add Booking</button>
      </form>
    </div>
  );
}

export default AddBooking;
