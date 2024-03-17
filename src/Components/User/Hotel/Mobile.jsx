import React, { useState } from 'react';
import './Mobile.css';
import img from '../../../images/hotel_main.jpg'
function Mobile() {
  const [searched, setSearched] = useState(true);
const [City,setcity]= useState('');
const [isLiked, setIsLiked] = useState(false);
  const handleSearch = () => {
    setSearched(false);
  };
  
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div>
      <h3>Tourizz</h3>
      <hr />
      <div className='Location_Mobile'>
        Current Location: Mds, MP
        <div>Bell Icon</div>
     
      </div>
      <hr />
      <div className='nav_mobile'>
        <button className='button_mobile'>Hotel</button>
        <button>Flight</button>
        <button>Coffee</button>
        <button>Hotel</button>
        <button>Flight</button>
        <button>Coffee</button>
      </div>
      <div className="bottom-nav-container ">
      <button className="bhari">Home</button>
      <button className="bhari">Wallet</button>
      <button className="bhari">Login</button>
    </div>
      <div style={{margin:'35px',display:'flex'}} >

      <input  type="text" value={City} onChange={(e)=>setcity(e.target.value)}/>
      <button onClick={handleSearch}>  Search</button>
      <button>=_</button>
      </div>
      {searched ? (
        <div>
          <div>Nearby Your Location</div>
          <div>See all</div>
          <div className="card" style={{ width: '72%' }}>
       
            <img
              src={img}
              className="card-img-top"
              alt="Placeholder"
            />
            <div className="card-body flexx">
              <p className="card-text">
              Hotel Hayatt
              </p>
              <div>₹1977</div>
            </div>
          </div>
          <div>
            Popular Destination
            <div>
            <div class="card mb-3" 
            // style={{maxWidth: "540px;"}}
              >
  <div class="row g-0">
    <div class="col-md-4">
    <button onClick={toggleLike} className={`like-button ${isLiked ? 'liked' : ''}`}>
            {isLiked ? '❤' : '🤍'}
        </button>
      <img src="https://via.placeholder.com/200" class="img-fluid rounded-start" alt="..."/>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">    Hotel Hayatt</h5>
        <p className="card-text">
          
              </p>
        <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>
            </div>
            <div>See all</div>
          </div>
        </div>
      ) : (
        <div>
          <div className="card" style={{ width: '72%' }}>
          <button onClick={toggleLike} className={`like-button ${isLiked ? 'liked' : ''}`}>
            {isLiked ? '🖤' : '🤍'}
        </button>
            <img
               src={img}
              className="card-img-top"
              alt="Placeholder"
          />
            <div className="card-body flexx">
              <p className="card-text">
              Hotel Hayatt
              </p>
          
              <div>₹1977</div>
            </div>
          </div>
     
        </div>
      )}
    </div>
  );
}

export default Mobile;
