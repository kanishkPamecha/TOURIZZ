// SuccessPage.js
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SuccessPage = () => {
  const location = useLocation();
  const userEmail = location.state?.userEmail;
  const selectedRoom = location.state?.selectedRoom;
  const roomsData = location.state?.roomsData;
  const startDate = location.state?.startDate;
  const endDate = location.state?.endDate;

  useEffect(() => {
    const saveBookingInfo = async () => {
      try {
        console.log(endDate);
        console.log(userEmail);
        console.log(startDate);
        const response = await axios.post('http://localhost:7001/api/successful-payment', {
          userEmail: userEmail,
          products:selectedRoom,
          roomsData: roomsData,
          startDate: startDate,
          endDate: endDate,
        });
    
        console.log('Booking information saved:', response.data);
      } catch (error) {
        console.error('Error saving booking information:', error);
      }
    };
    

    saveBookingInfo();
  }, [userEmail, selectedRoom, roomsData, startDate, endDate]);

  return (
    <div>
      <h1>Payment Successful!</h1>
      {/* Add any success page content here */}
    </div>
  );
};

export default SuccessPage;
