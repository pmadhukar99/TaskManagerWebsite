import React, { useState, useEffect } from 'react';
import './App.css';
import TaskDashboard from './components/TaskDashboard';
import Navbar from './components/Navbar';
import UserManagement from './components/UserManagement';
import AuthPage from './components/AuthPage';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const handleLogin = (user, token) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (!isLoggedIn) {
    return <AuthPage onLogin={handleLogin} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
  }

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <Navbar 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        onLogout={handleLogout}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        currentUser={currentUser}
      />
      {currentPage === 'dashboard' && <TaskDashboard isDarkMode={isDarkMode} currentUser={currentUser} />}
      {currentPage === 'users' && <UserManagement isDarkMode={isDarkMode} />}
    </div>
  );
}

export default App;
