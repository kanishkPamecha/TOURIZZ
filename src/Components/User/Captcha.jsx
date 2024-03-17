 import React, { useState } from 'react';

const SITE_KEY = '22b44dd4-8c4f-45c9-b175-b0cf1245acad'; // Replace with your hCaptcha site key

function Captcha() {
  const [captchaResponse, setCaptchaResponse] = useState('');

  const handleCaptchaChange = (response) => {
    setCaptchaResponse(response);
  };

  const handleSubmit = async () => {
    // Submit the captchaResponse along with other form data to the backend
    const response = await fetch('http://127.0.0.1:3001/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ captchaResponse }),
    });

    const data = await response.json();

    // Handle the response from the backend
    if (data.success) {
      console.log('Verification successful');
      // Proceed with your desired action
    } else {
      console.log('Verification failed');
      // Handle the failure case
    }
  };

  return (
    <div>
      enter the Id
      <input type="number" name="Id" id="Id" />
      enter the password
      <input type="password" name="password" />
      enter the captcha
      <div
        className="h-captcha"
        data-sitekey={SITE_KEY}
        data-callback={handleCaptchaChange}
      ></div>
      <button onClick={handleSubmit}>Submit</button>

      Do not have an account? Sign In
      <button>Sign In</button>
    </div>
  );
}

export default Captcha;
