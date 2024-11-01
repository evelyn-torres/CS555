// src/components/RouteLogger.jsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RouteLogger = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(`Route accessed: ${location.pathname}`);
  }, [location]);

  return null; // This component does not render anything in the UI
};

export default RouteLogger;
