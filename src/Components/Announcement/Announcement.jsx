import React from 'react';
import './Announcement.css';

function Announcement() {
  const events = [
    {
      title: "100 Random Acts of Kindness",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      date: "20 JULY",
      times: ["Friday 23:39 IST", "Saturday 11:20 ISD"],
      location: "No 233 Main St. New York, United States"
    },
    {
      title: "Faith is a Process, Not a Destination",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      date: "20 JULY",
      times: ["Friday 23:39 IST", "Saturday 11:20 ISD"],
      location: "No 233 Main St. New York, United States"
    },
    {
      title: "There is Nothing Impossible",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      date: "20 JULY",
      times: ["Friday 23:39 IST", "Saturday 11:20 ISD"],
      location: "No 233 Main St. New York, United States"
    },
    {
      title: "Celebrating Freedom and Life",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      date: "20 JULY",
      times: ["Friday 23:39 IST", "Saturday 11:20 ISD"],
      location: "No 233 Main St. New York, United States"
    }
  ];

  return (
    <div className="App">
      <h1>Announcement</h1>
      <div className="events">
        {events.map((event, index) => (
          <div className="event-card" key={index}>
            <div className="event-date">{event.date}</div>
            <div className="event-details">
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <div className="event-times">
                {event.times.map((time, idx) => (
                  <p key={idx}>{time}</p>
                ))}
              </div>
              <p className="event-location">{event.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Announcement;