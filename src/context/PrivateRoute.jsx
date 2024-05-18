// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useFirebase } from './firebase';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useFirebase();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
