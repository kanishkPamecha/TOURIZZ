import React from 'react';

const Tourpackage = (props) => {
  const { packageName, description, days, destinations, price, imageSrc } = props;

  return (
    <div className="tour-package">
      <div className="image-container">
        <img src={imageSrc} alt={packageName} />
      </div>
      <div className="package-details">
        <h2>{packageName}</h2>
        <p>{description}</p>
        <p>{days} Days</p>
        <p>Destinations: {destinations}</p>
        <p>Price: {price} USD</p>
      </div>
    </div>
  );
}

export default Tourpackage;
