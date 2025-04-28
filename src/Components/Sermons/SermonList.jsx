import React, { useState, useEffect } from 'react';
import { getSermons } from '../../firebase/sermonService';
import SermonCard from './SermonCard';
import Toast from '../UI/Toast';
import './Sermons.css';
import { FaSearch } from 'react-icons/fa';
import { useFirebase } from '../../firebase/FirebaseContext';

const SermonList = () => {
  const { db } = useFirebase();
  const [sermons, setSermons] = useState([]);
  const [filteredSermons, setFilteredSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Fetch sermons from Firestore
  useEffect(() => {
    const fetchSermons = async () => {
      try {
        setLoading(true);
        const sermonsData = await getSermons(db);
        setSermons(sermonsData);
        setFilteredSermons(sermonsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching sermons:', err);
        setError('Failed to load sermons. Please try again later.');
        setLoading(false);
      }
    };

    if (db) {
      fetchSermons();
    }
  }, [db]);

  // Filter sermons based on search term and category
  useEffect(() => {
    let result = sermons;

    // Filter by search term
    if (searchTerm) {
      result = result.filter(sermon =>
        sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (sermon.description && sermon.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (filterCategory !== 'all') {
      result = result.filter(sermon =>
        sermon.category === filterCategory
      );
    }

    setFilteredSermons(result);
  }, [searchTerm, filterCategory, sermons]);

  // Handle sermon deletion
  const handleSermonDelete = (deletedSermonId) => {
    // Find the sermon title before removing it
    const deletedSermon = sermons.find(sermon => sermon.id === deletedSermonId);
    const sermonTitle = deletedSermon ? deletedSermon.title : 'Sermon';

    // Update the local state to remove the deleted sermon
    setSermons(prevSermons =>
      prevSermons.filter(sermon => sermon.id !== deletedSermonId)
    );

    // Show toast notification
    setToast({
      show: true,
      message: `"${sermonTitle}" has been deleted`,
      type: 'success'
    });
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle category filter change
  const handleCategoryChange = (e) => {
    setFilterCategory(e.target.value);
  };

  // If there's an error loading sermons
  if (error) {
    return (
      <div className="sermons-error">
        <h3>Error</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="sermon-list-container">
      {/* Global toast notification */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
          duration={3000}
        />
      )}

      <div className="sermon-filters">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search sermons..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="category-filter">
          <select
            value={filterCategory}
            onChange={handleCategoryChange}
            className="category-select"
          >
            <option value="all">All Categories</option>
            <option value="sunday-service">Sunday Service</option>
            <option value="bible-study">Bible Study</option>
            <option value="special-event">Special Event</option>
            <option value="youth-service">Youth Service</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="sermons-loading">
          <div className="loading-spinner"></div>
          <p>Loading sermons...</p>
        </div>
      ) : filteredSermons.length > 0 ? (
        <div className="sermon-grid">
          {filteredSermons.map(sermon => (
            <SermonCard
              key={sermon.id}
              sermon={sermon}
              onDelete={handleSermonDelete}
            />
          ))}
        </div>
      ) : (
        <div className="no-sermons">
          <h3>No sermons found</h3>
          <p>Try adjusting your search or check back later for new content.</p>
        </div>
      )}
    </div>
  );
};

export default SermonList;
