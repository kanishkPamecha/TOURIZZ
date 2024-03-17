
import React, { useState } from 'react';
import './Slider.css'; // Import your CSS file
import image from '../../images/ImageMain2.jpg';
import image1 from '../../images/ImageMain.jpg';
import image2 from '../../images/ImageMain3.jpg';

export default function Slider() {
  const images = [image, image1, image2];
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  }

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }

  return (
    <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {images.map((src, index) => (
          <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
            <img src={src} className="d-block w-100" alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" onClick={prevSlide}>
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" onClick={nextSlide}>
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
