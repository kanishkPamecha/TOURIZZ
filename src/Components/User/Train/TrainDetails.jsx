import React, { useState,useEffect } from 'react';
import {  useLocation } from 'react-router-dom';
import ReviewJourney from './Review_journey'; // Import the ReviewJourney component
import './train.css';
const TrainDetails = ({ train, selectedClass,selectedValues, data }) => {
  const [userData, setUserData] = useState({
    trainDetails: train,
    selectedClass:selectedClass,
    selectedValues:selectedValues,
    passengers: [],
    infantsWithoutBerth: [],
  });
  
  const location = useLocation();
  
  useEffect(() => {
    // Log the selectedValues whenever it changes
    console.log('Selected Values:', selectedValues);
  }, [selectedValues]);
  const [passengers, setPassengers] = useState([{}]);

  const addPassenger = () => {
    if (passengers.length < 4) {
      setPassengers((prevPassengers) => [...prevPassengers, {}]);
    }
    else{
      alert('No more passengers can be added ');
    }
  };
  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedPassengers = [...passengers];
    updatedPassengers[index][name] = value;
    setUserData(prevData => ({
      ...prevData,
      passengers: updatedPassengers,
    }));
  };
  
  const handleInfantInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedInfants = [...infantsWithoutBerth];
    updatedInfants[index][name] = value;
    setUserData(prevData => ({
      ...prevData,
      infantsWithoutBerth: updatedInfants,
    }));
  };
  
  const Seat =async ()=>{
  const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://irctc1.p.rapidapi.com/api/v1/checkSeatAvailability',
  params: {
    classType: selectedClass ?selectedClass  : selectedValues.class,
    fromStationCode: train.from,
    quota: selectedValues.quota?selectedValues.quota: 'GN',
    toStationCode: train.to,
    trainNo: train.train_number,
    date: train.train_date
  },
  headers: {
    'X-RapidAPI-Key': '44f3e752a0msh1611dd93074e36ep1e30a2jsn93b5b56748c8',
    'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
}
  const [infantsWithoutBerth, setInfantsWithoutBerth] = useState([{}]);

const [resp ,setresp] =useState(false);
  
  const addInfantWithoutBerth = () => {
    if (infantsWithoutBerth.length <2 ) {
      setInfantsWithoutBerth((prevInfants) => [...prevInfants, {}]);
    } else{
      alert('No more passengers can be added ');
      
    }
  };

  const handleBooking = () => {
    <ReviewJourney userData={userData} />
setresp(true);
  };
  const [randomNumber, setRandomNumber] = useState(null);

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(randomNum);
  }, [1]);
  
  return (
    <div>
 
 <div>
      <div
       className='black-border'
       >
        <div
         className='Highlight '
          >
      <b>
            <h5 className='Train_Name'>{train.train_name}</h5>
          <p className='Train_Name'> {train.train_number}</p>
         </b>
        </div>
        
          <button onClick={Seat}>Seat</button>
        <div>
          Runs On:
          <div>
            {train.run_days.map((day) => (
              <b key={day}> {day.charAt(0)} </b>
            ))}
          </div>
          <div id='inner_block  ' >
            <span className='start'>
              <b>

              {train.from_std} | {train.from_station_name}
              </b>
            </span>
            <span>
              <b className='center'> -------{train.duration}min -------</b>
            </span>
            <span className='end'>
              <b>{train.to_sta} | {train.to_station_name}</b>
            </span>
          </div>
        </div>
        <div className='Highlight'>

       {selectedClass}
        </div>
        <p>Seat Available : </p>
        {/* <p> {seat}</p> */}
        <span>  </span>
        {/* <select name="" =""><option value="">Boarding Station| 
        <b></b></option>
        <option value=""></option></select> */}
               </div>
        <br />
        <div className= ' black-border '>

      
        <h5>Enter Passenger Details</h5>
        <button onClick={addPassenger}>+ Add Passenger/Infant With Berth</button>
        {passengers.map((passenger, index) => (
          
          <div key={index}>
            <input
              type='text'
              name='name'
              placeholder='Passenger Name'
              onChange={(event) => handleInputChange(event, index)}
            />
            <input
              type='number'
              name='age'
              placeholder='Age'
              onChange={(event) => handleInputChange(event, index)}
            />
            <select
              name='gender'
              onChange={(event) => handleInputChange(event, index)}
            >
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='others'>Others</option>
            </select>
          
            <select
              name='Nationality'
              onChange={(event) => handleInputChange(event, index)}
            >
              <option value='male'>India</option>
              <option value='female'>Female</option>
              <option value='others'>Others</option>
            </select>
          </div>
        ))}

       
        <button onClick={addInfantWithoutBerth}>+ Add Infant Without Berth</button>
        {infantsWithoutBerth.map((infant, index) => (
          <div key={index}>
            <input
              type='text'
              name='infantName'
              placeholder='Infant Name'
              onChange={(event) => handleInfantInputChange(event, index)}
            />
            <input
              type='number'
              name='infantAge'
              placeholder='Infant Age'
              onChange={(event) => handleInfantInputChange(event, index)}
            />
            <select
              name='infantGender'
              onChange={(event) => handleInfantInputChange(event, index)}
            >
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
            {/* ... Additional input fields for infants without berth ... */}
          </div>
        ))}
  </div>
  <br />
        <div className= ' black-border ' >
          <input type="radio" name="upgrade" id="upgrade" />
          <label htmlFor="upgrade" >Consider For auto upgradation</label>
          <br />
          <input type="radio" name="Confirm" id="Confirm" />
          <label htmlFor="Confirm">Book Only if Confirm Ticket is Avilable</label> 
        </div>
        <div>
          <h6>Pay With</h6>
          <input type="radio" name="pay" id="upi" />
          <label htmlFor="upi">Pay with UPI</label>
          <input type="radio" name="pay" id="Net Banking" />
          <label htmlFor="Net Banking">Net Banking</label>
        </div>
      </div>
    <button  style={randomNumber>0 ?{backgroundColor:'green'}: {backgroundColor:'Red'} }onClick={handleBooking}> <b>
        <span style={{color:'black'} }>
        {randomNumber}
        </span> 
        </b> Seats Avilable
        </button>
        
        
      {resp && <ReviewJourney userData={userData}/>

      }
    </div>
  );
};

export default TrainDetails


