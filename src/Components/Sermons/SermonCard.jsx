import React from 'react';
import { FaCalendarAlt, FaUser, FaPlayCircle, FaDownload } from 'react-icons/fa';
import DeleteSermonButton from './DeleteSermonButton';
import './Sermons.css';

const SermonCard = ({ sermon, onDelete }) => {

  // Format date to a readable string
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Date unavailable';

    // If it's a Firestore timestamp, convert to JS Date
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Handle play button click
  const handlePlay = () => {
    if (sermon.videoUrl) {
      window.open(sermon.videoUrl, '_blank');
    } else if (sermon.audioUrl) {
      window.open(sermon.audioUrl, '_blank');
    }
  };

  // Handle download button click
  const handleDownload = () => {
    if (sermon.downloadUrl) {
      window.open(sermon.downloadUrl, '_blank');
    }
  };

  return (
    <div className="sermon-card">
      <div
        className="sermon-thumbnail"
        style={{
          backgroundImage: sermon.thumbnailUrl
            ? `url(${sermon.thumbnailUrl})`
            : 'url(https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1056&q=80)'
        }}
      >
        {(sermon.videoUrl || sermon.audioUrl) && (
          <button className="play-button" onClick={handlePlay}>
            <FaPlayCircle />
          </button>
        )}

        {sermon.category && (
          <div className="sermon-category">{sermon.category.replace('-', ' ')}</div>
        )}

        {/* Delete button - only visible to admins */}
        <div className="sermon-admin-controls">
          <DeleteSermonButton
            sermonId={sermon.id}
            onDelete={onDelete}
          />
        </div>
      </div>

      <div className="sermon-content">
        <h3 className="sermon-title">{sermon.title}</h3>

        <div className="sermon-meta">
          <div className="sermon-meta-item">
            <FaUser className="meta-icon" />
            <span>{sermon.speaker || 'Unknown Speaker'}</span>
          </div>

          <div className="sermon-meta-item">
            <FaCalendarAlt className="meta-icon" />
            <span>{formatDate(sermon.date)}</span>
          </div>
        </div>

        {sermon.description && (
          <p className="sermon-description">
            {sermon.description.length > 120
              ? `${sermon.description.substring(0, 120)}...`
              : sermon.description}
          </p>
        )}

        <div className="sermon-actions">
          {(sermon.videoUrl || sermon.audioUrl) && (
            <button className="sermon-action-button play" onClick={handlePlay}>
              <FaPlayCircle className="button-icon" />
              <span>Play</span>
            </button>
          )}

          {sermon.downloadUrl && (
            <button className="sermon-action-button download" onClick={handleDownload}>
              <FaDownload className="button-icon" />
              <span>Download</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SermonCard;
