import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'
import Login from './pages/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ChatBotUI from './pages/chabotUI';


const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/chat">Go to Chatbot (Temporary Link)</Link>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<ChatBotUI />} />
      </Routes>
    </Router>
  );
}

export default App;
