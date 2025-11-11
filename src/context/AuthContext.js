import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config'; // Import from your config

// 1. Create the Context
const AuthContext = createContext();

// 2. Create the "useAuth" hook
// This is a helper so you can easily get user info anywhere
export function useAuth() {
  return useContext(AuthContext);
}

// 3. Create the Provider component
// This component will "provide" the auth info to all children
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'buyer', 'dealer', or null
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // onAuthStateChanged is the Firebase listener for login/logout
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is logged in
        setCurrentUser(user);

        // --- Fetch User Role ---
        // This is where we check the 'users' collection in Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        } else {
          // This might happen if user doc creation failed
          // Or you can create it here
          console.error("No user role document found!");
          setUserRole('buyer'); // Default to 'buyer'
        }
        // ------------------------

      } else {
        // User is logged out
        setCurrentUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // The "value" is what all child components get
  const value = {
    currentUser,
    userRole,
    loading
  };

  // Don't render the app until we know if user is logged in
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
