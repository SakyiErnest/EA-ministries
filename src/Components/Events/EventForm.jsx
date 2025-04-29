import React, { useState, useEffect } from 'react';
import { useFirebase } from '../../firebase/FirebaseContext';
import { addEvent, updateEvent } from '../../firebase/eventService';
import './EventForm.css';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaImage, FaTimes } from 'react-icons/fa';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const EventForm = ({ event = null, onEventAdded, onCancel }) => {
  const { db, storage } = useFirebase();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    times: [''],
    location: '',
    image: null,
    isRecurring: false,
    recurringType: 'weekly' // weekly, monthly, etc.
  });

  // If editing an existing event, populate the form
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        date: event.date || '',
        times: event.times || [''],
        location: event.location || '',
        image: null, // Can't populate file input
        imageUrl: event.image || '',
        isRecurring: event.isRecurring || false,
        recurringType: event.recurringType || 'weekly'
      });
      
      if (event.image) {
        setImagePreview(event.image);
      }
    }
  }, [event]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle time inputs (multiple times for an event)
  const handleTimeChange = (index, value) => {
    const updatedTimes = [...formData.times];
    updatedTimes[index] = value;
    setFormData(prev => ({ ...prev, times: updatedTimes }));
  };

  // Add another time input
  const addTimeInput = () => {
    setFormData(prev => ({ ...prev, times: [...prev.times, ''] }));
  };

  // Remove a time input
  const removeTimeInput = (index) => {
    const updatedTimes = formData.times.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, times: updatedTimes }));
  };

  // Upload image to Firebase Storage
  const uploadImage = async (file) => {
    if (!file) return null;
    
    const storageRef = ref(storage, `event-images/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Validate form
      if (!formData.title || !formData.description || !formData.date) {
        throw new Error('Please fill in all required fields');
      }
      
      // Filter out empty times
      const filteredTimes = formData.times.filter(time => time.trim() !== '');
      if (filteredTimes.length === 0) {
        throw new Error('Please add at least one time');
      }
      
      // Prepare event data
      let eventData = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        times: filteredTimes,
        location: formData.location,
        isRecurring: formData.isRecurring,
        recurringType: formData.isRecurring ? formData.recurringType : null
      };
      
      // Upload image if provided
      if (formData.image) {
        const imageUrl = await uploadImage(formData.image);
        eventData.image = imageUrl;
      } else if (formData.imageUrl) {
        // Keep existing image URL if editing
        eventData.image = formData.imageUrl;
      }
      
      // Add or update event
      if (event) {
        // Update existing event
        await updateEvent(db, event.id, eventData);
        setSuccess('Event updated successfully!');
      } else {
        // Add new event
        await addEvent(db, eventData);
        setSuccess('Event added successfully!');
      }
      
      // Reset form after successful submission
      if (!event) {
        setFormData({
          title: '',
          description: '',
          date: '',
          times: [''],
          location: '',
          image: null,
          isRecurring: false,
          recurringType: 'weekly'
        });
        setImagePreview(null);
      }
      
      // Notify parent component
      if (onEventAdded) {
        onEventAdded();
      }
    } catch (error) {
      console.error('Error submitting event:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="event-form-container">
      <div className="event-form-header">
        <h2>{event ? 'Edit Event' : 'Add New Event'}</h2>
        <button className="close-button" onClick={onCancel}>
          <FaTimes />
        </button>
      </div>
      
      {error && <div className="form-error">{error}</div>}
      {success && <div className="form-success">{success}</div>}
      
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label htmlFor="title">Event Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter event title"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description*</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter event description"
            rows="4"
            required
          ></textarea>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">
              <FaCalendarAlt className="form-icon" /> Date*
            </label>
            <input
              type="text"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="e.g., July 20, 2024 or Every Sunday"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="location">
              <FaMapMarkerAlt className="form-icon" /> Location*
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter event location"
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>
            <FaClock className="form-icon" /> Event Times*
          </label>
          {formData.times.map((time, index) => (
            <div key={index} className="time-input-row">
              <input
                type="text"
                value={time}
                onChange={(e) => handleTimeChange(index, e.target.value)}
                placeholder="e.g., Friday 7:00 PM"
                required
              />
              {formData.times.length > 1 && (
                <button
                  type="button"
                  className="remove-time-btn"
                  onClick={() => removeTimeInput(index)}
                >
                  <FaTimes />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="add-time-btn"
            onClick={addTimeInput}
          >
            + Add Another Time
          </button>
        </div>
        
        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="isRecurring"
              checked={formData.isRecurring}
              onChange={handleChange}
            />
            This is a recurring event
          </label>
        </div>
        
        {formData.isRecurring && (
          <div className="form-group">
            <label htmlFor="recurringType">Recurring Type</label>
            <select
              id="recurringType"
              name="recurringType"
              value={formData.recurringType}
              onChange={handleChange}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="daily">Daily</option>
            </select>
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="image">
            <FaImage className="form-icon" /> Event Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Event preview" />
            </div>
          )}
        </div>
        
        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Saving...' : event ? 'Update Event' : 'Add Event'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
