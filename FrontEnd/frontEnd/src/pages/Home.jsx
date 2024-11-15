// src/pages/Home.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
//import ChatBotUI from "../pages/ChatBotUI"; // Import ChatBotUI component

const Home = () => {
  const navigate = useNavigate();  // Initialize navigate
  const handleOpenChatBot = () => {
    navigate("/chatbot");  // Redirect to ChatBotUI
  };

  return (
    <div className="home-container">
     
      <div className="header">
        <h1>Vitalink Voice Assist</h1>
        <h2>Select a topic for personalized assistance.</h2>
      </div>

      {/* Circular button for general questions */}
      <button className="big-button question-button" onClick={handleOpenChatBot}>
        General Questions

      </button>

      {/* New vertically stacked rectangular buttons on the right */}
      <div className="episode-buttons">
        <h2>Explore a Specific Topic</h2>
        <button className="rect-button">Hypertension</button>
        <button className="rect-button">Diabetes</button>
        <button className="rect-button">Diet Management</button>
        <button className="rect-button">Sports & Exercise</button>
        <button className="rect-button">Medication Guidance</button>
      </div>
    </div>
    
  );
};

export default Home;
