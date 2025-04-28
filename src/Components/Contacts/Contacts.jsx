import React, { useState } from 'react'
import './Contacts.css'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    message: '',
    type: '' // 'success' or 'error'
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResult({ message: '', type: '' });

    try {
      const formDataToSend = new FormData(event.target);
      formDataToSend.append("access_key", "9b8ad355-12a1-4777-9221-e7c44b0df6f6");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        setResult({
          message: "Thank you! Your message has been sent successfully.",
          type: 'success'
        });

        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        console.error("Error", data);
        setResult({
          message: data.message || "Something went wrong. Please try again.",
          type: 'error'
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResult({
        message: "Network error. Please check your connection and try again.",
        type: 'error'
      });
    } finally {
      setLoading(false);

      // Clear success message after 5 seconds
      if (result.type === 'success') {
        setTimeout(() => {
          setResult({ message: '', type: '' });
        }, 5000);
      }
    }
  };

  return (
    <div className='contact-wrapper'>
      <div className='contact-card'>
        <div className='contact-info'>
          <h2>Contact Information</h2>
          <p className='contact-description'>
            Feel free to reach out to us using any of the contact methods below. We're here to help and would love to hear from you.
          </p>

          <div className='contact-details'>
            <div className='contact-item'>
              <div className='contact-icon'>
                <FaEnvelope />
              </div>
              <div className='contact-text'>
                <h3>Email</h3>
                <p>info@emmanuelasareministries.org</p>
              </div>
            </div>

            <div className='contact-item'>
              <div className='contact-icon'>
                <FaPhone />
              </div>
              <div className='contact-text'>
                <h3>Phone</h3>
                <p>+233 (0) 302 123 456</p>
                <p>+233 (0) 244 567 890</p>
              </div>
            </div>

            <div className='contact-item'>
              <div className='contact-icon'>
                <FaMapMarkerAlt />
              </div>
              <div className='contact-text'>
                <h3>Location</h3>
                <p>123 Church Street, Accra, Ghana</p>
              </div>
            </div>

            <div className='contact-item'>
              <div className='contact-icon'>
                <FaClock />
              </div>
              <div className='contact-text'>
                <h3>Office Hours</h3>
                <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
              </div>
            </div>
          </div>

          <div className='social-links'>
            <a href='#' className='social-link'><FaFacebook /></a>
            <a href='#' className='social-link'><FaTwitter /></a>
            <a href='#' className='social-link'><FaInstagram /></a>
            <a href='#' className='social-link'><FaYoutube /></a>
          </div>

          <div className='contact-pattern'></div>
        </div>

        <div className='contact-form-container'>
          <h2>Send Us a Message</h2>

          {result.message && (
            <div className={`form-result ${result.type}`}>
              {result.message}
            </div>
          )}

          <form onSubmit={onSubmit} className='contact-form'>
            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor='name'>Full Name</label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Your name'
                  required
                />
              </div>

              <div className='form-group'>
                <label htmlFor='phone'>Phone Number</label>
                <input
                  type='tel'
                  id='phone'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder='Your phone number'
                  required
                />
              </div>
            </div>

            <div className='form-group'>
              <label htmlFor='email'>Email Address</label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Your email address'
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='subject'>Subject</label>
              <input
                type='text'
                id='subject'
                name='subject'
                value={formData.subject}
                onChange={handleChange}
                placeholder='What is this regarding?'
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='message'>Message</label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                rows='5'
                placeholder='Your message'
                required
              ></textarea>
            </div>

            <button
              type='submit'
              className='submit-button'
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      <div className='map-container'>
        <h2>Find Us</h2>
        <div className='map'>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254936.0588945949!2d-0.2661017!3d5.5910836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1654321234567!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Emmanuel Asare Ministries Location"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default Contacts