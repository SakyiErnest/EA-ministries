import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import './Auth.css';

const AuthModal = ({ onClose }) => {
  const [showLogin, setShowLogin] = useState(true);

  // Close modal when clicking outside the form
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Switch between login and register forms
  const toggleForm = () => {
    setShowLogin(prev => !prev);
  };

  return (
    <div className="auth-modal-overlay" onClick={handleOverlayClick}>
      <div className="auth-modal">
        {showLogin ? (
          <Login
            onClose={onClose}
            onRegisterClick={toggleForm}
          />
        ) : (
          <Register
            onClose={onClose}
            onLoginClick={toggleForm}
          />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
