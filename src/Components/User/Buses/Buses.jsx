// Buses.js

import React, { useState } from 'react';
import axios from 'axios';
import './Buses.css';import { Link, useHistory, useNavigate } from 'react-router-dom';
import logo from '../../../images/bus.png'
import images1 from '../../../images/right-arrow.png'
import placeholder from '../../../images/placeholder.png'
import Date1 from '../../../images/calendar.png'

export default function Buses() {
  const [selectedFromStation, setSelectedFromStation] = useState('');
  const [selectedToStation, setSelectedToStation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [busDetails, setBusDetails] = useState([]);
  const [trip, settrip] = useState([]);
  const [search, setsearch] = useState(true);
const  nav = useNavigate();

  const getDayOfWeek = (dateString) => {
    const daysOfWeek = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
  };

  const handleFromStationChange = (event) => {
    setSelectedFromStation(event.target.value);
  };

  const handleToStationChange = (event) => {
    setSelectedToStation(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
 
    //  navigate all the details of the clicked bus toAdmin_panel page 
    const handleBook = () => {
      // Assuming you have a route named 'admin_panel' where you want to pass the busDetails
      nav('/BusId');
    }; 
  
  
  const handleSearch = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/busDetails', {
        params: {
          from: selectedFromStation,
          to: selectedToStation,
          date: selectedDate,
        },
      });
     
      setBusDetails(response.data);
      settrip(response.data.tripFares);
      console.log(response.data);
  setsearch(false);

    } catch (error) {
      console.error('Error fetching bus details:', error);
    }
  };

  
  return (
    <div>
       
   
  {search &&

<div className="container colon " style={{minHeight:'100vh'}}>
        <div className="display11    help " style={{borderRadius:'20px'}}>

          <div className="input-group">
     
   
   
<div className='baseName' style={{marginTop:'-70px' ,display:'flex',alignContent:'space-between',minWidth:'100%',justifyContent:"space-between"}}>

<button className='btn2 buttton2'>Book </button>
<button className='btn2 buttton2'  >Refund </button>
<button className='btn2 buttton2'>Bookings </button>
</div>

         
            <br />
            <label htmlFor="cityInput">Enter City:</label>
            <input type="text" id="cityInput" value={selectedFromStation} onChange={handleFromStationChange} />
          </div>
          <label htmlFor="cityInput">Enter City:</label>
            <input type="text" id="cityInput" value={selectedToStation} onChange={handleToStationChange} />
          <div className="input-group">
            <label htmlFor="endDateInput">Check out-date:</label>
            <input
              type="date"
              id="endDateInput"
              value={selectedDate}
             
              onChange={handleDateChange}
            />
          </div>
          <button className="btn-primary" onClick={handleSearch}>
            Search
          </button>
          <input type="range" name="" id="" />

        </div>
        
      </div>
    
      
     
      
}
      <div>
        <h2>Bus Details</h2>
        <ul>
        {busDetails.map((bus, index) => {
            const dayOfWeek = getDayOfWeek(selectedDate);
   console.log(dayOfWeek);
            // Check if the bus operates on the day of the week
            const isAvailable = Array.isArray(bus.daysofWeek) && bus.daysofWeek.includes(dayOfWeek);
            console.log(isAvailable);
            console.log(bus.daysOfWeek);
            
return(
  <div>
  {!isAvailable ? (
      <div>
            <button>

  <li key={index} className='backround'>
        
    <div className='background conainer'>
      Bus Name: {bus.name}
      {bus.daysfWeek && (
      <p>Days of Operation: {bus.daysofWeek.join(', ')}</p>
    )} 
      {/* Display stops if their names match either the "from" or "to" station */}
       <div>
        Stops between {selectedFromStation} and {selectedToStation}:
           {bus.startingStop === selectedFromStation && (
            <div>
             <h6>
               {bus.startingStop}
              </h6>
            </div>
          )}
          
          {bus.endingStop === selectedToStation && (
            <div>
              {bus.endingStop} - {bus.startingTime}
            </div>
          )}
        <ul>
          {bus.inBetweenStops.filter(stop => stop.name === selectedFromStation || stop.name === selectedToStation).map((stop, stopIndex) => (
            <li key={stopIndex}>
              {stop.name} - Arrival Time: {stop.arrivalTime}, Exit Time: {stop.exitTime}
            </li>
          ))}

        </ul>
      </div>
    <br />
    </div>
    
    </li>
   
    <button className='btn btn-success' onClick={handleBook}>Book Now</button>
    </button>
    </div>
    ) : ( <div> hii 
      </div>)}
</div>
)})} 


        </ul>
      </div>
    </div>
  );
}
