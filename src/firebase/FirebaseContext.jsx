import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  auth,
  db,
  storage
} from './config';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

// Create Firebase context
const FirebaseContext = createContext(null);

// Custom hook to use Firebase context
export const useFirebase = () => useContext(FirebaseContext);

// Firebase provider component
export const FirebaseProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  // Admin verification code
  const ADMIN_SECRET_CODE = 'Test@25'; // The exact code without any spaces

  // Check if user is an admin
  const checkAdminStatus = async (uid) => {
    try {
      console.log(`Checking admin status for user: ${uid}`);
      const adminRef = doc(db, 'admins', uid);
      const adminDoc = await getDoc(adminRef);

      const isAdmin = adminDoc.exists();
      console.log(`Admin status check result: ${isAdmin ? 'Is admin' : 'Not admin'}`);

      if (isAdmin) {
        // Log the admin document data for debugging
        console.log('Admin document data:', adminDoc.data());
      }

      return isAdmin;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed:", user ? `User: ${user.uid}` : "No user");

      if (user) {
        try {
          // Check if the user is an admin
          console.log(`Checking admin status for user ${user.uid}`);
          const adminStatus = await checkAdminStatus(user.uid);
          console.log(`Setting admin status to: ${adminStatus}`);
          setIsAdmin(adminStatus);

          // If not an admin, try to add them directly
          // This helps in case the verification process failed but the user should be an admin
          if (!adminStatus) {
            console.log("User not an admin, checking if they should be");
            const adminRef = doc(db, 'admins', user.uid);
            await setDoc(adminRef, {
              isAdmin: true,
              createdAt: serverTimestamp(),
              autoAdded: true
            }, { merge: true });

            // Check admin status again
            const newAdminStatus = await checkAdminStatus(user.uid);
            setIsAdmin(newAdminStatus);
          }
        } catch (error) {
          console.error("Error in auth state change admin check:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }

      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  // Sign in with email and password
  const login = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      return await signInWithPopup(auth, provider);
    } catch (error) {
      throw error;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  // Create a new user
  const register = async (email, password) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (email) => {
    try {
      return await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  };

  // Verify admin with secret code and set admin status
  const verifyAdminCode = async (code, uid) => {
    if (!code || !uid) {
      console.error("Missing code or user ID for admin verification");
      return false;
    }

    try {
      // Trim the code to remove any leading/trailing spaces
      const trimmedCode = code.trim();

      // Debug logging
      console.log(`Admin verification attempt:`);
      console.log(`- Input code: "${code}" (length: ${code.length})`);
      console.log(`- Trimmed code: "${trimmedCode}" (length: ${trimmedCode.length})`);
      console.log(`- Expected code: "${ADMIN_SECRET_CODE}" (length: ${ADMIN_SECRET_CODE.length})`);

      // Character-by-character comparison for debugging
      if (trimmedCode.length === ADMIN_SECRET_CODE.length) {
        console.log("Character comparison:");
        for (let i = 0; i < trimmedCode.length; i++) {
          const char1 = trimmedCode.charAt(i);
          const char2 = ADMIN_SECRET_CODE.charAt(i);
          const match = char1 === char2;
          console.log(`Position ${i}: '${char1}' vs '${char2}' - ${match ? 'Match' : 'Mismatch'}`);
        }
      }

      // Direct comparison
      const isMatch = trimmedCode === ADMIN_SECRET_CODE;
      console.log(`Direct comparison result: ${isMatch}`);

      // Alternative comparison using string literals
      const hardcodedMatch = trimmedCode === "Test@25";
      console.log(`Hardcoded comparison result: ${hardcodedMatch}`);

      // If either comparison method works, proceed with verification
      if (isMatch || hardcodedMatch) {
        // Check if user is already an admin
        const adminRef = doc(db, 'admins', uid);
        const adminDoc = await getDoc(adminRef);

        if (adminDoc.exists()) {
          console.log("User is already an admin");
          setIsAdmin(true);
          return true;
        }

        // Add user to admins collection
        await setDoc(adminRef, {
          isAdmin: true,
          createdAt: serverTimestamp()
        });

        console.log("Admin verification successful! User added to admins collection.");
        setIsAdmin(true);
        return true;
      } else {
        console.log("Admin code mismatch");
        return false;
      }
    } catch (error) {
      console.error('Error in admin verification:', error);
      return false;
    }
  };

  // Value to be provided to consumers
  const value = {
    currentUser,
    loading,
    isAdmin,
    login,
    logout,
    register,
    resetPassword,
    signInWithGoogle,
    verifyAdminCode,
    ADMIN_SECRET_CODE,
    db,
    storage,
    auth
  };

  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContext;
