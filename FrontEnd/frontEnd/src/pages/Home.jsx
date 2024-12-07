// src/pages/Home.jsx

import React from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="header">
        <h1>Vitalink Voice Assist</h1>
        <h2>Select a topic for personalized assistance.</h2>
      </div>

      {/* Circular button for general questions */}
      <button className="big-button question-button">
        <Link to="/chatbot" style={{ textDecoration: 'none', color: 'inherit' }}>
        General Questions
        </Link>
      </button>

      {/* New vertically stacked rectangular buttons on the right */}
      <div className="episode-buttons">
        <h2>Explore a Specific Topic</h2>
        <button className="rect-button">
        <Link to='/chatGPT' style={{ textDecoration: 'none', color: 'inherit' }}>
        Hypertension
        </Link>
        </button>
        <button className="rect-button">
        <Link to='/chatGPT' style={{ textDecoration: 'none', color: 'inherit' }}>
        Diabetes
        </Link>
        </button>
        <button className="rect-button">
        <Link to='/chatGPT' style={{ textDecoration: 'none', color: 'inherit' }}>
        Diet Management
        </Link>
        </button>
        <button className="rect-button">
        <Link to='/chatGPT' style={{ textDecoration: 'none', color: 'inherit' }}>
        Sports & Exercise
        </Link>
        </button>
        <button className="rect-button">
        <Link to='/chatGPT' style={{ textDecoration: 'none', color: 'inherit' }}>
        Medication Guidance
        </Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
