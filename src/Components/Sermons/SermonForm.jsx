import React, { useState } from 'react';
import { addSermon } from '../../firebase/sermonService';
import './Sermons.css';
import { useFirebase } from '../../firebase/FirebaseContext';

const SermonForm = ({ onSermonAdded, onCancel }) => {
  const { db } = useFirebase();
  const [formData, setFormData] = useState({
    title: '',
    speaker: '',
    date: new Date().toISOString().split('T')[0], // Default to today's date
    description: '',
    videoUrl: '',
    audioUrl: '',
    downloadUrl: '',
    thumbnailUrl: '',
    category: 'sunday-service',
    scripture: '',
    tags: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      // Process tags if provided
      const processedData = {
        ...formData,
        date: new Date(formData.date),
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
      };

      // Add sermon to Firestore
      await addSermon(db, processedData);

      setSuccess(true);
      setLoading(false);

      // Reset form after successful submission
      setFormData({
        title: '',
        speaker: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        videoUrl: '',
        audioUrl: '',
        downloadUrl: '',
        thumbnailUrl: '',
        category: 'sunday-service',
        scripture: '',
        tags: ''
      });

      // Notify parent component
      if (onSermonAdded) {
        onSermonAdded();
      }

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

    } catch (err) {
      console.error('Error adding sermon:', err);
      setError('Failed to add sermon. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="sermon-form-container">
      <h2>Add New Sermon</h2>

      {success && (
        <div className="form-success-message">
          Sermon added successfully!
        </div>
      )}

      {error && (
        <div className="form-error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="sermon-form">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter sermon title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="speaker">Speaker *</label>
          <input
            type="text"
            id="speaker"
            name="speaker"
            value={formData.speaker}
            onChange={handleChange}
            required
            placeholder="Enter speaker name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date *</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="sunday-service">Sunday Service</option>
            <option value="bible-study">Bible Study</option>
            <option value="special-event">Special Event</option>
            <option value="youth-service">Youth Service</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Enter sermon description"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="videoUrl">Video URL</label>
          <input
            type="url"
            id="videoUrl"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            placeholder="Enter video URL (YouTube, Vimeo, etc.)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="audioUrl">Audio URL</label>
          <input
            type="url"
            id="audioUrl"
            name="audioUrl"
            value={formData.audioUrl}
            onChange={handleChange}
            placeholder="Enter audio URL"
          />
        </div>

        <div className="form-group">
          <label htmlFor="downloadUrl">Download URL</label>
          <input
            type="url"
            id="downloadUrl"
            name="downloadUrl"
            value={formData.downloadUrl}
            onChange={handleChange}
            placeholder="Enter download URL"
          />
        </div>

        <div className="form-group">
          <label htmlFor="thumbnailUrl">Thumbnail URL</label>
          <input
            type="url"
            id="thumbnailUrl"
            name="thumbnailUrl"
            value={formData.thumbnailUrl}
            onChange={handleChange}
            placeholder="Enter thumbnail image URL"
          />
        </div>

        <div className="form-group">
          <label htmlFor="scripture">Scripture References</label>
          <input
            type="text"
            id="scripture"
            name="scripture"
            value={formData.scripture}
            onChange={handleChange}
            placeholder="E.g., John 3:16, Romans 8:28"
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Enter tags separated by commas"
          />
          <small>E.g., faith, prayer, healing</small>
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
            {loading ? 'Adding...' : 'Add Sermon'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SermonForm;
