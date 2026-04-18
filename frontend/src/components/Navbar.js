import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = ({ isDarkMode, toggleTheme, onLogout, currentPage, setCurrentPage, currentUser }) => {
  return (
    <nav className={`navbar ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="navbar-left">
        <div className="navbar-title">📋 Task Manager</div>
        <ul className="nav-links">
          <li>
            <button 
              onClick={() => setCurrentPage('dashboard')}
              style={{ fontWeight: currentPage === 'dashboard' ? 'bold' : 'normal' }}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button 
              onClick={() => setCurrentPage('users')}
              style={{ fontWeight: currentPage === 'users' ? 'bold' : 'normal' }}
            >
              Users
            </button>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
        <div className="user-info">
          <span>{currentUser?.name}</span>
        </div>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
