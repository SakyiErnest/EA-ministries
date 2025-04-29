import React, { useState, useEffect } from 'react';
import { useFirebase } from '../../firebase/FirebaseContext';
import { getEvents, deleteEvent } from '../../firebase/eventService';
import './EventList.css';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaEdit, FaTrash, FaArrowRight } from 'react-icons/fa';
import EventForm from './EventForm';
import OptimizedImage from '../UI/OptimizedImage';

const EventList = ({ onEventUpdated }) => {
  const { db, isAdmin } = useFirebase();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Fetch events from Firebase
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const eventsData = await getEvents(db);
      setEvents(eventsData);
      setError('');
      // Reset images loaded counter when new events are fetched
      setImagesLoaded(0);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Load events on component mount
  useEffect(() => {
    fetchEvents();
  }, [db]);

  // Handle event deletion
  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(db, eventId);
      // Update the events list
      setEvents(events.filter(event => event.id !== eventId));
      setShowDeleteConfirm(null);

      // Notify parent component if needed
      if (onEventUpdated) {
        onEventUpdated();
      }
    } catch (err) {
      console.error('Error deleting event:', err);
      setError('Failed to delete event. Please try again.');
    }
  };

  // Handle event update
  const handleEventUpdated = () => {
    fetchEvents();
    setEditingEvent(null);

    // Notify parent component if needed
    if (onEventUpdated) {
      onEventUpdated();
    }
  };

  // Track image loading progress
  const handleImageLoad = () => {
    setImagesLoaded(prev => prev + 1);
  };

  // Loading state with spinner
  if (loading && events.length === 0) {
    return (
      <div className="events-loading">
        <div className="loading-spinner"></div>
        <p>Loading events...</p>
      </div>
    );
  }

  // Error state
  if (error && events.length === 0) {
    return <div className="events-error">{error}</div>;
  }

  // Default placeholder image
  const placeholderImage = 'https://via.placeholder.com/400x200?text=No+Image';

  return (
    <div className="events-list-container">
      {editingEvent && (
        <EventForm
          event={editingEvent}
          onEventAdded={handleEventUpdated}
          onCancel={() => setEditingEvent(null)}
        />
      )}

      <div className="events-grid">
        {events.length === 0 ? (
          <div className="no-events">No events found.</div>
        ) : (
          events.map((event, index) => (
            <div className="event-card" key={event.id}>
              <div className="event-image-container">
                <OptimizedImage
                  src={event.image || placeholderImage}
                  alt={event.title}
                  className="event-image"
                  objectFit="cover"
                  priority={index < 2} // Prioritize loading first two events
                  onLoad={handleImageLoad}
                  width={400}
                  height={200}
                />
                <div className="event-date-badge">
                  <FaCalendarAlt className="event-icon" />
                  <span>{event.date}</span>
                </div>

                {isAdmin && (
                  <div className="event-admin-controls">
                    <button
                      className="edit-event-btn"
                      onClick={() => setEditingEvent(event)}
                      title="Edit Event"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="delete-event-btn"
                      onClick={() => setShowDeleteConfirm(event.id)}
                      title="Delete Event"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>

              <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>

                <div className="event-details">
                  <div className="event-detail">
                    <FaClock className="detail-icon" />
                    <div className="detail-text">
                      {event.times && event.times.map((time, idx) => (
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

                {showDeleteConfirm === event.id && (
                  <div className="delete-confirmation">
                    <p>Are you sure you want to delete this event?</p>
                    <div className="delete-actions">
                      <button
                        className="cancel-delete"
                        onClick={() => setShowDeleteConfirm(null)}
                      >
                        Cancel
                      </button>
                      <button
                        className="confirm-delete"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Loading progress indicator */}
      {events.length > 0 && imagesLoaded < events.length && (
        <div className="events-loading-progress">
          Loading images: {Math.round((imagesLoaded / events.length) * 100)}%
        </div>
      )}
    </div>
  );
};

export default EventList;
