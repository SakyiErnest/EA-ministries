import React, { useState, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import "./Radio.css";
import { FaPlay, FaPause, FaVolumeUp, FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPodcast, FaMicrophone, FaMusic, FaBible, FaPrayingHands } from "react-icons/fa";

const RadioPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentShow, setCurrentShow] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Sample shows data
  const radioShows = [
    {
      id: 1,
      title: "Morning Devotion",
      host: "Pastor Emmanuel Asare",
      time: "08:00 AM - 10:00 AM",
      days: "Monday - Friday",
      description: "Start your day with inspiring devotionals and prayers to set a positive tone for the day ahead.",
      icon: <FaPrayingHands />
    },
    {
      id: 2,
      title: "Worship Music Hour",
      host: "Sarah Johnson",
      time: "12:00 PM - 02:00 PM",
      days: "Monday - Saturday",
      description: "Experience the presence of God through uplifting worship music from around the world.",
      icon: <FaMusic />
    },
    {
      id: 3,
      title: "Bible Teachings",
      host: "Dr. Michael Thompson",
      time: "06:00 PM - 08:00 PM",
      days: "Monday - Friday",
      description: "Dive deep into the Word of God with insightful teachings and practical applications for daily living.",
      icon: <FaBible />
    },
    {
      id: 4,
      title: "Youth Connect",
      host: "David & Rebecca",
      time: "04:00 PM - 05:00 PM",
      days: "Saturday",
      description: "A program designed for young people to discuss relevant topics and grow in their faith journey.",
      icon: <FaMicrophone />
    }
  ];

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Determine current show based on time
    determineCurrentShow();

    return () => {
      clearInterval(timer);
    };
  }, [currentTime]);

  // Function to determine current show based on time
  const determineCurrentShow = () => {
    const hour = currentTime.getHours();
    const day = currentTime.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // This is a simplified logic - in a real app, you'd have more complex scheduling
    if (day >= 1 && day <= 5) { // Monday to Friday
      if (hour >= 8 && hour < 10) {
        setCurrentShow(radioShows[0]); // Morning Devotion
      } else if (hour >= 12 && hour < 14) {
        setCurrentShow(radioShows[1]); // Worship Music Hour
      } else if (hour >= 18 && hour < 20) {
        setCurrentShow(radioShows[2]); // Bible Teachings
      } else {
        setCurrentShow(null);
      }
    } else if (day === 6) { // Saturday
      if (hour >= 12 && hour < 14) {
        setCurrentShow(radioShows[1]); // Worship Music Hour
      } else if (hour >= 16 && hour < 17) {
        setCurrentShow(radioShows[3]); // Youth Connect
      } else {
        setCurrentShow(null);
      }
    } else {
      setCurrentShow(null);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="radio-page">
      <div className="radio-hero">
        <div className="radio-hero-content">
          <h1>Live Radio Station</h1>
          <p>Tune in to our live broadcast and experience uplifting messages & worship music</p>
        </div>
      </div>

      <div className="radio-content">
        <section className="radio-player-section">
          <div className="now-playing">
            <div className="current-time">{formatTime()}</div>
            <div className="on-air-indicator">
              <span className="pulse"></span>
              <span>ON AIR</span>
            </div>
            {currentShow ? (
              <div className="current-show">
                <h3>Now Playing: {currentShow.title}</h3>
                <p>with {currentShow.host}</p>
              </div>
            ) : (
              <div className="current-show">
                <h3>Emmanuel Asare Radio</h3>
                <p>Streaming inspirational content 24/7</p>
              </div>
            )}
          </div>

          <div className="player-container">
            <div className="player-controls">
              <button className={`play-button ${isPlaying ? 'playing' : ''}`} onClick={togglePlay}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <div className="volume-control">
                <FaVolumeUp />
                <input type="range" min="0" max="100" defaultValue="80" className="volume-slider" />
              </div>
            </div>
            <div className="audio-player">
              <ReactAudioPlayer
                src="https://zeno.fm/radio/greatness-radio/"
                controls
                autoPlay={isPlaying}
                className="hidden-audio-player"
              />
            </div>
          </div>

          <div className="listen-options">
            <p>Also available on:</p>
            <div className="platform-links">
              <a href="#" className="platform-link"><FaPodcast /> Apple Podcasts</a>
              <a href="#" className="platform-link"><FaYoutube /> YouTube Live</a>
              <a href="#" className="platform-link"><FaMusic /> Spotify</a>
            </div>
          </div>
        </section>

        <section className="radio-schedule-section">
          <div className="section-header">
            <h2>Weekly Broadcast Schedule</h2>
            <div className="title-underline"></div>
          </div>

          <div className="schedule-container">
            {radioShows.map((show) => (
              <div key={show.id} className={`schedule-card ${currentShow && currentShow.id === show.id ? 'active' : ''}`}>
                <div className="schedule-icon">{show.icon}</div>
                <div className="schedule-details">
                  <h3>{show.title}</h3>
                  <p className="schedule-host">with {show.host}</p>
                  <p className="schedule-time">{show.time}</p>
                  <p className="schedule-days">{show.days}</p>
                </div>
                <p className="schedule-description">{show.description}</p>
                {currentShow && currentShow.id === show.id && (
                  <div className="live-badge">LIVE NOW</div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="radio-connect-section">
          <div className="section-header">
            <h2>Connect With Us</h2>
            <div className="title-underline"></div>
          </div>

          <div className="connect-container">
            <div className="social-media">
              <h3>Follow Our Radio Station</h3>
              <div className="social-links">
                <a href="https://facebook.com/radiostation" className="social-link facebook">
                  <FaFacebookF />
                </a>
                <a href="https://twitter.com/radiostation" className="social-link twitter">
                  <FaTwitter />
                </a>
                <a href="https://instagram.com/radiostation" className="social-link instagram">
                  <FaInstagram />
                </a>
                <a href="https://youtube.com/radiostation" className="social-link youtube">
                  <FaYoutube />
                </a>
              </div>
            </div>

            <div className="contact-info">
              <h3>Contact the Studio</h3>
              <p>Have a prayer request or want to share a testimony?</p>
              <div className="contact-button">
                <a href="tel:+1234567890" className="phone-link">Call: (123) 456-7890</a>
              </div>
              <div className="contact-button">
                <a href="mailto:radio@emmanuelasare.org" className="email-link">Email: radio@emmanuelasare.org</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RadioPage;