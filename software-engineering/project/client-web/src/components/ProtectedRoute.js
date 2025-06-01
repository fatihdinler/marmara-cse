// /src/components/ProtectedRoute.js

import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getProfile } from '../services/api';

const ProtectedRoute = ({ children }) => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        setCheckingAuth(false);
        return;
      }

      try {
        // Try to fetch the profile. If it succeeds, token is valid.
        await getProfile();
        setIsAuthenticated(true);
      } catch (err) {
        // Token expired or invalid—clear it
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      } finally {
        setCheckingAuth(false);
      }
    };

    verifyToken();
  }, []);

  if (checkingAuth) {
    // You can render a spinner or null while verifying
    return <div>Loading...</div>;
  }

  return isAuthenticated
    ? children
    : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
