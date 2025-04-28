import React from 'react'
import Hero2 from '../Components/Hero2/Hero2'
import Announcement from '../Components/Announcement/Announcement'
import './Events.css'

const Events = () => {
  return (
    <div className="events-page">
      <div className="events-hero-section">
        <div className="events-hero-container">
          <h1 className="events-page-title">Upcoming Events</h1>
          <div className="events-carousel-container">
            <Hero2 />
          </div>
        </div>
      </div>

      <div className="events-content-section">
        <div className="events-content-container">
          <Announcement />
        </div>
      </div>
    </div>
  )
}

export default Events