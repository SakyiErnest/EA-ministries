import React from 'react'
import Contacts from '../Components/Contacts/Contacts'
import './Contact.css'

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Reach out to us with any questions, prayer requests, or to learn more about our ministry.</p>
        </div>
      </div>

      <div className="contact-container">
        <Contacts />
      </div>
    </div>
  )
}

export default Contact