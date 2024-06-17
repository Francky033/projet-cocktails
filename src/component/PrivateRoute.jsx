import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('jwt');

  if (!token) {
    return <Navigate to="/connexion" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    if (requiredRole && decodedToken.role !== requiredRole) {
      return <Navigate to="/" />;
    }
  } catch (error) {
    console.error("Erreur lors du décodage du token :", error);
    return <Navigate to="/connexion" />;
  }

  return children;
};

export default PrivateRoute;
