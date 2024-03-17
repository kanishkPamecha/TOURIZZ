import './App.css';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const handleCheckInChange = (e) => {
    setCheckInDate(e.target.value);
  };

  const handleCheckOutChange = (e) => {
    setCheckOutDate(e.target.value);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div>
            <h1>Check-in and Check-out Dates</h1>
            <label>
              Check-in Date:
              <input type="date" value={checkInDate} onChange={handleCheckInChange} />
            </label>
            <br />
            <label>
              Check-out Date:
              <input type="date" value={checkOutDate} onChange={handleCheckOutChange} />
            </label>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
