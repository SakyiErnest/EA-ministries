import React, { useState } from 'react';
import { useFirebase } from '../../firebase/FirebaseContext';
import './Auth.css';

const Register = ({ onClose, onLoginClick }) => {
  const { register } = useFirebase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await register(email, password);
      setSuccess(true);
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        if (onLoginClick) onLoginClick();
      }, 2000);
    } catch (err) {
      console.error('Registration error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Email is already in use. Please use a different email or login.');
      } else {
        setError('Failed to create an account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Create Account</h2>
      
      {error && <div className="auth-error">{error}</div>}
      {success && <div className="auth-success">Account created successfully! Redirecting to login...</div>}
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading || success}
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
            disabled={loading || success}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading || success}
          />
        </div>
        
        <div className="auth-buttons">
          <button 
            type="button" 
            className="cancel-button"
            onClick={onClose}
            disabled={loading || success}
          >
            Cancel
          </button>
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading || success}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </div>
      </form>
      
      <div className="auth-switch">
        Already have an account?{' '}
        <button 
          className="auth-switch-button" 
          onClick={onLoginClick}
          disabled={loading || success}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Register;
