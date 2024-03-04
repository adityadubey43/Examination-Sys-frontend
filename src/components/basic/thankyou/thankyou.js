import React from 'react';
const ThankYouPage = () => {
  return (
    <div className="container">
      <h1>Thank You!</h1>
      <p>Your examination has been submitted successfully.</p>
      <div className="animation-container">
        <div className="circle">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M9.6 20.3c-0.3 0-0.7-0.1-0.9-0.3l-5.5-5.4c-0.5-0.5-0.5-1.3 0-1.8s1.3-0.5 1.8 0l4.6 4.6 9.7-9.7c0.5-0.5 1.3-0.5 1.8 0s0.5 1.3 0 1.8l-10.6 10.6c-0.2 0.2-0.5 0.3-0.8 0.3z"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
