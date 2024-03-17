import React, { useState,useEffect } from 'react';
import './train1.css';
import axios from 'axios';
import TrainDetails from './TrainDetails';
import images1 from '../../../images/right-arrow.png'
import placeholder from '../../../images/placeholder.png'
import Date1 from '../../../images/calendar.png'
import briefcase from '../../../images/briefcase.png'
import square from '../../../images/squares.png'
import discount from '../../../images/discount.png'
import train1 from '../../../images/train1.png'

const Train = ({ data,selectedValues }) => {
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [selectedClass, setSelectedClass] = useState('');
    const [response, setResponse] = useState(null);
   
  const [startingPosition, setStartingPosition] = useState('');
  const [destinationPosition, setDestinationPosition] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [value1, setValue1] = useState('Quota');
  const [clas, setClas] = useState('class');
  const [value, setValue] = useState('');
  const [high, sethigh] = useState(true);
  const [change, setChange] = useState(false);
  const [alert, setalert] = useState(false);


  const handleStartingPositionChange =(event) => {
    setStartingPosition(event.target.value);
  };

  const handleDestinationPositionChange = (event) => {
    setDestinationPosition(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

    const [selectedValues1, setSelectedValues] = useState({
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
    
    const [randomNumber, setRandomNumber] = useState(null);

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(randomNum);
  }, [1]);
  
    
    const handleCheckboxChange = (event) => {
      const { name, checked } = event.target;
      setSelectedValues({
        ...selectedValues,
        [name]: checked,
      });
      console.log(selectedValues);
    };
  
    // Rest of your component
    const handleBookingTatkal =()=>{
      // <Review_journey tatakaltension(true)/>
    }
  
 
  function newFunction(setChange) {
    setChange(false);
  }
  
 
 const showpopUp =()=>{
  if (change === false)
  {
 setChange(true);
  }
  else{
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
          // 'X-RapidAPI-Key': 'b638d03ed4mshcfcc03f728ac06ap1ca602jsn17958f56d623',
          'X-RapidAPI-Key': '49321a048emsh4fa22ced5b909c9p1c3d39jsn74434b071f03',

          'X-RapidAPI-Host': 'irctc1.p.rapidapi.com',
        },
      }; 
      
      
      const response = await axios.request(options);
      sethigh(false);
      setResponse(response.data);
      console.log(response.data);
     
    } catch (error) {
    
      
      console.error(error);
    }
  };
  const [passengers, setPassengers] = useState([ ]);

  const addPassenger = () => {
    setPassengers((prevPassengers) => [...prevPassengers, {}]);
  }; 
 


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

  
 
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  useEffect(() => {
    // Log the selectedValues whenever it changes
    console.log('Selected Values:', selectedValues);
  }, [selectedValues]);
 
 
  const selectTrainDetails = async (train, classType) => {
    try {
      const options = {
        method: 'GET',
        url: 'https://irctc1.p.rapidapi.com/api/v1/getFare',
        params: {
          trainNo: train.train_number,
          fromStationCode: train.from_std,
          toStationCode: train.to_sta,
          classType: classType,
        },
        headers: {
          'X-RapidAPI-Key': '49321a048emsh4fa22ced5b909c9p1c3d39jsn74434b071f03',
          'X-RapidAPI-Host': 'irctc1.p.rapidapi.com',
        },
      };

      const response = await axios.request(options);
      setResponse(response.data);
    } catch (error) {
      console.error('Error fetching fare details:', error);
    }
  };



 const calculateFinalDate = (trainDate, numberOfDays) => {
    const parseDate = (dateString) => {
      const parts = dateString.split(' - ');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        // Months are zero-based
        const year = parseInt(parts[2], 10);
        console.log(new Date(year,month,day));
        return new Date(year, month, day);
      }
      return null; 
    };
    
    const startDate = parseDate(trainDate);
    if (startDate) {
      startDate.setDate(startDate.getDate() + numberOfDays);
      return startDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      });
    } else {
      console.error('Invalid date format:', trainDate);
      return '';
    }
  };
 
  return (
    <div>
      { high && !selectedTrain && 
       <div>  < div style={{ display: 'flex', alignItems: 'center', marginTop: '200px' ,marginLeft:'15px' ,}}>

       <img src={placeholder} style={{ maxWidth: '20px', maxHeight: '20px' }} alt="" />
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
     
       <img src={images1} alt="" style={{ maxWidth: '20px', maxHeight: '20px' }} />
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
     <div style={{ display: 'flex', borderRadius:'20px', alignItems: 'center', margin: '20px', maxWidth:'500px' ,justifyContent: 'space-between'}}>

       <span style={{ display: 'flex', alignItems: 'center',justifyContent: 'space-between' }}>

         <img src={Date1} style={{ maxWidth: '20px', marginRight:'20px', maxHeight: '20px' }} alt="" />
         <input style={{ maxWidth: '200px', maxHeight: '35px' }}
           type="date"
       className='input_inner_main'
           name="SearchDate"
           min={new Date().toISOString().split('T')[0]}
           id="date"
           value={searchQuery}
           onChange={handleSearchInputChange}
         />
       </span>

       <div className="dropdown" style={{ display: 'flex', alignItems: 'center',marginLeft: '15px' }}>
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
     <div style={{ display: 'flex',justifyContent: 'space-between', maxWidth:'500px',margin:'20px' }}>
       <div className="dropdown" style={{ display: 'flex' }}>
         <img src={briefcase} alt="" style={{ maxWidth: '20px', marginRight:'20px',maxHeight: '20px' }} />
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
       <div >
         <img src={discount} alt="" style={{ maxWidth: '20px', marginRight:'20px', maxHeight: '20px' }} />

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
      {selectedTrain ? (
        <TrainDetails
          train={selectedTrain}
          selectedClass={selectedClass}
          selectedValues={selectedValues}
          data={data}
        />): ( data.map((train, index) => (<div key={index} 
          // className='block '
                     >
            <div className='black-border overlay1111 '>
              <div id='highlight'> <b>
                  <span className='start'>{train.train_number}</span>
                </b>
                <b>
                  <span className='center'>{train.train_name}</span>
                </b>
              </div>
              <div id='inner_block ' >
                <span className='start'>
                  <b>
                    <span>{train.from_station_name} ||</span>
                    <span>{train.from_std} ||</span>
                    <span>{train.train_date}</span>
                  </b>
                </span>
                <span>
                {/* className='black-border11' */}
                  <b className='center'>{train.duration} min</b>
                </span>
                <span className='end'>
                  <b>
                    <span>{train.to_station_name} ||</span>
                    <span>{train.to_sta} ||</span>
                    {calculateFinalDate(train.train_date, parseInt(train.to_day))}
                  </b>
                </span>
              </div>
              <div >
                <br />
                {daysOfWeek.map((day) => (
                  <span key={day}>
                    {train.run_days.includes(day.substring(0, 3)) ? (
                      <b>{day.charAt(0)}</b>
                    ) : (
                      day.charAt(0)
                    )}{' '}
                    {index < daysOfWeek.length - 1 && ' '}
                  </span>
                ))}
              </div>
              <div className='flex'>
                <br />
                
                {train.class_type.map((classType, index1) => (
                <button
                  className='flex btn1'
                  key={index1}
                  onClick={() => selectTrainDetails(train, classType)}
                >
                  {classType} {"  " + randomNumber}
                  {Response && <div>{Response}</div>}
                </button>
              ))}
                
                <br />
              </div>
              <br />
               <div>
                 <button className='btn btn-success' onClick={() => selectTrainDetails(train, '')} >
                  Book Now
                </button>
                <button className='btn btn-danger'>
                  Other Dates
                </button>
                </div>
            </div>
            <br />
          </div>
        ))
      )}
    </div>
  );
};

export default Train;
