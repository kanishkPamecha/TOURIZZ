import React, { useEffect,useState } from 'react';
import image from '../../images/beach1.jpg';
import image1 from '../../images/bridge.jpg';
import image2 from '../../images/Ladakh.jpg';
import image3 from '../../images/Kerela.jpg'

export default function Slider1() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [query, setQuery] = useState('');

  // const nav = Navigate(); // Initialize Navigate

   const handleInputChange = (e) => {
    setQuery(e.target.value);
   };

  const handleSubmit = (e) => {
    e.preventDefault();
    // nav(<Planes/>);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

 
  return (
    <div>
      
      <div id="carouselExampleSlidesOnly z" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className={`carousel-item ${activeIndex === 0 ? 'active' : ''}`}>
            <img src={image} className="d-block w-100" alt="..." />
          </div>
          <div className={`carousel-item ${activeIndex === 1 ? 'active' : ''}`}>
            <img src={image1} className="d-block w-100" alt="..." />
          </div>
          <div className={`carousel-item ${activeIndex === 3 ? 'active' : ''}`}>
            <img src={image3} className="d-block w-100" alt="..." />
          </div>
          <div className={`carousel-item ${activeIndex === 2 ? 'active' : ''}`}>
            <img src={image2} className="d-block w-100" alt="..." />
          </div>
        </div>
      </div>
      <div className="search-container">
      <h2>WHERE To ??</h2>
      <form className='FormSearch' onSubmit={handleSubmit}>
        <input
          type="search"
          value={query} // Bind the value to the state
          onChange={handleInputChange}
          placeholder="Where To ??"
          className="search-input"
        />

        <button type="submit" className="search-btn">
          Search
        </button>
        <div>

        </div>
      </form>
        <input type="range" value="" />
    </div>
    </div>
  );
}