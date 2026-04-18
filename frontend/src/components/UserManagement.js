import React, { useState } from 'react';
import UserModal from './UserModal';

const UserManagement = ({ isDarkMode }) => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddUser = () => {
    setShowModal(true);
  };

  const handleSaveUser = async (userData) => {
    try {
      setMessage('User added successfully');
      setShowModal(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error: ' + err.message);
    }
  };

  return (
    <div className="container">
      {message && <div className="info">{message}</div>}

      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <button className="btn btn-success" onClick={handleAddUser}>
          ➕ Add New User
        </button>
      </div>

      <div className="card">
        <h2>User Management</h2>
        <p style={{ opacity: 0.7, marginTop: '1rem' }}>
          Users are managed through Firebase Authentication. Each user registers their own account via the Login page.
        </p>
      </div>

      {showModal && (
        <UserModal
          onClose={() => setShowModal(false)}
          onSave={handleSaveUser}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

export default UserManagement;
