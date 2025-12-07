import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/EAM Logo T-03.jpg'
import hamburgerIcon from '../../assets/hamburger-menu.svg'
import { Link } from 'react-router-dom'
const Navbar = () => {

  const [sticky, setSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  return (
    <nav className={`container ${sticky ? 'dark-nav' : ''}`}>
      <img src={logo} alt='Emmanuel Asare Ministries' className='logo'/>

      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        <img src={hamburgerIcon} alt="Menu" />
      </div>

      <ul className={`nav-links ${mobileMenuOpen ? 'mobile-menu-active' : ''}`}>
        <Link to='/' onClick={() => setMobileMenuOpen(false)}><li>Home</li></Link>
        <Link to='/About' onClick={() => setMobileMenuOpen(false)}><li>About</li></Link>
        <Link to='/Events' onClick={() => setMobileMenuOpen(false)}><li>Events</li></Link>
        <Link to='/Sermons' onClick={() => setMobileMenuOpen(false)}><li>Sermons</li></Link>
        <Link to='/Contact' onClick={() => setMobileMenuOpen(false)}><li>Contact</li></Link>
        <Link to='/Radio' onClick={() => setMobileMenuOpen(false)}><li>Radio</li></Link>
        <Link to='/Give' onClick={() => setMobileMenuOpen(false)}><li><button className='btn'>Give</button></li></Link>
      </ul>
    </nav>
  )
}

export default Navbar