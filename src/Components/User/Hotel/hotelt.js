import React, { useState } from 'react';
import './Data.css';
// import Hotel from './Hotel'

export default function Hotel({ hotel }) {
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [flexRadioDefault, setFlexRadioDefault] = useState('flexRadioDefault2');
  const [showImage, setShowImage] = useState(false);
  let price = 2200;

  if (flexRadioDefault === 'flexRadioDefault1') {
    price = numberOfRooms * 2500;
  } else {
    price = numberOfRooms * 2200;
  }

  const handleClick = () => {
    setShowImage(true);
  };

  const renderNoOfPeopleInputs = () => {
    const inputs = [];

    for (let n = 1; n <= numberOfRooms; n++) {
      inputs.push(
        <div className='inline_dis' key={n}>
          <p className='block'>In room {n}</p>{' '}
          <input type="number" className="form-range " min="1" max="5" />
        </div>
      );
    }
    return inputs;
  };

  return (
    <div className='dis_txt'>
      <img src={hotel.image} className="rounded float-start size" alt="Hotel" />
      <div>
        <div className='text'>
          <div>
            <h1>{hotel.name}</h1>
          </div>
          <div>
            <h5>
              <p>Number of rooms</p>
              <input
                type="number"
                id='nor'
                className="form-range"
                min="1"
                max="5"
                value={numberOfRooms}
                onChange={(e) => setNumberOfRooms(Number(e.target.value))}
              />
              @ {hotel.nonAcPrice}/per night for Non AC Rooms
              <br />
              @ {hotel.acPrice} /per night for AC Rooms
              <hr />
              {renderNoOfPeopleInputs()}
            </h5>
            <p>
              <b>Price = {price}</b>
            </p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                checked={flexRadioDefault === 'flexRadioDefault1'}
                onChange={() => setFlexRadioDefault('flexRadioDefault1')}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Ac Rooms
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                checked={flexRadioDefault === 'flexRadioDefault2'}
                onChange={() => setFlexRadioDefault('flexRadioDefault2')}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Non Ac Rooms
              </label>
            </div>
            <button type="button" onClick={handleClick} className="btn btn-outline-success">
              Book Now
            </button>
            {showImage && (
              <div>
                <h3>Pay Here Rs. {price}</h3>
                <img src={hotel.paymentImage} alt="Payment" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
