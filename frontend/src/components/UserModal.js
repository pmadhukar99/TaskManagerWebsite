import React, { useState } from 'react';

const UserModal = ({ user, onClose, onSave, isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email) {
      setError('Name and email are required');
      return;
    }

    if (!user && !formData.password) {
      setError('Password is required for new users');
      return;
    }

    const submitData = user 
      ? { name: formData.name, email: formData.email }
      : formData;

    onSave(submitData);
  };

  return (
    <div className="modal show">
      <div className="modal-content">
        <span className="modal-close" onClick={onClose}>&times;</span>
        <h2>{user ? 'Edit User' : 'Create New User'}</h2>
        
        {error && <div className="error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter user name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter user email"
              required
            />
          </div>

          {!user && (
            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                required={!user}
              />
            </div>
          )}

          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              Save User
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
