import React from "react";
import ReactAudioPlayer from "react-audio-player";
import "./Radio.css";

const RadioPage = () => {
  return (
    <div className="radio-container">
      <header className="radio-header">
        <h1>Live Radio Station</h1>
        <p>Tune in to our live broadcast and enjoy uplifting messages & music!</p>
      </header>

      <section className="radio-player">
        <h2>Listen Live</h2>
        <ReactAudioPlayer
          src="https://zeno.fm/radio/greatness-radio/"
          controls
        />
      </section>

      <section className="radio-schedule">
        <h2>Broadcast Schedule</h2>
        <ul>
          <li><strong>08:00 AM - 10:00 AM:</strong> Morning Devotion</li>
          <li><strong>12:00 PM - 02:00 PM:</strong> Worship Music Hour</li>
          <li><strong>06:00 PM - 08:00 PM:</strong> Bible Teachings</li>
        </ul>
      </section>

      <section className="radio-social">
        <h2>Follow Us</h2>
        <p>Stay connected with our radio station on social media:</p>
        <div className="social-links">
          <a href="https://facebook.com/radiostation">Facebook</a>
          <a href="https://twitter.com/radiostation">Twitter</a>
          <a href="https://instagram.com/radiostation">Instagram</a>
        </div>
      </section>
    </div>
  );
};

export default RadioPage;