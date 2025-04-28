import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Helper function to directly add a user to the admins collection
 * This is a fallback method when the normal verification process fails
 *
 * @param {Object} db - Firestore database instance
 * @param {string} uid - User ID to add as admin
 * @returns {Promise<boolean>} - Success status
 */
export const addAdminDirectly = async (db, uid) => {
  if (!db || !uid) {
    console.error("Missing database or user ID");
    return false;
  }

  try {
    console.log(`Checking if user ${uid} is already an admin`);

    // First check if the user is already an admin
    const adminRef = doc(db, 'admins', uid);
    const adminDoc = await getDoc(adminRef);

    if (adminDoc.exists()) {
      console.log("User is already an admin, no need to add again");
      return true;
    }

    console.log(`Directly adding user ${uid} as admin`);

    // Add the user as an admin
    await setDoc(adminRef, {
      isAdmin: true,
      createdAt: serverTimestamp(),
      addedDirectly: true,
      adminCode: "Test@25" // Store the code used for verification
    });

    console.log("User successfully added as admin");
    return true;
  } catch (error) {
    console.error("Failed to add admin directly:", error);
    return false;
  }
};
