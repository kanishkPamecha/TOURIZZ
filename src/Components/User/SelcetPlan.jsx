import React from 'react'

function SelcetPlan() {
  return (
    <div>
      
      <div className="container colon ">
        <div className="display">
          <div className="input-group">
            <label htmlFor="cityInput">Enter City:</label>
            <input type="text" id="cityInput" value={selectedCity} onChange={handleCityChange} />
          </div>
          <div className="input-group">
            <label htmlFor="startDateInput">Check in-date:</label>
            <input
              type="date"
              id="startDateInput"
              value={startDate}
              min={today}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="endDateInput">Check out-date:</label>
            <input
              type="date"
              id="endDateInput"
              value={endDate}
              min={startDate}
              onChange={handleEndDateChange}
            />
          </div>
          <button className="btn-primary" onClick={handleSearch}>
            Search
          </button>
          <input type="range" name="" id="" />

        </div>
        <div><img src={Image} alt="" style={{maxWidth:'500px'}}/></div>
      </div>
       
    </div>
  )
}

export default SelcetPlan
