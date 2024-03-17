import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FLightPage()  {
  const [Flight, setFlight] = useState([]);
  const [FlightList, setFlightList] = useState('');
  const [stopName, setStopName] = useState('');
 const [name, setName] = useState('');
  const [Mobile1, setMobile1] = useState('');
  const [Mobile2, setMobile2] = useState('');
  const [showPrice, setShowPrice] = useState(false);
   const [arrivalTime, setArrivalTime] = useState('');
  const [StartingTime, setStartingTime] = useState('');
  const [StopTime, setStopTime] = useState('');
  const [exitTime, setExitTime] = useState('');
  const [startingStop, setStartingStop] = useState('');
  const [day, setDay] = useState(1);
  const [day1, setDay1] = useState(1);
  const [day2, setDay2] = useState(1); // Fixed the state variable name
   // Fixed the state variable name
   // Fixed the state variable name
  const [endingStop, setEndingStop] = useState('');
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [fare, setFare] = useState(''); // Fixed the state variable name
  const [tripFares, setTripFares] = useState({});
 const [status, setStatus] = useState('');

  
 const navigate = useNavigate();
 
  const handleAddFlight = async () => {
    if (startingStop && endingStop && daysOfWeek.length > 0) {
      const newFlight = {
        startingStop: startingStop,
        endingStop: endingStop,
        daysOfWeek: daysOfWeek,
        Flight: Flight,
        fare: fare,
        name: name,
        Mobile1: Mobile1,
        Mobile2: Mobile2,
        Day:day,Day1:day1,
        StartingTime:StartingTime,
       StopTime:StopTime,
       tripFares: tripFares,
      };

      try {
        const response = await axios.post('http://127.0.0.1:7004/api/addFlight', newFlight);
        console.log('Flight added successfully:', response.data);
        navigate(`/FlightPage/${response.data}`, { state: { response } });
        setStatus('Flight added successfully.');
      } catch (error) {
        console.error('Error adding Flight:', error);
        setStatus('Error adding Flight. Please try again later.');
      }
    }
  };


  const dayOfWeekItems = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'].map((day, index) => (
    <label key={index}>
      <input
        type="checkbox"
        checked={daysOfWeek.includes(day)}
        onChange={() => handleDayToggle(day)}
      />
      {day}
    </label>
  ));

  const handleDayToggle = (day) => {
    if (daysOfWeek.includes(day)) {
      setDaysOfWeek(daysOfWeek.filter(item => item !== day));
    } else {
      setDaysOfWeek([...daysOfWeek, day]);
    }
  };

  const Add = () => {
    setShowPrice(true);
  };
  return (
    <div>
      <label htmlFor="FlightName">Name of Travel</label>
      <input type="text" name="FlightName" id="FlightName" onChange={(e) => setName(e.target.value)} />

      <label htmlFor="phone1">Mobile Number 1</label>
      <input type="number" name="phone1" id="phone1"  onChange={(e) => setMobile1(e.target.value)}/>

      <label htmlFor="phone2">Mobile Number 2</label>
      <input type="number" name="phone2" id="phone2" onChange={(e) => setMobile2(e.target.value)} />

      <br />

      <h5>Enter the Flight details</h5>

      <input
        type="text"
        value={startingStop}
        onChange={(e) => setStartingStop(e.target.value)}
        placeholder="Starting Stop"
      />
      <input type="time" name="starting time" id="smd" onChange={(e) => setStartingTime(e.target.value)}/>
      <input
        type="text"
        value={endingStop}
        onChange={(e) => setEndingStop(e.target.value)}
        placeholder="Ending Stop"
      />
     <input
  type="number"
  value={day2}
  onChange={(e) => setDay2(e.target.value)} // Fixed setDay
  placeholder="Day number"
/>
      <input type="time" name='Arrival time' onChange={(e) => setStopTime(e.target.value)}id ='smd'  />

      <div>
        <h6>Runs on the days of the Week</h6>
        {dayOfWeekItems}
      </div>
      <div>
      <input
  type="number"
  name="Fare"
  id="Fare"
  onChange={(e) => setFare(e.target.value)} // Fixed setFare
/>
<select name="" id="">
  <option value="">AA</option>
<input type="number" name="" id="" />

  <option value="">BB</option>
<input type="number" name="" id="" />

  <option value="">fjdhf1</option>
<input type="number" name="" id="" />

  <option value="">fjdhf2</option>
<input type="number" name="" id="" />

  <option value="">fjdhf3</option>
  <option value="">fjdhf4</option>


</select>



        </div>

   

   

            Flight Number<input type="number" name="Flight Number" id="Number" />
            <hr />
          
          <br /><hr />
          enter the no of seater Flight..
          <input type="number" />
      <button onClick={Add}>Add Flight</button>
      {showPrice &&  <div>
      <h2>Enter Flight Stops and Fares</h2>
      <div>
        <label>Starting Stop: </label>
        <input
          type="text"
          value={startingStop}
          onChange={(e) => setStartingStop(e.target.value)}
        />
      </div>
  
 
        <button className='btn btn-success' onClick={handleAddFlight}>Submit to database</button>
        </div>
        }
   
    </div>
  );}
  export default FLightPage
  ;