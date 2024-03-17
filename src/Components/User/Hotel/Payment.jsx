import React from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

function Payment() {
  const location = useLocation();
  const roomsData = location.state.roomsData;
  const selectedRoom = location.state.selectedRoom;
  const endDate = location.state.enddate;
  const startDate = location.state.startdate;
  const userEmail = location.state.userEmail;

  // Calculate total cost
  let totalCost = 0;

  if (selectedRoom && roomsData) {
    roomsData.forEach((room) => {
      totalCost += selectedRoom.Price;
    });
  }

  const makePayment = async () => {
    try {
      const stripe = await loadStripe('pk_test_51O3LMrSGuCW05tAAnSBcKwGAMiFcvNuLxOxzgmSDDCDQ8aSjzMOyue93cBjt0vfMzPl8uDNGyL4l1LaIxaaphDiv00Ike0EEJH');

      const response = await axios.post('http://localhost:7000/api/create-checkout-session', {
        products: selectedRoom,
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
  };

  return (
    <div>
     
    </div>
  );
}

export default Payment;
