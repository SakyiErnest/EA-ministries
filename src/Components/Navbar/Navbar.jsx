import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/EAM Logo T-03.jpg'
import { Link } from 'react-router-dom'
const Navbar = () => {
  
  const [sticky, setSticky] = useState(false);


  useEffect(()=>{
    window.addEventListener('scroll', ()=>{
      window.scrollY > 50 ? setSticky(true) : setSticky(false)
    }) 
  },[])    

  return (
    <nav className={`container ${sticky ? 'dark-nav' : ''}`}>
      <img src={logo} alt='' className='logo'/>
      <ul>
       <Link to='/'><li>Home</li></Link> 
        <Link to='/About'><li>About</li></Link>
        <Link to='/Events'><li>Events</li></Link>
        <Link to='/Sermons'><li>Sermons</li></Link>
        <Link to='/Contact'><li>Contact</li></Link>
        <Link to='/Radio'><li>Radio</li></Link>
        <Link to='/Give'><li><button className='btn'>Give</button></li></Link>
      </ul>
    </nav>
  )
}

export default Navbar