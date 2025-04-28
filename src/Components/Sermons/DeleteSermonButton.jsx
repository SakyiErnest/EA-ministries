import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { deleteSermon } from '../../firebase/sermonService';
import { useFirebase } from '../../firebase/FirebaseContext';
import './Sermons.css';

const DeleteSermonButton = ({ sermonId, onDelete }) => {
  const { db, isAdmin } = useFirebase();
  const [loading, setLoading] = useState(false);

  // If not admin, don't render the button
  if (!isAdmin) return null;

  const handleDelete = async () => {
    if (!sermonId || loading) return;

    try {
      setLoading(true);
      await deleteSermon(db, sermonId);

      // Call the onDelete callback if provided
      if (onDelete) {
        onDelete(sermonId);
      }
    } catch (error) {
      console.error('Error deleting sermon:', error);
      alert('Failed to delete sermon. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="delete-sermon-button"
      onClick={handleDelete}
      disabled={loading}
      title="Delete sermon"
    >
      {loading ? '...' : <FaTrash />}
    </button>
  );
};

export default DeleteSermonButton;
