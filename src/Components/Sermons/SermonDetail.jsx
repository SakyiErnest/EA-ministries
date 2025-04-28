import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSermonById } from '../../firebase/sermonService';
import { FaCalendarAlt, FaUser, FaPlayCircle, FaDownload, FaArrowLeft } from 'react-icons/fa';
import './Sermons.css';
import { useFirebase } from '../../firebase/FirebaseContext';

const SermonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { db } = useFirebase();
  const [sermon, setSermon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSermon = async () => {
      try {
        setLoading(true);
        const sermonData = await getSermonById(db, id);
        setSermon(sermonData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching sermon:', err);
        setError('Failed to load sermon details. Please try again later.');
        setLoading(false);
      }
    };

    if (id && db) {
      fetchSermon();
    }
  }, [id, db]);

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

  // Go back to sermons list
  const handleBack = () => {
    navigate('/sermons');
  };

  if (loading) {
    return (
      <div className="sermon-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading sermon details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sermon-detail-error">
        <h3>Error</h3>
        <p>{error}</p>
        <button onClick={handleBack}>Back to Sermons</button>
      </div>
    );
  }

  if (!sermon) {
    return (
      <div className="sermon-detail-not-found">
        <h3>Sermon Not Found</h3>
        <p>The sermon you're looking for doesn't exist or has been removed.</p>
        <button onClick={handleBack}>Back to Sermons</button>
      </div>
    );
  }

  return (
    <div className="sermon-detail-container">
      <button className="back-button" onClick={handleBack}>
        <FaArrowLeft /> Back to Sermons
      </button>

      <div className="sermon-detail-content">
        <div className="sermon-detail-header">
          <h1 className="sermon-detail-title">{sermon.title}</h1>

          <div className="sermon-detail-meta">
            <div className="sermon-meta-item">
              <FaUser className="meta-icon" />
              <span>{sermon.speaker || 'Unknown Speaker'}</span>
            </div>

            <div className="sermon-meta-item">
              <FaCalendarAlt className="meta-icon" />
              <span>{formatDate(sermon.date)}</span>
            </div>

            {sermon.category && (
              <div className="sermon-category-badge">
                {sermon.category.replace('-', ' ')}
              </div>
            )}
          </div>
        </div>

        <div className="sermon-detail-media">
          {sermon.videoUrl ? (
            <div className="sermon-video-container">
              <iframe
                src={sermon.videoUrl.includes('youtube')
                  ? sermon.videoUrl.replace('watch?v=', 'embed/')
                  : sermon.videoUrl}
                title={sermon.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div
              className="sermon-detail-thumbnail"
              style={{
                backgroundImage: sermon.thumbnailUrl
                  ? `url(${sermon.thumbnailUrl})`
                  : 'url(https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1056&q=80)'
              }}
            >
              {sermon.audioUrl && (
                <button className="play-button large" onClick={handlePlay}>
                  <FaPlayCircle />
                </button>
              )}
            </div>
          )}
        </div>

        {sermon.description && (
          <div className="sermon-detail-description">
            <h3>Description</h3>
            <p>{sermon.description}</p>
          </div>
        )}

        <div className="sermon-detail-actions">
          {sermon.audioUrl && !sermon.videoUrl && (
            <button className="sermon-action-button play" onClick={handlePlay}>
              <FaPlayCircle className="button-icon" />
              <span>Play Audio</span>
            </button>
          )}

          {sermon.downloadUrl && (
            <button className="sermon-action-button download" onClick={handleDownload}>
              <FaDownload className="button-icon" />
              <span>Download</span>
            </button>
          )}
        </div>

        {sermon.scripture && (
          <div className="sermon-detail-scripture">
            <h3>Scripture References</h3>
            <p>{sermon.scripture}</p>
          </div>
        )}

        {sermon.tags && sermon.tags.length > 0 && (
          <div className="sermon-detail-tags">
            <h3>Tags</h3>
            <div className="tags-container">
              {sermon.tags.map((tag, index) => (
                <span key={index} className="sermon-tag">{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SermonDetail;
