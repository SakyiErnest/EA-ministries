import React, { useState } from 'react'
import RecurringEvents from '../Components/Events/RecurringEvents'
import EventList from '../Components/Events/EventList'
import EventForm from '../Components/Events/EventForm'
import AuthNav from '../Components/Auth/AuthNav'
import './Events.css'
import { useFirebase } from '../firebase/FirebaseContext'
import { FaPlus } from 'react-icons/fa'

const Events = () => {
  const { isAdmin } = useFirebase();
  const [showAddForm, setShowAddForm] = useState(false);
  const [refreshEvents, setRefreshEvents] = useState(false);

  // Toggle event form visibility
  const toggleAddForm = () => {
    setShowAddForm(prev => !prev);
  };

  // Handle event added/updated event
  const handleEventChange = () => {
    setRefreshEvents(prev => !prev);
    setShowAddForm(false);
  };

  return (
    <div className="events-page">
      <div className="events-hero-section">
        <div className="events-hero-container">
          <div className="events-header-top">
            <h1 className="events-page-title">Upcoming Events</h1>
            <div className="events-auth-nav">
              <AuthNav />
            </div>
          </div>
          <div className="events-carousel-container">
            <RecurringEvents key={refreshEvents ? 'refresh' : 'initial'} />
          </div>
        </div>
      </div>

      <div className="events-content-section">
        <div className="events-content-container">
          {/* Admin controls - only visible to authenticated admins */}
          {isAdmin && (
            <div className="admin-controls">
              <button className="add-event-button" onClick={toggleAddForm}>
                <FaPlus /> Add New Event
              </button>
            </div>
          )}

          {/* Event Form - only visible when adding a new event */}
          {isAdmin && showAddForm && (
            <EventForm
              onEventAdded={handleEventChange}
              onCancel={() => setShowAddForm(false)}
            />
          )}

          {/* Event List - visible to all users */}
          <EventList
            key={refreshEvents ? 'refresh' : 'initial'}
            onEventUpdated={handleEventChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Events