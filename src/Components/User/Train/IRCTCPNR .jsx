import React, { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

export default function IRCTCPNR() {
  const [pnrNumber, setPnrNumber] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: 'GET',
      url: 'https://irctc1.p.rapidapi.com/api/v2/getPNRStatus',
      params: {
        pnrNumber: pnrNumber,
      },
      headers: {
        // 'X-RapidAPI-Key': '49321a048emsh4fa22ced5b909c9p1c3d39jsn74434b071f03',
        'X-RapidAPI-Key': 'b638d03ed4mshcfcc03f728ac06ap1ca602jsn17958f56d623',

        'X-RapidAPI-Host': 'irctc1.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setStatus(response.data); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            TRAINS
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" href="/IRCTCSearch">
                Ticket Booking
              </a>
             
              <a className="nav-link" href="/IRCTCSearch/PNR">
                PNR Enquiry
              </a>
              <a className="nav-link" href="/IRCTCSearch/PNR">
               Booking history
              </a>
              <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
   others
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>
            </div>
          </div>
        </div>
      </nav>
      <h2>PNR Status Search</h2>
      <p>Enter the PNR for your booking below to get the current status. You will find it on the top left corner of the ticket.</p>

    
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={pnrNumber}
          onChange={(e) => setPnrNumber(e.target.value)}
          placeholder="Enter PNR Number"
        />
        <ReCAPTCHA
          sitekey="6Lc36500AAAAAGoA3zlodPeeQ0OsJByEBP_tl4gA" // Fix the typo here
        />
        <button type="submit">Check Status</button>
      </form>

      {console.log('Status:', status)}
{/* {console.log('Passenger:', status.passenger)} */}

{status && status.status ? (
  <div>
    <h3>PNR Status</h3>
    <p>PNR Number: {status.data.pnr_number}</p>
    <p>Train Name: {status.data.train_name}</p>
    <p>Class: {status.data.class}</p>

    <p>Source Station: {status.data.source_station?.station_name}</p>
    <p>Destination Station: {status.data.reservation_upto?.station_name}</p>

    <h4>Passengers:</h4>
    {status.data.passenger && Array.isArray(status.data.passenger) && status.data.passenger.length > 0 ? (
      status.data.passenger.map((passenger) => (
        <div key={passenger.passengerSerialNumber}>
          <p>Passenger Name: {passenger.passengerName}</p>
          <p>Age: {passenger.passengerAge}</p>
          <p>Booking Status: {passenger.bookingStatus}</p>
          <p>Current Berth: {passenger.currentBerthNo}</p>
          {/* {/* Add more details as needed  */}
        </div>
      ))
    ) : (
      <p>No passenger information available.</p>
    )}
  </div>
) : (
  <p>No PNR information available.</p>
)}







    </div>
  );
}