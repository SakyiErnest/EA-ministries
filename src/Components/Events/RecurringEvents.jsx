import React, { useState, useEffect } from 'react';
import { useFirebase } from '../../firebase/FirebaseContext';
import { getRecurringEvents } from '../../firebase/eventService';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './RecurringEvents.css';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaChurch } from 'react-icons/fa';

const RecurringEvents = () => {
  const { db } = useFirebase();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch recurring events from Firebase
  useEffect(() => {
    const fetchRecurringEvents = async () => {
      setLoading(true);
      try {
        const eventsData = await getRecurringEvents(db);
        
        // If no recurring events found, use default events
        if (eventsData.length === 0) {
          setEvents(defaultEvents);
        } else {
          setEvents(eventsData);
        }
        
        setError('');
      } catch (err) {
        console.error('Error fetching recurring events:', err);
        setEvents(defaultEvents); // Fallback to default events on error
        setError('Failed to load recurring events. Showing default events instead.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecurringEvents();
  }, [db]);

  // Default events to show if no recurring events in database
  const defaultEvents = [
    {
      id: 'default-1',
      title: "Sunday Service",
      date: "Every Sunday",
      times: ["9:00 AM"],
      location: "Main Sanctuary",
      description: "Join us for worship, prayer, and the Word of God.",
      icon: "church"
    },
    {
      id: 'default-2',
      title: "Bible Study",
      date: "Every Wednesday",
      times: ["6:00 PM"],
      location: "Fellowship Hall",
      description: "Dive deeper into God's Word with interactive teaching and discussion.",
      icon: "calendar"
    },
    {
      id: 'default-3',
      title: "Youth Fellowship",
      date: "Every Friday",
      times: ["7:00 PM"],
      location: "Youth Center",
      description: "A time for young people to connect, grow, and have fun together.",
      icon: "calendar"
    },
    {
      id: 'default-4',
      title: "Community Outreach",
      date: "First Saturday of each month",
      times: ["10:00 AM"],
      location: "Community Center",
      description: "Serving our community through various outreach programs and activities.",
      icon: "map"
    }
  ];

  // Get icon component based on icon name
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'church':
        return <FaChurch className="event-icon" />;
      case 'map':
        return <FaMapMarkerAlt className="event-icon" />;
      case 'calendar':
      default:
        return <FaCalendarAlt className="event-icon" />;
    }
  };

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    cssEase: "ease-in-out",
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ]
  };

  if (loading && events.length === 0) {
    return <div className="events-loading">Loading events...</div>;
  }

  return (
    <div className="hero-carousel-wrapper">
      <Slider {...settings}>
        {events.map((event) => (
          <div key={event.id} className="carousel-slide">
            <div className="slide-content">
              <div className="slide-icon">
                {getIconComponent(event.icon)}
              </div>
              <h2 className="slide-title">{event.title}</h2>
              <div className="slide-details">
                <div className="slide-detail">
                  <FaCalendarAlt className="detail-icon" />
                  <span>{event.date}</span>
                </div>
                <div className="slide-detail">
                  <FaClock className="detail-icon" />
                  <span>{event.times && event.times[0]}</span>
                </div>
                <div className="slide-detail">
                  <FaMapMarkerAlt className="detail-icon" />
                  <span>{event.location}</span>
                </div>
              </div>
              <p className="slide-description">{event.description}</p>
              <button className="slide-button">Learn More</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RecurringEvents;
