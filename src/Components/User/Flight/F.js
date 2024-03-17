import React, { useEffect, useRef,useState } from 'react';
import axios from 'axios';
import img from '../../../images/beach.jpg';
import'./F.css';
import image from '../../../Back/Untitleddesign.jpg'
import logo from '../../../Json/Flight Booking.gif'
import images1 from '../../../images/right-arrow.png'
import placeholder from '../../../images/placeholder.png'
import Date1 from '../../../images/calendar.png'
import briefcase from '../../../images/briefcase.png'
import square from '../../../images/squares.png'
import {  useNavigate } from 'react-router-dom';
import discount from '../../../images/discount.png'
import train1 from '../../../images/train1.png'
// import $ from 'jquery';

function FlightFareComponent() {
  const [Response, setResponse] = useState(null);
  const [destinationPosition, setDestinationPosition] = useState('');
  const [error, setError] = useState(null);
  const [startingPosition, setStartingPosition] = useState('');
  const [fromValue, setFromValue] = useState('DEL');
  const [value1, setValue1] = useState('Quota');
  const [clas, setClas] = useState('class');
  const [toValue, setToValue] = useState('JAI');
  const [date, setdate] = useState('');
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const  nav = useNavigate();
  const handleStartingPositionChange = (event) => {
    setStartingPosition(event.target.value);
  };
  const handleDestinationPositionChange = (event) => {
    setDestinationPosition(event.target.value);
  };
  const today = new Date().toISOString().split('T')[0];
  const [infantCount, setInfantCount] = useState(0);
  const [selectedClass, setSelectedClass] = useState('Economy');
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchFlightFare = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:7004/api/FlightDetails', {
        params: {
          from: fromValue,
          to: toValue,
          selectedClass: selectedClass,
        },
      });
  
      setResponse(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching flight details:', error);
    }
  };

 
  const handleChange1 = (event) => {
    const { name, value } = event.target;
    console.log(`Setting ${name} to ${value}`);
    setValue1(value);
  };

  const handleChange2 = (event) => {
    const { name, value } = event.target;
    console.log(`Setting ${name} to ${value}`);
    setClas(value);
  };

  const showFlightDetails = (flight) => {
    setSelectedFlight(flight);
     console.log(flight);
   
    nav('/ConfirmFlight', {state: {flight,
      date,
    
    }});
  };

  const clearSelectedFlight = () => {
    setSelectedFlight(null);
  };
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
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
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedValues({
      ...selectedValues,
      [name]: checked,
    });
    console.log(selectedValues);
  };
  const [selectedValues, setSelectedValues] = useState({
   
  });
  
 

    const getPoint = (point, i, a, smoothing) => {
        // getPoint function logic
    };

    const getPath = (update, before, after, width) => {
        // getPath function logic
    };

    const setCSSVars = (slider) => {
        // setCSSVars function logic
    };
  
  return (
    <div>

      <div
        className="train_back "
       
      >
        {!Response &&
         <div>
     <div className="container colon " style={{minHeight:'100vh'}}>
        <div className="display11    help 
        " style={{borderRadius:'20px'}}>
          <div
           className="input-group"
          >

     
   
   
      <div 
      className='baseName'
       style={{marginTop:'-70px' ,display:'flex',alignContent:'space-between',minWidth:'100%',justifyContent:"space-between"}}>

<button className='btn2 buttton2'>Book </button>
<button className='btn2 buttton2'  >Refund </button>
<button className='btn2 buttton2'>Cancel </button>
</div>

         
            <br />
           



< div style={{ display: 'flex', alignItems: 'center', margin: '20px'  ,justifyContent: 'space-between'}}>

  <img src={placeholder} style={{ maxWidth: '20px', maxHeight: '20px' }} alt="" />

       <select className="form-select color input_inner_main_Flight"id="fromSelect"value={fromValue} onChange={(e) => setFromValue(e.target.value)}>
        <option value="DEL">Delhi</option><option value="Udaipur">Udaipur</option> <option value="JAI">Jaipur</option>  <option value="Mumbai">Mumbai</option>
         <option value="IDR">Indore</option>
        <option value="BHO">Bhopal</option>
        <option value="BLR">Bangalore</option>
        <option value="IXE">Mangaluru</option> </select>

  <img src={images1} alt="" style={{ maxWidth: '20px', maxHeight: '20px' }} />

       <select
        className="form-select color input_inner_main_Flight"
        id="ToSelect"
        value={toValue}
        onChange={(e) => setToValue(e.target.value)}
      >
        <option selected value="DEL">Delhi</option>
        <option value="UDP">Udaipur</option>
        <option value="JAI">Jaipur</option>
        <option value="Mumbai">Mumbai</option>
        <option value="IDR">Indore</option>
        <option value="BHO">Bhopal</option>
        <option value="BLR">Bangalore</option>
        <option value="IXE">Mangaluru</option>


      </select>
</div>
<div style={{ display: 'flex',flexDirection:'column', borderRadius:'20px', alignItems: 'center', margin: '20px', justifyContent: 'space-between'}}>

  <span style={{ display: 'flex', alignItems: 'center',justifyContent: 'space-between' }}>

    <img src={Date1} style={{ maxWidth: '20px', marginRight:'20px', maxHeight: '20px' }} alt="" />
    <input style={{ maxHeight: '35px' }}
      type="date"
  className='input_inner_main_Flight'
      name="SearchDate"
      min={new Date().toISOString().split('T')[0]}
      id="date1"
      value={searchQuery}
      onChange={handleSearchInputChange}
    />
  </span>

  <div className="dropdown" style={{ display: 'flex', alignItems: 'center', }}>
    <img src={square} alt="" style={{ maxWidth: '20px', marginRight:'20px', maxHeight: '20px' }} />


    <select id="mode1" style={{minHeight:'35px'}}
  className='input_inner_main_Flight'
   value={value1} onChange={handleChange1}>
      <option value="">Select an option</option>
      <option value="First">First Class </option>
      <option value="Second">Second class </option>
      <option value="Economy">Economy</option>
      <option value="Buisness">Buisness Class.</option>
    </select>
  </div>
</div>
<div style={{ display: 'flex',justifyContent: 'space-between', maxWidth:'500px',margin:'20px' }}>
<div style={{display: 'flex'}}>
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
</div>

<div>
<label htmlFor="childCount">Child (2-11 yr):</label>
<input
type="number"
id="childCount"
min="0"
max="9"
value={childCount}
onChange={handleChildCountChange}
/>
</div>

<div>
<label htmlFor="infantCount">Infant (0-2 yr):</label>
<input
type="number"
id="infantCount"
min="0"
max="9"
value={infantCount}
onChange={handleInfantCountChange}
/>
</div>
</div>
</div>


<button className="btn btn-success   btn_Click_Train_done " type="submit" onClick={fetchFlightFare}>
  Search
</button>

          </div>
        
          <div class="box">

<h3>Price <span>Range</span></h3>
<div class="values">
    <div>$<span id="first"></span></div> - <div>$<span id="second"></span></div>
</div>
<small>
    Current Range:
    <div>$<span id="third"></span></div>
</small>

<div class="slider" data-value-0="#first" data-value-1="#second" data-range="#third"></div>

</div>

        </div>
        
      </div>
    
       
           <div style={{ display:'flex',justifyContent:'center',alignItems:'end',alignContent:'center'}}>
       
  
        </div>

          </div>
        }
        {!Response ? (
          <div>Hello </div>
        ) : (
          <div>
         {Response.map((flight, index) => (
  <div key={index} className="block">
    <br />
    <div id="highlightss">
      <span className="center">
        <h5>Flight Name: {flight.name}</h5>
      </span>
      <span className="start">
        <h5>Flight Code: {flight.flight_code}</h5>
      </span>
      </div>
      
      <div style={{display:'flex',justifyContent: 'space-between'}}>

      <div>Departure Airport: {flight.departureAirport?.label}</div>
      <div>Arrival Airport: {flight.arrivalAirport?.label}</div>
      </div>
      <div>Duration: {flight.duration?.text}</div>
      <div>Total Price: {flight.fare} {flight.currency}</div>
    
    <br />
    <div className='flex_btn'>

    <button className=" btn1" onClick={() => showFlightDetails(flight)}>
      View Details
    </button>
    </div>
   
  </div>
))}

          </div>
        )}

      </div>

    </div>
  )
}
export default FlightFareComponent;
