import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const PrivateRoute: React.FC = () => {
  const auth = useAuth();

  if (auth.loading) {
    return <div>Loading...</div>
  }

  return auth.userData?.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
