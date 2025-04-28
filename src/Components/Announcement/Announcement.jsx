import React from 'react';
import './Announcement.css';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

function Announcement() {
  // Enhanced event data with more details
  const events = [
    {
      id: 1,
      title: "100 Random Acts of Kindness",
      description: "Join us for a community-wide initiative to spread kindness and love through random acts of service and generosity.",
      date: "July 20, 2024",
      times: ["Friday 7:00 PM", "Saturday 11:00 AM"],
      location: "Main Sanctuary & Community Center",
      image: "https://images.unsplash.com/photo-1469571486292-b5175cb0b662?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80"
    },
    {
      id: 2,
      title: "Faith is a Process, Not a Destination",
      description: "A special teaching series exploring the journey of faith and spiritual growth through life's challenges and victories.",
      date: "August 5-7, 2024",
      times: ["Daily 6:30 PM"],
      location: "Fellowship Hall",
      image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80"
    },
    {
      id: 3,
      title: "There is Nothing Impossible",
      description: "An inspiring conference featuring testimonies of faith, healing, and breakthrough from speakers around the world.",
      date: "September 15-17, 2024",
      times: ["Friday 7:00 PM", "Saturday 10:00 AM & 4:00 PM", "Sunday 3:00 PM"],
      location: "Main Auditorium",
      image: "https://images.unsplash.com/photo-1519834089823-af2d966a0648?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80"
    },
    {
      id: 4,
      title: "Celebrating Freedom and Life",
      description: "A special thanksgiving service celebrating God's goodness, freedom, and the gift of life with worship, dance, and testimonies.",
      date: "October 31, 2024",
      times: ["Thursday 6:00 PM"],
      location: "Main Sanctuary",
      image: "https://images.unsplash.com/photo-1519750783826-e2420f4d687f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80"
    }
  ];

  return (
    <div className="announcements-section">
      <h2 className="section-title">Upcoming Events & Announcements</h2>
      <div className="events-grid">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <div
              className="event-image"
              style={{ backgroundImage: `url(${event.image})` }}
            >
              <div className="event-date-badge">
                <FaCalendarAlt className="event-icon" />
                <span>{event.date}</span>
              </div>
            </div>

            <div className="event-content">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">{event.description}</p>

              <div className="event-details">
                <div className="event-detail">
                  <FaClock className="detail-icon" />
                  <div className="detail-text">
                    {event.times.map((time, idx) => (
                      <span key={idx} className="event-time">{time}</span>
                    ))}
                  </div>
                </div>

                <div className="event-detail">
                  <FaMapMarkerAlt className="detail-icon" />
                  <span className="detail-text">{event.location}</span>
                </div>
              </div>

              <button className="event-button">
                Learn More <FaArrowRight className="button-icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Announcement;