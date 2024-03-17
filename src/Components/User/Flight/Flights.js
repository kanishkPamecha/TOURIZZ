import React, { useState } from 'react';

const FlightDetails = ({ flightData }) => {
  const [selectedFlight, setSelectedFlight] = useState(null);

  const showFlightDetails = (flight) => {
    setSelectedFlight(flight);
  };

  const clearSelectedFlight = () => {
    setSelectedFlight(null);
  };

  if (!flightData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ backgroundColor: 'gray',marginTop:'150px' }}>
      {selectedFlight ? (
        <DetailedFlightDetails
          flight={selectedFlight}
          clearSelectedFlight={clearSelectedFlight}
        />
      ) : (
        flightData.results.map((flight, index) => (
          <div key={index} className='block'> 
       
            <br />
            <div id='highlight'>
              <span className='center'>
                <h5>{flight.flight_name}</h5>
              </span>
              <span className='start'>
                <h5>({flight.flight_code})</h5>
              </span>
              <div>
                Stops: {flight.stops}
              </div>
            </div>
            <br />
            <button
              className='flex btn1'
              onClick={() => showFlightDetails(flight)}
            >
              View Details
            </button>
          </div>
        ))
      )}
    </div>
  );
};

const DetailedFlightDetails = ({ flight, clearSelectedFlight }) => {
  return (
    <div>
      <h2>Detailed Flight Information</h2>
      <p>Flight Name: {flight.flight_name}</p>
      <p>Flight Code: {flight.flight_code}</p>
      <p>Stops: {flight.stops}</p>
      <p>Departure: {flight.departureAirport.time} - {flight.departureAirport.label}</p>
      <p>Arrival: {flight.arrivalAirport.time} - {flight.arrivalAirport.label}</p>
      <p>Duration: {flight.duration.text}</p>
      <p>Total Price: {flight.totals.total} {flight.totals.currency}</p>
      <button className='flex btn1' onClick={clearSelectedFlight}>
        Go Back
      </button>
    </div>
  );
};

export default FlightDetails;
