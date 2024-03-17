import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
function ConfirmFlight() {

  const location = useLocation();
  const flightDat = location?.state?.flight || null;
  console.log(flightDat);

 
   
  const [GSTDetail ,setDetail] = useState(false);
  const [gstNumber, setGstNumber] = useState('');
  const [companyName, setCompanyName] = useState('');

  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const GSTdetails = () => {
    setDetail((prevDetail) => !prevDetail);
  }
  console.log(flightDat);

  return (
    <div  className='hullalle'style={{background:'orange',padding:'5vh'}}>
      <div    className='hullalle-huu'  >
      {/* {flightData && flightDat.name} */}
      <div  className="block">
      <div>
    <br />
    <div id="highlightss">
      <span className="center">
        <h5>Flight Name: {flightDat.name}</h5>
      </span>
      <span className="start">
        <h5>Flight Code: {flightDat.flight_code}</h5>
      </span>
      </div>
      
      <div style={{display:'flex',justifyContent: 'space-between'}}>

      <div>Departure Airport: {flightDat.departureAirport?.label}</div>
      <div>Arrival Airport: {flightDat.arrivalAirport?.label}</div>
      </div>
      <div>Duration: {flightDat.duration?.text}</div>
      <div>Total Price: {flightDat.fare} {flightDat.currency}</div>
    
    <br />
    
  </div>


  

<div style={{display:'flex',padding:'2vw',backgroundColor:'yellow'}}>
<div class="input-container" style={{alignContent:'center',alignItems: "center"}}>
  <label style={{minWidth: 'max-content'}} for="email">Contact email:</label>
  <input  className='iiinnput'type="email" id="email" name="email" />

  <label style={{minWidth: 'max-content'}} for="number">Contact number:</label>
  <input className='iiinnput' type="number" id="number" name="number" />
</div>

</div> 

<div style={{display:'flex',justifyContent:'center',padding:'3vw',backgroundColor:'aliceblue'}}>
   
    <select name="" id="">
        <option value="">Mr.</option>
        <option value="">Mrs.</option>
        <option value="">Other</option>

    </select>
    <input type="text" name="" placeholder=' First Name' id="" />
    <input type="text" name="" placeholder=' Last Name' id="" />

</div>
<div>
  <button onClick={GSTdetails}>Add GST</button>
 
  {GSTDetail && 
 
           <div
      // style={{ display: 'flex',backgroundColor:'aliceblue', padding: '2vw', backgroundColor: 'yellow' }}
>
      <div className="input-container"style={{  alignItems: 'center' }} >
        <label className="common-label" htmlFor="gstNumber">
          GST Number:
        </label>
        <input
          className="common-input"
          type="text"
          id="gstNumber"
          value={gstNumber}
          onChange={(e) => setGstNumber(e.target.value)}
        />

        <label className="common-label" htmlFor="companyName">
          Company Name:
        </label>
        <input
          className="common-input"
          type="text"
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
</div>
<div className="input-container" style={{  alignItems: 'center' }}>
   

        <label className="common-label" htmlFor="email">
          Email Id:
        </label>
        <input
          className="common-input"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
              <label className="common-label" htmlFor="mobileNumber">
          Mobile Number:
        </label>
        <input
          className="common-input"
          type="tel"
          id="mobileNumber"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />

        </div>
<div className="input-container" style={{  alignItems: 'center' }}>

  
        <label className="common-label" htmlFor="address">
          Address:
        </label>
        <input
          className="common-input"
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
            <label className="common-label" htmlFor="city">
          City:
        </label>
        <input
          className="common-input"
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
</div>
<div className="input-container" style={{  alignItems: 'center' }}>
    

        <label className="common-label" htmlFor="pincode">
          Pincode:
        </label>
        <input
          className="common-input"
          type="text"
          id="pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
   

        <label className="common-label" htmlFor="state">
          State:
        </label>
        <input
          className="common-input"
          type="text"
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>
    </div>

  }
</div>
    <button>  Book Now </button>
</div>
    </div> 
    
<div className='hellulu' style={{backgroundColor:'blue' ,minWidth:'20%', border:'2px solid black'}}>
  
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, aperiam rem. At ut consectetur, voluptatibus aut nemo magni distinctio non fugiat obcaecati inventore soluta accusamus sequi laborum nostrum laudantium? Molestiae? </div>
    </div>
  )
}

export default ConfirmFlight
