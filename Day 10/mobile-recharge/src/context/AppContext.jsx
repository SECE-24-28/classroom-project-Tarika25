import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

const getInitialState = () => {
  const loggedIn = localStorage.getItem('loggedIn') === 'true';
  const userData = {
    name: localStorage.getItem('userName') || '',
    email: localStorage.getItem('userEmail') || '',
    type: localStorage.getItem('userType') || 'user'
  };
  
  return {
    user: loggedIn && userData.email ? userData : null,
    isLoggedIn: loggedIn && userData.email,
    theme: localStorage.getItem('theme') || 'light'
  };
};

export const AppProvider = ({ children }) => {
  const initialState = getInitialState();
  const [user, setUser] = useState(initialState.user);
  const [isLoggedIn, setIsLoggedIn] = useState(initialState.isLoggedIn);
  const [theme, setTheme] = useState(initialState.theme);
  const [loading, setLoading] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('userName', userData.name);
    localStorage.setItem('userEmail', userData.email);
    localStorage.setItem('userType', userData.type);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userType');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  const value = {
    user,
    isLoggedIn,
    theme,
    loading,
    login,
    logout,
    toggleTheme,
    showLoader,
    hideLoader
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};