import React, { useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthPage = ({ onLogin, isDarkMode, toggleTheme }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let user;
      
      if (isLogin) {
        // Login
        const result = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        user = result.user;
      } else {
        // Register
        const result = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        user = result.user;
      }

      onLogin({
        id: user.uid,
        email: user.email,
        name: formData.name || user.email.split('@')[0]
      }, user.accessToken);
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`auth-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="auth-card">
        <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            style={{ fontSize: '1.5rem' }}
            title="Toggle theme"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
        <h1 className="auth-title">{isLogin ? 'Login' : 'Register'}</h1>
        
        {error && <div className="error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>
        
        <div className="toggle-auth">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => {
            setIsLogin(!isLogin);
            setError('');
            setFormData({ name: '', email: '', password: '' });
          }}>
            {isLogin ? 'Register' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
