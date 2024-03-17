import React, { useEffect, useState } from 'react';
import axios from 'axios';
import img from '../images/kedarnath.jpg';
import TrainItem from './TrainItem';

export default function Trains() {
  const [stationData, setStationData] = useState(null);
  const [showPnr, setShowPnr] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFromStation, setSelectedFromStation] = useState('DLI');
  const [selectedToStation, setSelectedToStation] = useState('DLI');
  const [trains, setTrains] = useState([
    {
      id: 14017,
      name: '14014 The Express',
      price: '2200',
      to: 'Delhi',
      from: 'Jaipur',
    }
  ]);
 useEffect =()=>{
     const fetchTrains = async() =>{
    
        
     }
     
 }
  const handleStationClick = () => {
    setStationData(1);
    setShowPnr(false);
  };

  const handleFetchData = async () => {
    try {
      const options = {
        method: 'GET',
        url: 'https://irctc1.p.rapidapi.com/api/v1/searchTrain',
        params: { query: searchQuery },
        headers: {
          'X-RapidAPI-Key': 'YOUR_API_KEY',
          'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      setStationData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleFromStationChange = (event) => {
    setSelectedFromStation(event.target.value);
  };

  const handleToStationChange = (event) => {
    setSelectedToStation(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePnrClick = () => {
    setShowPnr(true);
    setStationData(null);
  };

  const filteredTrains = trains.filter((train) =>
    train.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    train.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    train.to.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderPnr = () => {
    if (!showPnr) {
      return null;
    }

    return (
      <div>
        <input
          className="form-control me-2 dropdown-toggle"
          type="text"
          placeholder="Search"
          aria-label="Search"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </div>
    );
  };

  const renderStation = () => {
    if (!stationData) {
      return null;
    }

    return (
      <div className="input-group fromtowidth mb-3">
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            From
          </label>
          <select
            className="form-select color"
            id="inputGroupSelect01"
            value={selectedFromStation}
            onChange={handleFromStationChange}
          >
            <option value="DLI">Delhi</option>
            <option value="UDZ">Udaipur</option>
            <option value="AII">Ajmer</option>
            <option value="JP">Jaipur</option>
            <option value="BCT">Mumbai</option>
            <option value="AGC">Agra</option>
            <option value="INDB">Indore</option>
            <option value="BPL">Bhopal</option>
            <option value="SBC">Bangalore</option>
            <option value="MAQ">Mangaluru</option>
            <option value="OTH">Other</option>
          </select>
          <label className="input-group-text" htmlFor="inputGroupSelect02">
            To
          </label>
          <select
            className="form-select color"
            id="inputGroupSelect02"
            value={selectedToStation}
            onChange={handleToStationChange}
          >
            <option value="DLI">Delhi</option>
            <option value="UDZ">Udaipur</option>
            <option value="AII">Ajmer</option>
            <option value="JP">Jaipur</option>
            <option value="BCT">Mumbai</option>
            <option value="AGC">Agra</option>
            <option value="INDB">Indore</option>
            <option value="BPL">Bhopal</option>
            <option value="SBC">Bangalore</option>
            <option value="MAQ">Mangaluru</option>
            <option value="OTH">Other</option>
          </select>
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div>
        <img src={img} alt="Kedarnath" className="backgroundimg" style={{ maxWidth: '500px' }} />
      </div>
      <div>
        <button className="btn btn-primary" onClick={handlePnrClick}>
          Train Name
        </button>
        <button className="btn btn-primary" onClick={handleStationClick}>
          Station
        </button>
      </div>
      {renderPnr()}
      {renderStation()}
      {filteredTrains.map((train) => (
        <TrainItem train={train} key={train.id} />
      ))}
      <div>
        <button onClick={handleFetchData}>Fetch Data</button>
      </div>
    </div>
  );
}
