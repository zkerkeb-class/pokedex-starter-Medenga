// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Import nommé
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      try {
        const decoded = jwtDecode(authToken); // PAS .default ici
        if (decoded.exp * 1000 < Date.now()) {
          // Token expiré
          localStorage.removeItem('token');
          setAuthToken(null);
          navigate('/auth');
        }
      } catch (error) {
        console.error('Erreur de décodage du token', error);
        localStorage.removeItem('token');
        setAuthToken(null);
        navigate('/auth');
      }
    }
  }, [authToken, navigate]);

  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem('token', token);
    navigate('/');
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
