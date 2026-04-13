import React, { createContext, useEffect, useMemo, useState } from 'react';
import { getCurrentUser, setAuthToken } from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken') || '');
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      if (!token) {
        setAuthToken('');
        setIsReady(true);
        return;
      }

      try {
        setAuthToken(token);
        const response = await getCurrentUser();
        setUser(response.data.data.user);
      } catch (_error) {
        localStorage.removeItem('authToken');
        setAuthToken('');
        setToken('');
        setUser(null);
      } finally {
        setIsReady(true);
      }
    };

    initializeAuth();
  }, [token]);

  const login = async (authToken, nextUser) => {
    localStorage.setItem('authToken', authToken);
    setAuthToken(authToken);
    setToken(authToken);
    setUser(nextUser || null);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken('');
    setToken('');
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    token,
    isReady,
    login,
    logout,
    setUser
  }), [user, token, isReady]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
