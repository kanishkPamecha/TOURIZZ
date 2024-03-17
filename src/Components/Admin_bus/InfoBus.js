import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function InfoBus() {
  const [inBetweenStops, setInBetweenStops] = useState([]);
  const [busList, setBusList] = useState('');
  const [stopName, setStopName] = useState('');
  const [busNu, setBusNu] = useState(''); // Fixed the state variable name
  const [drivername, setDrivername] = useState(''); // Fixed the state variable name
  const [name, setName] = useState('');
  const [Mobile1, setMobile1] = useState('');
  const [Mobile2, setMobile2] = useState('');
  const [showPrice, setShowPrice] = useState(false);
  const [drivernumber, setDrivernumber] = useState(''); // Fixed the state variable name
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
  const [intermediateStops, setIntermediateStops] = useState([]);
  const [tripFares, setTripFares] = useState({});
  const [combinations, setCombinations] = useState([]);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const generateCombinations = () => {
    // Include the starting and destination stops in sortedStops
    const sortedStops = [
      { name: startingStop, arrivalTime: '', dayNumber: day },
      ...inBetweenStops,
      { name: endingStop, arrivalTime: '', dayNumber: day },
    ];
  
    // Sort the stops by dayNumber and then by arrival time
    sortedStops.sort((a, b) => {
      if (a.dayNumber === b.dayNumber) {
        return a.arrivalTime - b.arrivalTime;
      }
      return a.dayNumber - b.dayNumber;
    });
  
    // Extract the names of sorted stops
    const sortedStopNames = sortedStops.map(stop => stop.name);
  
    const generatedCombinations = [];
  
    for (let i = 0; i < sortedStopNames.length - 1; i++) {
      for (let j = i + 1; j < sortedStopNames.length; j++) {
        generatedCombinations.push({
          from: sortedStopNames[i],
          to: sortedStopNames[j],
          dayFrom: sortedStops[i].dayNumber,
          dayTo: sortedStops[j].dayNumber,
        });
      }
    }
  
    setCombinations(generatedCombinations);
  };
  const handleFareChange = (combination, fare) => {
    setTripFares({
      ...tripFares,
      [combination]: fare,
    });
  };
  const handleAddStop = () => {
    if (stopName && arrivalTime && exitTime && day !== '') {
      // Convert the day, arrivalTime, and exitTime to numbers and Date objects
 
      const arrivalDateTime = new Date(`1970-01-0${day}T${arrivalTime}`);
      const exitDateTime = new Date(`1970-01-0${day}T${exitTime}`);
  
      // Check if the day is greater than or equal to day1
      if(day2>=day1|| day2>=day)
      {
        if (day >= day1) {
          if (day === day1) {
            // Check if exit time is greater than or equal to arrival time on the same day
            if (exitDateTime >= arrivalDateTime) {
              const newStop = {
                name: stopName,
                arrivalTime: arrivalDateTime,
                exitTime: exitDateTime,
                day: day,
                day1: day1,
              };
    
              // Find the index to insert the new stop based on day and arrival time
              let insertIndex = 0;
              for (let i = 0; i < inBetweenStops.length; i++) {
                const existingStop = inBetweenStops[i];
                if (
                  newStop.day < existingStop.day ||
                  (newStop.day === existingStop.day && newStop.arrivalTime < existingStop.arrivalTime)
                ) {
                  break;
                }
                insertIndex++;
              }
    
              // Insert the new stop at the determined index
              const updatedStops = [...inBetweenStops];
              updatedStops.splice(insertIndex, 0, newStop);
    
              setInBetweenStops(updatedStops);
              setStopName('');
              setArrivalTime('');
              setExitTime('');
              setDay('');
              setDay1(''); // Reset the day to empty for the next stop
            } else {
              // Handle error when exit time is earlier than arrival time on the same day.
              alert('Exit time must be later than arrival time.');
            }
          } else if (day > day1) {
            const newStop = {
              name: stopName,
              arrivalTime: arrivalDateTime,
              exitTime: exitDateTime,
              day: day,
              day1: day1,
            };
    
            // Find the index to insert the new stop based on day and arrival time
            let insertIndex = 0;
            for (let i = 0; i < inBetweenStops.length; i++) {
              const existingStop = inBetweenStops[i];
              if (
                newStop.day < existingStop.day ||
                (newStop.day === existingStop.day && newStop.arrivalTime < existingStop.arrivalTime)
              ) {
                break;
              }
              insertIndex++;
            }
    
            // Insert the new stop at the determined index
            const updatedStops = [...inBetweenStops];
            updatedStops.splice(insertIndex, 0, newStop);
    
            setInBetweenStops(updatedStops);
            setStopName('');
            setArrivalTime('');
            setExitTime('');
            setDay('');
            setDay1(''); // Reset the day to empty for the next stop
          } else {
            // Handle error when day is not greater than or equal to day1.
            // You can display an alert or provide feedback to the user as needed.
            alert('Day must be greater than or equal to Day1.');
          }
        } else {
          alert('Day must be greater than or equal to Day1.');
          
        }
      } else {
        alert('Not a valid day');
          console.log('ed');
        // Handle error when input is missing.
        // You can display a message to the user or perform other error handling here.
      }
  };
}
  
  // ...
  const inBetweenStopItems = inBetweenStops.map((stop, index) => (
    <li key={index}>
      {stop.name} - Arriving at: {stop.arrivalTime.toLocaleTimeString()} on Day {stop.day1}, Exiting at: {stop.exitTime.toLocaleTimeString()} on Day {stop.day}
    </li>
  ));
  
  
  const handleAddBus = async () => {
    if (startingStop && endingStop && daysOfWeek.length > 0) {
      const newBus = {
        startingStop: startingStop,
        endingStop: endingStop,
        daysOfWeek: daysOfWeek,
        inBetweenStops: inBetweenStops,
        fare: fare,
        name: name,
        Mobile1: Mobile1,
        Mobile2: Mobile2,
        Day:day,Day1:day1,
        StartingTime:StartingTime,
       StopTime:StopTime,
        combinations: combinations, // Include combinations
    tripFares: tripFares,
      };

      try {
        const response = await axios.post('http://127.0.0.1:5000/api/addBus', newBus);
        console.log('Bus added successfully:', response.data); 
        navigate()
        setStatus('Bus added successfully.');
      } catch (error) {
        console.error('Error adding bus:', error);
        setStatus('Error adding bus. Please try again later.');
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
      <label htmlFor="busName">Name of Travel</label>
      <input type="text" name="busName" id="busName" onChange={(e) => setName(e.target.value)} />

      <label htmlFor="phone1">Mobile Number 1</label>
      <input type="number" name="phone1" id="phone1"  onChange={(e) => setMobile1(e.target.value)}/>

      <label htmlFor="phone2">Mobile Number 2</label>
      <input type="number" name="phone2" id="phone2" onChange={(e) => setMobile2(e.target.value)} />

      <br />

      <h5>Enter the bus details</h5>

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


        </div>

      <div>
        <h5>Add In Between Stop:</h5>
        <input
          type="text"
          value={stopName}
          onChange={(e) => setStopName(e.target.value)}
          placeholder="Stop Name"
        />
       <input
  type="time"
  value={arrivalTime}
  onChange={(e) => setArrivalTime(e.target.value)}
  placeholder="Arrival Time"
/>
<input
  type="number"
  value={day1}
  onChange={(e) => setDay1(e.target.value)} // Fixed setDay
  placeholder="Day number"
/>
<input
  type="time"
  value={exitTime}
  onChange={(e) => setExitTime(e.target.value)}
  placeholder="Exit Time"
/>
<input
  type="number"
  value={day}
  onChange={(e) => setDay(e.target.value)} // Fixed setDay
  placeholder="Day number"
/>
        <button onClick={handleAddStop}>Add Stop</button>
      </div>

      <div>
        <h5>In Between Stops:</h5>
        <ul>{inBetweenStopItems}</ul>
      </div>

            Bus Number<input type="number" name="Bus Number" id="Number" />
            <hr />
            <div><p>Note This info is not shared with Anoyne . Until it is an important case ... We understand Your concern  . If the driver is the same </p></div>
           Driver Name <input type="text" />
          Driver Number  <input type="number" name="" id="" />
          <br /><hr />
          enter the no of seater bus..
          <input type="number" />
      <button onClick={Add}>Add Bus</button>
      {showPrice &&  <div>
      <h2>Enter Bus Stops and Fares</h2>
      <div>
        <label>Starting Stop: </label>
        <input
          type="text"
          value={startingStop}
          onChange={(e) => setStartingStop(e.target.value)}
        />
      </div>
  
 <div>
        <label>Intermediate Stops (comma-separated): </label>
        <input
          type="text"
          value={intermediateStops.join(',')}
          onChange={(e) => setIntermediateStops(e.target.value.split(','))}
        />
      </div>
      <button onClick={generateCombinations}>Generate Combinations</button>
{combinations.map((combination, index) => (
            <div key={index}>
              {combination.from} to {combination.to}: $
              <input
                type="number"
                value={tripFares[`${combination.from}-${combination.to}`] || ''}
                onChange={(e) =>
                  handleFareChange(`${combination.from}-${combination.to}`, e.target.value)
                }
              />
            </div>
          ))}
        <button className='btn btn-success' onClick={handleAddBus}>Submit to database</button>
        </div>
        }
   
    </div>
  );
}

export default InfoBus;
