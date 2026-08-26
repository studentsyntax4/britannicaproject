import React, { createContext, useContext, useState } from 'react';
import { adminLogin, getToken, setToken, clearToken } from '../lib/adminApi';

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [token, setTok] = useState(() => getToken());

  const login = async (username, password) => {
    const data = await adminLogin(username, password);
    setToken(data.token);
    setTok(data.token);
    return data;
  };

  const logout = () => {
    clearToken();
    setTok(null);
  };

  return (
    <AdminContext.Provider value={{ token, isAuthed: !!token, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
};
