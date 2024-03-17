import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../Json/animation_lm0ip7c5.json';


const ErrorPage = () => {
  const animationOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="error-page">
      <div className="error-content">
        <h1 className="error-heading">Oops! Something Went Wrong.</h1>
        <p className="error-text">
  आपके यात्रा के सपने अब दूर नहीं हैं।  <b>The Travel Agentees </b> आपके साथ हैं, सपनों को साकार करने के लिए।<br />
  आपका कनेक्शन में कभी दिक्कत आ सकती है, लेकिन आपकी यात्रा में नहीं आनी चाहिए, इसके लिए हम हैं।
</p>

        <div className="error-animation">
          <Lottie options={animationOptions} height={200} width={200} />
        </div>
        <div className="error-buttons">
        <h5>
           <Link to="/" className="error-button primary-button">Go Home</Link>
          </h5> 

          <Link to="/Careus" className="error-button secondary-button">Contact Us</Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
