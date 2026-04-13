import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function RequireAuth({ children }) {
  const location = useLocation();
  const { token, isReady } = useContext(AuthContext);

  if (!isReady) {
    return null;
  }

  if (!token) {
    const redirectTo = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirectTo}`} replace />;
  }

  return children;
}

export default RequireAuth;
