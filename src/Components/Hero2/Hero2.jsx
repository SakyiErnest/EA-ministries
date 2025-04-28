import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Hero2.css";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaChurch } from 'react-icons/fa';

// Enhanced event data with more details and icons
const events = [
  {
    title: "Sunday Service",
    date: "Every Sunday",
    time: "9:00 AM",
    location: "Main Sanctuary",
    description: "Join us for worship, prayer, and the Word of God.",
    icon: <FaChurch className="event-icon" />
  },
  {
    title: "Bible Study",
    date: "Every Wednesday",
    time: "6:00 PM",
    location: "Fellowship Hall",
    description: "Dive deeper into God's Word with interactive teaching and discussion.",
    icon: <FaCalendarAlt className="event-icon" />
  },
  {
    title: "Youth Fellowship",
    date: "Every Friday",
    time: "7:00 PM",
    location: "Youth Center",
    description: "A time for young people to connect, grow, and have fun together.",
    icon: <FaCalendarAlt className="event-icon" />
  },
  {
    title: "Community Outreach",
    date: "First Saturday of each month",
    time: "10:00 AM",
    location: "Community Center",
    description: "Serving our community through various outreach programs and activities.",
    icon: <FaMapMarkerAlt className="event-icon" />
  },
];

const HeroCarousel = () => {
  // Enhanced slider settings
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

  return (
    <div className="hero-carousel-wrapper">
      <Slider {...settings}>
        {events.map((event, index) => (
          <div key={index} className="carousel-slide">
            <div className="slide-content">
              <div className="slide-icon">{event.icon}</div>
              <h2 className="slide-title">{event.title}</h2>
              <div className="slide-details">
                <div className="slide-detail">
                  <FaCalendarAlt className="detail-icon" />
                  <span>{event.date}</span>
                </div>
                <div className="slide-detail">
                  <FaClock className="detail-icon" />
                  <span>{event.time}</span>
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

export default HeroCarousel;