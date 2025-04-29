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
  serverTimestamp,
  where
} from 'firebase/firestore';

// Get collection reference dynamically to ensure we're using the latest db instance
const getCollectionRef = (db) => collection(db, 'events');

// Get all events ordered by date (upcoming first)
export const getEvents = async (db) => {
  try {
    const eventsRef = getCollectionRef(db);
    const q = query(eventsRef, orderBy('date', 'asc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting events: ", error);
    throw error;
  }
};

// Get recurring events (weekly, monthly events)
export const getRecurringEvents = async (db) => {
  try {
    const eventsRef = getCollectionRef(db);
    const q = query(eventsRef, where('isRecurring', '==', true));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting recurring events: ", error);
    throw error;
  }
};

// Get a single event by ID
export const getEventById = async (db, id) => {
  try {
    const eventDoc = doc(db, 'events', id);
    const docSnap = await getDoc(eventDoc);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error("Event not found");
    }
  } catch (error) {
    console.error("Error getting event: ", error);
    throw error;
  }
};

// Add a new event
export const addEvent = async (db, eventData) => {
  try {
    const eventsRef = getCollectionRef(db);

    // Convert date string to timestamp if needed
    const processedData = {
      ...eventData,
      createdAt: serverTimestamp()
    };

    const docRef = await addDoc(eventsRef, processedData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding event: ", error);
    throw error;
  }
};

// Update an existing event
export const updateEvent = async (db, id, eventData) => {
  try {
    const eventDoc = doc(db, 'events', id);

    // Add server timestamp for the updatedAt field
    const eventWithTimestamp = {
      ...eventData,
      updatedAt: serverTimestamp()
    };

    await updateDoc(eventDoc, eventWithTimestamp);
    return id;
  } catch (error) {
    console.error("Error updating event: ", error);
    throw error;
  }
};

// Delete an event
export const deleteEvent = async (db, id) => {
  try {
    const eventDoc = doc(db, 'events', id);
    await deleteDoc(eventDoc);
    return id;
  } catch (error) {
    console.error("Error deleting event: ", error);
    throw error;
  }
};
