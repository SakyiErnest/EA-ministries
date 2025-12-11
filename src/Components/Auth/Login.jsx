import React, { useState } from 'react';
import { useFirebase } from '../../firebase/FirebaseContext';
import './Auth.css';
import { FaGoogle } from 'react-icons/fa';
import { ensureAdminExists } from '../../firebase/adminHelper';
import { doc, getDoc } from 'firebase/firestore';

const Login = ({ onClose, onRegisterClick }) => {
  const { login, signInWithGoogle, currentUser, verifyAdminCode, db } = useFirebase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAdminVerification, setShowAdminVerification] = useState(false);

  const checkAdminRecord = async (uid) => {
    try {
      const adminRef = doc(db, 'admins', uid);
      const adminDoc = await getDoc(adminRef);
      return adminDoc.exists();
    } catch (lookupError) {
      console.error('Admin lookup error:', lookupError);
      return false;
    }
  };

  const handleAuthSuccess = async (user) => {
    if (!user) {
      setError('Unable to determine user information after login.');
      setLoading(false);
      return;
    }

    const hasAdminAccess = await checkAdminRecord(user.uid);

    if (hasAdminAccess) {
      setShowAdminVerification(false);
      if (onClose) onClose();
    } else {
      setShowAdminVerification(true);
    }

    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setError('');
      setLoading(true);
      const result = await login(email, password);
      await handleAuthSuccess(result?.user);
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to log in. Please check your credentials.');
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      const credential = await signInWithGoogle();
      await handleAuthSuccess(credential?.user);
    } catch (err) {
      console.error('Google sign-in error:', err);
      setError('Failed to sign in with Google. Please try again.');
      setLoading(false);
    }
  };

  const handleAdminVerification = async (e) => {
    e.preventDefault();

    if (!adminCode) {
      setError('Please enter the admin verification code');
      return;
    }

    try {
      setError('');
      setLoading(true);

      // Make sure currentUser exists before proceeding
      if (!currentUser || !currentUser.uid) {
        setError('User authentication error. Please try logging in again.');
        setLoading(false);
        return;
      }

      const isVerified = await verifyAdminCode(adminCode.trim(), currentUser.uid);

      if (isVerified) {
        if (onClose) onClose();
      } else {
        // If verification fails, try creating the admin record as a fallback
        const fallbackSuccess = await ensureAdminExists(db, currentUser.uid);

        if (fallbackSuccess) {
          if (onClose) onClose();
          return;
        }

        setError('Verification failed. Please check your admin code and try again. Contact your administrator if you need assistance.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Admin verification error:', err);
      setError('Failed to verify admin status. Please try again.');
      setLoading(false);
    }
  };

  if (showAdminVerification && currentUser) {
    return (
      <div className="auth-form-container">
        <h2>Admin Verification</h2>
        <p className="auth-description">
          Enter the admin verification code to get admin privileges.
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleAdminVerification} className="auth-form">
          <div className="form-group">
            <label htmlFor="adminCode">Admin Verification Code</label>
            <input
              type="text"
              id="adminCode"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              required
              placeholder="Enter admin code"
              autoComplete="off"
              className="admin-code-input"
            />
            <small className="form-hint">Enter the admin verification code provided by your administrator. Case sensitive, no extra spaces.</small>
          </div>

          <div className="auth-buttons">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </div>

          {/* Emergency access removed for security */}
        </form>
      </div>
    );
  }

  return (
    <div className="auth-form-container">
      <h2>Admin Login</h2>

      {error && <div className="auth-error">{error}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="auth-buttons">
          <button
            type="button"
            className="cancel-button"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>

      <div className="auth-divider">
        <span>OR</span>
      </div>

      <button
        className="google-sign-in-button"
        onClick={handleGoogleSignIn}
        disabled={loading}
      >
        <FaGoogle className="google-icon" />
        Sign in with Google
      </button>

      <div className="auth-switch">
        Don't have an account?{' '}
        <button
          className="auth-switch-button"
          onClick={onRegisterClick}
          disabled={loading}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
