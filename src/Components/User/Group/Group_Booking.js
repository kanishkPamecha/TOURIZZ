

import React, { useState, useEffect } from 'react';
import PDFGenerator from './PDFGenerator';
import { Document, Page, pdf } from '@react-pdf/renderer';
import './Group.css';
import TransportInfoModal from './TransportInfoModal';
import WalkImage from '../../../images/Bhutan.jpg';
import AutoImage from '../../../images//Bhutan.jpg';
import BikeImage from '../../../images/Bhutan.jpg';
import BusImage from '../../../images//Bhutan.jpg';
import TrainImage from '../../../images//Bhutan.jpg';
import no from '../../../images/No data-cuate.svg';
import del from '../../../images/delete.png';
import edit  from '../../../images/edit.png';
import Hotel from '../../../images/train-svgrepo-com.svg';
import CityInfoModal from './CityInfoModel';
import HotelInfoModal from './HotelInfoModel';
import PlaceInfoModal from './PlaceInfoModel';
import eyeOpen from '../../../images/eyeopen.png'
import eyeclose from '../../../images/eyeclose.png'

export default function Group_Booking() {
    const [items, setItems] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [selectedMode, setSelectedMode] = useState('Walk');
    const [selectedDays, setselectedDays] = useState(2);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentDay, setCurrentDay] = useState(1);
    const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false);
const [isHotelModalOpen, setIsHotelModalOpen] = useState(false);

    const [isCityModalOpen, setIsCityModalOpen] = useState(false);



    const handleItemClick = (type) => {
        setSelectedType(type);
    };

    const handleModeChange = (event) => {
        setSelectedMode(event.target.value);
    };





const [newItem, setNewItem] = useState([]);
const [isTransportModalOpen, setIsTransportModalOpen] = useState(false);

const handleCityInfoSubmit = (formData) => {

  const newItemData = {
    type:'City',
    name: formData.name,
    No: formData.No,

  };
console.log(newItemData);
  setNewItem(newItemData);
console.log(newItem);

  setItems((prevItems) => {
            const updatedItems = { ...prevItems };
            const currentDayKey = currentDay.toString();
            updatedItems[currentDayKey] = [...(updatedItems[currentDayKey] || []), newItem];
            console.log(updatedItems)
            return updatedItems;
        });

  // Close the city modal
  setIsCityModalOpen(false);
};


    const handleAddTransport = () => {
        const lastAddedCity = getLastAddedCity();
        if (lastAddedCity) {

            setIsTransportModalOpen(true);
        };
      };
      const handleTransportSubmit = (formData) => {

          const newItemData = {
            type:'Transport',
            name: formData.name,
          to:formData.to,
            from:formData.from,
            mode:formData.mode,

          };
        console.log('Transport Information Submitted:', formData);
        setNewItem(newItemData);
        // Add the new item to the items state
        setItems((prevItems) => {
            const updatedItems = { ...prevItems }; 
            const currentDayKey = currentDay.toString();
            updatedItems[currentDayKey] = [...(updatedItems[currentDayKey] || []), newItem];
            console.log(updatedItems)
            return updatedItems;
        });


        setSelectedType('');

        setIsTransportModalOpen(false);
      };

    const getLastAddedCity = () => {
        const currentDayKey = currentDay.toString();
        const citiesOnCurrentDay = items[currentDayKey] || [];


        const lastCity = citiesOnCurrentDay.slice().reverse().find(item => item.type === 'City');

        return lastCity || null;
    };
    const hide = () => {

        console.log('Hiding...');
      };

const [dayDetailsVisibility, setDayDetailsVisibility] = useState({});

const handleToggleDetails = (dayKey) => {
  setDayDetailsVisibility((prevVisibility) => ({
    ...prevVisibility,
    [dayKey]: !prevVisibility[dayKey],
  }));
};
const handleHotelSubmit = (formData) => {
    // Handle the form data submitted from the HotelInfoModal
    console.log('Hotel Information Submitted:', formData);
    const newItemData = {
        type:'Hotel',
        name: formData.name,
      to:formData.checkInTime,
      from:formData.checkOutTime,


      };
    console.log('Transport Information Submitted:', formData);
    
    setNewItem(newItemData);
    setItems((prevItems) => {
      const updatedItems = { ...prevItems };
      const currentDayKey = currentDay.toString();
      updatedItems[currentDayKey] = [...(updatedItems[currentDayKey] || []), newItem];
      return updatedItems;
    });


    setSelectedType('');

    // Close the HotelInfoModal
    setIsHotelModalOpen(false);
  };



    const handleAddPlace = () => {
        const lastAddedCity = getLastAddedCity();

        if (lastAddedCity) {
          // Open the PlaceInfoModal or use any other method to get user input
          setIsPlaceModalOpen(true);
        } else {
          alert('Select the city first else we cannot connect to making the plan');
        }
      };

      const handlePlaceSubmit = (formData) => {
        const newItemData = {
            type:'Place',
            name: formData.name,
            startTime:formData.startTime,
            stopTime:formData.stopTime,


          };
        console.log('Transport Information Submitted:', formData);
        
        setNewItem(newItemData);
        setItems((prevItems) => {
          const updatedItems = { ...prevItems };
          const currentDayKey = currentDay.toString();
          updatedItems[currentDayKey] = [...(updatedItems[currentDayKey] || []), newItem];
          return updatedItems;
        });
        setIsPlaceModalOpen(false);
        setSelectedType('');
      };

      const handleDelete = (dayKey, index) => {
        setItems((prevItems) => {
            const updatedItems = { ...prevItems };
            const dayItems = updatedItems[dayKey];
    
            if (dayItems && index >= 0 && index < dayItems.length) {
                // Remove the item at the specified index
                dayItems.splice(index, 1);
    
                // If the day is empty after deletion, remove the day itself
                if (dayItems.length === 0) {
                    delete updatedItems[dayKey];
                }
            }
    
            return updatedItems;
        });
    };
    const handleEdit = (dayKey, index) => {
      const dayItems = items[dayKey];
  
      if (!dayItems || index < 0 || index >= dayItems.length) {
          console.error('Invalid dayKey or index for edit:', dayKey, index);
          return;
      }
  
      const itemToEdit = dayItems[index];
  
      if (!itemToEdit || !itemToEdit.type) {
          console.error('Invalid itemToEdit for edit:', itemToEdit);
          return;
      }
  
      let updatedItem;
  
      switch (itemToEdit.type) {
          case 'City':
              updatedItem = {
                  ...itemToEdit,
                  name: prompt('Enter the new name of the city:', itemToEdit.name),
                  No: parseInt(prompt('Enter the new number of days:', itemToEdit.No))
              };
              break;
          case 'Transport':
              updatedItem = {
                  ...itemToEdit,
                  name: prompt('Enter the new name of the transport:', itemToEdit.name),
                  from: prompt('Enter the new from location:', itemToEdit.from),
                  to: prompt('Enter the new to location:', itemToEdit.to)
              };
              break;
          case 'Hotel':
          case 'Place':
              updatedItem = {
                  ...itemToEdit,
                  name: prompt(`Enter the new name of the ${itemToEdit.type.toLowerCase()}:`, itemToEdit.name)
              };
              break;
          default:
              console.error('Invalid item type for edit:', itemToEdit.type);
              return;
      }
  
      if (updatedItem) {
          const updatedItems = { ...items };
          updatedItems[dayKey][index] = updatedItem;
          setItems(updatedItems);
      } else {
          console.error('Failed to update item:', itemToEdit);
      }
  };
  
    
  
  
  
    // const handleEdit = (dayKey, index) => {
    //     const itemToEdit = items[dayKey][index];
    
    //     if (itemToEdit.type === 'Transport') {
    //         const updatedItem = {
    //             ...itemToEdit,
    //             name: prompt('Enter the new name of the transport:', itemToEdit.name),
    //             from: prompt('Enter the new from location:', itemToEdit.from),
    //             to: prompt('Enter the new to location:', itemToEdit.to)
    //         };
    //         const updatedItems = { ...items };
    //         updatedItems[dayKey][index] = updatedItem;
    //         setItems(updatedItems);
    //     } else if (itemToEdit.type === 'City') {
    //         const updatedItem = {
    //             ...itemToEdit,
    //             name: prompt('Enter the new name of the city:', itemToEdit.name),
    //             No: parseInt(prompt('Enter the new number of days:', itemToEdit.No))
    //         };
    //         const updatedItems = { ...items };
    //         updatedItems[dayKey][index] = updatedItem;
    //         setItems(updatedItems);
    //     } else if (['Hotel', 'Place'].includes(itemToEdit.type)) {
    //         const updatedItem = {
    //             ...itemToEdit,
    //             name: prompt(`Enter the new name of the ${itemToEdit.type.toLowerCase()}:`, itemToEdit.name)
    //         };
    //         const updatedItems = { ...items };
    //         updatedItems[dayKey][index] = updatedItem;
    //         setItems(updatedItems);
    //     }
    // };
    

const handleSavePDF = async () => {
    const pdfBlob = await pdf(<PDFGenerator items={items} />).toBlob();
    const blobUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'group_booking.pdf';
    link.click();
};


    // useEffect(() => {
    //     const storedItems = localStorage.getItem(`groupBookingItems_${email}`);
    //     if (storedItems) {
    //         setItems(JSON.parse(storedItems));
    //     }
    //     setLoading(false);
    // }, [email]);

    useEffect(() => {
        if (!loading) {
            localStorage.setItem(`groupBookingItems_${email}`, JSON.stringify(items));
        }
    }, [email, items]);

    const handleAddDay = () => {
        const newDayKey = Object.keys(items).length + 1;
        setItems((prevItems) => {
            const updatedItems = { ...prevItems };
            updatedItems[newDayKey] = [];
            return updatedItems;
        });
        setCurrentDay(newDayKey);
    };
    const getIconForItemType = (type) => {
        switch (type) {
            case 'Transport':
                return <img src={getTransportImage(selectedMode)} style={{maxWidth:"100px"}}alt="" srcset="" />
            case 'City':
                return <img src={Hotel} style={{maxWidth:"100px"}}alt="" srcset="" /> // Replace with your City icon
            case 'Hotel':
                return <img src={Hotel} style={{maxWidth:"100px"}}alt="" srcset="" />; // Replace with your Hotel icon
            case 'Place':
                return <img src={Hotel}style={{maxWidth:"100px"}} alt="" srcset="" />; // Replace with your Place icon
            default:
                return null;
        }
    };
    const handleAddCity = () => {
       
        setIsCityModalOpen(true);
      };
    const handleNextDay = () => {
        setCurrentDay(prevDay => prevDay + 1);
    };

    const handlePrevDay = () => {
        if (currentDay > 1) {
            setCurrentDay(prevDay => prevDay - 1);
        }
    };
    const [forceRender, setForceRender] = useState(false);

   

    useEffect(() => {
     
      setForceRender(false);
    }, [forceRender]);

    return (
        <div >


            <div style={{ display: 'flex'  }}>
   
<div  >

<div style={{  marginRight: '0px',width: '100vw' }}>
                <h2>Add Items:</h2>
  <CityInfoModal
    isOpen={isCityModalOpen}
    closeModal={() => setIsCityModalOpen(false)}
    onSubmit={handleCityInfoSubmit}

   labels={[

  { name: 'name', label: 'City Name', type: 'text' },
  { name: 'No', label: 'Number of Days', type: 'number' },
]}

/>
<TransportInfoModal
  isOpen={isTransportModalOpen}
  closeModal={() => setIsTransportModalOpen(false)}
  onSubmit={handleTransportSubmit}
  title="Add Transport"
  modes={['Walk', 'Auto', 'Bike', 'Bus', 'Train']}
/>

<HotelInfoModal
        isOpen={isHotelModalOpen}
        closeModal={() => setIsHotelModalOpen(false)}
        onSubmit={handleHotelSubmit}
        title="Add Hotel Information"
      />
       <PlaceInfoModal
          isOpen={isPlaceModalOpen}
          closeModal={() => setIsPlaceModalOpen(false)}
          onSubmit={handlePlaceSubmit}
          title="Add Place Information"
        />


             {Object.keys(items).map(dayKey => (
   <div key={dayKey} style={{border:'2px solid black',margin:'5%'}}>
      <h2  style={{display:'flex',justifyContent:'space-between'}} >
        <div style={{display:'flex'}}>

        {`Day ${dayKey}`} 
        </div>
      <button onClick={() => handleToggleDetails(dayKey)} style={{backgroundColor:'White'}}>
              {dayDetailsVisibility[dayKey] ?  <img src={eyeclose} alt="" style={{maxWidth:'30px'}} /> :   <img src={eyeOpen} alt="" style={{maxWidth:'30px'}} />}
            </button>
            </h2>
          
      {dayDetailsVisibility[dayKey] && (
            <div>  {items[dayKey].map((item, index) => (
         <div key={index}>
            {item.type === 'City' && (
               <div className='city'style={{display:'flex',justifyContent:''}}>
                  <h3>{`${item.type} : ${item.name}`}</h3>
                  <h5>[ {item.No} ]</h5>
                  <button onClick={() => handleDelete(dayKey, index)}><img src={del} alt="Nothing found" style={{maxWidth:"25px"}} /></button>
                  <button onClick={() => handleEdit(dayKey, index)}><img src={edit} alt="Nothing found" style={{maxWidth:"25px"}} /></button>
              
               </div>
            )}
      {item.type === 'Transport' && (
         <div className='transport'>
            <div className='flex'>
               <img src={getTransportImage(item.mode)}  alt="Travel" className='image' />
               <h4>{item.type} : {item.name}</h4>
               Mode: {item.mode}
               <p>
                  From: {item.from} → To: {item.to}
               </p>
               <div>
                  <button onClick={() => handleDelete(dayKey, index)}><img src={del} alt="Nothing found" style={{maxWidth:"25px"}} /></button>
                  <button onClick={() => handleEdit(dayKey, index)}><img src={edit} alt="Nothing found" style={{maxWidth:"25px"}} /></button>
               </div>
            </div>
         </div>
      )}
      {/* {item.type === 'City' && (
         <div className='city'>
            <div className='flex'>
               <h2>{item.type} : {item.name}</h2>
               <h5>[ {item.No} ]</h5>
               <div>
                  <button onClick={() => handleDelete(dayKey, index)}><img src={del} alt="Nothing found" style={{maxWidth:"25px"}} /></button>
                  <button onClick={() => handleEdit(dayKey, index)}><img src={edit} alt="Nothing found" style={{maxWidth:"25px"}} /></button>
               </div>
            </div>
         </div>
      )} */}
                        {['Hotel'].includes(item.type) && (
                            <div className='Hotel'>
                                <div className='flex'>
                                    <p>{item.type} : {item.name}</p>
                                    City: {item.city}
                                    <div>
                                        <button onClick={() => handleDelete(index)}><img src={del} alt="Nothing found" style={{maxWidth:"25px"}} /></button>
                                        <button onClick={() => handleEdit(index)}><img src={edit} alt="Nothing found" style={{maxWidth:"25px"}} /></button>
                                    </div>
                                </div>
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

                                        <button onClick={() => handleDelete(index)}> <img src={del} alt="Nothing found" style={{maxWidth:"25px"}} /></button>
                                        <button onClick={() => handleEdit(index)}><img src={edit} alt="Nothing found" style={{maxWidth:"25px"}} /></button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                ))}</div>)}
            </div>    ))}



            {/* {selectedType === 'Transport' && (
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
                <div >
                    <button onClick={handleAddCity}>Add City</button>
                   
                </div>
            )}

            {selectedType === 'Hotel' && (
                <div>

                    <button onClick={() => setIsHotelModalOpen(true)}>Add Hotel</button>

                </div>  )}

            {selectedType === 'Place' && (
                <div>
                    <button onClick={handleAddPlace}>Add Place</button>
                </div>
            )} */}
      <div className="text-center"> 
      {/* Center the content */}

    <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <button>Hello</button>



    <button aria-current="page" onClick={() => {handleAddCity(); handleItemClick('City');}}>Cities</button>

<button aria-current="page" onClick={() => {setIsHotelModalOpen(true); handleItemClick('Transport');}}>Transport</button>

<button aria-current="page" onClick={() => {setIsHotelModalOpen(true); handleItemClick('Hotel');}}>Hotel</button>

<button aria-current="page" onClick={() => {handleAddPlace(); handleItemClick('Place');}}>Places</button>



  </div>


  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
  {Object.keys(items).map((dayKey) => (
    <div>
      {dayDetailsVisibility[dayKey] && (
          <div>
    <div key={dayKey} style={{ margin: '0 10px' }}>
      <h3>Day {dayKey}:</h3>
      {items[dayKey].map((item, index) => (
        <div key={index}>
          {getIconForItemType(item.type)}
          <p>{item.type}: {item.name}</p>
        </div>
      ))}
      </div>
      </div>
      )}
      </div>

  ))}
</div>

 <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button onClick={handlePrevDay} disabled={currentDay <= 1}>Previous Day</button>
                <span style={{ margin: '0 10px' }}>Day {currentDay}</span>
                <button onClick={handleNextDay}>Next Day</button>
                <button onClick={handleAddDay}>Add Day</button>
            </div>
<div className="text-center mt-3"> {/* Center the button */}
  <button className="btn btn-primary rounded-pill" onClick={handleSavePDF}>Save as PDF</button>
</div>

</div>
</div>

</div>
        </div>
    );
}
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

// import React, { useState } from 'react';

// function Group_Booking() {
//   const [inviteEmail, setInviteEmail] = useState('');
//   const [staysInfo, setStaysInfo] = useState('');
//   const [selectedDestination, setSelectedDestination] = useState('');

//   const handleInvite = () => {
//     // Implement the logic to send an invite with inviteEmail
//     console.log(`Invite sent to ${inviteEmail}`);
//   };

//   const handleStaysInfo = () => {
//     // Implement the logic to save stays information
//     console.log(`Stays information added: ${staysInfo}`);
//   };

//   const handleDestinationSelect = (event) => {
//     // Implement the logic to update selected destination
//     const destination = event.target.value;
//     setSelectedDestination(destination);
//     console.log(`Selected destination: ${destination}`);
//   };

//   return (
//     <div>
//       <div className='Invite'>
//         <h2>Invite Section</h2>
//         <label htmlFor='inviteEmail'>Friend's Email:</label>
//         <input
//           type='email'
//           id='inviteEmail'
//           value={inviteEmail}
//           onChange={(e) => setInviteEmail(e.target.value)}
//         />
//         <button onClick={handleInvite}>Send Invite</button>
//       </div>

//       <div className='Stays'>
//         <h2>Stays Section</h2>
//         <label htmlFor='staysInfo'>Stays Information:</label>
//         <textarea
//           id='staysInfo'
//           value={staysInfo}
//           onChange={(e) => setStaysInfo(e.target.value)}
//         />
//         <button onClick={handleStaysInfo}>Add Stays Information</button>
//       </div>

//       <div className='Destination'>
//         <h2>Destination Section</h2>
//         <label htmlFor='destinationSelect'>Select Destination:</label>
//         <select
//           id='destinationSelect'
//           value={selectedDestination}
//           onChange={handleDestinationSelect}
//         >
//           <option value=''>Select...</option>
//           <option value='beach'>Beach</option>
//           <option value='mountain'>Mountain</option>
//           {/* Add more options as needed */}
//         </select>
//         <p>Selected Destination: {selectedDestination}</p>
//       </div>
      
//       {/* ... Other sections ... */}

//       <div className='Notes'>
//         <h2>Notes Section</h2>
//         {/* ... */}
//       </div>
//     </div>
//   );
// }

// export default Group_Booking;

