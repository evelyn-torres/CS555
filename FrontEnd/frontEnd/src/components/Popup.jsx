// src/components/Popup.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Popup.css';

const Popup = ({ message }) => {
  const navigate = useNavigate();

  const closePopup = () => {
    navigate('/'); // Redirect back to home
  };

  return (
    <div className="popup-overlay" onClick={closePopup}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>{message}</h2>
        <button onClick={closePopup}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
