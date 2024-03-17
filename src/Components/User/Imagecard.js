import React from 'react';

const ImageCard = ({ imageSrc, name, description }) => {
  return (
    <div className="image-card">
      <div className="image-container">
        <img src={imageSrc} alt={name} />
      </div>
      <div className="content-container">
        <div className="name">{name}</div>
        <div className="description">{description}</div>
      </div>
    </div>
  );
};

export default ImageCard;