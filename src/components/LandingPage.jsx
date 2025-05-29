import React, { useState, useRef } from 'react';
import './LandingPage.css';
import { FaCheck } from 'react-icons/fa';

const LandingPage = ({ onProceed }) => {
  const [checked, setChecked] = useState(false);
  const [fade, setFade] = useState(false);
  const containerRef = useRef(null);

  const handleCheckboxClick = () => {
    setChecked(true);
    setTimeout(() => setFade(true), 300); // Wait for check animation
    setTimeout(onProceed, 800); 
  };

  return (
    <div
      className={`landing-container${fade ? ' fade-out' : ''}`}
      ref={containerRef}
    >
      <div className="landing-content">
        <div className="title-row" onClick={handleCheckboxClick}>
          <div className={`checkbox${checked ? ' checked' : ''}`}>
            {checked && <FaCheck className="check-icon" />}
          </div>
          <h1>Listify</h1>
        </div>
      </div>
      <p className="instruction">Click the box to proceed</p>
    </div>
  );
};

export default LandingPage;