import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'

/**
 * Ensures a given user exists in the `admins` collection.
 *
 * This is a fallback method when the normal verification process fails.
 *
 * @param {Object} db - Firestore database instance
 * @param {string} uid - User ID to ensure has an admin record
 * @returns {Promise<boolean>} - Success status
 */
export const ensureAdminExists = async (db, uid) => {
  if (!db || !uid) {
    console.error('Missing database or user ID')
    return false
  }

  try {
    const adminRef = doc(db, 'admins', uid)
    const adminDoc = await getDoc(adminRef)

    if (adminDoc.exists()) return true

    await setDoc(adminRef, {
      isAdmin: true,
      createdAt: serverTimestamp(),
      addedDirectly: true,
      verificationMethod: 'direct'
    })

    return true
  } catch (error) {
    console.error('Failed to ensure admin record exists:', error)
    return false
  }
}
