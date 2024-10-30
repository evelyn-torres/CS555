import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));

function App() {
  console.log("App component rendered");
  return (
    <Router>
      <Navigation />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App
