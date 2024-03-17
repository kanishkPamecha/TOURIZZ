import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
const AddActivity = () => {
  const [activity, setActivity] = useState('');
  const [city, setCity] = useState(''); // Add state for selected city
  const [Rate, setRate] = useState(); // Add state for selected city
  const [error, setError] = useState(null);
  const [activities, setActivities] = useState([]); // State to store the fetched activities
  const [startTimes, setStartTimes] = useState([]);
  const [endTimes, setEndTimes] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  const handleStartTimeChange = (e, index) => {
    const newStartTimes = [...startTimes];
    newStartTimes[index] = e.target.value;
    setStartTimes(newStartTimes);
  };
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    console.log(selectedOption);
  };
  const handleEndTimeChange = (e, index) => {
    const newEndTimes = [...endTimes];
    newEndTimes[index] = e.target.value;
    setEndTimes(newEndTimes);
  };

  const addTimeSlot = () => {
    setStartTimes([...startTimes, '']);
    setEndTimes([...endTimes, '']);
  };

  const  lat=  26.7654;
  const  lng=  75.8537;
  useEffect(() => {
    // Function to fetch activities for a specific city
    const fetchActivities = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/activities/${city}`);
        const data = await response.json();

        if (response.ok) {
          setActivities(data);
        } else {
          console.error('Failed to fetch activities:', data.message);
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    // Fetch activities when the city changes
    if (city) {
      fetchActivities();
    }
  }, [city]);
const [Map,setMap] =useState();

const handleMap =()=>{
  setMap(true);
}

  const handleAddActivity = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: activity, city,Rate,lat,lng,startTimes,endTimes,selectedOption }), // Include the selected city
      });

      if (response.ok) {
        console.log('Activity added successfully');
      } else {
        console.error('Error adding activity');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const defaultProps = {
    center: {
      lat: 26.7654,
      lng:75.8537
    },
    zoom: 11
  };
  return (
    <div>
      <h1>Add Activity</h1>
      <input
        type="text"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
        placeholder="Activity Name"
      />
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City Name"
      />
      <input
      type="number"
      value={Rate}
      onChange={(e) => setRate(e.target.value)}
      placeholder="Rate"
    /> 
    {Map&& <div>
      <div style={{marginLeft:'70%' ,height: '60vh', width: '50vh' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <div
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
    </div>}
    <button onClick ={handleMap}>Choose Location</button>
      <button onClick={handleAddActivity}>Add Activity</button>
      <label htmlFor="cityInput">Enter City:</label>
      <input
        type="text"
        id="cityInput"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
        <div>
      {startTimes.map((startTime, index) => (
        <div key={index}>
          <label htmlFor={`startTime${index}`}>Start Time:</label>
          <input
            type="time"
            id={`startTime${index}`}
            value={startTime}
            onChange={(e) => handleStartTimeChange(e, index)}
          />

          <label htmlFor={`stopTime${index}`}>End Time:</label>
          <input
            type="time"
            id={`stopTime${index}`}
            value={endTimes[index]}
            onChange={(e) => handleEndTimeChange(e, index)}
          />
        </div>
      ))}

      <button onClick={addTimeSlot}>Add Time Slot</button>
    </div>
    <div>
      <label htmlFor="category">Select a category:</label>
      <select
        id="category"
        name="category"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value="Adventure">Adventure</option>
        <option value="Relaxing">Relaxing</option>
        <option value="Dharmic">Dharmic</option>
        <option value="Meditation">Meditation</option>
      </select>

   
    </div>
      <h2>Activities for {city}</h2>

      {error ? (
        <p>{error}</p>
      ) : (
        activities.length > 0 ? (
          <ul>
            {activities.map((activity) => (
              <li key={activity._id}>
                {activity.name} - {activity.Rate}
              </li>
            ))}
          </ul>
        ) : (
          <p>No activities found for the specified city.</p>
        )
      )}
   
  
  </div>
  
  )
}

export default AddActivity;
