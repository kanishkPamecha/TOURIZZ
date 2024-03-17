// Group.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HotelG.css';

// import hoteldates from'./Hotel_date'

export default function Group({ hotel, image,date,outdate }) {
  const navigate = useNavigate();
  const handleonClick10 = () => {
   navigate(`/Hotel/${hotel._id}`, {
      state: {hotel,
        date,
        outdate,
      },
    } );
  };

  return (

    <div
      className=" flex"
      onClick={handleonClick10}
      style={{ display:"flex"}}
    >
      {/*  */}

      <div class="card" style={{ width: '24rem', minHeight: '30%', margin: '1%' }} >
                    <img src={`http://localhost:5000/uploads/${hotel.images[0]}`} class="card-img-top image_personal" alt="Hotel" />
                    <div class="card-body">
                      <h5 class="card-title">{hotel.name}</h5>
                      {hotel.location}
                      <p class="card-text"><b>Price: {hotel.price}</b></p>
                    </div>
                  </div>
      {/*  */}
      {/* <div className="image">

        <img src={`http://localhost:5000/uploads/${hotel.images[0]}`} alt="Hotel"  class="card-img-top cont"  />
      </div>
      <div class="card " style={{ width: '18rem' }}>
        <div class="card-body ">
          <div className="text">
{hotel.images[0]}
            <div>Price: {hotel.price}</div>
          </div>
          <h5 className="card-title">{hotel.name}</h5>
          <span></span>
          <p class="card-text">Location: {hotel.location}</p>
          <button type="submit" class="btn btn-primary stretched-link">Check Availability</button>

        </div>
      </div> */}
    </div>


  );
}
