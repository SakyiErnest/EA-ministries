import React, { useState } from 'react';
import { useFirebase } from '../../firebase/FirebaseContext';
import AuthModal from './AuthModal';
import './Auth.css';
import { FaUserShield } from 'react-icons/fa';

const AuthNav = () => {
  const { currentUser, isAdmin, logout } = useFirebase();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="auth-nav">
      {currentUser ? (
        <>
          <div className="user-info">
            <span className="user-email">{currentUser.email}</span>
            {isAdmin && <span className="admin-badge">Admin</span>}
          </div>
          <button className="auth-button logout" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <button
          className="auth-button admin-login-button"
          onClick={() => setShowLoginModal(true)}
        >
          <FaUserShield className="admin-icon" />
          Admin Login
        </button>
      )}

      {showLoginModal && (
        <AuthModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};

export default AuthNav;
