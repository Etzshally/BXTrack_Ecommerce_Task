import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      if (token === "dummy-admin-token") {
        setUser({ token, username: 'admin', role: 'admin' });
      } else {
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));

        const id = decodedPayload.id
        const username = decodedPayload.username;
        const role = decodedPayload.role;
        setUser({ token, username, role, id });
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const response = await axiosInstance.post('/api/users/login', { username, password });
    const token = response.data.token;
    setUser({ token, username });
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};