import React, { useState,useEffect } from 'react';
import './MainPage.css';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Data } from './Data';
import PieChart from './PieChart';
import Buses from '../User/Buses/Buses';

Chart.register(CategoryScale);

function MainPage() {
  const adminId ='65ce3f378c5f8e04b0ef84fc';
  const [buses, setBuses] = useState([]);
     const [bookings ,setBookings] = useState([])
  useEffect(() => {
    // Fetch buses from the backend when the component mounts
    fetchBuses();
  }, []);
 
  const fetchBuses = async () => {
    try {
      const response = await fetch('http://192.168.137.227:4008/getBuses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adminId: '65ce3f378c5f8e04b0ef84fc',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch buses');
      }

      const data = await response.json();
      setBuses(data.buses);
      console.log(data);
    } catch (error) {
      console.error('Error fetching buses:', error.message);
    }
  };
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: 'Users Gained',
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          'rgba(75,192,192,1)',
          
      
        ],
        borderColor: 'black',
        borderWidth: 2,
      },
      {
        label: 'Users Lost',
        data: Data.map((data) => data.userLost),
        backgroundColor: [
          'rgba(255,0,0,1)', // Red color for losses
        
         
        ],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  });
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
  const [prevv, setprevv] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [uppp, setuppp] = useState(false);

  const seats = 40; // Assuming there are 40 seats
  const autoDeselectSeats = [5, 10, 12, 35, 20];
  const reservedSeats = {}; // Assuming reservedSeats is an object with busCode keys

  const onClose = () => {
    setprevv(false);
  setuppp(false);

  setSelectedSeats([]);
  };
 // Maximum number of selected seats
 const updaadte=()=>{
  setprevv(true);
  setuppp(true);
 }
  const handleSeatSelect = (seatNumber) => {
    const isSelected = selectedSeats.includes(seatNumber);

    if (!autoDeselectSeats.includes(seatNumber)) {
      if (isSelected) {
        setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
      } else {
        // Check if the maximum number of seats is reached
        
          setSelectedSeats([...selectedSeats, seatNumber]);
       
      }
    }
  };
  return (
    <div className='BAck_admin'>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            minWidth: '40%',
            maxWidth: '40%',
          
            margin: '5%',
            backgroundColor: 'black',
            color: 'white', 
            border:'2px solid white ',
            minHeight: '300px', 
            borderRadius:'15px',
            overflow:'hidden',
          }}
        >
          <div  style={ { overflowY: 'scroll'}}>

          New Bookings -
          <input type="date" name="Date" id="Date" />
          <div
            style={{
              maxWidth: '100%',
              minHeight: '10%',
              maxHeight: '10px',
              backgroundColor: 'black',
              display: 'flex',
              color: 'black',
              justifyContent: 'space-between',
              borderRadius:'15px',
            overflow:'hidden',
            }}
            >
            </div>
            Bus No: 19325
            <p>From Station TO Station</p>
            <p>Seat Number</p>
          </div>
        </div>
        <div
          style={{
            minWidth: '40%',
            maxWidth: '40%',
            overflowY: 'scroll',
            margin: '5%',
            backgroundColor: 'black',
            color: 'white',
            minHeight: '300px',
          }}
        >
          Buses Display
          <input type="date" name="Date" id="Date" />
          <div style={{ display: 'flex' }}>
  {buses.map((bus, index) => (
    <div
      key={index}
      style={{
        background: 'white',
        border: '2px solid black',
        borderRadius: '15px',
        minHeight: '100%',
        minHeight: '80px',
        minWidth: '33%',
        color: 'black',
        maxWidth: '30%',
      }}
    >
      <p>{bus.name}</p>
      <p>ID: {bus
}</p>
      <p>Seats Booked: {bus.seatsBooked}</p>
      <p>Seats Remaining: {bus.totalSeats - bus.seatsBooked}</p>
      <div style={{ display: 'flex' }}>
        <button onClick={() => setprevv(true)}>Preview</button>
        <button onClick={updaadte}>Update</button>
      </div>
    </div>
  ))}
</div>

         
        </div>
      </div>
      <div
        style={{
          minWidth: '35%',
          maxWidth: '90%',
          marginLeft: '5%',
          marginRight: '5%',
          backgroundColor: 'black',
          overflow: 'hidden',
          color: 'darkblue',
          borderRadius:'15px',
            overflow:'hidden',
          maxHeight: '300px!important',
        }}
      >
        Total Revenue
        <div style={{ minWidth: '10%', maxWidth: '30%', marginLeft: '5%', marginRight: '5%', color: 'white' }}>
          <PieChart chartData={chartData} />
        </div>
      </div>
      <div>
        Reviews
        <div style={{ minHeight: '10vh', minWidth: '10vw', backgroundColor: 'green' }}>
          hello
        </div>
      </div>
      {prevv && (
        <div className='Container limiter'>
          <button type='button' className='btn-close' aria-label='Close' onClick={onClose}></button>
          <h2>Login</h2>
          <div className='inner'>
            <div>
            {generateSeats()}
            </div>
          </div>
        { uppp &&<button /* onClick={} */>Register</button>}
        </div>
      )}
    </div>
  );
}

export default MainPage;
