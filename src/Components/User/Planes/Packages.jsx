import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './package.css';
import ReactGA from 'react-ga';
import Autosuggest from 'react-autosuggest';

// Dummy list of cities for demonstration purposes
const cities = [
  'New Delhi',
  'Mumbai',
  'Kolkata',
  'Chennai',
  'Bengaluru',
  'Mandsaur',
  'Mandsaur',
  'Mandsaur',
  'Mandsaur',
  'Mandsaur',
  'Mandsaur',
  'Mandsaur',
  'Mandsaur',
  'Mandsaur',

];

const CreatePlane = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [price, setPrice] = useState(1000000);

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const [city, setCity] = useState('');
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);

  const handleClose = () => {
    setSelectedPackage(null);
  };

  const handleClick = () => {
    if (selectedPackage) {
      // Track the event in Google Analytics
      ReactGA.event({
        category: 'Package Interaction',
        action: 'Selected Package',
        label: selectedPackage.name,
      });

      navigate(`/package-info`, { state: { selectedPackage } });
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3001/packages');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPackages(data);
   
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const handleClick1 = () => {
    try {
      const filteredPackages = packages.filter((package2) => {
        return package2.name && package2.name.toLowerCase() === city.toLowerCase();
      });
      setFilteredPackages(filteredPackages);
      console.log(filteredPackages);
      if (filteredPackages.length === 0) {
        setFilteredPackages(packages); // Set filteredPackages back to all packages
      }
    } catch (error) {
      console.error('Error filtering packages:', error);
    }
  };

  useEffect(() => {
    ReactGA.initialize('G-4SPBX5RW3W');
    // Track the initial pageview
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = (inputValue) => {
    const inputValueLower = inputValue.trim().toLowerCase();
    return cities.filter((city) => city.toLowerCase().includes(inputValueLower));
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setValue(suggestion);
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: 'Type or select a city',
    value,
    onChange,
  };
  return (
    <div >
      <div className='BackImage'>

      <div className='Strict_Search_Box1'style={{minWidth:'70%'}} >
        <h2>Explore the World with Tourizz: </h2>
        <h5>Your City, Your Way</h5>
       
        <label htmlFor="city">City </label>
        <div className="autosuggest-container" >
      <Autosuggest style={{ maxHeight: '200px' ,overflow:'scroll'}}
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={(suggestion) => (
          <div className="suggestion-container" style={{paddingTop:'15px',marginLeft:'-5%',borderBottom:'1px solid black'}}>
            {suggestion}
           
          </div>
        )}
        inputProps={inputProps}
      />
    </div>
<div style={{display:'flex',minWidth:'100%',alignItems: 'flex-end'}}>
  <p> {100}</p>
        <input
          type="range"
          name="price"
          id="price"
          onChange={handlePriceChange}
          min={100}
          max={100000000}
          step={1000}
          defaultValue={1000000}
          value={price}
        />
      <p> {100000000}</p>
          
    </div>
        <select name="No" id="">
          <option value="">Solo</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
      
        </select>

      
        <select name="" id="">
          <option value="">Honeymoon</option>
          <option value="">Family Trip</option>
          <option value="">Friends</option>
          <option value="">Dharmic</option>
        </select>
       <br />
      
        <button onClick={handleClick1}
         style={{
          marginTop:'3%',
         paddingRight:'10%',backgroundColor:'purple',paddingLeft:'10%',borderRadius:'25px'}}
        >Search</button>
      </div>
      </div>
      <div className="package-container">
        <h1>Packages</h1>
        <ul className="package-list">
          <div className="row" key={1}>
            {filteredPackages.length > 0
              ? filteredPackages.map((package2) => (
                  <div class="card" style={{ width: '24rem', minHeight: '30%', margin: '1%' }} onClick={() => setSelectedPackage(package2)}>
                    <img src={`http://127.0.0.1:3001/${package2.img}`} class="card-img-top image_personal" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">{package2.name}</h5>
                      <p class="card-text"><b>{package2.description}</b></p>
                    </div>
                  </div>
                ))
              // : packages.map((package2) => (
              //     <div class="card" style={{ width: '24rem', minHeight: '30%', margin: '1%' }} onClick={() => setSelectedPackage(package2)}>
              //       <img src={`http://127.0.0.1:3001/${package2.img}`} class="card-img-top image_personal" alt="..." />
              //       <div class="card-body">
              //         <h5 class="card-title">{package2.name}</h5>
              //         {package2.city}
              //         <p class="card-text"><b>{package2.description}</b></p>
              //       </div>
              //     </div>
              //   ))
           :   <div > No Planes found for these city</div>
                }
          </div>
        </ul>
        {selectedPackage && (
          <div className="overlay"style={{marginTop:'5%'}} >
            <div className="bak111" style={{zIndex:'2000'}}>
              <div className='Container11'>
                <div data-bs-theme="dark">
                  <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                </div>
                <div className='pack-name'>
                  <h1 style={{ marginTop: '20%' }} >{selectedPackage.name}</h1>
                </div>
                <div className='max-w'>
                  <img className='pack-image' src={`http://127.0.0.1:3001/${selectedPackage.img}`} alt={selectedPackage.name} />
                </div>
                <p className='pack-description'>Description: {selectedPackage.description}</p>
                <h6 className='pack-price'>₹ Price</h6>
                <button className='btn btn-success button11'  onClick={handleClick}>Redirect</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePlane;





// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './package.css';
// import ReactGA from 'react-ga'; // Import ReactGA

// export default function CreatePlane() {
//   const navigate = useNavigate();
//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const [price, setprice] = useState(null);
//   const [city, setcity] = useState('');
  
//   const handleClose = () => {
//     setSelectedPackage(null);
//   };

//   const [packages, setPackages] = useState([]);

//   const handleClick = () => {
//     if (selectedPackage) {
//       console.log(selectedPackage); // Check the value in the console

//       // Track the event in Google Analytics
//       ReactGA.event({
//         category: 'Package Interaction',
//         action: 'Selected Package',
//         label: selectedPackage.name,
//       });

//       navigate(`/package-info`, { state: { selectedPackage } });
//     }
//   }

//   useEffect(() => {
//     fetchPackages();
//   }, []);

//   const fetchPackages = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:3001/packages');
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       setPackages(data);
//     } catch (error) {
//       console.error('Error fetching packages:', error);
//     }
//   };
//   const handleClick1=() =>{

//   }
//   const handleSelect = () => {
//     setSelectedPackage(false);
//   }

//   useEffect(() => {
//     ReactGA.initialize('G-4SPBX5RW3W');

//     // Track the initial pageview
//     ReactGA.pageview(window.location.pathname + window.location.search);
//   }, []);

//   return (
//     <div>
//       <div className='Strict_Search_Box'>
//         <h2>
//           Enter the City You Want to travel
//           </h2>
//         <input type="text" name="city " id={city} onChange={(e)=>setcity(e)} />
//         <input type="range" name="price " id={price} onChange={(e)=>setprice(e)} min={100} max={100000000} defaultValue={1000000}/>

//         <input type="number" name="" id="" />
//         <button onClick={handleClick1}>Enter More Filters</button>
//         <select name="" id="">
//           <option value="">Honeymoon</option>
// <option value="">Family Trip</option>
// <option value="">Friends</option>
//           <option value="">Dharmic</option>
//         </select>
//       </div>
//     <div className="package-container"> {/* Add a container for the packages */}
//       <h1>Packages</h1>
//       <ul className="package-list">
 
//      <div className="row" key={1}>
//       {packages
//       // lice(index, index + 1)
//       .map((package2) => (
  
//   <div class="card" style={{width: '24rem',minHeight:'30%',margin:'1%'}}onClick={() => setSelectedPackage(package2)}>
//   <img src={`http://127.0.0.1:3001/${package2.img}`} class="card-img-top image_personal" alt="..."/>
//   <div class="card-body">
//     <h5 class="card-title">{package2.name}</h5>
//     <p class="card-text"><b>{package2.description}</b></p>
//     {/* <p class="card-text">
//       <a href="#" class="stretched-link text-danger" style="position: relative;">Stretched link will not work here, because <code>position: relative</code> is added to the link</a>
//     </p> */}
    
//   </div>
// </div>

//       ))}
//     </div>
  
// </ul>

//       {selectedPackage && (
//         <div className="overlay">
//           <div className="bak111">
//             <div className='Container11'>
//               <div data-bs-theme="dark">
//                 <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
//               </div>

//               <div className='pack-name' >
//                 <h1 style={{marginTop: '20%'}} >{selectedPackage.name}</h1>
//               </div>

//               <div className='max-w'>
//                 <img className='pack-image' src={`http://127.0.0.1:3001/${selectedPackage.img}`} alt={selectedPackage.name} />
//               </div>                                                                            

//               <p className='pack-description'>Description: {selectedPackage.description}</p>
//               {/* Add more package details here */}
//               <h6 className='pack-price'>₹ Price</h6>
//               <button className='btn btn-success button11' onClick={handleClick}>Redirect</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//     </div>

//   )
// }
