import { useState } from 'react'
import './styles/App.css'
import Login from './pages/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

function App() {


  return (
    <Router>
      <div>
        <li><Link to="/">Login</Link></li>
      </div>
    </Router>
        
  )
}

export default App
