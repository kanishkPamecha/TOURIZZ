import React, { useState } from 'react';
import axios from 'axios';
import './train.css';
import Train from './Train';
import Review_journey from './Review_journey';
import hotel from '../../../images/Agra.jpg'
import logo from '../../../Json/Train-amico.svg'
// import logo from '../../../Json Animation/Train-rafiki.svg'
import images1 from '../../../images/right-arrow.png'
import placeholder from '../../../images/placeholder.png'
import Date1 from '../../../images/calendar.png'
import briefcase from '../../../images/briefcase.png'
import square from '../../../images/squares.png'
import discount from '../../../images/discount.png'
import train1 from '../../../images/train1.png'
import ReCAPTCHA from 'react-google-recaptcha';



const IRCTCSearch = () => {
  const [response, setResponse] = useState(null);
  const [city, setCity] = useState('MDS');
  const [startingPosition, setStartingPosition] = useState('');
  const [destinationPosition, setDestinationPosition] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [value1, setValue1] = useState('Quota');
  const [clas, setClas] = useState('class');
  const [value, setValue] = useState('');
  const [Tickk, setTickk] = useState(true);
  const [change, setChange] = useState(false);
  const [alert, setalert] = useState(false);
  const [passengers, setPassengers] = useState([]);
const [PNR ,setPNR]= useState(false);
const [PNResp ,setPNResp]= useState(false);

const [TickBook,setTicBook]= useState(true);

  const handleStartingPositionChange = (event) => {
    setStartingPosition(event.target.value);
  };

  const handleDestinationPositionChange = (event) => {
    setDestinationPosition(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const [selectedValues, setSelectedValues] = useState({
    class: '',
    quota: '',
    isPWD: false,
    isFlexibleDate: false,
    isTrainWithAvailableBerth: false,
    isRailwayPassConcession: false,
  });

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

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedValues({
      ...selectedValues,
      [name]: checked,
    });
    console.log(selectedValues);
  };

  
  const handleBookingTatkal = () => {
 
  }


  function newFunction(setChange) {
    setChange(false);
  }


  const showpopUp = () => {
    if (change === false) {
      setChange(true);
    }
    else {
      newFunction(setChange);

    }
  }

  const handleSearch = async () => {
    try {
      const options = {
        method: 'GET',
        url: 'https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations',
        params: {
          fromStationCode: startingPosition,
          toStationCode: destinationPosition,
          dateOfJourney: searchQuery
        },
        headers: {
          // 'X-RapidAPI-Key': '44f3e752a0msh1611dd93074e36ep1e30a2jsn93b5b56748c8',
          'X-RapidAPI-Key': 'b638d03ed4mshcfcc03f728ac06ap1ca602jsn17958f56d623',
          //  'X-RapidAPI-Key': '49321a048emsh4fa22ced5b909c9p1c3d39jsn74434b071f03',

          'X-RapidAPI-Host': 'irctc1.p.rapidapi.com',
        },
      };


      const response = await axios.request(options);
      setTickk(false);
      setResponse(response.data);
      console.log(response.data);

    } catch (error) {


      console.error(error);
    }
  };  const [pnrNumber, setPnrNumber] = useState('');
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

  const addPassenger = () => {
    setPassengers((prevPassengers) => [...prevPassengers, {}]);
  };

const handlePNR =()=>{
  setPNR(true);
  setTicBook(false);

}
const handleticket =()=>{
  setPNR(false);
  setTicBook(true); 
}

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedPassengers = [...passengers];
    updatedPassengers[index][name] = value;
    setPassengers(updatedPassengers);
  };
  const [infantsWithoutBerth, setInfantsWithoutBerth] = useState([
    // Initial infants without berth data if any
  ]);
  const handleInfantInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedInfants = [...infantsWithoutBerth];
    updatedInfants[index][name] = value;
    setInfantsWithoutBerth(updatedInfants);
  };

  const addInfantWithoutBerth = () => {
    setInfantsWithoutBerth((prevInfants) => [...prevInfants, {}]);
  };




  return (
   

    
      
<div className="container colon  " style={{minHeight:'100vh'}}>
        <div className="display11  changesinIRCTC   help " style={{borderRadius:'20px'}}>
        <div>
          {response && <Train data={response.data} selectedValues={selectedValues} />}
        </div>

        {Tickk && 
       

        <div className="input-group">
<div style={{display:'flex' ,justifyContent:'space-between'}}>
  <button  className='btn2 buttton2' onClick={handleticket}>Ticket</button>
<button  className='btn2 buttton2' onClick={handlePNR}>PNR Enquiry</button>
<button  className='btn2 buttton2'onClick={handleticket}>Bookings</button>
<button  className='btn2 buttton2'>charts Vacancy</button>
</div>
        {TickBook  && 
        <div  className='full_box_irctc'style={{marginBottom:'0px',paddingTop:'5%',overflow:'hidden'}}> 

<div className="custom-container_irctc">
<div className='KSPHM'>
      <img src={placeholder} className="image_irctc" alt="From:" />

      <select
        className='input_inner_main'
        name="startingPosition"
        id="startingPosition"
        placeholder="Starting Position"
        value={startingPosition}
        onChange={handleStartingPositionChange}
        >
        <option value="">Select an option</option>
        <option value="JP">Jaipur</option>
        <option value="INDB">Indore</option>
        <option value="RTM">Ratlam</option>
        <option value="AJ">Ajmer</option>
      </select>
      </div>

      <img src={images1} className="image_irctc  visibille" alt="To :" />
      <img src={images1} className="image_irctc  invisibille" alt="To :" />
      <div className='KSPHM'>
      <img src={placeholder} className="image_irctc" alt="From:" />
  
      <select
        className='input_inner_main'
        name="DestinationPosition"
        id="startingPosition"
        placeholder="Starting Position"
        value={destinationPosition}
        onChange={handleDestinationPositionChange}
        >
        <option value="">Select an option</option>
        <option value="RTM">Ratlam</option>
        <option value="Mds">Mandsaur</option>
        <option value="Ladies">Ladies</option>
        <option value="PWD">P.W.D.</option>
      </select>
    </div>
        </div>
      
          <div className="custom-container_irctc" >

<div className='KSPHM'>
            

              <img src={Date1} style={{ maxWidth: '5%', marginRight:'5%', maxHeight: '5%' }} alt="" />
              <input style={{ maxWidth: '200px', maxHeight: '35px' }}
                type="date"
            className='input_inner_main'
                name="SearchDate"
                min={new Date().toISOString().split('T')[0]}
                id="date"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </div>
<div className='KSPHM'>
          
              <img src={square} alt="" style={{ maxWidth: '20px', marginRight:'20px', maxHeight: '20px' }} />


              <select id="mode1" 
            className='input_inner_main'
             value={value1} onChange={handleChange1}>
                <option value="">Select an option</option>
                <option value="General">General</option>
                <option value="Tatkal">Tatkal</option>
                <option value="Ladies">Ladies</option>
                <option value="PWD">P.W.D.</option>
              </select>
            </div>
            </div>
          
          <div className="custom-container_irctc">
<div className='KSPHM'>
            
              <img src={briefcase} alt="" style={{ minWidth: '20px',maxHeight: '20px',marginRight:'5%' }} />
              <select 
            className='input_inner_main'
            id="mode2" value={clas} onChange={handleChange2}>
                <option value="">Select an option</option>
                <option value="Sleeper">Sleeper</option>
                <option value="3AC">3A</option>
                <option value="2AC">2A</option>
                <option value="1AC">1A</option>
              </select>
            </div>
<div className='KSPHM'>

              <img src={discount} alt="" style={{ maxWidth: '20px',maxHeight:'20px' }} />

              <select name="" id="" 
            className='input_inner_main'
            
            
            >
                <option className="checkbox-group">
                  <input
                    type="checkbox"
                    name="hello"
                    id="hello1"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="hello1" onClick={handleCheckboxChange}>
                    None
                  </label>
                </option>
                <option className="checkbox-group">
                  <input
                    type="checkbox"
                    name="hello"
                    id="hello1"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="hello1" onClick={handleCheckboxChange}>
                    Person with Disability concession
                  </label>
                </option>

                <option className="checkbox-group">
                  <input
                    type="checkbox"
                    name="hello"
                    id="hello2"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="hello2" onClick={handleCheckboxChange}>
                    Flexible With Date
                  </label>
                </option>

                <option className="checkbox-group">
                  <input
                    type="checkbox"
                    name="hello"
                    id="hello3"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="hello3" onClick={handleCheckboxChange}>
                    Train with available berth
                  </label>
                </option>

                <option className="checkbox-group">
                  <input
                    type="checkbox"
                    name="hello"
                    id="hello4"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="hello4" onClick={handleCheckboxChange}>
                    Railway Pass Concession
                  </label>
                </option>
              </select>
            </div>
            </div>
          
</div>

 } 

 {
  PNR &&  
  <div>
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
  </div>
 }
          <button className="btn btn-success   btn_Click_Train_done" onClick={handleSearch}>
            Submit
          </button>
        </div>
   


        }



        {PNResp && 
            <div>
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
        }
      

        <div className='desktop1'>


          {response && <Train data={response.data}  style ={{minWidth:'100%'}} selectedValues={selectedValues} />}
        </div>

        {change && <div>
          <h5>Enter the train details</h5>
          Train Number <input type="number" name="Train Number" id="" />
          Train Name <input type="text" />
          <br /><br />
          from where  <input
            type="search"
            name="startingPosition"
            id="startingPosition"
            placeholder="Starting Position"
            value={startingPosition}
            onChange={handleStartingPositionChange}
          />

          <input
            type="search"
            name="destinationPosition"
            id="destinationPosition"
            placeholder="Destination Position"
            value={destinationPosition}
            onChange={handleDestinationPositionChange}
          />
          Boarding Station
          <input type="text" />
          <br />
          <input
            type="date"
            name="SearchDate"
            min={new Date().toISOString().split('T')[0]}
            id="date"
            value={searchQuery}
            onChange={handleSearchInputChange}
          /> <div>
            <div className="dropdown">
              <label htmlFor="mode">Select a Class:</label>
              <select id="mode" value={value1} onChange={handleChange1}>
                <option value="">Select an option</option>
                <option value="General">General</option>
                <option value="Tatkal">Tatkal</option>
                <option value="Ladies">Ladies</option>
                <option value="PWD">P.W.D.</option>
              </select>
            </div>

            <div className="dropdown">
              <label htmlFor="mode">Select a Class:</label>
              <select id="mode" value={clas} onChange={handleChange2}>
                <option value="">Select an option</option>
                <option value="Sleeper">Sleeper</option>
                <option value="3AC">3A</option>
                <option value="2AC">2A</option>
                <option value="1AC">1A</option>
              </select>
            </div></div>
          <input type="checkbox" name="PWD" id="PWD" />
          <label htmlFor="jeelo" >Person with Disability concession</label>
          <input type="checkbox" name="FWD" id="FWD" />
          <label htmlFor="hello">Flexible With Date</label>
          <input type="checkbox" name="TWAB" id="TWAB" />
          <label htmlFor="hello">Train with available berth</label>
          <input type="checkbox" name="RPC" id="RPC" />
          <label htmlFor="hello">Railway Pass Concession</label>
          <br />

          <br />
          <h5>Enter Passenger Details</h5>
          <button onClick={addPassenger}>+ Add Passenger/Infant With Berth</button>
          {passengers.map((passenger, index) => (
            <div key={index} >
              <input
                type='text'
                name='name'
                placeholder='Passenger Name'
                onChange={(event) => handleInputChange(event, index)}
              />
              <input
                type='number'
                name='age'
                placeholder='Age'
                onChange={(event) => handleInputChange(event, index)}
              />
              <select
                name='gender'
                onChange={(event) => handleInputChange(event, index)}
              >
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='others'>Others</option>
              </select>
              <select name="birth " id="birth" onChange={(event) => handleInputChange(event, index)}> <option value="SL"> Side Lower</option><option value="SU">Side Upper</option>
                <option value="M">Middle</option>
                <option value="U">Upper</option>
                <option value="L">Lower</option></select>
            </div>
          ))}

          <button>+ Add Infant Without Berth</button>
          <button onClick={addInfantWithoutBerth}>+ Add Infant Without Berth</button>
          {infantsWithoutBerth.map((infant, index) => (
            <div key={index}>
              <input
                type='text'
                name='infantName'
                placeholder='Infant Name'
                onChange={(event) => handleInfantInputChange(event, index)}
              />
              <input
                type='number'
                name='infantAge'
                placeholder='Infant Age'
                onChange={(event) => handleInfantInputChange(event, index)}
              />
              <select
                name='infantGender'
                onChange={(event) => handleInfantInputChange(event, index)}
              >
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>
              {/* ... Additional input fields for infants without berth ... */}
            </div>
          ))}
          <div>

            <input type="radio" name="upgrade" id="upgrade" />
            <label htmlFor="upgrade">   Consider For auto upgradation </label>
          </div>
          <div>
            <h6>
              pay With

            </h6>
            <input type="radio" name="pay" id="upi" />
            <label htmlFor="upi"> Pay with upi</label>
            <input type="radio" name="pay" id="Net Banking" />
            <label htmlFor="Net Banking">Net Bankin</label>

          </div>

          <button>Wallet</button>
          <button>OtherModes At the time of booking</button>
          <button onClick={handleBookingTatkal} className='btn btn-success'>Connect For  5 min </button>
          <div>
            btn


          </div>
        </div>
        }
</div>

</div>

  )


};

export default IRCTCSearch;


