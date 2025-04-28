import React from 'react'
import './Hero.css'
import { FaChevronDown } from 'react-icons/fa'

const Hero = () => {
  // Smooth scroll function for the scroll down button
  const scrollToPrograms = () => {
    const programsSection = document.querySelector('.programs-section');
    if (programsSection) {
      programsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='hero'>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-text">
          <h1>Welcome To Emmanuel Asare Ministries</h1>
          <p>Transforming Lives Through Faith, Hope, and Love</p>
          <div className="hero-buttons">
            <button className='btn primary-btn'>Our Mission</button>
            <button className='btn secondary-btn'>Join Us</button>
          </div>
        </div>

        <button className="scroll-down-btn" onClick={scrollToPrograms}>
          <FaChevronDown />
        </button>
      </div>
    </div>
  )
}

export default Hero