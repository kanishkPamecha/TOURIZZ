import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ReviewJourney = ({ userData }) => {

   const [tatkaltension, settatkaltension] = useState(false);
  const Data_database = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3001/api/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Assuming userData is in the correct format for your backend
      });

      if (response.ok) {
        console.log('Data saved successfully!');
      } else {
        console.error('Error saving data:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  return (
    <div>
      {!tatkaltension&&  
 <div>
      
    <div>
      <h2>Review Journey Details</h2>
      <h3>Train Details</h3>
      <p>Train Name:{userData.trainDetails.train_name}</p>
      <p>Train Number: {userData.trainDetails.train_number}</p>
      {/* Display other train details as needed */}
      

      <h3>Passengers</h3>
      {userData.passengers.map((passenger, index) => (
        <div key={index}>
          <p>Passenger {index + 1}:</p>
          <p>Name: {passenger.name}</p>
          <p>Age: {passenger.age}</p>
          <p>Gender: {passenger.gender}</p>
          {/* Display other passenger details as needed */}
        </div>
      ))}
      
      <h3>Infants Without Berth</h3>
      {userData.infantsWithoutBerth.map((infant, index) => (
        <div key={index}>
          <p>Infant {index + 1}:</p>
          <p>Name: {infant.infantName}</p>
          <p>Age: {infant.infantAge}</p>
          <p>Gender: {infant.infantGender}</p>
          {/* Display other infant details as needed */}
        </div>
      ))}

      {/* Display other booking preferences */}
      <p>Auto Upgradation: {userData.autoUpgrade ? 'Yes' : 'No'}</p>
      <p>Payment Method: {userData.paymentMethod}</p>

</div>
        <div>
        <button>Agree</button>
        <button>Back</button>
        </div>
    <span><a href="">View Cancellation Policy</a></span>
    <div>
        Fare Summary
    Ticket Fee :
    IRCTC Convienece Fee: +
     TTA convience fee : +10 
     <div>Total : </div>
      </div>
      <div>
        show Qr code
        <img src="" alt="" />
        <button  onClick={Data_database}>Success</button>
      if connected to travel Agentees wallet then cut from it else show razorpay option 
        {/* If verified  then show them the payment option  */}
         
      </div>
      </div>
}
{tatkaltension && 
// if seats are avilable 
//biometric Verify
<div>

<div>
{/* If Biometric { then_Biometric}
  else {captcha } */}
    
        {/* OK payment Gateway  */}
      </div>
      <div>
      
        {/* If verified  then show them the payment option  */}
</div>
      
      </div>
}
    </div>
  )
}

export default ReviewJourney;
