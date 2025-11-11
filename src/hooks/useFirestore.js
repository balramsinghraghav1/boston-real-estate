import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, query } from 'firebase/firestore';

// This hook listens to a Firestore collection in real-time
export const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    let collectionRef = collection(db, collectionName);
    const q = query(collectionRef); // You can add 'orderBy' or 'where' here

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let results = [];
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setDocs(results);
      setLoading(false);
    }, (err) => {
      console.error(err);
      setError("Failed to fetch data.");
      setLoading(false);
    });

    // Unsubscribe on unmount
    return () => unsubscribe();
  }, [collectionName]);

  return { docs, loading, error };
