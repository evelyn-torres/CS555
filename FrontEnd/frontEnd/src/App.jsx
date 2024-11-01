import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  console.log("App component rendered");

  return (
    <Router>
      <Navigation />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Login route */}
          <Route path="/" element={<Login />} />
          
          {/* Home route - requires authentication */}
          <Route
            path="/home"
            element={
              isAuthenticated ? <Home /> : <Navigate to="/" replace />
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
  );
}

export default App;
export default App;
