import React, { useState } from 'react';

function Passangenrs() {
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [selectedClass, setSelectedClass] = useState('Economy');

  const handleAdultCountChange = (event) => {
    setAdultCount(parseInt(event.target.value));
  };

  const handleChildCountChange = (event) => {
    setChildCount(parseInt(event.target.value));
  };

  const handleInfantCountChange = (event) => {
    setInfantCount(parseInt(event.target.value));
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  return (
    <div>
      <label htmlFor="adultCount">Adult (12+ yr):</label>
      <input
        type="number"
        id="adultCount"
        min="1"
        max="9"
        value={adultCount}
        onChange={handleAdultCountChange}
      />

      <label htmlFor="childCount">Child (2-11 yr):</label>
      <input
        type="number"
        id="childCount"
        min="0"
        max="9"
        value={childCount}
        onChange={handleChildCountChange}
      />

      <label htmlFor="infantCount">Infant (0-2 yr):</label>
      <input
        type="number"
        id="infantCount"
        min="0"
        max="9"
        value={infantCount}
        onChange={handleInfantCountChange}
      />

      <label htmlFor="classSelection">Class:</label>
      <select id="classSelection" value={selectedClass} onChange={handleClassChange}>
        <option value="Economy">Economy</option>
        <option value="Business">Business</option>
        <option value="First Class">First Class</option>
      </select>
    </div>
  );
}

export default Passangenrs;
