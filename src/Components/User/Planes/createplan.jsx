import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Search.css';

import PDFGenerator from '../Group/PDFGenerator';
import { Document, Page, pdf } from '@react-pdf/renderer';
import '../Group/Group.css';

import WalkImage from '../../../images/Bhutan.jpg';
import AutoImage from '../../../images//Bhutan.jpg';
import BikeImage from '../../../images/Bhutan.jpg';
import BusImage from '../../../images//Bhutan.jpg';
import TrainImage from '../../../images//Bhutan.jpg';

const Packages = () => {
  const [items, setItems] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [selectedMode, setSelectedMode] = useState('Walk');
    const [selectedDays, setselectedDays] = useState(2);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);

    const handleDelete = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    const handleItemClick = (type) => {
        setSelectedType(type);
    };

    const handleModeChange = (event) => {
        setSelectedMode(event.target.value);
    };

    const handleAddTransport = () => {
        const newItem = {
            type: 'Transport',
            name: prompt('Enter the name of the transport:'),
            mode: selectedMode,
            from: prompt('Enter the from location:'),
            to: prompt('Enter the to location:'),
            city: items.find(item => item.type === 'City')?.name || ''
        };
        setItems([...items, newItem]);
        setSelectedType('');
    };

    const handleSavePDF = async () => {
        const pdfBlob = await pdf(<PDFGenerator items={items} />).toBlob();
        const blobUrl = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'group_booking.pdf';
        link.click();
    };

    const handleAddCity = () => {
        const newItem = {
            type: 'City',
            name: prompt('Enter the name of the city:'),
            No: selectedDays
        };
        setItems([...items, newItem]);
        setSelectedType('');
    };

    const handleAddItem = (type) => {
        const lastAddedCity = items
            .filter(item => item.type === 'City')
            .slice(-1)
            .pop();

        let newItem = null;

        if (lastAddedCity) {
            const name = lastAddedCity?.name;
            const start = prompt(`Enter the start time for ${type.toLowerCase()} in ${name}:`);
            const stop = prompt(`Enter the stop time for ${type.toLowerCase()} in ${name}:`);

            newItem = {
                type: type,
                city: name,
                name: start && stop ? prompt(`Enter the name of the ${type.toLowerCase()}:`) : null,
                startTime: start || '',
                stopTime: stop || ''
            };
        } else {
            alert('Select the city first else we cannot connect to making the plan');
            return;
        }

        setItems([...items, newItem]);
        setSelectedType('');
    };

    const handleEdit = (index) => {
        const itemToEdit = items[index];

        if (itemToEdit.type === 'Transport') {
            const updatedItem = {
                ...itemToEdit,
                name: prompt('Enter the new name of the transport:', itemToEdit.name),
                from: prompt('Enter the new from location:', itemToEdit.from),
                to: prompt('Enter the new to location:', itemToEdit.to)
            };
            const updatedItems = [...items];
            updatedItems[index] = updatedItem;
            setItems(updatedItems);
        } else if (itemToEdit.type === 'City') {
            const updatedItem = {
                ...itemToEdit,
                name: prompt('Enter the new name of the city:', itemToEdit.name),
                No: parseInt(prompt('Enter the new number of days:', itemToEdit.No))
            };
            const updatedItems = [...items];
            updatedItems[index] = updatedItem;
            setItems(updatedItems);
        } else if (['Hotel', 'Place'].includes(itemToEdit.type)) {
            const updatedItem = {
                ...itemToEdit,
                name: prompt(`Enter the new name of the ${itemToEdit.type.toLowerCase()}:`, itemToEdit.name)
            };
            const updatedItems = [...items];
            updatedItems[index] = updatedItem;
            setItems(updatedItems);
        }
    };

    const handleAddHotel = () => {
        const lastAddedCity = items
            .filter(item => item.type === 'City')
            .slice(-1)
            .pop();

        if (lastAddedCity) {
            const name = lastAddedCity?.name;
            const start = prompt(`Enter the check-in time for hotel in ${name}:`);
            const stop = prompt(`Enter the check-out time for hotel in ${name}:`);

            const newItem = {
                type: 'Hotel',
                city: name,
                name: start && stop ? prompt('Enter the name of the hotel:') : null,
                checkInTime: start || '',
                checkOutTime: stop || ''
            };

            setItems([...items, newItem]);
            setSelectedType('');
        } else {
            alert('Select the city first else we cannot connect to making the plan');
        }
    };

    const handleAddPlace = () => {
        const lastAddedCity = items
            .filter(item => item.type === 'City')
            .slice(-1)
            .pop();

        if (lastAddedCity) {
            const name = lastAddedCity?.name;
            const start = prompt(`Enter the start time for place in ${name}:`);
            const stop = prompt(`Enter the stop time for place in ${name}:`);

            const newItem = {
                type: 'Place',
                city: name,
                name: start && stop ? prompt('Enter the name of the place:') : null,
                startTime: start || '',
                stopTime: stop || ''
            };

            setItems([...items, newItem]);
            setSelectedType('');
        } else {
            alert('Select the city first else we cannot connect to making the plan');
        }
    };

    const userId = 'user123';

    useEffect(() => {
        const storedItems = localStorage.getItem(`groupBookingItems_${email}`);
        if (storedItems) {
            setItems(JSON.parse(storedItems));
        }
        setLoading(false);
    }, [email]);

    useEffect(() => {
        if (!loading) {
            localStorage.setItem(`groupBookingItems_${email}`, JSON.stringify(items));
        }
    }, [email, items]);

  const [packages, setPackages] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState(null);
  const [city, setCity] = useState('');
  const [hotels, setHotels] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [query, setQuery] = useState('');
  const [numOfDays, setNumOfDays] = useState(1);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [pop, setPop] = useState();
  const [selected, setSelected] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState(null);
// Add this state variable at the beginning of your component
const [selectedCityForHotels, setSelectedCityForHotels] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleAddCity1 = () => {
    const cityData = {
      name: city,
      activities: activities,
      hotel: selectedHotel
    };

    setCitiesData(prevCitiesData => [...prevCitiesData, cityData]);
    setCity('');
    setActivities([]);
    setSelectedHotel(null);
  };

  const handleAddActivity = (dayIndex) => {
    const updatedActivities = [...activities];

    if (!updatedActivities[dayIndex]) {
      updatedActivities[dayIndex] = [];
    }

    updatedActivities[dayIndex].push({ name: '', time: '', rate: '' });
    setActivities(updatedActivities);
  };

  const handleHotelSelect = (selectedHotel) => {
    const updatedCitiesData = citiesData.map(cityData => {
      if (cityData.name === city) {
        return {
          ...cityData,
          hotel: selectedHotel
        };
      }
      return cityData;
    });

    const updatedHotels = hotels.filter(hotel => hotel.name === selectedHotel);

    setCitiesData(updatedCitiesData);
    setHotels(updatedHotels);
    setSelectedHotel(selectedHotel);
  };

  const handleActivityChange = (dayIndex, activityIndex, field, value) => {
    const updatedActivities = [...activities];
    updatedActivities[dayIndex][activityIndex][field] = value;
    setActivities(updatedActivities);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('img', img);
      formData.append('city', city);
       
      items.forEach((item, outerIndex) => {
        formData.append(`items[${outerIndex}][type]`, item.type);
      
        // Append other details like name, city, startTime, etc.
        formData.append(`items[${outerIndex}][name]`, item.name || '');
        formData.append(`items[${outerIndex}][city]`, item.city || '');
        formData.append(`items[${outerIndex}][startTime]`, item.startTime || '');
      
        // Check if item.data exists and is an object before using Object.entries
        if (item.data && typeof item.data === 'object') {
          // Use a different variable name for the inner loop index
          Object.entries(item.data).forEach(([key, value]) => {
            // Append only if value is not undefined or null
            if (value !== undefined && value !== null) {
              formData.append(`items[${outerIndex}][data][${key}]`, value);
            }
          });
        }
      });
      

      const response = await axios.post('http://127.0.0.1:3001/addPackage', formData);
console.log(response);

      const data = await response.json();
      setPackages([...packages, data]);
      setName('');
      setDescription('');
      setImg(null);
    } catch (error) {
      console.error('Error creating package:', error);
    }
  };
  const [selectedHotelIndex, setSelectedHotelIndex] = useState(null);
  const handleCitySelect = (selectedCity, index) => {
    setSelectedCityForHotels(selectedCity);
    fetchHotels(selectedCityForHotels);
    setSelectedHotelIndex(index);
    fetchActivities(selectedCityForHotels); // Clear the selected hotel index when changing the city
  };
   
  const fetchActivities = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3002/api/activities/${encodeURIComponent(selectedCityForHotels)}`);
      console.log(selectedCityForHotels);
      const data = await response.json();

      if (response.ok) {
        setActivities(data);
      } else {
        console.error('Failed to fetch activities:', data.message);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
      }, (error) => {
        console.error('Error getting location:', error);
      });
    } else {
      console.error('Geolocation not supported');
    }
  }, []);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        // img.onload = () => {
        //   if (img.width / img.height === 4 / 3) {
            setSelectedFile(file);
          // } else {
          //   alert('Please upload an image with a 4:3 aspect ratio.');
          // }
        // };
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit1 = (event) => {
    event.preventDefault();

    if (selectedFile) {
      // You can perform the upload logic here
      alert('Image uploaded successfully!');
    }
  };
  const fetchHotels = async (selectedCityForHotels) => {
    try {
       console.log(selectedCityForHotels);
        const response = await axios.get(`http://127.0.0.1:5000/api/hotels/${encodeURIComponent(selectedCityForHotels)}`);
        setHotels(response.data);
      console.log(hotels);
      }
     catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };
  

  useEffect(() => {

    fetchHotels();
  }, []);

  const filteredHotels = hotels.filter((hotel) =>
    hotel.city?.toLowerCase().includes(city.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div>
        <input
          type="text"
          placeholder='city'
          value={city}
          onChange={(e) => {
            setSelected(true);
            setCity(e.target.value);
            handleCitySelect(city);
          }}
        />
      
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setImg(e.target.files[0]); // This line remains as is
          handleFileChange(e); // Call the aspect ratio validation function
        }}
        name="img"
      /> 
     
        {/* <button onClick={}>Upload Image</button> */}
    
      <h2>Submitted Data</h2>
      <input type="number" name="" placeholder='No of Days of trip' onChange={(e) => setNumOfDays(e.target.value)} id="" />

<div>
       
enter the starting Location
       <div>
           <h2>Added Items:</h2>
           {items.map((item, index) => (
               <div key={index}>
                   {item.type === 'Transport' && (
                       <div className='transport'>
                           <div className='flex'>
                               <img src={getTransportImage(item.mode)} alt="Travel" className='image' />
                               <h4>{item.type} : {item.name}</h4>
                               Mode: {item.mode}
                               <p>
                                   From: {item.from} → To: {item.to}
                               </p>
                               <div>
                                   <button onClick={() => handleDelete(index)}>Delete</button>
                                   <button onClick={() => handleEdit(index)}>Edit</button>
                               </div>
                           </div>
                       </div>
                   )}
                   {item.type === 'City' && (
                       <div className='city'>
                           <div className='flex'>
                               <h2>{item.type} : {item.name}</h2>
                               <h5>[ {item.No} ]</h5>
                               <div>
                                   <button onClick={() => handleDelete(index)}>Delete</button>
                                   <button onClick={() => handleEdit(index)}>Edit</button>
                               </div>
                           </div>
                       </div>
                   )}
                 {['Hotel'].includes(item.type) && (
    <div className='Hotel'>
      <div className='flex'>
        <p>{item.type} : {item.name}</p>
        City: {item.city}
        <div>
          <button onClick={() => handleDelete(index)}>Delete</button>
          <button onClick={() => handleEdit(index)}>Edit</button>
          <button onClick={() => handleCitySelect(item.city, index)}>See hotels</button>
        </div>
      </div>
      {selectedHotelIndex === index && selected && (
        <div className='container '>
          {filteredHotels.map((hotel) => (
            <div key={hotel._id} className='margin'>
              <input
                type="radio"
                name="selectedHotel"
                id={hotel.id}
                value={hotel.id}
                onChange={() => handleHotelSelect(hotel.name)}
              />
              <label htmlFor={hotel.id}>
            
          
              <div class="card" style={{width:"18rem" }}>
  <img src="..." class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5>{hotel.name}</h5>
    <p class="card-text">{hotel.city}</p>
  </div>
</div>    </label>
            </div>
          ))}
        </div>
      )}
    </div>
  )}
                   {[ 'Place'].includes(item.type) && (
                       <div className='place'>
                           <div className='flex'>
                               <p>{item.type} : {item.name}</p>
                               <p>Start Time: {item.startTime}</p>
                               <p>Stop Time: {item.stopTime}</p>
                               City: {item.city}
                               <div>
                                   <button onClick={() => handleDelete(index)}>Delete</button>
                                   <button onClick={() => handleEdit(index)}>Edit</button>
                                   <button></button>
                                   {error ? (
        <p>{error}</p>
      ) : (
        activities.length > 0 ? (
          <ul>
            {activities.map((activity) => (
              <li key={activity._id}>
                {activity.name} - {activity.Rate}
              </li>
            ))}
          </ul>
        ) : (
          <p>No activities found for the specified city.</p>
        )
      )}
   
                               </div>
                           </div>
                       </div>
                   )}
                   <hr />
               </div>
           ))}
 </div>

       {selectedType === 'Transport' && (
           <div>
               <button onClick={handleAddTransport}>Add Transport</button>
               <select value={selectedMode} onChange={handleModeChange}>
                   <option value="Walk">Walk</option>
                   <option value="Auto">Auto</option>
                   <option value="Bike">Bike</option>
                   <option value="Bus">Bus</option>
                   <option value="Train">Train</option>
               </select>
           </div>
       )}

       {selectedType === 'City' && (
           <div style={{ backgroundColor: 'gray' }}>
               <button onClick={handleAddCity}>Add City</button>
               <input type="number" name="No of Days" id="" value={selectedDays} onChange={(event) => setselectedDays(event.target.value)} />
           </div>
       )}

       {selectedType === 'Hotel' && (
           <div>
               <button onClick={handleAddHotel}>Add Hotel</button>
           </div>
       )}

       {selectedType === 'Place' && (
           <div>
               <button onClick={handleAddPlace}>Add Place</button>
           </div>
       )}
 <div className="text-center"> 
 {/* Center the content */}

<button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
 <span className="navbar-toggler-icon"></span>
</button>
<button>Hello</button>



     <button  aria-current="page" onClick={() => handleItemClick('City')}>Cities</button>
  
  
     <button aria-current="page" onClick={() => handleItemClick('Transport')}>Transport</button>
 
     <button aria-current="page" onClick={() => handleItemClick('Hotel')}>Hotel</button>
  
     <button  aria-current="page" onClick={() => handleItemClick('Place')}>Places</button>
  
 



</div>

<div className="text-center mt-3"> {/* Center the button */}
<button className="btn btn-primary rounded-pill" onClick={handleSavePDF}>Save as PDF</button>
</div>



   </div>
      <button className='btn btn-Success' type="submit" onClick={handleSubmit}>
        Create Package
      </button>
    </div>
  );
};

export default Packages;
function getTransportImage(mode) {
  switch (mode) {
      case 'Walk':
          return WalkImage;
      case 'Auto':
          return AutoImage;
      case 'Bike':
          return BikeImage;
      case 'Bus':
          return BusImage;
      case 'Train':
          return TrainImage;
      default:
          return null;
  }
}

      {/* {Array.from({ length: numOfDays }, (_, dayIndex) => (
        <div className='back11' key={dayIndex}>
          Day {dayIndex + 1}
          <div>Activities at Day {dayIndex + 1}</div>
          {activities[dayIndex] && activities[dayIndex].map((activity, activityIndex) => (
            <div key={activityIndex}>
              Activity {activityIndex + 1}
              <input
                type="text"
                value={activity.name}
                onChange={(e) => handleActivityChange(dayIndex, activityIndex, 'name', e.target.value)}
                placeholder="Activity Name"
              />
              <input
                type="text"
                value={activity.time}
                onChange={(e) => handleActivityChange(dayIndex, activityIndex, 'time', e.target.value)}
                placeholder="Time"
              />
              <input
                type="text"
                value={activity.rate}
                onChange={(e) => handleActivityChange(dayIndex, activityIndex, 'rate', e.target.value)}
                placeholder="Rate"
              />
              <hr />
            </div>
          ))}

          <img src="" alt="Hello" />
          <p>Time: </p>
          <p>Rate:</p>
          <button onClick={() => handleAddActivity(dayIndex)}>Add Activity</button>
        </div>
      ))} */}
      
      {/* <button className='btn btn-Success' onClick={handleAddCity1}>Add City</button> */}

      {/* <h2>Added Cities</h2>
      {citiesData.length > 0 && (
        <div>
          <ul>
            {citiesData.map((cityData, index) => (
              <li key={index}>
                City: {cityData.name}, Hotel: {cityData.hotel}, Activities: {cityData.activities.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )} */}