import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const PrivateRoute: React.FC = () => {
  const userData = useSelector((state: RootState) => state.auth.userData)
  console.log(userData)

  if (!userData) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
