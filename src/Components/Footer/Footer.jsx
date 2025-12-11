import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../../assets/EAM Logo T-03.jpg';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaArrowRight,
  FaHeart
} from 'react-icons/fa';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');

      // Reset the subscribed message after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <div className="footer-logo-container">
            <img src={logo} alt="Emmanuel Asare Ministries" className="footer-logo" />
          </div>
          <p className="footer-description">
            Transforming lives through faith, hope, and love. Join us in our mission to spread the Gospel and make a positive impact in our community.
          </p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

        <div className="footer-section quick-links">
          <h3 className="footer-heading">Quick Links</h3>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/events">Events</Link>
            <Link to="/sermons">Sermons</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/give">Give</Link>
          </div>
        </div>

        <div className="footer-section newsletter">
          <h3 className="footer-heading">Newsletter</h3>
          <p>Subscribe to our newsletter for updates on sermons, events, and ministry news.</p>

          {subscribed ? (
            <div className="subscribe-success">
              Thank you for subscribing!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="subscribe-form">
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="subscribe-btn">
                  <FaArrowRight />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="copyright">
            &copy; {currentYear} Emmanuel Asare Ministries. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
          <p className="made-with-love">
            Made with <FaHeart className="heart-icon" /> in Ghana
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;