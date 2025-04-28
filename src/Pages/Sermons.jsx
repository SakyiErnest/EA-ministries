import React, { useState } from 'react';
import SermonList from '../Components/Sermons/SermonList';
import SermonForm from '../Components/Sermons/SermonForm';
import AuthNav from '../Components/Auth/AuthNav';
import { FaPlus } from 'react-icons/fa';
import './Sermons.css';
import { useFirebase } from '../firebase/FirebaseContext';

const Sermons = () => {
  const { currentUser, isAdmin } = useFirebase();
  const [showAddForm, setShowAddForm] = useState(false);
  const [refreshList, setRefreshList] = useState(false);

  // Toggle sermon form visibility
  const toggleAddForm = () => {
    setShowAddForm(prev => !prev);
  };

  // Handle sermon added event
  const handleSermonAdded = () => {
    setRefreshList(prev => !prev); // Toggle to trigger useEffect in SermonList
    setShowAddForm(false); // Hide the form after adding
  };

  return (
    <div className="sermons-page">
      <div className="sermons-header">
        <div className="sermons-header-content">
          <h1 className="sermons-title">Sermons & Teachings</h1>
          <p className="sermons-subtitle">
            Explore our collection of sermons, teachings, and messages from our ministry.
            Be inspired, encouraged, and equipped through the Word of God.
          </p>
        </div>
        <div className="sermons-auth-nav">
          <AuthNav />
        </div>
      </div>

      <div className="sermons-content">
        {/* Admin controls - only visible to authenticated users */}
        {isAdmin && (
          <div className="admin-controls">
            <button className="add-sermon-button" onClick={toggleAddForm}>
              <FaPlus /> Add New Sermon
            </button>
          </div>
        )}

        {/* Sermon Form - only visible to authenticated users */}
        {isAdmin && showAddForm && (
          <SermonForm
            onSermonAdded={handleSermonAdded}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {/* Sermon List - visible to all users */}
        <SermonList key={refreshList ? 'refresh' : 'initial'} />
      </div>
    </div>
  );
};

export default Sermons;