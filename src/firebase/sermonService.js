import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';

// Get collection reference dynamically to ensure we're using the latest db instance
const getCollectionRef = (db) => collection(db, 'sermons');

// Get all sermons ordered by date (newest first)
export const getSermons = async (db) => {
  try {
    const sermonsRef = getCollectionRef(db);
    const q = query(sermonsRef, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting sermons: ", error);
    throw error;
  }
};

// Get a single sermon by ID
export const getSermonById = async (db, id) => {
  try {
    const sermonDoc = doc(db, 'sermons', id);
    const docSnap = await getDoc(sermonDoc);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error("Sermon not found");
    }
  } catch (error) {
    console.error("Error getting sermon: ", error);
    throw error;
  }
};

// Add a new sermon
export const addSermon = async (db, sermonData) => {
  try {
    const sermonsRef = getCollectionRef(db);

    // Add server timestamp for the createdAt field
    const sermonWithTimestamp = {
      ...sermonData,
      createdAt: serverTimestamp()
    };

    const docRef = await addDoc(sermonsRef, sermonWithTimestamp);
    return docRef.id;
  } catch (error) {
    console.error("Error adding sermon: ", error);
    throw error;
  }
};

// Update an existing sermon
export const updateSermon = async (db, id, sermonData) => {
  try {
    const sermonDoc = doc(db, 'sermons', id);

    // Add server timestamp for the updatedAt field
    const sermonWithTimestamp = {
      ...sermonData,
      updatedAt: serverTimestamp()
    };

    await updateDoc(sermonDoc, sermonWithTimestamp);
    return id;
  } catch (error) {
    console.error("Error updating sermon: ", error);
    throw error;
  }
};

// Delete a sermon
export const deleteSermon = async (db, id) => {
  try {
    const sermonDoc = doc(db, 'sermons', id);
    await deleteDoc(sermonDoc);
    return id;
  } catch (error) {
    console.error("Error deleting sermon: ", error);
    throw error;
  }
};
