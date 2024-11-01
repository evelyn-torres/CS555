// import react from "@vitejs/plugin-react-swc";
// src/pages/Home.jsx

import React from "react";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div class="header">
        <h1>Vitalink Voice Assist</h1>
        <h2>Click a button if you need assistance.</h2>
      </div>
      <button class="question-button button big-button">
        Ask a Question
        {/* <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Login
        </NavLink> */}
      </button>
      <button class="request-button button big-button">
        Request a Healthy Activity
      </button>
    </div>
  );
};

export default Home;
